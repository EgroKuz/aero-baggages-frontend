import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {api_proxy_addr, img_proxy_addr, dest_root} from "./target_config"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: dest_root,
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/api": {
        target: api_proxy_addr,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
      "/img-proxy": {
           target: img_proxy_addr,
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/img-proxy/, "/"),
         },
    },
  },
}); 