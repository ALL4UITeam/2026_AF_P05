import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST_DIR = join(process.cwd(), 'dist');

const htmlFiles = readdirSync(DIST_DIR).filter((fileName) => fileName.endsWith('.html'));

let updatedCount = 0;

for (const fileName of htmlFiles) {
  const filePath = join(DIST_DIR, fileName);
  const html = readFileSync(filePath, 'utf8');

  // file:// 환경에서도 링크/리소스 로딩이 되도록 절대 경로를 상대 경로로 변환
  // location.href 내부는 제외하고, 원본 따옴표 스타일 유지
  let nextHtml = html.replace(
    /\b(?<!location\.)(href|src|action)=(["'])\/(?!\/)([^"']+)\2/g,
    (_, attr, quote, path) => `${attr}=${quote}./${path}${quote}`,
  );
  nextHtml = nextHtml.replace(
    /location\.href=(["'])\/(?!\/)([^'"#?]+(?:[?#][^'"]*)?)\1/g,
    (_, quote, path) => `location.href=${quote}./${path}${quote}`,
  );
  nextHtml = nextHtml.replace(
    /url\((['"]?)\/(?!\/)([^)'"]+)\1\)/g,
    'url($1./$2$1)',
  );

  // html 페이지 간 이동 경로는 ./ 가 없을 때만 추가 (이미 ./ 인 경로에 중복 적용 시 ././ 발생)
  nextHtml = nextHtml.replace(
    /\b(?<!location\.)(href|src|action)=(["'])(?!\.\/|\.\.\/|https?:\/\/|\/\/|#|mailto:|tel:)([^'"#?]+\.html(?:[?#][^'"]*)?)\2/g,
    (_, attr, quote, path) => `${attr}=${quote}./${path}${quote}`,
  );

  // 이전 빌드에서 생긴 ././ 중복 경로 정리
  nextHtml = nextHtml.replace(/\.\/(\.\/)+/g, './');

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
  nextHtml = nextHtml.replace(
    /href=(["'])css\/gb_intelligent\.css\1/g,
    'href=$1css/gb_Intelligent.css$1',
  );

  if (nextHtml !== html) {
    writeFileSync(filePath, nextHtml, 'utf8');
    updatedCount += 1;
  }
}

console.log(`[fix-dist-html-links] updated ${updatedCount} file(s).`);
