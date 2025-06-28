import { renderToString } from "@vue/server-renderer";
import { createVueApp } from "./app";

export async function render(url: string, manifest?: Record<string, string[]>): Promise<[string, string]> {
  const { app, router } = createVueApp();

  router.push(url);
  await router.isReady();

  const ctx: { modules?: Set<string> } = {};
  const html = await renderToString(app, ctx);

  let preloadLinks = "";
  if (manifest && ctx.modules) {
    const seen = new Set<string>();
    for (const id of ctx.modules) {
      preloadLinks += renderPreloadLinks(id, manifest, seen);
    }
  }

  return [html, preloadLinks];
}

function renderPreloadLinks(
  moduleId: string,
  manifest: Record<string, string[]>,
  seen: Set<string>
) {
  let links = "";
  const files = manifest[moduleId];
  if (!files) return links;

  for (const file of files) {
    if (seen.has(file)) continue;
    seen.add(file);
    if (file.endsWith(".js")) {
      links += `<link rel="modulepreload" crossorigin href="${file}">`;
    } else if (file.endsWith(".css")) {
      links += `<link rel="stylesheet" href="${file}">`;
    }
  }
  return links;
} 