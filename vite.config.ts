import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    hmr: true,
    proxy: {
      '^/admin': {
        // target: 'http://dev-jiangshan-tzyjs-apiadmini.hzanchu.com',
        // target: 'http://pre-jiangshan-tzyjs-apiadmini.hzanchu.com',
        // target: 'https://jiangshan-tzyjs-apiadmini.zjsszxc.com',
        target: " http://localhost:8888/",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // 导入时想要省略的扩展名列表
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
})
