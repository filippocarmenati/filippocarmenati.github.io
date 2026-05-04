// @ts-check
import { defineConfig } from 'astro/config';

// Personal site lives at the domain root, so `base` stays as '/'.
// Requires a GitHub repo named `filippocarmenati.github.io` under the
// `filippocarmenati` GitHub user/organization.
export default defineConfig({
  site: 'https://filippocarmenati.github.io',
  base: '/',
  trailingSlash: 'ignore',
});
