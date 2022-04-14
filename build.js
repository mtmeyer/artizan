#!/usr/bin/env node

require("esbuild")
  .build({
    logLevel: "info",
    entryPoints: ["src/*.ts"],
    bundle: true,
    outfile: "lib/bundle.js",
    sourcemap: true,
    minify: true,
  })
  .catch(() => process.exit(1));
