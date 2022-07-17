import { defineConfig, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }: ConfigEnv) => {
  const isDev = command !== "build";

  // terminate the watcher when Phoenix quits
  if (isDev) {
    process.stdin.on("close", () => {
      process.exit(0);
    });

    process.stdin.resume();
  }

  return {
    publicDir: "static",
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
    ],
    build: {
      target: "esnext",
      outDir: "../priv/static",
      emptyOutDir: true,
      sourcemap: isDev,
      manifest: false,
      rollupOptions: {
        input: {
          main: "./src/app.tsx",
        },
        output: {
          entryFileNames: "assets/[name].js",
          chunkFileNames: "assets/[name].js",
          assetFileNames: assetFileNames,
        },
      },
    },
  };
});

const assetFileNames = (info) => {
  const mappings = {
    ".webfonts/.(woff2?|ttf|eot|svg)": "fonts/[name][extname]",
    ".(woff2?|ttf|eot)$": "fonts/[name][extname]",
    ".(s?css)$": "assets/[name][extname]",
  };

  return (
    Object.entries(mappings)
      .filter(([key, _value]) => info.name.match(key))
      .map(([_key, value]) => value)[0] || "[ext]/[name][extname]"
  );
};
