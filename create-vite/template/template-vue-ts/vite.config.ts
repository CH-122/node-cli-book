/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import * as path from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Unocss from 'unocss/vite';

const baseConfig = defineConfig({
  plugins: [
    vue(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
    Unocss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(__dirname, 'test/setup.ts')],
  },
});

/**
 * 通过不同模式的dev命令来启动不同的开发环境：
 * npm run dev - 默认dev环境 uea.qstcloud.net
 * npm run dev:prod- 生产环境 www.eec-cn.com
 * npm run dev:locally - 启动本地服务调试，需要根据你的本地服务地址，在/env/.env.local里配置VVITE_API_BASEPATH和ITE_API_GATEWAY变量
 */
export default defineConfig(({ mode }) => {
  // 取env环境变量配置，没取到则默认开发环境
  const envs = loadEnv(mode, process.cwd() + '/env');
  for (const k in envs) {
    process.env[k] = envs[k];
  }
  // api前缀
  const proxyApiPrepend = process.env.VITE_API_BASE_PATH ? process.env.VITE_API_BASE_PATH : '/api';
  // 要代理的地址
  const gateway = process.env.VITE_API_GATEWAY ? process.env.VITE_API_GATEWAY : 'https://uea.qstcloud.net';

  return {
    ...baseConfig,
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // 第三方模块按包名进行拆分打包
            if (id.includes('node_modules')) {
              let name = 'vendor';
              const idArray = id.split('/node_modules/');
              const endStr = idArray[idArray.length - 1];
              const finalStr = endStr.split('/')[0];
              if (finalStr && !finalStr.startsWith('.')) {
                name = `vendor-${finalStr}`;
              }
              return name;
            }
          },
        },
      },
    },
    server: {
      open: true,
      host: '0.0.0.0',
      // port: 8080,
      proxy: {
        [proxyApiPrepend]: {
          target: `${gateway}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(proxyApiPrepend, ''),
        },
      },
    },
  };
});
