# Portfolio — 김도윤 (Kim Doyoon / Kevin Kim)

게임 클라이언트 프로그래머 · 테크니컬 PM 포트폴리오.

- **책 레이아웃** — `index.html`
- **문서 레이아웃** — `document.html`

두 페이지는 **완전히 같은 내용 파일**을 읽습니다. 문장을 한 번 고치면 양쪽에 동시에 반영됩니다.

## 구조

```
index.html            책 레이아웃 (셸만 있음)
document.html         문서 레이아웃 (한 페이지 스크롤)

assets/
  css/
    tokens.css        색·서체·테마 변수          — 모든 레이아웃 공용
    content.css       내용 자체의 스타일          — 모든 레이아웃 공용
    intro.css         진입 화면 (이미지 없음)
    book.css          책·페이지 넘김             — 책 전용
    document.css      스크롤 문서 프레임          — 문서 전용
  js/
    data/
      profile.js      이름 · 연락처 · 표지 문구
      pages.js        18쪽 전체 내용 (블록 데이터)
      qa.js           Q&A 응답기 지식베이스
    render.js         블록 → HTML + 게임 목록 집계 (레이아웃 무관)
    interactions.js   필터 · 상태머신 · 역량 미터 (레이아웃 무관)
    ask.js            Q&A 응답기 동작 (레이아웃 무관)
    intro.js          진입 화면 (레이아웃 무관, 어디든 mount 가능)
    book.js           책 레이아웃 엔진
    document.js       문서 레이아웃 엔진
  img/                프로필 · 프로젝트 스크린샷 · 자격증 · 아이콘
```

## 진입 화면

첫 화면(`intro.js`)에는 **사진이나 그림이 하나도 없습니다.** 대신 만든 게임
목록을 바로 보여줍니다 — 연도, 제목, 장르, 엔진, 맡은 역할, 성과. 게임 이름을
누르면 책이 그 프로젝트 쪽에서 열립니다.

목록과 상단 집계(팀 8건 / 개인 19건 / PD 5회 / 파트장 3회)는 전부
`pages.js`에서 계산됩니다. 프로젝트를 추가하면 진입 화면에도 자동으로 나타납니다.

```js
PORTFOLIO.render.games();   // 게임 목록 (연도·장르·엔진·역할·수상)
PORTFOLIO.render.tally();   // 건수 집계
PORTFOLIO.intro.mount(el, { onEnter: id => open(id) });
```

빌드 도구도 서버도 필요 없습니다. 일반 `<script>` 태그만 쓰기 때문에 파일을
그냥 열어도(`file://`) 동작하고, GitHub Pages에도 그대로 올라갑니다.

## 내용 고치기

| 고치고 싶은 것 | 파일 |
| --- | --- |
| 이름, 연락처, 표지 문구 | `assets/js/data/profile.js` |
| 각 쪽의 문장, 프로젝트 설명, 역량 수치 | `assets/js/data/pages.js` |
| 진입 화면의 게임 장르 라벨 | `pages.js` 의 `phead.genre` |
| Q&A 응답기가 답하는 내용 | `assets/js/data/qa.js` |
| 이미지 | `assets/img/` 에 넣고 `pages.js`에서 경로만 지정 |

`pages.js`의 한 쪽은 **블록의 목록**입니다.

```js
{
  id: "pr-mimami",
  label: "팀 프로젝트",
  title: "미마미",
  chapter: "팀 프로젝트",
  blocks: [
    { t: "phead", genre: "스타일리쉬 액션", tags: [...], title: "미마미",
      context: ["학기작 프로젝트", "스타일리쉬 액션"],
      period: "2024.08 — 2024.12", duration: "15주", lead: "..." },
    { t: "shot",  src: "assets/img/project/mimami.jpg", alt: "미마미 스크린샷" },
    { t: "links", variant: "shot", items: [{ href: "...", icon: "▶", text: "플레이 영상 보기", external: true }] },
    { t: "blk",   h: "개요", body: [{ k: "list", items: ["..."] }] }
  ]
}
```

쓸 수 있는 블록 종류: `cover` `h` `h3` `sub` `endmark` `toc` `hire` `ledger`
`fsm` `phead` `shot` `links` `blk` `vibe` `decs` `filters` `cards` `skills`
`certs` `ask` `contact` `credit` `raw`. 각 블록이 어떤 HTML이 되는지는
`assets/js/render.js` 한 곳에만 있습니다.

**목차, 상단 챕터 메뉴, 쪽 번호, `01 / 08` 같은 챕터 내 순번은 전부
`pages.js`에서 자동 계산**됩니다. 쪽을 추가·삭제·재배치하면 알아서 맞춰집니다.

## 레이아웃 추가하기

새 레이아웃은 내용 파일 4개를 그대로 불러온 뒤, 원하는 방식으로 감싸기만 하면 됩니다.

```html
<link rel="stylesheet" href="assets/css/tokens.css">
<link rel="stylesheet" href="assets/css/content.css">
<link rel="stylesheet" href="assets/css/my-layout.css">
...
<script src="assets/js/data/profile.js"></script>
<script src="assets/js/data/pages.js"></script>
<script src="assets/js/data/qa.js"></script>
<script src="assets/js/render.js"></script>
<script src="assets/js/interactions.js"></script>
<script src="assets/js/ask.js"></script>
```

```js
// 한 쪽 전체를 HTML로 (머리말·꼬리말 포함 여부 선택 가능)
PORTFOLIO.render.page(page, { head: true, foot: false });

// 내용 블록만
PORTFOLIO.render.blocks(page.blocks);

// 자동 계산된 챕터 목록 / 목차 / 쪽 정보
PORTFOLIO.render.nav();
PORTFOLIO.render.tocGroups();
PORTFOLIO.render.deck();

// 필터·상태머신 동작 연결 (goto는 레이아웃이 정의)
PORTFOLIO.interactions.bind({ goto: id => scrollToSection(id) });

// Q&A 블록이 있으면 붙이기
PORTFOLIO.ask.mount(container);
```

`document.js`가 실제 예시입니다 — 레이아웃 코드는 약 40줄입니다.
