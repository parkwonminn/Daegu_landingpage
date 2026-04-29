# 대구광역시 홍보 랜딩 페이지 (Daegu_landingpage)

대구의 봄·관광·도시 정보를 소개하는 **정적 랜딩 페이지**입니다. HTML/CSS/JS만 사용하며, 별도 빌드 없이 바로 배포·실행할 수 있습니다.

## 바로 보기 (라이브 사이트)

| 구분 | 주소 |
|------|------|
| **공개 사이트** | [https://parkwonminn.github.io/Daegu_landingpage/](https://parkwonminn.github.io/Daegu_landingpage/) |
| **소스 코드** | [https://github.com/parkwonminn/Daegu_landingpage](https://github.com/parkwonminn/Daegu_landingpage) |

> GitHub 저장소 `main` 브랜치 기준으로 GitHub Pages에 연결된 주소입니다.

## 이 프로젝트가 하는 일

- **대구 도시 홍보**: 히어로, 도시 소개, 지표, 봄 하이라이트, 갤러리, 문의(CTA) 섹션으로 구성되어 있습니다.
- **반응형 UI**: 모바일 메뉴, 스티키 헤더, 라이트/다크 테마 전환을 지원합니다.
- **인터랙션**: 벚꽃 낙화 등 시각 효과와 스크롤·탭 등 페이지 내 동작이 `script.js`에 구현되어 있습니다.
- **선택 기능 — AI**: AI 상담 챗봇과 지브리 스타일 이미지 변환은 **방문자가 브라우저에 직접 입력한 OpenAI API 키**로 동작합니다. 키는 서버에 저장되지 않으며, 사용자 기기의 `localStorage`에만 보관됩니다. 키가 없어도 나머지 랜딩 콘텐츠는 정상적으로 이용할 수 있습니다.

## 현재 진행 상황 (요약)

| 항목 | 상태 |
|------|------|
| 정적 페이지 퍼블리시 | GitHub Pages로 공개 중 |
| 핵심 섹션(소개·지표·하이라이트·갤러리·문의) | 구현됨 |
| 테마·내비·모바일 UX | 구현됨 |
| AI 챗·이미지 (OpenAI 연동) | 선택 사용, API 키 필요 |
| 기획·운영 참고 문서 | `LANDING_STRATEGY.md` (랜딩 전략 노트) |

## 프로젝트 구조

```
├── index.html          # 페이지 마크업
├── style.css           # 스타일
├── script.js           # 동작·AI 연동 로직
├── LANDING_STRATEGY.md # 랜딩 기획·전략 메모
└── README.md           # 이 파일
```

## 로컬에서 실행하기

1. 저장소를 클론하거나 ZIP으로 받습니다.
2. `index.html`을 브라우저에서 직접 열거나, 간단한 정적 서버로 띄웁니다.

**Python이 있는 경우 (예시):**

```bash
# 프로젝트 폴더에서
python -m http.server 8080
```

브라우저에서 `http://localhost:8080` 으로 접속합니다.

## 라이선스·주의

- 공개 레포지토리이므로 **API 키·비밀 정보는 코드에 넣지 마세요**. 현재 구조는 UI에서 입력한 키를 로컬에만 두는 방식입니다.
- 본 페이지의 텍스트·이미지는 학습·포트폴리오·연습 목적에 맞게 사용하시고, 실제 정부·기관 공식 홍보와 혼동되지 않도록 실서비스 시에는 콘텐츠·표기를 반드시 검토하세요.

---

**한 줄 요약**: [라이브 사이트](https://parkwonminn.github.io/Daegu_landingpage/)에서 대구 홍보 랜딩을 바로 볼 수 있고, 소스는 이 GitHub 저장소에 있습니다.
