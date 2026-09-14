/* ============================================================
   WHAT — the portfolio itself, as data.

   Every page is a list of blocks; assets/js/render.js turns a block
   into HTML. No block knows anything about books, page turns, or
   scroll containers, so the same sentences render unchanged in any
   layout. Chapter grouping, the table of contents, the top nav, the
   "NN / NN" indices and the game index on the entry screen are all
   derived from this array -- add a page here and they update on
   their own.
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

PORTFOLIO.pages = [
  {
    id: "cover",
    label: "표지",
    title: "표지",
    blocks: [
      {"t":"cover"}
    ]
  },
  {
    id: "toc",
    label: "목차",
    title: "목차",
    chapter: "목차",
    blocks: [
      {"t":"h","text":"목차"},
      {"t":"sub","html":"총 {{count}}쪽. 항목을 누르면 해당 쪽으로 바로 넘어갑니다. 마우스로 <b>좌우 드래그</b>하거나 방향키로도 넘길 수 있습니다."},
      {"t":"toc"}
    ]
  },
  {
    id: "history",
    label: "이력",
    title: "이력 · 채용 정보",
    chapter: "소개",
    blocks: [
      {"t":"h","text":"이력 · 채용 정보"},
      {"t":"sub","html":"학력, 자격, 활동 이력과 함께 채용에 필요한 조건을 한 장에 정리했습니다."},
      {
        "t": "hire",
        "cells": [
          {"k":"희망 직무","v":"개발PM","note":"개발을 놓지 않는 PM · PD"},
          {"k":"입사 가능 시기","v":"2027.01 ~","note":"2026.11.25 만기 전역 예정"},
          {"k":"희망 근무지","v":"판교","note":"경기도권 · 대구 중구 / 수성구"},
          {"k":"주 무기","v":"기술 판단 + 일정 관리","note":"Unreal · Unity 양쪽 개발 경험"}
        ]
      },
      {
        "t": "ledger",
        "cols": [
          {"title":"일대기 / 학력","rows":[{"d":"2006.04","v":"출생"},{"d":"2018.04","v":"중국 만방국제학교 입학"},{"d":"2021.03","v":"중국 만방국제학교 자퇴 (코로나)"},{"d":"2021.06","v":"초등학교 검정고시 졸업"},{"d":"2021.12","v":"중학교 검정고시 졸업"},{"d":"2022.06","v":"고등학교 검정고시 졸업"},{"d":"2023.03","v":"청강문화산업대학교 입학 (게임 전공)"},{"d":"2026.11","v":"육군 전투지휘훈련단 당번병 병장 만기 전역 예정 (11.25)"},{"d":"2027.03","v":"3학년 졸업학년 복학 희망"}]},
          {"title":"자격 / 수상","rows":[{"d":"2022.07","v":"HSK 5급 취득"},{"d":"2024.08","v":"청강대 X 유니티 게임잼 우수상 (08.07 수여)"},{"d":"2024.09","v":"정보처리기능사 취득 (09.25 합격)"}]},
          {"title":"활동 / 협업","rows":[{"d":"2023.08","v":"청강문화산업대학교 한얼 동아리 운영진"},{"d":"2024.03","v":"청강문화산업대학교 한얼 동아리 스터디장"},{"d":"2023—24","v":"팀 프로젝트 8건 참여 — PD 5회, TD 5회 <span style=\"color:var(--dim)\">(학기 · 동아리 프로젝트 내 역할)</span>"},{"d":"현재","v":"군 복무로 휴학 중 · 러브 메모리 구글 플레이 출시 · AFK Meteor 개발 중"}]}
        ]
      },
      {
        "t": "sub",
        "html": "※ 2021년, 중국 만방국제학교에서 유학하던 중 <b>코로나가 발발해 한국으로 돌아왔습니다.</b> 국내 정규 과정에 다시 편입하는 것보다 대학에 빠르게 진학하는 편이 낫다고 판단해 검정고시를 택했고, 초·중·고 과정을 차례로 통과한 뒤 2023년에 입학했습니다.",
        "variant": "note"
      }
    ]
  },
  {
    id: "career",
    label: "커리어",
    title: "커리어 상태머신",
    chapter: "소개",
    blocks: [
      {"t":"h","text":"커리어 상태머신"},
      {"t":"sub","html":"프로그래머로 시작해 <b>PD로 두 번 팀을 넘겨받기까지</b>의 전이 기록입니다. 각 노드를 누르면 해당 프로젝트로 이동합니다."},
      {
        "t": "fsm",
        "title": "CareerStateMachine",
        "sub": "· transition graph",
        "read": "STATE ▸ SHIP",
        "nodes": [
          {"goto":"pr-welcome","state":"ENTRY","step":"S0","date":"2023.03","desc":"기획자 없는 첫 게임잼에서 프로그래머로 시작해, 기획과 UI까지 직접 맡으며 개발에 입문"},
          {"goto":"pr-horror","state":"SCALE","step":"S1","date":"2023.05—08","desc":"PD·TD로 역할 확장. 생성형 AI 파이프라인, A* AI, 멀티 엔딩 구조 구현"},
          {"goto":"pr-bunny","state":"DROP","step":"S2","date":"2024.05","desc":"8개월 장기 프로젝트 중단. 4인 공동 팀장 체제의 의사결정 실패를 정면으로 분석","drop":true},
          {"goto":"pr-bunny","state":"REBUILD","step":"S3","date":"2024.06","desc":"개발을 잠시 멈추고 리더십의 본질과 시스템 설계를 전공 심화로 재학습"},
          {"goto":"pr-mimami","state":"SHIP","step":"S4","date":"2024.07—12","desc":"게임잼 우수상 수상, 학기작에서 PD 직책을 이어받아 팀을 완주로 견인"}
        ],
        "foot": "▸ 목표 상태 — 개발PM"
      }
    ]
  },
  {
    id: "pr-mimami",
    label: "팀 프로젝트",
    title: "미마미",
    chapter: "팀 프로젝트",
    blocks: [
      {
        "t": "phead",
        "genre": "스타일리쉬 액션",
        "highlight": 329,
        "tags": [
          {"text":"PD","kind":"role"},
          {"text":"TD","kind":"role"},
          {"text":"프로그래머","kind":"role"},
          {"text":"Unreal Engine 5.4 / PC"},
          {"text":"A+","kind":"win"}
        ],
        "title": "미마미",
        "lead": "보스전 중심의 스타일리쉬 액션. <b>16인 팀</b>의 프로그래머로 들어갔다가, 개발 기간 4분의 1을 남기고 <b>PD를 이어받아</b> 빌드를 냈습니다.",
        "context": ["학기작 프로젝트","스타일리쉬 액션"],
        "period": "2024.08 — 2024.12",
        "duration": "15주"
      },
      {"t":"shot","src":"assets/img/project/mimami.jpg","alt":"미마미 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=m4Nka0iVqvw&t=329s","external":true,"icon":"▶","text":"플레이 영상 보기"},
          {"href":"https://github.com/Kevin04261004/2-2_Team16","external":true,"icon":"❯","text":"코드 보기","ghost":true}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "개요",
        "body": [
          {"k":"list","items":["<b>규모</b> — 16인 / 15주 / Unreal Engine 5.4","<b>역할</b> — 프로그래머 · TD로 시작해 후반부 PD 겸임","<b>결과</b> — 기간 내 빌드 완주, 교과목 <b>A+</b>"]}
        ]
      },
      {
        "t": "blk",
        "h": "PM으로 한 일",
        "body": [
          {"k":"h5","text":"멈춘 팀의 PD를 이어받음"},
          {"k":"p","html":"중간 평가 이후 PD 역할이 비면서 진행이 크게 지연됐습니다. 애니메이터 작업량까지 겹쳐 사기가 떨어진 상태에서 직책을 맡았고, 기간이 4분의 1밖에 남지 않은 시점에 <b>개인별 TODO를 직접 작성</b>해 일정을 재정비했습니다. 그 뒤에야 튜토리얼과 추가 몬스터 개발이 진행됐습니다."},
          {"k":"h5","text":"기획 지연을 선행 개발로 흡수"},
          {"k":"p","html":"시스템 기획서가 늦어지자 PM과 구두로 합의하고 개발을 먼저 들어가 병목을 풀었습니다. 동시에 기술적 한계를 명확히 공유해 <b>기능 범위를 실현 가능한 선으로 줄이는 결정</b>을 주도했습니다."},
          {"k":"h5","text":"팀에 남을 규칙을 만듦"},
          {"k":"list","items":["UML로 클래스 구조를 먼저 잡아 팀 가이드라인 제시. Fork 기반 Git 가이드와 아트 리소스 네이밍 규칙 수립","Blueprint 가이드를 만들어 <b>비프로그래머 기획자 2인이 직접 시스템을 제작</b>","Doxygen 문서 자동화와 주기적 빌드 업로드로 진척도 확인과 QA를 병행"]},
          {"k":"h5","text":"작업 방식 갈등 조율"},
          {"k":"p","html":"애니메이터와 ‘완성도냐 느낌 전달이냐’로 부딪혔을 때, 과거 리깅 수정 경험을 근거로 리스크를 설명해 합의점을 찾았습니다."}
        ]
      },
      {
        "t": "blk",
        "h": "직접 만든 것",
        "body": [
          {"k":"list","items":["<b>액션 시스템</b> — 입력·공격·상태·애니메이션 구조 설계와 콤보 구현, 이후 FSM으로 리팩터링해 모듈화","<b>타격감 R&amp;D</b> — <b>젠레스 존 제로</b>를 레퍼런스로 HitStop, Camera Shake·Zoom, Blur, SpeedLine 등 10종 이상 구현. 결론은 <b>절제</b>였습니다. 과하지 않은 HitStop과 Camera Shake가 체감의 대부분이었습니다.","<b>카툰 렌더링</b> — Toon Shader와 아웃라인 머티리얼 R&amp;D 후 제작","<b>커스터마이징 툴</b> — 기획자가 코드 수정 없이 스킬 수치를 관리하도록 매니저 모듈화","<b>콘텐츠</b> — 튜토리얼, 스테이지 로직, 보스 2페이즈 전환 시퀀스, 만화 컷씬"]}
        ]
      },
      {
        "t": "blk",
        "h": "기술적 판단 두 가지",
        "body": [
          {"k":"h5","text":"40fps → 60fps"},
          {"k":"p","html":"시연 PC에서 목표 프레임이 나오지 않았습니다. <b>내장 프로파일러로 끊기는 구간을 먼저 특정</b>하고 원인을 아트 리소스와 연산 부하로 나눠, 아트 쪽은 파트장과 조율했습니다. 가장 무거운 건 <b>거울 재질 건물의 Planar Reflection</b>이었습니다. 씬을 한 번 더 그리는 방식이라 비용이 컸고, 이를 끄고 머티리얼을 단순화해 <b>60fps 안정권</b>으로 올렸습니다. 반사 품질보다 시연에서의 안정성이 우선이라고 판단했습니다."},
          {"k":"h5","text":"Memory Leak"},
          {"k":"p","html":"특정 행동 약 10초 뒤 항상 강제 종료되는 이슈였습니다. 빌드를 직접 플레이하며 재현 조건을 좁혔고, 원인은 <b>UPROPERTY() 누락</b>으로 언리얼 GC가 사용 중인 메모리를 회수한 것이었습니다."}
        ]
      },
      {
        "t": "blk",
        "h": "배운 점",
        "body": [
          {"k":"p","html":"<b>결정권자가 일정을 만든다</b> — 같은 인원과 같은 코드인데도 결정하는 사람이 생기자 진행이 다시 붙었습니다. 내 작업을 잘하는 것과 팀을 굴리는 것은 다른 일이었습니다."},
          {"k":"p","html":"<b>모르는 기술은 범위로 막는다</b> — 언리얼은 처음이었습니다. R&amp;D가 되지 않은 파트는 과감히 배제하며 볼륨을 통제했고, 그래서 15주 안에 들어왔습니다. 마지막에는 포스트모템 문서를 만들어 팀이 스스로를 돌아보게 했습니다."}
        ]
      }
    ]
  },
  {
    id: "pr-jam",
    label: "팀 프로젝트",
    title: "빛을 향해서",
    chapter: "팀 프로젝트",
    blocks: [
      {
        "t": "phead",
        "genre": "2D 퍼즐",
        "tags": [
          {"text":"PD","kind":"role"},
          {"text":"TD","kind":"role"},
          {"text":"프로그래머","kind":"role"},
          {"text":"Unity / Live2D SDK"},
          {"text":"우수상","kind":"win"}
        ],
        "title": "빛을 향해서",
        "lead": "‘변신’을 주제로 한 2D 퍼즐. <b>3인 5일</b>로 12개 팀 중 우수상을 받았습니다. 기능을 더하는 대신 <b>3일 만에 MVP를 끝내고 2일을 폴리싱에 쓴</b> 판단이 결과를 갈랐습니다.",
        "context": ["청강대 X 유니티 게임잼","5일 대면"],
        "period": "2024.07.15 — 2024.07.21",
        "duration": "5일"
      },
      {"t":"shot","src":"assets/img/project/jam.jpg","alt":"빛을 향해서 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=gHCZj0rF1ME","external":true,"icon":"▶","text":"플레이 영상 보기"},
          {"href":"https://github.com/Kevin04261004/UnityGameJam","external":true,"icon":"❯","text":"코드 보기","ghost":true}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "개요",
        "body": [
          {"k":"list","items":["<b>규모</b> — 프로그래머 2 · 아트 1 / 5일 대면 게임잼","<b>역할</b> — PD 겸 프로그래머","<b>결과</b> — 12개 팀 중 우수상"]}
        ]
      },
      {
        "t": "blk",
        "h": "PM으로 한 일",
        "body": [
          {"k":"h5","text":"5일을 3+2로 쪼갬"},
          {"k":"p","html":"다 만들 수 없다는 게 이틀째에 분명했습니다. 핵심인 변신 시스템과 기초 스테이지만 <b>3일 안에 끝내는 MVP</b>로 전환하고, 남은 2일은 새 기능 대신 <b>폴리싱에만</b> 썼습니다. 이펙트, 카메라 워킹, Live2D 연동, 사운드 연출에 시간을 넣었고 그 판단이 수상으로 이어졌습니다."},
          {"k":"h5","text":"업무를 원자 단위로 분배"},
          {"k":"p","html":"한 명만 막혀도 전체가 무너지는 구성이었습니다. 아트는 변신 애니메이션과 배경에 집중시키고, 프로그래머는 ‘시스템 구현’과 ‘스테이지·기믹’으로 파트를 갈라 작업 충돌을 없앴습니다."},
          {"k":"h5","text":"주제를 메커닉으로 번역"},
          {"k":"p","html":"외형만 바뀌는 변신은 흔했습니다. <b>상황에 따른 능력의 변화</b>로 재해석해, 검사로 변신해 장애물을 돌파하거나 악사로 변신해 음악 기믹을 푸는 식으로 게임 규칙과 묶었습니다. 브레인스토밍 시간은 충분히 두되 결정은 빠르게 내렸습니다."}
        ]
      },
      {
        "t": "blk",
        "h": "직접 만든 것",
        "body": [
          {"k":"list","items":["<b>변신 시스템</b> — 스탯·스킬셋·애니메이션 컨트롤러를 실시간으로 교체. 형태별 고유 액션이 충돌하지 않도록 상태 머신 구조를 유연하게 설계했습니다.","<b>Live2D 연동</b> — 유니티에서 SDK를 붙여 리소스를 최적화된 상태로 제어하고, 툴의 IK 제약과 스크립트를 연결해 시선이 마우스를 따라가는 Procedural Look-At을 구현했습니다."]}
        ]
      },
      {
        "t": "blk",
        "h": "배운 점",
        "body": [
          {"k":"quote","text":"“마음이 맞으면 불가능은 없다”"},
          {"k":"p","html":"인원이 많았던 프로젝트보다, 방향이 같은 소수가 훨씬 빨랐습니다. 그리고 한정된 시간에서는 팀원 의견을 수용하는 것만큼 <b>빠르게 결단하는 추진력</b>이 성패를 갈랐습니다."},
          {"k":"p","html":"<b>기능 수보다 완성도</b> — 하나를 넣더라도 버그 없이 매끄럽게 돌아가고 보기 좋은 쪽이 훨씬 강했습니다. 남은 기간을 퀄리티에 쏟은 판단이 좋은 평가로 돌아왔습니다."}
        ]
      }
    ]
  },
  {
    id: "pr-bunny",
    label: "팀 프로젝트",
    title: "버니 프로젝트 (Apocalypse)",
    chapter: "팀 프로젝트",
    blocks: [
      {
        "t": "phead",
        "genre": "3D 액션",
        "tags": [
          {"text":"TD","kind":"role"},
          {"text":"Unity 2022 LTS / FMOD"},
          {"text":"드랍","kind":"drop"}
        ],
        "title": "버니 프로젝트 (Apocalypse)",
        "lead": "<b>20인 팀</b>이 BIC 출품을 목표로 8개월간 진행하다 멈춘 프로젝트. 제가 <b>개발PM을 하려는 이유</b>가 여기 있습니다. 무너진 원인이 기술이 아니라 결정 구조였습니다.",
        "context": ["3D 액션 게임","8개월 장기 팀 프로젝트"],
        "period": "2023.12 — 2024.05",
        "duration": "8개월"
      },
      {"t":"shot","src":"assets/img/project/bunny.jpg","alt":"버니 프로젝트 (Apocalypse) 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=OkbLJylW4Js","external":true,"icon":"▶","text":"플레이 영상 보기"}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "개요",
        "body": [
          {"k":"list","items":["<b>규모</b> — 20인 / 8개월 / Unity 2022 LTS","<b>역할</b> — TD (Technical Director)","<b>목표</b> — 확장 가능한 아키텍처 설계와 BIC 출품","<b>결과</b> — 출품 전 개발 중단"]}
        ]
      },
      {
        "t": "blk",
        "h": "왜 멈췄는가",
        "body": [
          {"k":"h5","text":"최종 결정권자가 없었다 (4인 공동 팀장 체제)"},
          {"k":"p","html":"저를 포함한 팀장 4명(AD·TD·PD·팀장)이 합의하는 구조였습니다. 3명이 반대하면 합리적인 의견도 반영되지 않았고, 위기 상황에서 <b>빠른 대처가 구조적으로 불가능</b>했습니다."},
          {"k":"h5","text":"드러난 리스크를 방치했다"},
          {"k":"p","html":"핵심 파트인 UI에서 지연과 퀄리티 이슈가 반복됐습니다. 전체 일정에 치명적이라 판단해 리소스 재배치를 제안했지만, ‘대안 부재’와 ‘팀워크 유지’를 우선한 판단으로 무산됐습니다. 그 병목이 결국 팀 전체의 사기 저하와 동력 상실로 이어졌습니다."},
          {"k":"h5","text":"옳았지만 설득하지 못했다"},
          {"k":"p","html":"돌아봐도 제 판단이 맞았다고 생각합니다. 그러나 <b>설득하지 못한 의견은 실행되지 않습니다.</b> 감정적 호소로 말한 것이 문제였습니다. 지금은 일정표와 리스크 지표로 말합니다."}
        ]
      },
      {
        "t": "blk",
        "h": "그동안 한 일",
        "body": [
          {"k":"list","items":["<b>플레이어 FSM 설계</b> — 상속 남용에 따른 클래스 폭발을 막으려, 선배 피드백을 받아 PlayerSkillState를 기본으로 두고 세부 동작은 Enum으로 나누는 <b>하이브리드 구조</b>로 재설계했습니다. 실행 방식별 공통 로직을 묶어 전이 조건문을 단순화했습니다.","<b>사운드 시스템</b> — Blend Tree에서 걷기·달리기 이벤트가 겹쳐 발자국 소리가 중복되던 이슈를 GetMovementState(speed)로 해결했습니다. FMOD는 가비지를 줄이려 스크립트 기반 이벤트 트리거로 적용했습니다.","<b>재미 검증</b> — FPS·망치 액션·TPS 땅따먹기 3종을 프로토타입으로 만들어 반복 테스트 후 망치 액션을 채택했습니다.","<b>협업 문서</b> — 비개발자용 Git 파이프라인 가이드와 프리팹 관리 프로세스를 만들고, 착수 전 ‘기획 설문지’로 데이터 최소 조건을 확정해 재작업을 줄였습니다.","<b>거버넌스 제안</b> — 임원진 회의를 주도해 각 파트장에게 최종 결정권을 부여하는 체계를 제안했습니다."]}
        ]
      },
      {
        "t": "blk",
        "h": "그래서 바뀐 것",
        "body": [
          {"k":"h5","text":"1. 멈추고 다시 배웠다"},
          {"k":"p","html":"기술보다 <b>팀을 유지하는 구조</b>가 프로젝트를 끝낸다는 걸 절감했습니다. 한동안 개발을 멈추고 리더십과 시스템 설계를 전공 심화로 다시 공부했습니다. 이때 <b>“빠른 실패와 빠른 피드백”</b>을 신조로 삼았습니다."},
          {"k":"h5","text":"2. 해결사로 복귀했다"},
          {"k":"p","html":"반년 뒤 게임잼과 학기작으로 돌아왔습니다. 리스크가 보이면 주저 없이 PD를 맡았고, 두 프로젝트를 모두 완주시켰습니다. 과거의 실패가 백신이 됐습니다."},
          {"k":"h5","text":"3. 지금의 목표"},
          {"k":"p","html":"이 프로젝트가 제 직무를 정했습니다. 저는 <b>개발PM</b>으로 일하려 합니다. 코드를 읽고 기술적 한계를 직접 판단하면서 일정과 파트 간 조율을 함께 책임지는 자리입니다."}
        ]
      }
    ]
  },
  {
    id: "pr-dirty",
    label: "팀 프로젝트",
    title: "Dirty Guilty",
    chapter: "팀 프로젝트",
    blocks: [
      {
        "t": "phead",
        "genre": "도트 어드벤처",
        "highlight": 110,
        "tags": [
          {"text":"TD","kind":"role"},
          {"text":"Unity 2021 LTS / PC"}
        ],
        "title": "Dirty Guilty",
        "lead": "<b>11인 팀</b>의 TD. A* 추격 AI와 멀티 엔딩 구조를 만들었고, 동시에 <b>스코핑을 처음으로 크게 틀린</b> 프로젝트입니다.",
        "context": ["동아리 프로젝트","루프물 기반 다중 엔딩 도트 어드벤처"],
        "period": "2023.07 — 2023.08",
        "duration": "6주"
      },
      {"t":"shot","src":"assets/img/project/dirty.jpg","alt":"Dirty Guilty 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=yHMLPyDOVHo&t=110s","external":true,"icon":"▶","text":"플레이 영상 보기"},
          {"href":"https://github.com/Kevin04261004/HanEarl_Project","external":true,"icon":"❯","text":"코드 보기","ghost":true}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "만든 것",
        "body": [
          {"k":"list","items":["<b>A* 추격 AI</b> — 알고리즘을 직접 구현해 장애물을 피해 플레이어를 쫓는 몬스터를 만들었습니다. 단순 이동 패턴과 달리 어드벤처 특유의 심리적 압박을 만들어냈습니다.","<b>분기와 멀티 엔딩</b> — 선택에 따라 시나리오가 갈리는 분기점 시스템과 그 위의 엔딩 구조를 설계했습니다.","<b>인벤토리·상호작용</b> — 아이템 수집과 조사, 맵 오브젝트와의 상호작용 로직.","<b>연출</b> — 시네마신과 분위기용 쉐이더 효과."]}
        ]
      },
      {
        "t": "blk",
        "h": "배운 점 — 스코핑",
        "body": [
          {"k":"p","html":"인원수에 맞춘 기획이라 생각했지만 실제 볼륨이 훨씬 컸습니다. 일정과 리소스 배분이 내내 빡빡했습니다. 원인은 <b>팀원 개개인의 실제 작업 속도를 모른 채 계획을 세운 것</b>이었습니다.<br/>이후로는 착수 전에 각자의 역량과 속도를 먼저 파악하고 계획을 세웁니다. 실현 가능한 기획을 세우고 기술적 병목을 미리 예측하는 습관이 여기서 시작됐습니다."}
        ]
      }
    ]
  },
  {
    id: "pr-horror",
    label: "팀 프로젝트",
    title: "레이튼 모텔의 비밀",
    chapter: "팀 프로젝트",
    blocks: [
      {
        "t": "phead",
        "genre": "1인칭 심리 호러",
        "highlight": 8,
        "tags": [
          {"text":"PD","kind":"role"},
          {"text":"프로그래머","kind":"role"},
          {"text":"Unity 2021 LTS / PC"},
          {"text":"A+ · 교내 데모데이","kind":"win"}
        ],
        "title": "레이튼 모텔의 비밀",
        "lead": "CCTV 감시와 규칙 기반 플레이를 엮은 루프 구조. 동시에 리더로서 <b>‘열정의 강요’</b>를 배운 프로젝트입니다.",
        "context": ["1인칭 3D 심리 호러","퍼즐"],
        "period": "2023.05 — 2023.06",
        "duration": "5주"
      },
      {"t":"shot","src":"assets/img/project/horror.jpg","alt":"레이튼 모텔의 비밀 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=YPM-Mq_N6Gc&t=8s","external":true,"icon":"▶","text":"플레이 영상 보기"},
          {"href":"https://github.com/Kevin04261004/SingleGame","external":true,"icon":"❯","text":"코드 보기","ghost":true}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "만든 것",
        "body": [
          {"k":"list","items":["<b>CCTV 감시 루프</b> — 관제실에서 모텔 내부를 감시하다 이상 현상(문 열림, 피 흐름)을 발견하면 직접 해결하러 가는 구조를 설계했습니다.","<b>규칙 기반 플레이</b> — ‘규칙서’를 기준으로 올바른 대응(대화 선택지, 오브젝트 조작)을 유도하는 복합 상호작용 시스템.","<b>UI</b> — UI를 직접 만들고 옵저버 패턴 기반 UI 매니저를 구현했습니다.","<b>성과</b> — 교과목 A+, 교내 데모데이 진출 및 발표."]}
        ]
      },
      {
        "t": "blk",
        "h": "리더로서 배운 것",
        "body": [
          {"k":"quote","text":"“200%의 열정이 100%의 강요가 되지 않도록”"},
          {"k":"p","html":"완성도를 높이려 몰입하다 기획자와 애니메이터에게 <b>제 기준에 맞춘 업무를 분배</b>했고, 팀 피로도가 급증했습니다. “내가 200만큼 한다고 타인에게 100을 당연하게 요구하는 것은 폭력이 될 수 있다”는 걸 그때 배웠습니다.<br/>이후 <b>배려 중심 스케줄링</b>으로 방식을 바꿨습니다. 최고의 결과만큼이나 <b>지속 가능한 개발 환경</b>을 만드는 게 PM의 핵심이라는 걸 배운 결정적 계기였습니다."},
          {"k":"p","html":"데모데이에서 게임성은 검증받았지만 상용화 단계에는 못 미쳤습니다(플레이 타임 부족). 유저 리텐션과 콘텐츠 볼륨을 PD로서 고민하기 시작한 계기였습니다."}
        ]
      }
    ]
  },
  {
    id: "pr-ai",
    label: "팀 프로젝트",
    title: "AI를 사용한 미연시",
    chapter: "팀 프로젝트",
    blocks: [
      {
        "t": "phead",
        "genre": "비주얼 노벨",
        "tags": [
          {"text":"PD","kind":"role"},
          {"text":"TD","kind":"role"},
          {"text":"Unity 2021 LTS / Stable Diffusion"}
        ],
        "title": "AI를 사용한 미연시",
        "lead": "<b>그래픽 아티스트가 없다</b>는 리스크를, 인력을 기다리는 대신 로컬 Stable Diffusion 파이프라인으로 정면 돌파했습니다. 2023년입니다.",
        "context": ["생성형 AI 기반 비주얼 노벨"],
        "period": "2023.05",
        "duration": "10일"
      },
      {"t":"shot","src":"assets/img/project/ai.jpg","alt":"AI를 사용한 미연시 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=I3GUWCWDo0I","external":true,"icon":"▶","text":"플레이 영상 보기"},
          {"href":"https://github.com/Kevin04261004/AI_Visual_Novel","external":true,"icon":"❯","text":"코드 보기","ghost":true}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "리소스 병목을 기술로 푼 판단",
        "body": [
          {"k":"p","html":"PD로서 인력을 기다리는 대신 당시 급성장하던 생성형 AI를 파이프라인에 바로 넣기로 했습니다. 로컬에 Stable Diffusion을 직접 설치해 GPU 연산을 돌리고, 동일 인물의 표정 변화(기쁨·슬픔·당황)를 일관되게 뽑아 <b>캐릭터 4명 분량의 에셋</b>을 완성했습니다. 10일 안에 프로토타입이 나왔습니다."}
        ]
      },
      {
        "t": "blk",
        "h": "만든 것",
        "body": [
          {"k":"list","items":["<b>구글 시트 기반 시나리오 시스템</b> — 대사와 선택지를 코드에 박지 않고 시트와 연동된 CSV 파싱으로 관리했습니다. 기획이 바뀌어도 <b>재빌드 없이 시트만 고치면</b> 대사·표정값·배경 전환이 즉시 반영됩니다.","<b>확장성</b> — 이 데이터 파이프라인 설계는 이후 다른 프로젝트에서도 그대로 재사용했습니다."]}
        ]
      },
      {
        "t": "blk",
        "h": "배운 점",
        "body": [
          {"k":"p","html":"<b>도구가 바뀌는 속도를 따라가는 것</b>이 팀의 생산성이라는 걸 처음 체감했습니다. 지금 사지방에서 AI로 설계부터 배포까지 혼자 돌리는 작업 방식도 여기서 시작됐습니다."}
        ]
      }
    ]
  },
  {
    id: "pr-tutorial",
    label: "팀 프로젝트",
    title: "Hammzi-Swipe",
    chapter: "팀 프로젝트",
    blocks: [
      {
        "t": "phead",
        "genre": "모바일 벽돌깨기",
        "tags": [
          {"text":"PD","kind":"role"},
          {"text":"프로그래머","kind":"role"},
          {"text":"Unity 5 / Mobile"}
        ],
        "title": "Hammzi-Swipe",
        "lead": "스와이프 조작 벽돌깨기. <b>기획자가 수치를 직접 만지는 구조</b>를 처음 만들어 본 프로젝트입니다.",
        "context": ["튜토리얼 게임잼","모바일 벽돌깨기"],
        "period": "2023.04",
        "duration": "3주"
      },
      {"t":"shot","src":"assets/img/project/tutorial.jpg","alt":"Hammzi-Swipe 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=K7eGIhjWkEU","external":true,"icon":"▶","text":"플레이 영상 보기"},
          {"href":"https://github.com/Kevin04261004/2023_April_GameJam","external":true,"icon":"❯","text":"코드 보기","ghost":true}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "만든 것과 배운 점",
        "body": [
          {"k":"p","html":"<b>데이터 파이프라인</b> — 벽돌 체력, 아이템 수치 같은 밸런스 값을 하드코딩하지 않고 구글 시트 연동 CSV로 관리했습니다. 기획자가 수치를 바꾸면 즉시 반영되는 구조를 직접 설계하며 <b>유지보수가 쉬운 데이터 구조</b>의 값어치를 체감했습니다."},
          {"k":"p","html":"<b>협업의 기초</b> — 애니메이터 선배와 일하며 리소스가 게임에 들어가는 과정을 익혔습니다. PD로서 내 기획을 다른 파트에 어떻게 전달하고 조율해야 하는지 처음 배웠습니다."},
          {"k":"p","html":"<b>전체 사이클</b> — 기획·프로그래밍·UI·데이터 연동을 혼자 돌며 게임 하나가 완성되는 과정을 처음 끝까지 봤습니다. 간단한 캐주얼 게임이라도 ‘완성’까지 가는 건 쉽지 않았습니다."}
        ]
      }
    ]
  },
  {
    id: "pr-welcome",
    label: "팀 프로젝트",
    title: "달려라 산타독!",
    chapter: "팀 프로젝트",
    blocks: [
      {
        "t": "phead",
        "genre": "2D 횡스크롤 러닝",
        "tags": [
          {"text":"프로그래머","kind":"role"},
          {"text":"Unity 2019 LTS / PC"}
        ],
        "title": "달려라 산타독!",
        "lead": "교내 첫 게임잼. <b>기획자가 없어</b> 프로그래머가 기획과 UI까지 맡았던, 모든 것의 출발점입니다.",
        "context": ["2023 웰컴 게임잼","교내 첫 게임잼 참가작"],
        "period": "2023.03 — 2023.04",
        "duration": "1개월"
      },
      {"t":"shot","src":"assets/img/project/welcome.jpg","alt":"달려라 산타독! 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=zyVXedbCBdY","external":true,"icon":"▶","text":"플레이 영상 보기"}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "기획 부재 상황에서의 직무 확장",
        "body": [
          {"k":"p","html":"팀 구성 과정에서 기획자가 빠지며 방향성이 불투명해졌습니다. 프로그래머였지만 완수를 위해 <b>기획과 UI 설계를 직접 맡았습니다.</b> 팀원들과 실시간으로 핵심 룰을 정의하고 그걸 시각화할 UI를 구성해 병목을 풀었습니다. 대부분이 첫 프로젝트인 팀에서 분위기를 끌고 가는 역할도 했습니다."},
          {"k":"p","html":"기술적으로는 횡스크롤 장애물 생성과 점프 메커니즘 등 러닝 게임의 기초 시스템을 Unity로 구현했습니다."}
        ]
      },
      {
        "t": "blk",
        "h": "배운 점",
        "body": [
          {"k":"quote","text":"“즐거운 몰입이 가져다준 확신”"},
          {"k":"p","html":"아무것도 모르는 상태에서 시작했지만, 상상한 기획이 코드가 되어 플레이되는 과정에서 개발의 매력을 느꼈습니다. 그리고 <b>기획자가 없는 팀을 굴려본 경험</b>이 훗날 PD를 맡게 되는 첫 자산이 됐습니다."}
        ]
      }
    ]
  },
  {
    id: "vibe",
    label: "바이브 코딩",
    title: "바이브 코딩 — AFK Meteor",
    chapter: "개인 개발",
    blocks: [
      {"t":"h","text":"바이브 코딩 — 군 복무 중 개인 개발"},
      {
        "t": "sub",
        "html": "군 복무 중 <b>사지방</b>에서 웹 게임과 앱을 만들고 있습니다. 개발 환경이 막힌 조건에서도 손을 놓지 않으려 시작했고, 지금은 <b>설계 → 구현 → 테스트 → 배포</b>를 혼자 돌리는 방식으로 자리 잡았습니다. 그중 <b>러브 메모리</b>는 구글 플레이에 정식 출시했고, 나머지는 개발 중입니다."
      },
      {"t":"shot","alt":"AFK Meteor 플레이 화면"},
      {
        "t": "vibe",
        "title": "AFK Meteor",
        "sub": "· 방치형 자동전투 성장 게임",
        "status": "● IN DEVELOPMENT",
        "lead": ["브라우저에 띄워두고 방치하는 게임입니다. 뱀파이어 서바이버즈식 자동 전투에 방치형 성장을 얹고, 유저의 개입은 무기 강화·스킬 트리 같은 <b>‘세팅’</b>에 집중시켰습니다.","기능부터 쌓지 않고 <b>ARCHITECTURE.md를 먼저 썼습니다.</b> 기술 선택의 근거, 의존 방향, 결정론을 깨뜨리는 함수 목록, 배제한 대안과 그 이유를 문서에 남기고 그 문서를 기준으로 구현했습니다."],
        "tags": ["TypeScript","Vite","Canvas 2D","Vitest","Firebase","GitHub Pages"],
        "links": [
          {"href":"https://kevin04261004.github.io/claude-code-game/","external":true,"icon":"▶","text":"게임 바로 플레이하기"},
          {"href":"https://www.youtube.com/watch?v=PETrRqrZuAQ","external":true,"icon":"▶","text":"플레이 영상 보기","ghost":true},
          {"href":"https://github.com/Kevin04261004/claude-code-game","external":true,"icon":"❯","text":"코드 보기","ghost":true}
        ],
        "decs": [
          {"n":"DESIGN 01","title":"결정론적 시뮬레이션","desc":"고정 10 TPS 틱과 시드 기반 RNG로 <b>같은 입력이면 항상 같은 결과</b>가 나오게 했습니다. 브라우저마다 마지막 비트가 달라질 수 있는 <b>Math.sin/cos 사용을 금지</b>하고 룩업 테이블을 자체 구현했습니다."},
          {"n":"DESIGN 02","title":"로직과 렌더링의 분리","desc":"시뮬레이션 계층은 DOM과 Canvas를 <b>한 줄도 import하지 않습니다.</b> 덕분에 브라우저 목킹 없이 Node에서 전투 로직을 테스트할 수 있고, 렌더러는 IRenderer만 구현하면 통째로 교체됩니다."},
          {"n":"DESIGN 03","title":"균일 그리드 충돌 판정","desc":"적 300 × 투사체 200 전수 비교는 틱당 6만 회입니다. 월드를 격자로 나눠 <b>인접 9칸만 검사</b>하도록 바꾸고, 빠른 투사체는 선분–원 최근접 거리로 판정해 터널링을 막았습니다."},
          {"n":"DESIGN 04","title":"조합으로 만든 스킬","desc":"기본형 20 × 속성 8 × 등급 6 × 변형 = 약 <b>45만 가지.</b> 하드코딩 대신 조합을 ID 문자열에 인코딩해, 세이브에는 ID만 저장하고 로드 시 동일한 스킬을 재생성합니다."},
          {"n":"DESIGN 05","title":"오프라인 보상 정산","desc":"16시간을 전부 재생하면 CPU 예산을 넘습니다. 수식으로 추정하는 대신 <b>정산 시점에 실제 전투 30초를 헤드리스로 돌려 측정</b>하고 외삽했습니다. 실제 재생과의 오차 ±10% 이내를 테스트로 상시 검증합니다."},
          {"n":"DESIGN 06","title":"세이브 복구 체인","desc":"주 세이브 파싱에 실패하면 백업으로, 그것도 실패하면 <b>손상본을 지우지 않고</b> 별도 키로 보존한 뒤 새 게임을 시작합니다. 어떤 단계에서도 기존 데이터를 덮어쓰지 않습니다."}
        ],
        "foot": "▸ <b>지금 플레이 가능합니다.</b> 남은 작업은 밸런싱, 몬스터·보스 추가 — <b>전역일(2026.11.25) 전 정식 서비스</b>가 목표입니다.",
        "genre": "방치형 자동전투"
      },
      {"t":"h3","text":"그 외 제작 중"},
      {
        "t": "decs",
        "items": [
          {"n":"WEB · APP","title":"속보 알림 서비스","desc":"중요한 속보가 뜨면 <b>카카오톡과 푸시 알림</b>으로 바로 보내주는 애플리케이션입니다. 뉴스 수집과 중요도 판별, 발송 채널 연동을 다루고 있습니다."},
          {"n":"WEB · APP","title":"러브 메모리","desc":"연인이 함께 쓰는 캘린더. <b>구글 플레이에 정식 출시했습니다.</b> <a href=\"#\" data-goto=\"love-memory\">다음 쪽에서 자세히</a>"},
          {"n":"WEB","title":"이 포트폴리오","desc":"지금 보고 계신 페이지입니다. 노션 원본을 넘기고 <b>대화만으로</b> 완성했습니다. 내용과 글은 전부 직접 작성했습니다."}
        ]
      }
    ]
  },
  {
    id: "love-memory",
    label: "러브 메모리",
    title: "러브 메모리 — 커플 캘린더",
    chapter: "개인 개발",
    blocks: [
      {"t":"h","text":"러브 메모리 — 연인이 함께 쓰는 캘린더"},
      {
        "t": "sub",
        "html": "사지방에서 혼자 만든 앱입니다. <b>기획·디자인·개발·운영을 전부 혼자</b> 하고, 비공개 테스트 피드백을 반영해 <b>구글 플레이에 정식 출시</b>했습니다. 지금은 실사용자를 받으며 운영하고 있습니다."
      },
      {"t":"shot","alt":"러브 메모리 소개 영상"},
      {
        "t": "shots",
        "items": [
          {"src":"assets/img/love-memory/calendar-month.jpg","alt":"러브 메모리 월 달력 화면","cap":"월 달력 — 날짜에 그날 사진이 깔리고, 여러 날 일정은 띠로 이어집니다"},
          {"src":"assets/img/love-memory/day-sheet.jpg","alt":"러브 메모리 날짜 시트 화면","cap":"날짜 시트 — 사진, 기념일, 시간별 일정, 할 일이 한 화면에"},
          {"src":"assets/img/love-memory/day-story.jpg","alt":"러브 메모리 이날의 이야기 화면","cap":"이날의 이야기 — 서로 남긴 말과 이모지 반응"},
          {"src":"assets/img/love-memory/photo-detail.jpg","alt":"러브 메모리 사진 상세 화면","cap":"사진 상세 — 대표 지정, 반응과 댓글, 위치 추가"},
          {"src":"assets/img/love-memory/settings-theme.jpg","alt":"러브 메모리 테마 설정 화면","cap":"테마 — 프리셋 8종과 다섯 색 직접 지정"}
        ]
      },
      {
        "t": "vibe",
        "title": "러브 메모리",
        "sub": "· 연인이 함께 쓰는 캘린더",
        "status": "● RELEASED",
        "year": "2026",
        "lead": ["일정만 공유하는 앱은 이미 많아서 <b>지나간 날을 다시 열어보게 만드는 것</b>을 목표로 잡았습니다. 사진과 그날 주고받은 말이 날짜에 붙어 있고, 달력을 넘기면 지난 몇 달이 사진으로 훑어집니다.","슬로건은 <b>‘평소엔 조용하고, 돌아볼 때 좋은 앱’</b>입니다. 알림으로 붙잡아 두는 대신 열었을 때 그날이 온전히 남아 있는 쪽을 택했습니다."],
        "tags": ["React","Next.js","Firebase","Vercel 배포","기획 · 디자인 · 개발 · 운영 1인","Google Play 출시"],
        "links": [
          {"href":"https://play.google.com/store/apps/details?id=com.doyoon.lovememory","external":true,"icon":"▶","text":"구글 플레이에서 받기"},
          {"href":"https://www.youtube.com/watch?v=WIhtwNLPAaQ","external":true,"icon":"▶","text":"소개 영상 보기","ghost":true},
          {"href":"https://couple-app-tau-rouge.vercel.app/","external":true,"icon":"❯","text":"웹에서 바로 써보기","ghost":true}
        ],
        "decs": [
          {"n":"DESIGN 01","title":"둘만의 공유 모델","desc":"모든 기록에 누가 남겼는지가 붙습니다. 사진에는 <b>‘파트너가 올림’</b>, 일정에는 <b>‘파트너가 등록’</b>, 할 일은 아예 내 것과 파트너 것으로 나눴습니다. 2인이라 권한 규칙은 단순하지만, 누가 무엇을 했는지 보이지 않으면 함께 쓰는 느낌이 사라진다고 봤습니다."},
          {"n":"DESIGN 02","title":"하루를 하나의 화면으로","desc":"날짜를 누르면 그날의 사진, 기념일, 일정, 할 일, 주고받은 이야기가 <b>한 시트에 모입니다.</b> 탭을 옮겨 다니지 않고 하루를 열면 그날이 전부 보이게 했습니다."},
          {"n":"DESIGN 03","title":"여러 날에 걸친 일정","desc":"‘부산 여행’처럼 며칠씩 이어지는 일정은 <b>한 줄의 띠로 이어집니다.</b> 주 경계를 넘어가면 주 단위로 잘라 이어 붙이고, 겹치면 줄을 나눠 쌓아야 합니다. 달력에서 손이 가장 많이 간 부분입니다."},
          {"n":"DESIGN 04","title":"사진이 곧 그날의 표지","desc":"날짜 칸 배경에 그날 사진이 깔려서 <b>달력을 넘기는 것만으로 지난 몇 달이 훑어집니다.</b> 위치를 붙이면 지도 탭에 다녀온 곳으로 모입니다."},
          {"n":"DESIGN 05","title":"색을 직접 고르는 테마","desc":"프리셋 8종을 두고, 부족하면 <b>다섯 색을 직접 지정</b>해 나만의 팔레트로 저장합니다. 화면의 모든 색을 변수 한 겹으로 통과시켜 둔 덕분에 가능한 구조입니다."},
          {"n":"DESIGN 06","title":"글씨 크기 4단계","desc":"오래 들여다보는 앱이고 편한 크기는 사람마다 다릅니다. 글씨 크기를 고정값이 아니라 <b>기준 단위로 두고 화면 전체가 함께 커지도록</b> 했습니다."}
        ],
        "foot": "▸ 출시까지의 일정도 이 앱으로 관리했습니다 — 위 달력의 초록색 띠가 그것입니다.",
        "genre": "커플 캘린더"
      }
    ]
  },
  {
    id: "solo",
    label: "개인 프로젝트",
    title: "개인 프로젝트 · 학습",
    chapter: "개인 개발",
    blocks: [
      {"t":"h","text":"개인 프로젝트 · 학습"},
      {
        "t": "sub",
        "html": "과제와 스터디로 만든 <b>19건</b>입니다. 전부 플레이 영상을 남겼습니다. 아래 <b>대표 4건</b>을 먼저 보시고, 나머지는 버튼으로 분야를 좁혀 보실 수 있습니다."
      },
      {"t":"h3","text":"대표 4건"},
      {
        "t": "cards",
        "variant": "lead",
        "items": [
          {"href":"https://www.youtube.com/watch?v=mXYi02y6b4M","external":true,"k":"cpp","img":"assets/img/solo/sort-grapher.jpg","alt":"Sort Grapher (WinAPI)","title":"Sort Grapher (WinAPI)","meta":"C · C++ / WinAPI 32","desc":"정렬 알고리즘의 동작 과정을 실시간 그래프로 시각화. 게임 알고리듬 중간과제.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=mthlYz6apw0","external":true,"k":"unreal net","img":"assets/img/solo/unreal-iocp.jpg","alt":"언리얼 IOCP 멀티 게임","title":"언리얼 IOCP 멀티 게임","meta":"Unreal 5.4 / IOCP · JobQueue · Protobuf","desc":"IOCP 서버, UDP/TCP 통신, 로그인 암호화를 직접 구현. 가장 오래 붙잡은 건 여러 룸을 만들고 룸 간 이동을 처리하는 던전 기능이었습니다. 내부 테스트로 <b>100명 동시 접속</b>을 확인했습니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=tNlxN5e5zfk&t=65","external":true,"k":"unity net","img":"assets/img/solo/unity-multi-practice.jpg","alt":"유니티 멀티게임 연습","title":"유니티 멀티게임 연습","meta":"Unity 6 / UDP · TCP · MySQL · Docker","desc":"서버 구조를 비교·검토하고 C/S UML을 설계한 뒤 구현했습니다. 게임네트워크프로그래밍 기말과제.","go":"▶ 영상","repo":"https://github.com/Kevin04261004/network_final"},
          {"href":"https://www.youtube.com/watch?v=oTNETUWRGvU","external":true,"k":"gfx cpp","img":"assets/img/solo/dx11-car.jpg","alt":"자동차 이동 (DirectX11 FX)","title":"자동차 이동 (DirectX11 FX)","meta":"DirectX 11 / C++","desc":"DirectX 11 FX 파이프라인으로 자동차 이동을 구현. 그래픽스 심화 기말과제.","go":"▶ 영상","repo":"https://github.com/Kevin04261004/DirectX11Study"}
        ]
      },
      {"t":"h3","text":"그 외 15건 — 과제 · 스터디"},
      {
        "t": "filters",
        "items": [
          {"f":"all","label":"전체","on":true},
          {"f":"unreal","label":"언리얼"},
          {"f":"unity","label":"유니티"},
          {"f":"net","label":"네트워크"},
          {"f":"gfx","label":"그래픽스"},
          {"f":"cpp","label":"C · C++"},
          {"f":"xr","label":"XR · VR"},
          {"f":"doc","label":"문서 · 발표"}
        ]
      },
      {
        "t": "cards",
        "dense": true,
        "items": [
          {"href":"https://www.youtube.com/watch?v=hTDdtHfg0Es","external":true,"k":"unreal gfx","img":"assets/img/solo/cinematics.jpg","alt":"게임 시네마틱 제작 (모음집)","title":"게임 시네마틱 제작 (모음집)","meta":"Unreal 5.5 / Sequencer","desc":"게임 그래픽 엔진 활용 과목의 중간·기말과제 시네마틱 3편.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=AafhnPcF1nA&t=19s","external":true,"k":"unity net","img":"assets/img/solo/swipe-car.jpg","alt":"멀티 자동차 게임 (Swipe Car)","title":"멀티 자동차 게임 (Swipe Car)","meta":"Unity 5 / UDP · MySQL · Docker","desc":"UDP 실시간 동기화 + Docker MySQL 연동 멀티 레이싱. 네트워크 프로그래밍 중간과제.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=xzU4uJq0PPw","external":true,"k":"unity net","img":"assets/img/solo/word-chain.jpg","alt":"멀티 끝말잇기 게임","title":"멀티 끝말잇기 게임","meta":"Unity 6 / TCP","desc":"TCP 소켓 실시간 대전. 개발 중 마주친 이슈를 별도 문서로 정리했습니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=nLxbhIZMTjk","external":true,"k":"unity net doc","img":"assets/img/solo/multi-intro.jpg","alt":"멀티 게임 입문하기!","title":"멀티 게임 입문하기!","meta":"Unity 5 / Photon PUN2","desc":"스터디장으로서 동아리원들과 함께 만든 Photon PUN2 멀티 게임.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=KGKYbO35mvg","external":true,"k":"cpp","img":"assets/img/solo/sfml-pacman.jpg","alt":"SFML(C++)을 활용한 팩맨","title":"SFML(C++)을 활용한 팩맨","meta":"C · C++ / SFML","desc":"고스트 추적 알고리즘을 직접 구현. 게임 인공지능 중간과제.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=dpLbemGFVuM&t=9s","external":true,"k":"unity xr","img":"assets/img/solo/drone-hunter-vr.jpg","alt":"Drone Hunter : VR","title":"Drone Hunter : VR","meta":"Unity / Meta Quest 3","desc":"Meta Quest 3 대상 VR 슈팅. AR/VR 프로그래밍 기말과제.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=VEbyM6-MCN8","external":true,"k":"cpp","img":"assets/img/solo/snake.jpg","alt":"Snake Game","title":"Snake Game","meta":"C · C++","desc":"콘솔 스네이크 게임. 개발 보고서를 함께 작성했습니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=BjAkx_YjdaM","external":true,"k":"cpp","img":"assets/img/solo/ck-bank.jpg","alt":"CK Bank","title":"CK Bank","meta":"C++ / OOP","desc":"객체지향프로그래밍 고급 과제. 은행 시스템.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=XcAeNlNNwFY","external":true,"k":"cpp","img":"assets/img/solo/vending-machine.jpg","alt":"청강 자판기","title":"청강 자판기","meta":"C++ / 자료구조","desc":"자판기 로직을 자료구조로 구현. 게임 자료구조 과제.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=YXQLgiVv_ns","external":true,"k":"cpp","img":"assets/img/solo/rps.jpg","alt":"가위바위보 게임","title":"가위바위보 게임","meta":"C++ / 자료구조","desc":"1학년 2학기 게임 자료구조 과제.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=D_cSlYmh8VA&t=41s","external":true,"k":"xr","img":"assets/img/solo/msw.jpg","alt":"MSW Project","title":"MSW Project","meta":"MapleStoryWorld / Lua","desc":"메이플스토리 월드에서 Lua로 만든 콘텐츠. XR콘텐츠의 이해 과제.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=aPhMjhOIOtw","external":true,"k":"unity","img":"assets/img/solo/tower-defense.jpg","alt":"타워 디팬스 게임","title":"타워 디팬스 게임","meta":"Unity 5 / PC","desc":"강의를 참고하며 타워 디펜스의 기본 구조를 학습.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=oXFxrSt-D8g","external":true,"k":"unity","img":"assets/img/solo/mobile-shooter.jpg","alt":"모바일 슈팅 게임","title":"모바일 슈팅 게임","meta":"Unity 5 / Mobile","desc":"모바일 입력과 UI를 학습하려고 만든 개인 개발.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=0Dg4RWkcYHU&t=220s","external":true,"k":"doc","img":"assets/img/solo/ai-npc-paper.jpg","alt":"인공지능을 활용한 NPC 네트워크의 현재와 미래","title":"인공지능을 활용한 NPC 네트워크의 현재와 미래","meta":"논문 · 발표 / KCI 유사도 검사","desc":"AI가 NPC와 네트워크 구조에 미칠 영향을 조사해 논문으로 쓰고 발표했습니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=8qhBb9M79r4","external":true,"k":"doc","img":"assets/img/solo/unity-study.jpg","alt":"유니티 기초 스터디!","title":"유니티 기초 스터디!","meta":"스터디 진행 · 약 2시간","desc":"유니티 입문자를 위해 커리큘럼을 직접 짜고 진행한 스터디.","go":"▶ 영상"}
        ]
      }
    ]
  },
  {
    id: "skills",
    label: "역량",
    title: "역량",
    chapter: "역량 · 자격",
    blocks: [
      {"t":"h","text":"역량"},
      {"t":"sub","html":"자기 평가 기준 <b>상 · 중 · 하</b>로 표기했습니다."},
      {
        "t": "skills",
        "groups": [
          {"title":"언어","rows":[{"icon":"assets/img/skill/cpp.png","name":"C++","level":3,"label":"상","hi":true},{"icon":"assets/img/skill/c.png","name":"C","level":3,"label":"상","hi":true},{"icon":"assets/img/skill/csharp.png","name":"C#","level":3,"label":"상","hi":true},{"badge":"PY","name":"Python","level":2,"label":"중"},{"icon":"assets/img/skill/java.png","name":"Java","level":1,"label":"하"},{"icon":"assets/img/skill/lua.png","name":"Lua","level":1,"label":"하"}]},
          {"title":"AI 도구","rows":[{"badge":"CL","name":"Claude","level":3,"label":"상","hi":true},{"badge":"SD","name":"Stable Diffusion","level":1,"label":"하"}]},
          {"title":"문서","rows":[{"icon":"assets/img/skill/google-docs.png","name":"Google Docs","level":3,"label":"상","hi":true},{"icon":"assets/img/skill/notion.png","name":"Notion","level":2,"label":"중"}]},
          {"title":"외국어","rows":[{"badge":"中","name":"汉语 (HSK 5급)","level":3,"label":"상","hi":true},{"badge":"EN","name":"English","level":1,"label":"하"}]}
        ]
      }
    ]
  },
  {
    id: "certs",
    label: "자격 · 수상",
    title: "자격 · 수상",
    chapter: "역량 · 자격",
    blocks: [
      {"t":"h","text":"자격 · 수상"},
      {"t":"sub","html":"취득한 자격증과 수상 내역입니다."},
      {
        "t": "certs",
        "items": [
          {"img":"assets/img/cert/gamejam-award.jpg","alt":"유니티 게임잼 우수상 상장","date":"2024.08.07 수여","title":"청강대 X 유니티 게임잼 우수상","desc":"청강대와 유니티가 함께 진행한 게임잼(공식 명칭: 2024년 유니티 게임 제작 캠프)으로, 총 12개 팀 중 우수상을 수상했습니다. PD 및 프로그래밍 파트로 5일간 개발했습니다.<br><b>제2024-U01호(게임)</b> · 청강문화산업대학교 게임콘텐츠스쿨원장 · 유니티코리아 본부장 수여"},
          {"img":"assets/img/cert/info-processing.jpg","alt":"정보처리기능사 자격증","date":"2024.09.25 합격","title":"정보처리기능사 (필기 / 실기)","desc":"청강대 재학 중 2학년 1학기 종료 후 준비하여 취득했습니다.<br><b>자격번호 24403041945J</b> · 과학기술정보통신부 발행 · 한국산업인력공단 확인 (2024.12.24 발급)"},
          {"img":"assets/img/cert/hsk5.jpg","alt":"HSK 5급 성적표","date":"2022.07.16 시험","title":"HSK 5급","desc":"중국어 공인 자격증. 중국 만방국제학교 재학 경험을 바탕으로 취득했습니다.<br><b>증서번호 H52207019064</b> · 중국교육부 중외언어교류합작중심 주관"}
        ]
      }
    ]
  },
  {
    id: "ask",
    label: "Q&A",
    title: "채용 담당자 Q&A",
    chapter: "문의",
    blocks: [
      {"t":"h","text":"채용 담당자 Q&A"},
      {
        "t": "sub",
        "html": "궁금한 점을 직접 물어보실 수 있습니다. 이 응답기는 <b>서버 없이 이 파일 안에서만</b> 동작하며, 포트폴리오에 기록된 내용을 근거로 답합니다. 기록에 없는 것은 지어내지 않습니다."
      },
      {
        "t": "ask",
        "title": "ask-kevin",
        "sub": "· 포트폴리오 내장 응답기",
        "status": "● READY",
        "placeholder": "예: 당신의 장점은 무엇인가요?",
        "send": "보내기",
        "foot": "▸ 외부 통신 없음 · 인터넷이 끊긴 환경에서도 동작합니다.<br/>▸ 더 자세한 내용은 kdystudy0426@gmail.com 으로 문의해 주세요."
      }
    ]
  },
  {
    id: "end",
    label: "판권",
    title: "판권 · 연락처",
    chapter: "문의",
    blocks: [
      {"t":"endmark","text":"읽어주셔서 감사합니다."},
      {"t":"sub","html":"코드를 읽을 수 있는 사람이 일정을 잡아야 빌드가 나온다고 믿습니다. 그래서 <b>개발PM</b>으로 일하려 합니다. 언제든 편하게 연락 주세요."},
      {"t":"contact","order":["mail","tel","github","youtube"]},
      {
        "t": "credit",
        "title": "COLOPHON",
        "html": "이 포트폴리오에 담긴 <b>모든 내용과 글은 김도윤 본인이 직접 작성</b>했습니다.<br/> 웹 페이지의 디자인과 코드는 <b>Claude (Opus 5)의 프로젝트 기능</b>을 활용한 바이브 코딩으로 제작되었습니다. 별도의 개발 환경 없이, 노션 원본을 넘기고 대화만으로 이 단일 HTML 파일을 완성했습니다."
      }
    ]
  }
];
