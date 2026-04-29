# 회사 소개 랜딩 페이지 — 전략 문서

> 작성일: 2026-04-29  
> 목적: 나의 회사를 알리기 위한 랜딩 페이지 기획·개발 전략  
> 단계별로 검토 후 진행하며, 각 단계는 독립적으로 참고 가능

---

## 목차

1. [1단계: 아이디어 분석](#1단계-아이디어-분석)
2. [2단계: 프로토타이핑 전략 설계](#2단계-프로토타이핑-전략-설계)
3. [3단계: 그로스 전략 설계](#3단계-그로스-전략-설계)
4. [4단계: 이터레이션 설계](#4단계-이터레이션-설계)
5. [5단계: MVP PRD](#5단계-mvp-prd)

---

## 1단계: 아이디어 분석

### 아이디어 재구성 (빈칸 추측 보완)

제공된 내용이 간결하여, 일반적인 B2B/B2C 소규모 기업 랜딩 페이지 맥락으로 빈칸을 채워 분석했습니다.

- **회사 유형 추정**: 소규모 스타트업 또는 1인~10인 기업
- **주요 목적 추정**: 신뢰 형성 → 연락처 확보(리드) 또는 서비스 문의
- **타겟 방문자**: 소개받거나 검색으로 찾아온 잠재 고객/파트너
- **전환 행동 목표**: 문의 폼 제출, 전화, 이메일, 카카오 채널 등

### 강점

- **즉각적인 신뢰 확보**: 홈페이지 없이는 명함·카카오톡 등으로만 연결되는데, 랜딩 페이지 하나로 "이 회사는 진짜다"는 첫인상을 줄 수 있음
- **SEO 진입점 확보**: 회사명 검색 시 결과가 없는 상태를 탈피, 향후 블로그/콘텐츠 확장의 기반
- **24시간 영업 대리인**: 영업·설명 자료를 대신하는 비동기 도구
- **비용 대비 효과**: 브로셔 인쇄 대비 훨씬 저렴하고 수정이 자유로움

### 취약점 / 위험 요소

- **콘텐츠 부재 위험**: 회사 소개글, 서비스 설명, 대표 사진 등 실제 콘텐츠가 없으면 빈 껍데기가 됨 → 방문자가 이탈
- **트래픽 전략 부재**: 만들어도 아무도 방문하지 않으면 효과 없음
- **단방향 커뮤니케이션 위험**: 문의 폼만 있고 응답이 느리면 오히려 신뢰 훼손
- **유지보수 공백**: 사업 내용이 바뀌어도 랜딩 페이지가 업데이트되지 않으면 오정보 제공

### 고려해야 할 핵심 질문

1. **핵심 전환(CTA)이 무엇인가?** — 전화? 문의 폼? 카카오? SNS 팔로우?
2. **어떤 산업/업종인가?** — 업종에 따라 신뢰 요소(수상 이력, 포트폴리오, 고객사 로고 등)가 달라짐
3. **한국어만인가, 영어도 필요한가?**

### 기존 솔루션 조합 제안

백엔드를 직접 구현하지 않고 완성도 있는 랜딩 페이지를 운영할 수 있는 조합

| 필요 기능 | 추천 조합 |
|---|---|
| 페이지 퍼블리시 | Cursor로 HTML/CSS 생성 + GitHub Pages 또는 Netlify (무료 호스팅) |
| 문의 폼 수신 | Google Forms 임베드 또는 Formspree (백엔드 없이 이메일 수신) |
| 방문자 통계 | Google Analytics 또는 Microsoft Clarity (무료) |
| 도메인 연결 | 가비아/Cloudflare 도메인 구매 후 Netlify에 연결 (연 1~2만원) |
| 채팅 문의 | Kakao Channel 플러그인 또는 Tally 폼 |
| 포트폴리오/갱신 | Notion 공개 페이지 링크 걸기 (노코드 CMS 역할) |

### 불확실성 지도

| 영역 | 불확실성 | 어떤 정보가 있으면 바뀌는가? |
|---|---|---|
| 회사 업종 | 업종을 모르므로 어떤 신뢰 요소가 중요한지 특정 불가 | 업종, 주요 서비스 1~3가지를 알면 섹션 구성이 달라짐 |
| 핵심 CTA | 문의 폼인지, 전화인지, SNS인지 모름 | 어떤 행동을 유도하고 싶은지 알면 CTA 우선순위가 달라짐 |
| 타겟 방문 경로 | 검색/SNS/지인 소개 중 어디서 오는지 모름 | 경로에 따라 SEO vs 카드뉴스 vs 명함 QR 전략이 달라짐 |
| 내용 자산 보유 여부 | 로고, 대표사진, 서비스 설명문이 있는지 모름 | 없으면 제작 시간이 배로 늘어남 |

---

## 2단계: 프로토타이핑 전략 설계

### 핵심 가설

랜딩 페이지를 만들기 전에 아래 세 가지 가설을 검증하는 것이 시간·비용 낭비를 막습니다.

| # | 가설 | 검증 방법 |
|---|---|---|
| H1 | 방문자는 페이지를 보고 "신뢰할 수 있는 회사"로 판단한다 | 지인 5명에게 30초 노출 후 인상 인터뷰 |
| H2 | 방문자는 CTA(문의 버튼)를 발견하고 실제로 누른다 | 클릭 히트맵(Clarity) 또는 직접 관찰 |
| H3 | 이 페이지가 기존 명함/카카오 소개보다 더 신뢰를 준다 | A/B 비교 인터뷰 (명함만 보여준 그룹 vs 페이지도 보여준 그룹) |

---

### 전략 A — 종이에 그려보기 (권장 첫 번째)

**방법**
1. A4 용지에 페이지 섹션을 손으로 스케치 (히어로, 서비스, 신뢰 요소, CTA)
2. 지인 3~5명에게 보여주고 "이 회사가 뭘 하는지 30초 안에 이해되나요?" 질문
3. 이해 안 되는 섹션 → 텍스트 고치거나 순서 변경

**검증 목표**: 메시지 구조와 섹션 순서가 직관적인지 확인  
**비용**: 0원, 1~2시간  
**판단 기준**: 5명 중 4명이 30초 내에 업종과 CTA를 설명할 수 있으면 통과

---

### 전략 B — 기존 제품 피기백 (Piggy-backing)

실제 코드를 짜기 전에 **Notion 무료 공개 페이지**로 랜딩 역할을 테스트합니다.

**방법**
1. Notion에 회사 소개 페이지 작성 (텍스트 + 이미지 + 링크)
2. `notion.so` 공개 URL을 명함·카카오 프로필에 붙여넣기
3. 1~2주 운영하며 링크 클릭 수·반응 수집

**검증 목표**: 실제 방문자가 생기는지, 어떤 내용에 반응하는지 확인  
**비용**: 0원  
**판단 기준**: 1주 내 5명 이상이 페이지를 보고 자발적으로 연락하면 정식 페이지 개발 착수 근거 확보

**추천 Notion → 실제 사이트 전환 도구**: Super.so, Potion.so (Notion 페이지를 커스텀 도메인 사이트로 변환)

---

### 전략 C — 손으로 기계 대신하기 (Wizard of Oz)

문의 폼·챗봇 등 자동화 기능을 만들기 전에, 사람이 수동으로 그 역할을 해보는 방법입니다.

**방법**
1. 페이지에 "문의하기 → 카카오 채널로 연결" 버튼만 만들기
2. 문의가 들어오면 직접 수작업으로 답장
3. 어떤 질문이 반복되는지, 어떤 정보가 부족한지 기록

**검증 목표**: 실제 문의 패턴 파악 → 나중에 FAQ 섹션이나 자동 응답 설계에 반영  
**비용**: 0원  
**판단 기준**: 10건 문의 중 3건 이상이 동일한 질문이면 해당 내용을 페이지에 미리 답변으로 추가

---

### 전략 D — 역할극·대화하기

**방법**
1. 잠재 고객 역할의 지인과 대화: "지금 우리 회사 페이지를 봤다고 가정하고, 어떤 질문이 생기나요?"
2. 질문 목록을 적어 페이지의 FAQ 또는 서비스 설명 섹션에 반영

**검증 목표**: 방문자 입장에서 생기는 의문점 선제 해소  
**비용**: 0원, 30분~1시간

---

### 프로토타이핑 추천 순서

```
종이 스케치 (1일) → Notion 피기백 (1~2주) → 실제 코드 개발 → Wizard of Oz로 문의 패턴 수집
```

### 불확실성 지도

| 영역 | 불확실성 | 변경 조건 |
|---|---|---|
| Notion 피기백의 적합성 | 업종에 따라 Notion이 너무 캐주얼하게 느껴질 수 있음 | B2B 고가 서비스라면 Wix/Framer 유료 템플릿이 더 적합 |
| 검증 인원 규모 | 지인 5명이 실제 타겟과 다를 수 있음 | 타겟 고객과 가까운 사람 1~2명을 포함시키면 정확도 상승 |
| 기간 설정 | 1~2주 Notion 운영으로 충분한 데이터가 안 모일 수 있음 | SNS 등에 링크를 적극 공유하면 데이터 수집 기간 단축 |

---

## 3단계: 그로스 전략 설계

### 최초 홍보 계획 (0→1: 첫 100명 방문자 확보)

랜딩 페이지는 만들어도 아무도 방문하지 않으면 의미가 없습니다. 광고비 없이 첫 방문자를 모으는 방법입니다.

#### 채널별 행동 계획

| 채널 | 구체적 행동 | 예상 효과 | 비용 |
|---|---|---|---|
| 개인 명함/QR | 명함 뒷면에 QR 코드 인쇄, 미팅마다 배포 | 오프라인 → 온라인 연결 | 인쇄비 1~2만원 |
| 카카오 프로필 | 카카오톡 프로필 링크에 페이지 URL 등록 | 지인 네트워크 자연 노출 | 0원 |
| 링크드인 | 회사 페이지 개설 + 대표자 프로필 업데이트 | B2B 잠재 고객·채용 | 0원 |
| 인스타그램/스레드 | 회사 소개 첫 게시물 + 스토리 링크 | 소비자 인지도 | 0원 |
| 네이버 블로그/포스트 | 업종 관련 정보글 1편 + 페이지 링크 | 네이버 검색 유입 | 0원 |
| 지역 커뮤니티 | 업종 관련 카페/단톡방에 소개글 | 타겟 밀집 채널 | 0원 |
| 구글 비즈니스 프로필 | 회사 등록 + 홈페이지 URL 입력 | "회사명" 검색 시 우측 패널에 노출 | 0원 |

#### 첫 2주 액션 플랜

```
Week 1:
- Day 1: 구글 비즈니스 프로필 등록, 카카오 채널 개설
- Day 2-3: 링크드인 회사 페이지 + 대표자 프로필 업데이트
- Day 4-5: 인스타그램 첫 게시물 3개 업로드 (회사 소개, 서비스, 비하인드)
- Day 6-7: 지인 20명에게 개인 메시지로 페이지 오픈 알림

Week 2:
- 네이버 블로그 글 1편 발행
- 업종 관련 온라인 커뮤니티 1~2곳에 소개글
- 명함 QR 코드 인쇄 발주
- Google Analytics 데이터 첫 점검
```

---

### 바이럴 루프 설계

방문자가 자발적으로 페이지를 다른 사람에게 전달하도록 유도하는 구조입니다.

#### 루프 1 — 공유하기 쉬운 콘텐츠 ("유용한 정보형")

- 페이지 안에 **업종 관련 무료 정보** (체크리스트, 가이드, 계산기 등)를 1개 포함
- 방문자가 "이거 도움 됐어" 하고 지인에게 링크를 보내게 됨
- 예: "서비스 의뢰 전 확인 체크리스트 무료 PDF 다운로드"

```
방문자 도착 → 유용한 자료 발견 → 다운로드/저장 → 지인에게 공유 → 신규 방문자
```

#### 루프 2 — SNS 공유 버튼 ("간편 공유형")

- 페이지 하단 또는 CTA 영역에 **카카오 공유 / 링크 복사 버튼** 배치
- "마음에 드셨나요? 주변에 공유해 주세요" 문구와 함께
- 클릭 1번으로 카카오톡 메시지 완성되도록 미리 텍스트 세팅

#### 루프 3 — 후기/사례 공유 ("사회적 증거형")

- 고객 의뢰 완료 후 **간단한 후기 폼** 전송
- 후기 작성자에게 "후기가 페이지에 게재되었습니다" 알림 → 본인이 SNS에 자랑
- 게재된 후기 카드 이미지를 자동 생성해 공유 가능하게 만들기 (Canva 템플릿 활용)

#### 루프 4 — "만든 사람" 태그 ("크레딧형", 장기)

- 페이지 푸터에 "이 페이지는 [회사명]이 제작했습니다" 문구 + 링크
- 향후 제작 사업으로 확장 시 자연스러운 홍보

---

### 불확실성 지도

| 영역 | 불확실성 | 변경 조건 |
|---|---|---|
| 최적 채널 | 업종 모름으로 채널 우선순위 특정 불가 | B2B면 링크드인·구글 우선, B2C면 인스타·카카오 우선 |
| 바이럴 루프 효과 | 소규모 기업 특성상 루프가 돌 만큼 트래픽이 쌓이기까지 시간이 걸림 | 오프라인 네트워크(명함, 모임)와 병행하면 초기 속도 개선 |
| 무료 자료 제작 부담 | 유용한 콘텐츠를 만들 역량이 없으면 루프 1이 작동 안 함 | 단순 체크리스트 PDF 1장으로 시작 가능 |

---

## 4단계: 이터레이션 설계

전체 개발을 3단계로 나눠 순차적으로 진행합니다. 각 단계는 이전 단계가 검증된 후 시작합니다.

---

### 이터레이션 1 — 존재 증명 (MVP)

**목표**: "이 회사가 존재한다"는 것을 24시간 내에 온라인에서 확인할 수 있게 만들기

#### 입력
- 운영자가 직접 입력: 회사명, 한 줄 소개, 서비스 설명 1~3개, 연락처, 로고 또는 대표 이미지
- 외부 도구: Google Analytics 트래킹 코드, Formspree 폼 키

#### 처리
- 정적 HTML/CSS/JS로 구성 (서버 불필요)
- Formspree API를 통해 문의 폼 데이터를 운영자 이메일로 전달

#### 출력
- 단일 페이지(index.html)로 구성된 5~6개 섹션:
  1. 히어로 (회사명 + 한 줄 소개 + CTA 버튼)
  2. 서비스 소개 (카드 3개)
  3. 신뢰 요소 (숫자 지표 또는 고객사 로고)
  4. 대표 소개 (선택)
  5. 문의 폼
  6. 푸터 (연락처 + SNS 링크)

#### 행동
- 방문자: 문의 폼 제출
- 운영자: Formspree 이메일 수신 → 직접 답장

#### 검수

| 조건 | 기대 결과 |
|---|---|
| 모바일(375px)에서 접속 | 모든 섹션이 깨지지 않고 표시됨 |
| 문의 폼에 이름·이메일 입력 후 제출 | 운영자 이메일에 30분 내 도착 |
| 빈 폼 제출 시 | "필수 항목을 입력해 주세요" 안내 표시 |
| 회사명으로 구글 검색 | 페이지 또는 구글 비즈니스 프로필이 1페이지에 노출 (2~4주 후) |
| 페이지 로드 속도 | Lighthouse 성능 점수 80 이상 |

---

### 이터레이션 2 — 신뢰 구축

**목표**: 방문자가 "이 회사는 믿을 수 있다"는 판단을 내릴 근거를 페이지에서 찾게 만들기

#### 입력
- 운영자가 입력: 완료 프로젝트 사례 2~5개 (제목 + 설명 + 이미지), 고객 후기 2~3개
- 방문자 행동 데이터: Google Analytics + Clarity 히트맵 (1단계에서 수집된 것)

#### 처리
- 히트맵 데이터를 분석해 이탈 구간 파악 → 해당 섹션 개선
- 포트폴리오 항목은 JSON 파일 또는 Notion API로 관리 (코드 수정 없이 업데이트 가능)

#### 출력
- 신규 섹션 추가:
  - 포트폴리오/사례 갤러리 (필터 가능)
  - 고객 후기 슬라이더
  - FAQ 섹션 (1단계 Wizard of Oz에서 수집한 반복 질문 기반)
- 기존 섹션 개선:
  - 히어로에 구체적 수치 추가 ("누적 프로젝트 N건", "고객사 N곳" 등)

#### 행동
- 방문자: 포트폴리오 상세 보기, 후기 읽기, FAQ 확인 후 문의
- 운영자: Notion에서 사례·후기 업데이트

#### 검수

| 조건 | 기대 결과 |
|---|---|
| 포트폴리오 카드 클릭 | 상세 설명 모달 또는 서브 페이지로 이동 |
| FAQ 항목 클릭 | 아코디언 형식으로 답변 펼쳐짐 |
| Notion 사례 추가 후 페이지 새로고침 | 2초 내에 새 항목이 표시됨 |
| 방문자 체류 시간 | 1단계 대비 평균 30% 이상 증가 (Analytics 기준) |

---

### 이터레이션 3 — 전환 최적화

**목표**: 방문자 중 실제 문의로 이어지는 비율(전환율)을 높이고, 자동화로 운영 부담 낮추기

#### 입력
- 방문자 행동 데이터: 이탈률, 스크롤 깊이, CTA 클릭률 (2단계에서 수집)
- 운영자 설정: 자동 응답 이메일 텍스트, 카카오 채널 자동 응답 시나리오

#### 처리
- A/B 테스트: CTA 버튼 문구 2가지 비교 (예: "문의하기" vs "무료 상담 신청")
- 문의 폼 데이터 → Google Sheets 자동 저장 (Zapier 또는 Make.com 연동)
- 문의 접수 시 → 방문자에게 자동 감사 이메일 발송

#### 출력
- 개선 사항:
  - 상단 고정 CTA 바 ("지금 바로 상담하세요" + 버튼)
  - 이탈 의도 감지 팝업 (마우스가 브라우저 상단으로 이동 시)
  - 챗봇 또는 카카오 채널 플로팅 버튼
- 신규 자동화:
  - 문의 접수 자동 확인 이메일
  - Google Sheets 문의 대시보드

#### 행동
- 방문자: 여러 경로 중 하나로 문의 (폼, 카카오, 전화)
- 운영자: Google Sheets에서 문의 현황 한눈에 확인

#### 검수

| 조건 | 기대 결과 |
|---|---|
| 문의 폼 제출 | 방문자에게 자동 확인 이메일이 5분 내 도착 |
| Google Sheets 연동 | 폼 제출마다 시트에 새 행이 추가됨 |
| 모바일에서 카카오 버튼 클릭 | 카카오 채널 채팅창으로 이동 |
| A/B 테스트 30일 후 | 두 버튼의 클릭률 차이가 통계적으로 유의미하게 나타남 |
| 전환율 목표 | 전체 방문자 대비 문의 수 2단계 대비 50% 증가 |

---

## 5단계: MVP PRD

> 아래 PRD는 Cursor, Lovable 등 AI 코딩 에이전트에게 그대로 전달할 수 있도록 영어로 작성되었습니다.

```
# Product Requirements Document (PRD)
# Company Landing Page — MVP (Iteration 1)

---

## Overview

Build a single-page company landing page that establishes online presence,
communicates what the company does, and converts visitors into inquiries.
No backend required. Uses static HTML/CSS/JS + third-party services for
form handling and analytics.

Target: potential clients and partners who receive a business card or
hear about the company through word of mouth.

Primary CTA: Submit an inquiry form (name + email + message).

---

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript (no frameworks)
- Hosting: Netlify or GitHub Pages (free tier)
- Form handling: Formspree (https://formspree.io) — no backend needed
- Analytics: Google Analytics 4 (GA4) via gtag.js
- Fonts: Google Fonts (Noto Sans KR or similar)
- Icons: No external icon library; use Unicode or inline SVG

---

## Page Structure

The page is a single HTML file (index.html) with the following sections in order:

### 1. Header (Sticky)
- Company logo (text or image)
- Navigation links: Services, Portfolio, Contact
- CTA button: "Get a Free Quote" → scrolls to Contact section
- Mobile: hamburger menu with slide-down nav

### 2. Hero Section
- Headline: Company name + one-line value proposition (e.g., "We help X do Y")
- Sub-headline: One sentence expanding on the value proposition
- Primary CTA button: "Contact Us Now" → scrolls to Contact section
- Secondary CTA button: "See Our Work" → scrolls to Portfolio section
- Background: gradient or subtle pattern (no heavy images to keep load fast)

### 3. Services Section
- Section title: "What We Do"
- 3 service cards, each with:
  - Icon (Unicode emoji or inline SVG)
  - Service title
  - 2-sentence description
- Layout: 3-column on desktop, 1-column on mobile

### 4. Trust / Numbers Section
- 3–4 stat items (e.g., "50+ Projects Completed", "3 Years in Business")
- Animated count-up effect when section enters viewport (IntersectionObserver)

### 5. Contact Section
- Section title: "Let's Talk"
- Inquiry form fields:
  - Name (required)
  - Email (required, validate format)
  - Message (required, min 10 chars)
  - Submit button: "Send Message"
- Form submission: POST to Formspree endpoint
- Success state: Replace form with "Thank you! We'll be in touch within 24 hours."
- Error state: Show inline error messages per field
- Below form: alternate contact info (phone, email, KakaoTalk link)

### 6. Footer
- Company name + copyright year (auto-updated via JS)
- Social links: LinkedIn, Instagram, KakaoTalk Channel
- "Share this page" button: copies URL to clipboard with tooltip "Copied!"
- Kakao Share button: uses Kakao JavaScript SDK to share page to KakaoTalk

---

## Viral / Growth Features

### Share Button (Footer)
- "Copy Link" button: copies window.location.href to clipboard
  - Shows tooltip "링크가 복사되었습니다!" for 2 seconds
- Kakao Share button: opens KakaoTalk share dialog
  - Requires Kakao JavaScript SDK (load via CDN)
  - Preset share message: "[Company Name] — [Value Proposition] 👉 [URL]"

### Open Graph Meta Tags (for social sharing previews)
Include in <head>:
<xml>
  <meta property="og:title" content="[Company Name] — [Value Proposition]" />
  <meta property="og:description" content="[2-sentence company description]" />
  <meta property="og:image" content="[URL to 1200x630 preview image]" />
  <meta property="og:url" content="[page URL]" />
  <meta name="twitter:card" content="summary_large_image" />
</xml>

---

## Responsive Design Requirements

- Breakpoints: 320px (small mobile), 768px (tablet), 1200px (desktop)
- All sections must display without horizontal scroll on any viewport
- Touch targets (buttons, links) minimum 44x44px on mobile
- No fixed pixel font sizes; use clamp() or rem units
- Test at 375px (iPhone SE), 768px (iPad), 1440px (MacBook)

---

## Performance Requirements

- Lighthouse Performance score >= 80 on mobile
- No render-blocking resources (defer all JS)
- Images: use WebP format where possible, add width/height attributes
- Total page weight < 500KB (excluding fonts)

---

## Accessibility Requirements

- All images have alt attributes
- Form inputs have associated <label> elements
- Color contrast ratio >= 4.5:1 for body text
- Keyboard navigable (Tab order follows visual order)
- Skip-to-main-content link at the top

---

## Analytics Setup

Include GA4 tracking snippet in <head>.
Track these events:
- Page view (automatic)
- CTA button clicks: event name "cta_click", parameter "button_label"
- Form submission success: event name "form_submit"
- Kakao share click: event name "share_click", parameter "channel: kakao"
- Copy link click: event name "share_click", parameter "channel: copy_link"

---

## Content Placeholders

Use clearly marked placeholders so the owner can fill in real content:

<xml>
  <placeholder id="company_name">[회사명]</placeholder>
  <placeholder id="tagline">[한 줄 소개 문구]</placeholder>
  <placeholder id="service_1_title">[서비스 1 제목]</placeholder>
  <placeholder id="service_1_desc">[서비스 1 설명 2문장]</placeholder>
  <placeholder id="service_2_title">[서비스 2 제목]</placeholder>
  <placeholder id="service_2_desc">[서비스 2 설명 2문장]</placeholder>
  <placeholder id="service_3_title">[서비스 3 제목]</placeholder>
  <placeholder id="service_3_desc">[서비스 3 설명 2문장]</placeholder>
  <placeholder id="stat_1">[숫자 지표 1, 예: 50+ Projects]</placeholder>
  <placeholder id="stat_2">[숫자 지표 2]</placeholder>
  <placeholder id="stat_3">[숫자 지표 3]</placeholder>
  <placeholder id="formspree_endpoint">[Formspree form ID]</placeholder>
  <placeholder id="kakao_app_key">[Kakao JavaScript App Key]</placeholder>
  <placeholder id="phone">[전화번호]</placeholder>
  <placeholder id="email">[이메일]</placeholder>
</xml>

---

## File Structure

```
project/
├── index.html          # Single page (all sections)
├── style.css           # All styles
├── script.js           # Form handling, animations, share functions
├── og-image.png        # 1200x630 social preview image
└── README.md           # Setup instructions (Formspree key, GA4 ID, etc.)
```

---

## Test Specifications (Verification Checklist)

The following scenarios must pass before the page is considered complete:

### Layout Tests
- WHEN viewport is 375px wide THEN no horizontal scroll appears AND all text is readable
- WHEN viewport is 768px wide THEN services section shows 1-column layout
- WHEN viewport is 1440px wide THEN services section shows 3-column layout
- WHEN hamburger icon is tapped on mobile THEN nav menu slides down AND links are visible

### Form Tests
- WHEN form is submitted with all fields empty THEN each field shows an inline error message
- WHEN email field contains "notanemail" THEN field shows "유효한 이메일 주소를 입력해 주세요"
- WHEN form is submitted with valid data THEN form disappears AND success message appears
- WHEN Formspree submission succeeds THEN owner receives email within 30 minutes

### Interaction Tests
- WHEN "Copy Link" button is clicked THEN page URL is in clipboard AND tooltip shows for 2 seconds
- WHEN Kakao Share button is clicked THEN KakaoTalk share dialog opens with preset message
- WHEN CTA button is clicked THEN page smoothly scrolls to Contact section
- WHEN stat section enters viewport THEN numbers animate from 0 to target value

### Performance Tests
- WHEN page is loaded on a simulated 4G mobile connection THEN Lighthouse Performance score >= 80
- WHEN page source is inspected THEN no render-blocking scripts exist in <head>

---

## Future Work

### Iteration 2 — Trust Building

#### Input
- Operator manually adds: 2–5 completed project cases (title, description, image)
- Operator manually adds: 2–3 client testimonials (name, quote, optional photo)
- Data collected from Iteration 1: Google Analytics scroll depth, heatmap from Clarity

#### Processing
- Analyze heatmap data to identify drop-off sections and improve copy/layout
- Portfolio items stored in a JSON file (portfolio.json) — no code change needed to add new items
- JavaScript reads portfolio.json on page load and renders cards dynamically

#### Output
- New sections added to the page:
  - Portfolio gallery with filter by category (CSS-only filter tabs)
  - Testimonials slider (auto-rotating, pause on hover)
  - FAQ accordion (based on repeated questions from Iteration 1 Wizard of Oz)
- Updated hero section: add concrete numbers ("50+ Projects", "3 Years")

#### Action
- Visitor: Browse portfolio → read testimonials → check FAQ → submit inquiry
- Operator: Edit portfolio.json to add new projects without touching HTML

#### Verification
- WHEN portfolio.json has 4 items THEN 4 cards render without layout breakage
- WHEN FAQ item is clicked THEN answer expands with smooth animation AND other items collapse
- WHEN testimonials slider auto-rotates THEN no layout shift occurs
- WHEN average session duration is measured 4 weeks after launch THEN it is 30% higher than Iteration 1

---

### Iteration 3 — Conversion Optimization

#### Input
- Visitor behavior data from Iteration 2: bounce rate, scroll depth, CTA click rate
- Operator defines: auto-reply email template, KakaoTalk auto-response scripts
- A/B test configuration: two CTA button label variants

#### Processing
- Implement A/B test using a 50/50 random split (vanilla JS, no library needed)
  - Variant A: "문의하기" (Contact Us)
  - Variant B: "무료 상담 신청" (Book a Free Consultation)
  - Track clicks per variant via GA4 custom events
- Connect form submissions to Google Sheets via Zapier or Make.com webhook
- Trigger automated confirmation email via Formspree auto-reply feature

#### Output
- New UI elements:
  - Sticky top CTA bar: "지금 바로 상담하세요" + button (dismiss-able)
  - Exit-intent popup: triggers when mouse moves toward browser top bar on desktop
  - Floating KakaoTalk chat button (bottom-right)
- New automation:
  - Auto-reply email: sent to visitor within 5 minutes of form submission
  - Google Sheets dashboard: one row per inquiry with timestamp, name, email, message

#### Action
- Visitor: multiple contact pathways (form, KakaoTalk, phone)
- Operator: review inquiry dashboard in Google Sheets daily

#### Verification
- WHEN form is submitted THEN visitor receives auto-reply email within 5 minutes
- WHEN form is submitted THEN a new row appears in Google Sheets with correct data
- WHEN KakaoTalk button is clicked on mobile THEN KakaoTalk opens with channel pre-loaded
- WHEN exit-intent popup appears THEN it includes a dismiss (X) button that works
- WHEN A/B test runs for 30 days THEN GA4 report shows click rate difference between variants
- WHEN conversion rate is measured at end of Iteration 3 THEN it is 50% higher than Iteration 2
```

---

*문서 끝 — 마지막 업데이트: 2026-04-29*
