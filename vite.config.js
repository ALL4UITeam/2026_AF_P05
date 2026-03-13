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

export default {
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: mapPageInputs,
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
};
