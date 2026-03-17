import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import handlebars from 'vite-plugin-handlebars';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 생성된 map 페이지 목록 (map-pages.json 있으면 사용, 없으면 기본 목록)
const mapPagesPath = resolve(__dirname, 'public/map-pages.json');
let mapPageInputs = ['map-search.html'];
try {
	const mapPages = JSON.parse(readFileSync(mapPagesPath, 'utf-8'));
	if (Array.isArray(mapPages) && mapPages.length) mapPageInputs = mapPages.map((p) => p.file);
} catch (_) {}

// layout2 사용 페이지 (통신/커뮤니케이션 등 별도 레이아웃)
const layout2PageInputs = ['communication.html'];

export default {
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: [...mapPageInputs, ...layout2PageInputs],
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
};
