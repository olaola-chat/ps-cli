import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import postcssPX2viewport from 'postcss-px-to-viewport';
import { babelPluginZhReplacer } from '@ola/zh-scanner';
import babelPluginReactScopedCSS from '@ola/babel-plugin-react-scoped-css';
import rollupPluginScopedCSS from '@ola/rollup-plugin-scoped-css';
import { defineConfig } from 'vite';
import path from 'path';
import postcssRTLCSS from 'postcss-rtlcss';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [babelPluginReactScopedCSS, babelPluginZhReplacer],
      },
    }),
    rollupPluginScopedCSS(),
    legacy({ targets: ['iOS 11', 'Android 4.4'], modernPolyfills: true }),
  ],
  server: {
    host: '0.0.0.0',
  },
  css: {
    postcss: {
      plugins: [
        postcssPX2viewport({
          unitToConvert: 'px',
          viewportWidth: 750,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 2,
          mediaQuery: false,
          replace: true,
          exclude: undefined,
          include: undefined,
          landscape: false,
          landscapeUnit: 'vw',
          landscapeWidth: 568,
        }),
        postcssRTLCSS,
      ],
    },
  },
});
