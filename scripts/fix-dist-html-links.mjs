import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST_DIR = join(process.cwd(), 'dist');

const htmlFiles = readdirSync(DIST_DIR).filter((fileName) => fileName.endsWith('.html'));

let updatedCount = 0;

for (const fileName of htmlFiles) {
  const filePath = join(DIST_DIR, fileName);
  const html = readFileSync(filePath, 'utf8');

  // file:// 환경에서도 링크/리소스 로딩이 되도록 절대 경로를 상대 경로로 변환
  let nextHtml = html.replace(
    /\b(href|src|action)=["']\/(?!\/)([^"']+)["']/g,
    '$1="./$2"',
  );
  nextHtml = nextHtml.replace(
    /location\.href='\/(?!\/)([^'"#?]+(?:[?#][^']*)?)'/g,
    "location.href='./$1'",
  );
  nextHtml = nextHtml.replace(
    /location\.href="\/(?!\/)([^"#?]+(?:[?#][^"]*)?)"/g,
    'location.href="./$1"',
  );
  nextHtml = nextHtml.replace(
    /url\((['"]?)\/(?!\/)([^)'"]+)\1\)/g,
    'url($1./$2$1)',
  );

  // html 페이지 간 이동 경로는 명시적으로 ./ 유지
  nextHtml = nextHtml.replace(
    /\b(href|src|action)="([^"#?]+\.html(?:[?#][^"]*)?)"/g,
    '$1="./$2"',
  );

  // file:// 에서 막히는 modulepreload polyfill script 제거
  nextHtml = nextHtml.replace(
    /<script\s+type="module"\s+crossorigin\s+src="\.\/js\/modulepreload-polyfill\.js"><\/script>\s*/g,
    '',
  );

  // file:// 호환을 위해 module script를 일반 defer script로 변경
  nextHtml = nextHtml.replace(
    /<script\s+type="module"\s+crossorigin\s+src="(\.\/js\/[^"]+)"><\/script>/g,
    '<script defer src="$1"></script>',
  );

  // file:// 호환을 위해 CORS 속성 제거
  nextHtml = nextHtml.replace(/\s+crossorigin(?=[\s>])/g, '');

  // public 파일명과 일치하도록 대소문자 보정
  nextHtml = nextHtml.replace(/href="css\/gb_intelligent\.css"/g, 'href="css/gb_Intelligent.css"');

  if (nextHtml !== html) {
    writeFileSync(filePath, nextHtml, 'utf8');
    updatedCount += 1;
  }
}

console.log(`[fix-dist-html-links] updated ${updatedCount} file(s).`);
