# 2026_AF_P05 — UI 배포 가이드

> 빌드 결과물(`dist/`)을 서버에 올리는 방법을 안내합니다.  
> 소스 수정·빌드는 이 문서에서 다루지 않습니다.

---

## dist 폴더 구조

```
dist/
├── map-search.html        # 통합지도 페이지
├── communication.html     # 소통공간 페이지
├── dashboard.html         # 대시보드 페이지
├── css/
│   ├── gb_Intelligent.css # 공통 UI 스타일
│   ├── map.css            # 통합지도 전용 스타일
│   ├── communication.css  # 소통공간 & 시스템템 전용 스타일
│   ├── reset.css
│   ├── root.css
│   └── select2.min.css
├── js/
│   ├── map-search.js      # 통합지도 전용 스크립트
│   ├── modulepreload-polyfill.js
│   ├── ui.js              # 공통 UI 스크립트
│   └── lib/               # 외부 라이브러리 (jQuery, Select2 등)
├── images/                # 이미지 리소스
├── fonts/                 # S-Core Dream 폰트
└── font/                  # Pretendard 폰트
```

---

## 서버 적용 방법

### 조건

- `dist/` 폴더 안의 파일들을 **웹 루트(`/`)에 그대로** 올려야 합니다.
- HTML 파일 안의 리소스 경로가 모두 `/css/`, `/js/`, `/images/` 등 **절대 경로**로 작성되어 있습니다.

### 적용 방법

#### 방법 1 — 폴더째 복사 (일반 웹서버)

```
dist/ 안의 내용을 웹 루트에 복사
```

예시:
```
/var/www/html/
  ├── map-search.html
  ├── communication.html
  ├── css/
  ├── js/
  ├── images/
  └── fonts/
```

> `dist/` 폴더 자체가 아니라, `dist/` **안에 있는 파일들**을 루트에 복사합니다.

#### Apache / Nginx

`dist/` 안의 파일을 지정 경로에 복사한 후, 해당 경로를 웹 루트 또는 가상 디렉터리로 등록합니다.

**Nginx 예시:**
```nginx
server {
    listen 80;
    root /var/www/2026_AF_P05;
    index map-search.html;
}
```

**IIS 예시:**  
실제 경로(Physical Path)를 `dist/` 복사본 폴더로 지정합니다.

---

## 페이지 목록

| 파일 | 설명 |
|------|------|
| `map-search.html` | 통합지도 메인 |
| `communication.html` | 소통공간 게시판 |
| `dashboard.html` | 대시보드 |

---

## 주의사항

- `dist/` 안의 파일은 **직접 수정하지 마세요.** 빌드 시 덮어써집니다.
- 리소스 경로는 모두 절대 경로(`/css/`, `/js/`)로 되어 있으므로, **반드시 웹 루트 기준**으로 배포해야 합니다.
