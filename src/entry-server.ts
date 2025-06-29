import { renderToString } from "@vue/server-renderer";
import { createVueApp } from "./app";
import { renderHeadToString } from "@vueuse/head";

export async function render(url: string, manifest?: Record<string, string[]>): Promise<[string, string, string]> {
  const { app, router, head } = createVueApp();

  router.push(url);
  await router.isReady();

  const ctx: { modules?: Set<string> } = {};
  const html = await renderToString(app, ctx);

  // Serialize head on the server
  const { headTags } = renderHeadToString(head);

  let preloadLinks = "";
  if (manifest && ctx.modules) {
    const seen = new Set<string>();
    for (const id of ctx.modules) {
      preloadLinks += renderPreloadLinks(id, manifest, seen);
    }
  }

  return [html, preloadLinks, headTags];
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