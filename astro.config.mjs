import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://dancingbrushlabs.github.io",
  base: process.env.GITHUB_ACTIONS ? "/publication" : "/",
});
