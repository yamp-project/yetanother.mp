import { reactive, toRefs } from "vue";

// Centralised front-end access to YAMP auth / alpha application APIs
// API lives on a separate sub-domain – always use absolute URLs and include credentials.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://api.yetanother.mp/v1";

interface User {
  id: string;
  username: string;
  avatar?: string;
}

interface AlphaApplication {
  applied: boolean;
  status: "pending" | "approved" | "rejected" | null;
  appliedAt?: number;
  approvedAt?: number;
  approvedBy?: string;
}

// Shared reactive state (single instance imported across the app)
const state = reactive({
  loading: false,
  initialised: false,
  user: null as User | null,
  hasAlphaAccess: false,
  alphaApplication: {
    applied: false,
    status: null,
    appliedAt: undefined,
    approvedAt: undefined,
    approvedBy: undefined,
  } as AlphaApplication,
});

async function refresh() {
  // Avoid SSR / duplicate fetches
  if (typeof window === "undefined" || state.loading) return;
  state.loading = true;
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      state.user = data.user ?? null;
      state.hasAlphaAccess = Boolean(data.hasAlphaAccess);
      
      // Update alpha application state from API response
      if (data.alphaApplication) {
        state.alphaApplication = {
          applied: Boolean(data.alphaApplication.applied),
          status: data.alphaApplication.status,
          appliedAt: data.alphaApplication.appliedAt,
          approvedAt: data.alphaApplication.approvedAt,
          approvedBy: data.alphaApplication.approvedBy,
        };
      } else {
        // Reset alpha application state
        state.alphaApplication = {
          applied: false,
          status: null,
          appliedAt: undefined,
          approvedAt: undefined,
          approvedBy: undefined,
        };
      }
    } else {
      // Not logged in or token invalid.
      resetAuthState();
    }
  } catch {
    // Network / CORS issues – treat as logged out.
    resetAuthState();
  } finally {
    state.loading = false;
    state.initialised = true;
  }
}

function resetAuthState() {
  state.user = null;
  state.hasAlphaAccess = false;
  state.alphaApplication = {
    applied: false,
    status: null,
    appliedAt: undefined,
    approvedAt: undefined,
    approvedBy: undefined,
  };
}

function login() {
  // Redirect flow handled entirely by the backend / Discord.
  window.location.href = `${API_BASE}/auth/discord/login`;
}

async function applyForAlpha() {
  if (!state.user) {
    login();
    return;
  }
  if (!state.hasAlphaAccess) {
    console.warn("User does not have required Discord role for alpha access");
    return;
  }

  state.loading = true;
  try {
    const res = await fetch(`${API_BASE}/alpha-access/apply`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      state.alphaApplication = {
        applied: true,
        status: "pending",
        appliedAt: data.timestamp,
        approvedAt: undefined,
        approvedBy: undefined,
      };
    }
  } finally {
    state.loading = false;
  }
}

async function withdrawApplication() {
  if (!state.user) return;
  if (!state.alphaApplication.applied) return;

  state.loading = true;
  try {
    const res = await fetch(`${API_BASE}/alpha-access/apply`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      state.alphaApplication = {
        applied: false,
        status: null,
        appliedAt: undefined,
        approvedAt: undefined,
        approvedBy: undefined,
      };
    }
  } finally {
    state.loading = false;
  }
}

async function getAlphaStatus() {
  if (!state.user) return null;
  
  try {
    const res = await fetch(`${API_BASE}/alpha/status`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      state.alphaApplication = {
        applied: Boolean(data.applied),
        status: data.status,
        appliedAt: data.appliedAt,
        approvedAt: data.approvedAt,
        approvedBy: data.approvedBy,
      };
      return data;
    }
  } catch (error) {
    console.error("Failed to fetch alpha status:", error);
  }
  return null;
}

export function useAuth() {
  // Auto-refresh once per import on client side
  if (!state.initialised && typeof window !== "undefined") {
    // Fire and forget – we don't await here so components mount instantly.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refresh();
  }
  return { 
    ...toRefs(state), 
    refresh, 
    login, 
    applyForAlpha, 
    withdrawApplication, 
    getAlphaStatus 
  };
} 