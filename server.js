import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import compression from "compression";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

async function createServer() {
  const app = express();

  let vite;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use(compression());
    app.use(
      express.static(path.resolve(__dirname, "dist/client"), {
        index: false,
      })
    );
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template, render;

      if (!isProd) {
        // 1. Read index.html
        template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and applies HTML transforms from plugins.
        template = await vite.transformIndexHtml(url, template);
        // 3. Load the server entry. ssrLoadModule automatically transforms ESM source code to be usable in Node.js!
        render = (await vite.ssrLoadModule("/src/entry-server.ts")).render;
      } else {
        // Production: use compiled HTML and JS
        template = fs.readFileSync(
          path.resolve(__dirname, "dist/client/index.html"),
          "utf-8"
        );
        render = (await import("./dist/server/entry-server.js")).render;
      }

      // The manifest is only generated in production client build
      const manifest = isProd
        ? JSON.parse(
            fs.readFileSync(
              path.resolve(__dirname, "dist/client/.vite/ssr-manifest.json"),
              "utf-8"
            )
          )
        : undefined;

      const [appHtml, preloadLinks, headTags] = await render(url, manifest);

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks || "")
        .replace(`<!--head-tags-->`, headTags || "")
        .replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  const port = process.env.PORT || 5173;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on http://localhost:${port}`);
  });
}

createServer(); 