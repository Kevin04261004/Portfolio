# 김도윤 · 개발PM | 버그 콜렉터

A1 채용 브리핑 시안을 반영한 정적 포트폴리오. GitHub Pages에서 빌드 없이 제공합니다.

- `index.html`: 대표작 3개, 펼치는 사례 설명, 작업 기록 요약, 소개·연락처
- `archive.html`: 기존 프로젝트 29개, 이름·기술 검색과 분류 필터
- `document.html`: 기존 문서 링크를 새 메인으로 연결
- `assets/css/portfolio.css`: 데스크톱·모바일·인쇄 스타일
- `assets/js/portfolio.js`: YouTube 영상 창, 썸네일 대체 처리, 검색, 인쇄
- `assets/img/brand/bug-collector.png`: 기존 버콜 캐릭터의 배경을 정리한 이미지
- `assets/img/brand/bug-collector.webp`: 위 이미지와 픽셀이 같은 무손실 WebP. 메인 화면에서 먼저 쓰고, 미지원 브라우저·공유 미리보기는 PNG를 씁니다.

## 실행과 배포

`python -m http.server 8765`로 로컬에서 확인합니다. main 브랜치의 루트 폴더를 GitHub Pages 게시 원본으로 사용합니다. 별도 서버나 API 키는 필요 없습니다.

프로젝트 썸네일은 연결된 YouTube 영상의 `maxresdefault.jpg`를 사용합니다. 없는 경우 `hqdefault.jpg`, `mqdefault.jpg`, 기존 프로젝트 이미지 순으로 시도합니다. 모두 실패해도 영상 링크와 제목은 남습니다. JavaScript 없이도 영상 링크와 사례 상세를 사용할 수 있습니다.

썸네일 클릭 시 개인정보 보호 강화 도메인 `youtube-nocookie.com`의 영상 창이 열립니다. 닫기·Escape로 재생을 중지하며 YouTube 직접 링크도 제공합니다. 미마미 영상은 기존 링크의 329초 시작 위치를 유지합니다.

## 내용 기준

대표작 순서: 러브 메모리 → 미마미 → 빛을 향해서. 상세는 문제·내 결정·결과와 구현 범위로 요약했습니다.

미마미 작업 기록은 2024-10-19 본인 작성 「중간시연 이후 TODO」 및 「16팀 개발일정」의 본인 업무를 발췌 요약했습니다. 일정 양식을 팀 PM이 작성한 사실과 본인 기여를 구분합니다. 동료 실명·개별 평가 원문은 게시하지 않습니다. 확인되지 않은 정량 효과는 추가하지 않았습니다.

취업 우선·졸업 목표를 반영하되 입사 및 학업 일정은 협의 대상으로 표기합니다. 기술 자기등급, 중복 회고, 혼동되는 기간 및 검증 조건 없는 수치 주장은 메인에서 제외했습니다.

캐릭터: 내장 이미지 편집 기능으로 기존 캐릭터의 외형·포즈를 보존하고 체크무늬 배경만 제거했습니다. 편집 지시: “Preserve exact character identity, black hood, pointing hand, lime accents and sticker outline. Remove checkerboard; transparent background; no redesign.”

## 대표 사례 상세

첫 화면의 분량을 유지하면서 세부 판단·구현 범위를 별도 페이지에서 제공합니다.

- `case-love-memory.html`: 제품 방향, 달력·공유·개인화 구현, 출시 과정
- `case-pr-mimami.html`: 역할 구분, 실제 TODO와 일정표의 본인 작업, 기술 판단·회고
- `case-pr-jam.html`: MVP 범위, 3+2일 개발 흐름, 분담과 직접 구현, 수상 근거

미마미의 10월 19일 회의 기록을 PD 인수일로 혼동하지 않습니다. 회고로 재구성한 개발 흐름과 실제 당시 자료를 구분하고, 확인되지 않은 피드백 효과·성과 수치를 추가하지 않습니다.
