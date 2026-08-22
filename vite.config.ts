import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// NOTE: When deploying to GitHub Pages at https://<user>.github.io/<repo>/,
// set `base` to "/<repo>/". See README.md for full deployment steps.
export default defineConfig({
  base: "./",
  plugins: [react()],
})
