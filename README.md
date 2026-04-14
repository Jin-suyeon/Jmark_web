# J-Mark

나만의 지식 책갈피 — 현재 탐색 중인 페이지를 자동으로 분석하여 관련 북마크를 추천하고, 키워드로 빠르게 검색할 수 있는 Chrome 확장 프로그램입니다.

## 주요 기능

### 페이지 데이터 자동 추출
팝업이 열리는 순간 현재 활성 탭에서 4가지 데이터를 순차적으로 자동 수집합니다.

- URL
- 페이지 타이틀
- `<meta name="description">` 값
- 본문 텍스트 (최대 900자)

Content Script → Background Service Worker → Popup(Redux Store) 순서로 메시지 패싱을 통해 전달됩니다.

### 북마크 저장
수집된 페이지 데이터(title + description + 본문 텍스트)를 중복 제거 후 서버에 전송하여 북마크를 저장합니다. 북마크 이름은 수동으로 수정할 수 있습니다.

### 키워드 기반 북마크 검색
- 단일 키워드 또는 쉼표로 구분된 다중 키워드로 검색 가능
- 최근 검색 키워드 6개 표시 및 재사용 가능

### 페이지 맥락 기반 북마크 추천
현재 페이지의 URL과 본문 텍스트를 서버에 전달하여 관련도 높은 북마크를 추천받는 기능입니다.

## 기술 스택

| 분류 | 기술 |
|---|---|
| Frontend | React 18, TypeScript |
| 상태 관리 | Redux, Redux-Saga, typesafe-actions |
| HTTP | Axios |
| Extension | Chrome Extension Manifest V3 |

## 아키텍처

```
Popup (React)
  ├── Content Script (content.js)   # 페이지 DOM에서 데이터 추출
  ├── Service Worker (background.js) # 추출 데이터 임시 저장 및 전달
  └── Redux Store                    # 전역 상태 관리
```

**통신 흐름:**
```
Popup → chrome.tabs.sendMessage(tabId) → Content Script
Content Script → chrome.runtime.sendMessage → Service Worker (저장)
Popup → chrome.runtime.sendMessage → Service Worker (회수) → Redux Store
```

## 설치 및 실행

### 빌드
```bash
npm install
npm run build
```

### Chrome 확장 프로그램 로드
1. Chrome 주소창에 `chrome://extensions` 입력
2. 우측 상단 **개발자 모드** 활성화
3. **압축해제된 확장 프로그램을 로드합니다** 클릭
4. `build` 폴더 선택
