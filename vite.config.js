import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 루트에 있는 모든 *.html 자동 수집 → 새 페이지 추가 시 config 수정 불필요
const allHtmlInputs = readdirSync(__dirname)
	.filter((f) => f.endsWith('.html'))
	.map((f) => resolve(__dirname, f));

// GitHub Pages 등 하위 경로 배포: 빌드 산출물은 상대 경로로 묶음 (dev는 '/' 유지)
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: allHtmlInputs,
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name.endsWith('.css')) {
            return 'css/' + name.replace(/-[a-zA-Z0-9]+\.css$/, '.css');
          }
          return 'assets/[name].[ext]';
        },
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
}));
