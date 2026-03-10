import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import handlebars from 'vite-plugin-handlebars';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 생성된 map 페이지 목록 (map-pages.json과 동기화)
const mapPagesPath = resolve(__dirname, 'public/map-pages.json');
const mapPages = JSON.parse(readFileSync(mapPagesPath, 'utf-8'));
const mapPageInputs = mapPages.map((p) => p.file);

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
