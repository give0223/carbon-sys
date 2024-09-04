import { defineConfig,loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { command, mode } = config
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue(),
      // SVG圖示配置
      createSvgIconsPlugin({
        // 指定SVG圖檔位置
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // 只在開發階段開啟mock
        enable: command === 'serve',
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname,"src") //相對路徑使用@代替
      }
    },
    // 代理伺服器
    server: {
      port: Number(env.VITE_APP_PORT),
      strictPort: false, // Port被占用時直接退出， false會嘗試連接下一個可用Port
      open: true, // dev時自動打開網頁，也可以給網址指定。
      // 自訂代理規則，配合後端進行Api呼叫等。
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'https://c56d3c9b-adac-4e61-9690-fcd942efff93.mock.pstmn.io',// 後端進行Api
          changeOrigin: true,// 允許websockets跨域
          rewrite: (path) => path.replace(/^\/dev-api/, ''),// 請求前綴
        },
      }
    }
  }
  
})
