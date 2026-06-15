import { defineConfig } from "@rsbuild/core";
import UnoCSS from "@unocss/postcss";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";
import { tanstackRouter } from "@tanstack/router-plugin/rspack";

export default defineConfig({
  html: {
    title: "Frontend Boilerplate",
  },
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSolid(),
  ],
  tools: {
    postcss: (_config, { addPlugins }) => {
      addPlugins(UnoCSS(), { order: "pre" });
    },
    cssLoader: {
      url: {
        filter: (url) => !url.startsWith("/fonts/"),
      },
    },
    rspack: {
      plugins: [
        tanstackRouter({
          target: "solid",
          autoCodeSplitting: true,
          routesDirectory: "./src/routes",
          generatedRouteTree: "./src/routeTree.gen.ts",
          routeFileIgnorePrefix: "-",
          routeFileIgnorePattern: "\\.(test|spec)\\.(ts|tsx)$",
          quoteStyle: "double",
        }),
      ],
    },
  },
});
