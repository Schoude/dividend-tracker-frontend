import { defineConfig } from 'astro/config';
import deno from "@astrojs/deno";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  experimental: {
    viewTransitions: true
  },
  output: "server",
  adapter: deno(),
  integrations: [vue()]
});
