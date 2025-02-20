import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {api_proxy_addr, img_proxy_addr, dest_root} from "./target_config"
import mkcert from 'vite-plugin-mkcert';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  base: dest_root,
  server: {
    port: 3000,
    host: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
    proxy: {
      "/api": {
        target: api_proxy_addr,
        changeOrigin: true,
      },
      "/img-proxy": {
           target: img_proxy_addr,
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/img-proxy/, "/"),
         },
    },
  },
}); 