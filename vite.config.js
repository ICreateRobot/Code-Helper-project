import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import optimizer from "vite-plugin-optimizer"


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  pluginOptions: {
    electronBuilder: {
      preload: 'preload.js',
      // Or, for multiple preload files:
      // preload: { preload: 'src/preload.js', otherPreload: 'src/preload2.js' }
    }
  }

})

