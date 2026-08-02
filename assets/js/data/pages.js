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
          {"k":"희망 직무","v":"클라이언트 프로그래머","note":"중장기 — 테크니컬 PM / PD"},
          {"k":"입사 가능 시기","v":"2027.01 ~","note":"2026.11.25 만기 전역 예정"},
          {"k":"희망 근무지","v":"판교","note":"경기도권 · 대구 중구 / 수성구"},
          {"k":"선호 엔진","v":"Unreal Engine","note":"Unity 팀 프로젝트 7건 경험"}
        ]
      },
      {
        "t": "ledger",
        "cols": [
          {"title":"일대기 / 학력","rows":[{"d":"2006.04","v":"출생"},{"d":"2018.04","v":"중국 만방국제학교 입학"},{"d":"2021.03","v":"중국 만방국제학교 자퇴 (코로나)"},{"d":"2021.06","v":"초등학교 검정고시 졸업"},{"d":"2021.12","v":"중학교 검정고시 졸업"},{"d":"2022.06","v":"고등학교 검정고시 졸업"},{"d":"2023.03","v":"청강문화산업대학교 입학 (게임 전공)"},{"d":"2026.11","v":"육군 전투지휘훈련단 당번병 병장 만기 전역 예정 (11.25)"},{"d":"2027.03","v":"3학년 졸업학년 복학 희망"}]},
          {"title":"자격 / 수상","rows":[{"d":"2022.09","v":"HSK 5급 취득"},{"d":"2024.07","v":"청강대 X 유니티 게임잼 우수상"},{"d":"2024.08","v":"정보처리기능사 취득"}]},
          {"title":"활동 / 협업","rows":[{"d":"2023.08","v":"청강문화산업대학교 한얼 동아리 운영진"},{"d":"2024.03","v":"청강문화산업대학교 한얼 동아리 스터디장"},{"d":"2023—24","v":"팀 프로젝트 8건 참여 — PD 5회, TD 5회, 프로그래밍 파트장 3회"},{"d":"현재","v":"군 복무로 휴학 중 · 웹 게임 AFK Meteor 개발 진행"}]}
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
      {"t":"sub","html":"제 3년은 상승 곡선이 아니라 <b>전이(transition)의 연속</b>이었습니다. 각 노드를 누르면 해당 프로젝트로 이동합니다."},
      {
        "t": "fsm",
        "title": "CareerStateMachine",
        "sub": "· transition graph",
        "read": "STATE ▸ SHIP",
        "nodes": [
          {"goto":"pr-welcome","state":"ENTRY","step":"S0","date":"2023.03","desc":"기획자 없는 첫 게임잼에서 프로그래머로 시작해, 기획과 UI까지 직접 맡으며 개발에 입문"},
          {"goto":"pr-horror","state":"SCALE","step":"S1","date":"2023.05—08","desc":"PD·프로그래밍 파트장으로 역할 확장. 생성형 AI 파이프라인, A* AI, 멀티 엔딩 구조 구현"},
          {"goto":"pr-bunny","state":"DROP","step":"S2","date":"2024.05","desc":"8개월 장기 프로젝트 중단. 4인 공동 팀장 체제의 의사결정 실패를 정면으로 분석","drop":true},
          {"goto":"pr-bunny","state":"REBUILD","step":"S3","date":"2024.06","desc":"개발을 잠시 멈추고 리더십의 본질과 시스템 설계를 전공 심화로 재학습"},
          {"goto":"pr-mimami","state":"SHIP","step":"S4","date":"2024.07—12","desc":"게임잼 우수상 수상, 학기작에서 PD 직책을 이어받아 팀을 완주로 견인"}
        ],
        "foot": "▸ 목표 상태 — 빌드 완수 중심의 테크니컬 PM"
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
        "tags": [
          {"text":"PD","kind":"role"},
          {"text":"TD","kind":"role"},
          {"text":"메인 프로그래머","kind":"role"},
          {"text":"Unreal Engine 5.4 / PC"},
          {"text":"A+","kind":"win"}
        ],
        "title": "미마미",
        "lead": "보스전 중심의 스타일리쉬 액션 게임. <b>16인 팀</b>의 메인 프로그래머로 시작해, PD 부재로 진행이 지연된 후반부에 직접 PD를 이어받아 완주까지 끌고 갔습니다.",
        "context": ["학기작 프로젝트","스타일리쉬 액션"],
        "period": "2024.08 — 2024.12",
        "duration": "15주"
      },
      {"t":"shot","src":"assets/img/project/mimami.jpg","alt":"미마미 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=m4Nka0iVqvw&t=329s","external":true,"icon":"▶","text":"플레이 영상 보기"}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "개요",
        "body": [
          {"k":"list","items":["<b>핵심 목표</b> — 고퀄리티 보스전 중심의 액션 메커니즘 구현 및 카툰 렌더링 스타일 구축","<b>역할</b> — 메인 프로그래머 및 기술 지원, 후반부 PD 겸임","<b>규모</b> — 16인 팀 / 15주 학기 내 제작 / Unreal Engine 5.4","<b>성과</b> — 교과목 성적 <b>A+</b>"]}
        ]
      },
      {
        "t": "blk",
        "h": "개발 — 초기 · 시스템 설계와 환경 구축",
        "body": [
          {"k":"list","items":["<b>UML 기반 코드 구조 설계</b> — 확장성을 고려한 클래스 구조를 먼저 잡고, UML로 팀 전체 가이드라인을 제시했습니다.","<b>개발 환경 최적화</b> — 팀 내 Git 사용법 가이드(Fork 활용)를 직접 제작하고, Unreal 아트 리소스 네이밍 규칙을 수립했으며, Git LFS 환경을 검토해 협업 효율을 끌어올렸습니다.","<b>문서화</b> — 화면 공유 프로그램(Parsec) 사용법, AI를 활용한 회의록, 빌드 파일 주기적 업로드를 통한 진척도 확인 및 버그 QA 체계를 만들었습니다."]}
        ]
      },
      {
        "t": "blk",
        "h": "개발 — 중기 · 액션 시스템과 타격감 R&D",
        "body": [
          {"k":"list","items":["<b>플레이어 액션 시스템</b> — 입력·공격·상태·애니메이션을 포함한 기본 구조를 설계하고 콤보 시스템을 구현했습니다. 이후 FSM을 도입해 액션 로직을 모듈화하는 리팩터링을 진행했습니다.","<b>타격감 R&amp;D</b> — 당시 가장 주목받던 <b>젠레스 존 제로</b>를 레퍼런스로 분석해 HitStop, Camera Shake, Camera Zoom In/Out, Blur, SpeedLine 등 10가지 이상의 피드백 요소를 언리얼 환경에서 직접 구현했습니다. 이 중 <b>과하지 않은 HitStop과 Camera Shake가 체감의 대부분</b>을 차지했고, 이펙트와 사운드가 그 뒤를 받쳤습니다. 요소를 많이 넣는 것보다 강도를 절제하는 쪽이 중요했습니다.","<b>커스터마이징 툴 제작</b> — 기획자가 코드 수정 없이 스킬 데이터(쿨타임, 수치 등)를 직접 관리할 수 있도록 매니저를 모듈화했습니다.","<b>비주얼 스크립팅 가이드</b> — UE5 Blueprint 활용 가이드를 만들어, 프로그래머 출신이 아닌 기획자 2인이 직접 시스템을 만들 수 있게 했습니다.","<b>카툰 렌더링</b> — 프로젝트 컨셉에 맞는 Toon Shader와 아웃라인 머티리얼을 R&amp;D 후 직접 제작했습니다."]}
        ]
      },
      {
        "t": "blk",
        "h": "개발 — 후기 · 최적화와 폴리싱",
        "body": [
          {"k":"list","items":["<b>프레임 최적화</b> — 시연용 PC에서 목표 프레임이 나오지 않았습니다. <b>언리얼 내장 프로파일러</b>로 보스 등장처럼 끊김이 발생하는 구간을 먼저 특정하고, 원인을 아트 리소스와 연산 부하로 나눠 접근했습니다. 아트 리소스가 원인인 구간은 <b>아트 파트장과 조율해 리소스를 최적화</b>했습니다.<br/>가장 무거웠던 건 <b>거울 재질의 건물</b>이었습니다. <b>Planar Reflection</b>을 쓰고 있었는데 씬을 한 번 더 그리는 방식이라 비용이 컸고, 그 건물이 화면에 들어올 때 프레임이 떨어졌습니다. <b>Planar Reflection을 끄고 머티리얼을 단순화</b>하는 것으로 해결했습니다. 시연 환경에서는 건물 하나의 반사 품질보다 <b>안정적인 60fps</b>가 더 중요하다고 판단했습니다. 결과적으로 <b>40fps에서 60fps 안정권</b>으로 끌어올렸습니다.","<b>콘텐츠 확장</b> — 튜토리얼 시스템, 스테이지 로직, 보스 2페이즈 변환 시퀀스, 만화 컷씬 로직을 개발했습니다."]}
        ]
      },
      {
        "t": "blk",
        "h": "문제와 해결",
        "body": [
          {"k":"h5","text":"기획 지연 및 볼륨 컨트롤"},
          {"k":"p","html":"시스템 기획서가 지연되는 상황에서 PM과 구두 협의를 통해 개발을 선행하며 병목을 해소했습니다. 또한 개발 범위가 지나치게 비대해지는 것을 막기 위해 기술적 한계점을 명확히 공유하고, 실현 가능한 범위로 기능을 축소하는 의사결정을 주도했습니다."},
          {"k":"h5","text":"애니메이션 작업 프로세스 갈등"},
          {"k":"p","html":"애니메이터와 작업 방식(완성도 vs 느낌 전달)에서 의견 차이가 있었으나, 과거 리깅 수정 경험을 근거로 리스크를 설명하고 대화를 통해 최종 결과물의 퀄리티를 보장하는 방향으로 합의점을 찾았습니다."},
          {"k":"h5","text":"프로젝트 방향성 상실 → PD 인수"},
          {"k":"p","html":"중간 평가 이후 PD 역할의 부재로 진행도가 크게 지연됐습니다. 애니메이터의 작업량까지 겹쳐 팀 사기가 떨어진 상황에서 PD 직책을 이어받았고, 그 뒤에야 <b>튜토리얼과 추가 몬스터 개발이 진행</b>됐습니다. 개발 기간이 4분의 1밖에 남지 않은 촉박한 상황에서 개개인의 TODO 리스트를 직접 작성하고 일정을 관리하며 프로젝트의 ‘시작과 끝’을 맺을 수 있도록 재정비했습니다."},
          {"k":"h5","text":"Memory Leak 발생"},
          {"k":"p","html":"특정 행동 후 약 10초 뒤 게임이 항상 강제 종료되는 이슈가 있었습니다. 빌드를 직접 플레이하며 QA를 진행해 이를 인지했고, 원인을 분석해 해결했습니다. 원인은 <b>UPROPERTY()</b>를 사용하지 않아 언리얼 GC가 해당 메모리를 회수해 버린 것이었습니다. 사소한 코드 실수로 밤을 지새웠던 기억이 납니다."}
        ]
      },
      {
        "t": "blk",
        "h": "배운 점",
        "body": [
          {"k":"h5","text":"Unreal Engine 첫 도전"},
          {"k":"p","html":"개발 경험은 있었지만 언리얼은 처음이라 초기에 두려움이 있었고, R&amp;D가 되지 않은 파트는 과감히 배제하며 볼륨을 통제했습니다. 결과적으로 타 엔진과 구조적 차이는 크지 않았고, 오히려 초기 플레이어 제작은 언리얼 쪽이 더 빨랐습니다."},
          {"k":"h5","text":"코드 문서화"},
          {"k":"p","html":"Doxygen을 도입해 문서 자동화를 적용했습니다. 이를 통해 프로그래머 간 협업 능력이 확연히 올라갔고, 코드 리뷰 전에 동료의 코드를 빠르게 훑어볼 수 있게 되었습니다."},
          {"k":"h5","text":"리더십의 중요성"},
          {"k":"p","html":"내 작업만 잘하는 것을 넘어 팀 전체의 일정과 사기를 관리하는 PD 역할을 수행하며, 커뮤니케이션과 명확한 가이드라인 제시가 프로젝트 완수에 얼마나 결정적인지 체감했습니다."},
          {"k":"h5","text":"R&D의 가치"},
          {"k":"p","html":"타격감과 카툰 렌더링에 대한 집요한 연구가 최종 빌드의 완성도를 결정지었으며, 기술적 한계를 인정하고 대안(Dynamic Light 사용 등)을 빠르게 찾아내는 유연함의 중요성을 배웠습니다."},
          {"k":"h5","text":"포스트모템"},
          {"k":"p","html":"포스트모템 문서를 직접 제작해 팀원들이 스스로를 성찰할 수 있는 시간을 가졌습니다."}
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
          {"text":"메인 프로그래머","kind":"role"},
          {"text":"Unity / Live2D SDK"},
          {"text":"우수상","kind":"win"}
        ],
        "title": "빛을 향해서",
        "lead": "‘변신’을 주제로 한 2D 퍼즐 게임. 12개 팀 중 우수상을 수상했습니다. 슬로건은 NO SLEEP, NO BUG.",
        "context": ["청강대 X 유니티 게임잼","5일 대면"],
        "period": "2024.07.15 — 2024.07.21",
        "duration": "5일"
      },
      {"t":"shot","src":"assets/img/project/jam.jpg","alt":"빛을 향해서 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=gHCZj0rF1ME","external":true,"icon":"▶","text":"플레이 영상 보기"}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "개요",
        "body": [
          {"k":"list","items":["<b>주제</b> — 변신 / 2D 퍼즐 게임 (대면 게임잼)","<b>구성</b> — 프로그래머 2명, 아트 1명의 소수 정예","<b>성과</b> — 우수상 수상"]}
        ]
      },
      {
        "t": "blk",
        "h": "개발 파트",
        "body": [
          {"k":"h5","text":"캐릭터 변신 및 액션 메커니즘 설계"},
          {"k":"p","html":"주제인 ‘변신’에 맞춰 실시간으로 캐릭터의 스탯, 스킬셋, 애니메이션 컨트롤러를 교체하는 시스템을 구축했습니다. 각 변신 형태의 고유 액션이 충돌 없이 작동하도록 유연한 상태 머신 구조를 설계해 확장성을 확보했습니다."},
          {"k":"h5","text":"외부 툴 연동 및 절차적 애니메이션"},
          {"k":"p","html":"유니티 내에서 Live2D SDK를 연동해 캐릭터 리소스를 최적화된 상태로 제어했습니다. 애니메이션 툴에서 설정한 IK 제약 조건과 유니티 스크립트를 연결해, 캐릭터의 시선이 마우스 포인터를 실시간으로 추적하는 Procedural Look-At 기믹을 구현했습니다."}
        ]
      },
      {
        "t": "blk",
        "h": "문제와 해결",
        "body": [
          {"k":"h5","text":"‘변신’이라는 주제의 해석과 차별화"},
          {"k":"p","html":"단순히 외형이 변하는 변신은 흔한 아이디어라 심사위원에게 인상을 남기기 어려웠습니다. 그래서 <b>변신을 환경과 상황에 따른 능력의 변화로 재해석</b>했습니다. 평범한 미소녀가 상황에 맞춰 검사로 변신해 장애물을 돌파하거나, 하프를 켜는 악사로 변신해 음악적 기믹을 해결하는 식으로 게임 메커닉과 긴밀하게 연결했습니다. 초반 기획 단계에서 브레인스토밍 시간을 충분히 갖고, PD로서의 결정권과 팀원들의 창의적 의견 사이의 균형을 잡아 빠르게 확장시켰습니다."},
          {"k":"h5","text":"5일이라는 물리적 시간의 한계"},
          {"k":"p","html":"<b>선택과 집중</b> 전략을 사용했습니다. 핵심이 되는 변신 시스템과 기초 스테이지 구성을 3일 만에 완료하는 MVP 전략을 취했고, 남은 2일은 새 기능을 추가하는 대신 <b>폴리싱에 집중</b>했습니다. 이펙트, 카메라 워킹, Live2D 연동, 사운드 연출 등 유저가 직접 느끼는 경험의 질을 높이는 데 시간을 투자했습니다."},
          {"k":"h5","text":"소수 정예 인원의 리소스 관리"},
          {"k":"p","html":"한 명이라도 병목이 생기면 전체 일정이 무너지는 구성이었습니다. PD로서 업무를 원자 단위로 쪼개 분배했고, 아트는 변신 애니메이션과 배경에 집중하도록 환경을 만들고, 프로그래머 간에는 ‘시스템 구현’과 ‘스테이지 디자인/기믹 구현’으로 파트를 명확히 나눠 작업 충돌을 최소화했습니다."}
        ]
      },
      {
        "t": "blk",
        "h": "배운 점",
        "body": [
          {"k":"quote","text":"“마음이 맞으면 불가능은 없다”"},
          {"k":"p","html":"많은 인원이 참여했던 프로젝트보다, 열정과 실력을 겸비한 소수가 같은 방향성과 목표를 가질 때 얼마나 효율적인지 체감한 게임잼이었습니다."},
          {"k":"h5","text":"PD로서의 소통과 결정의 무게"},
          {"k":"p","html":"팀원의 의견을 수용하는 부드러운 소통도 중요하지만, 한정된 시간 안에 최선의 결과를 내려면 빠르게 결단하는 추진력이 게임잼의 성패를 가른다는 것을 배웠습니다."},
          {"k":"h5","text":"‘완성도’가 주는 힘"},
          {"k":"p","html":"기능을 많이 넣기보다 하나를 넣더라도 버그 없이 매끄럽게 작동하고 시각적으로 아름답게 표현하는 것이 얼마나 강력한 무기인지 확인했습니다. 3일 만에 기본 틀을 잡고 남은 기간을 퀄리티 업에 쏟은 판단이 좋은 평가로 이어졌습니다."}
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
          {"text":"프로그래밍 파트장","kind":"role"},
          {"text":"Unity 2022 LTS / FMOD"}
        ],
        "title": "버니 프로젝트 (Apocalypse)",
        "lead": "<b>20인 팀</b>이 BIC 출품을 목표로 8개월간 진행했으나 중단된 프로젝트. 기술적 성과보다 <b>왜 실패했는지</b>를 정면으로 분석한 기록입니다.",
        "context": ["3D 액션 게임","8개월 장기 팀 프로젝트"],
        "period": "2023.12 — 2024.05",
        "duration": "8개월"
      },
      {"t":"shot","src":"assets/img/project/bunny.jpg","alt":"버니 프로젝트 (Apocalypse) 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=9RQVzrtDPqA&t=493s","external":true,"icon":"▶","text":"플레이 영상 보기"}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "개요",
        "body": [
          {"k":"list","items":["<b>성격</b> — 3D 액션 및 시스템 구축 중심의 장기 팀 프로젝트. 기술적 확장성을 고려한 아키텍처 설계와 팀 협업 파이프라인 구축에 집중","<b>핵심 목표</b> — 효율적인 아키텍처 설계 및 BIC 출품","<b>규모</b> — 20인 팀 / 8개월","<b>역할</b> — 프로그래밍 파트장 (Lead Programmer)"]}
        ]
      },
      {
        "t": "blk",
        "h": "개발 파트",
        "body": [
          {"k":"h5","text":"객체지향 설계를 활용한 플레이어 FSM 구축"},
          {"k":"p","html":"무분별한 상속으로 인한 클래스 폭발 문제를 방지하기 위해, 선배 개발자의 피드백을 수용해 <b>PlayerSkillState를 기본으로 두되 세부 동작은 Enum으로 구분하는 하이브리드 구조</b>를 설계했습니다. 스킬별로 개별 클래스를 만드는 대신 실행 방식에 따른 공통 로직을 묶어 관리함으로써 코드 복잡도를 낮추고 전이 조건문을 단순화했습니다."},
          {"k":"h5","text":"사운드 시스템 최적화 및 애니메이션 블렌딩 이슈 해결"},
          {"k":"list","items":["유니티 애니메이터의 Blend Tree 사용 시 걷기와 달리기 애니메이션 이벤트가 동시에 발생해 발자국 소리가 겹치는 이슈를 해결했습니다.","<b>GetMovementState(speed)</b> 함수를 구현해 실제 이동 속도와 애니메이션 상태를 비교, 정확한 시점에만 사운드가 재생되도록 로직을 정교화했습니다.","FMOD 기반 사운드 시스템을 구축하고, 애니메이션 이벤트가 유발할 수 있는 가비지 생성을 최소화하기 위해 스크립트 기반 FMOD 이벤트 트리거 방식을 연구해 적용했습니다."]},
          {"k":"h5","text":"콘텐츠 및 기믹 프로그래밍"},
          {"k":"list","items":["<b>프로토타입을 통한 재미 검증(R&amp;D)</b> — FPS, 망치 액션, TPS 땅따먹기 등 3가지 프로토타입을 구현하고 반복 테스트 끝에 망치 액션을 메인 컨셉으로 채택했습니다.","3타 기본 공격, 점프, 대시 및 ‘일직선 지진’ 같은 상호작용형 스킬 로직을 구현했습니다.","계단 지형 처리, NPC 대화 시스템, 락온 시스템 등 기초 시스템을 구축했습니다."]},
          {"k":"h5","text":"문서 제작 및 협력 역량"},
          {"k":"list","items":["Git에 익숙하지 않은 아티스트를 위한 <b>비개발자 대상 깃허브 파이프라인</b>과 협업 가이드, 프리팹 관리 프로세스를 제작했습니다.","기획 지연과 그래픽 파트 일정 이슈를 해결하기 위해 임원진 회의를 주도하고, 각 파트장에게 최종 결정권을 부여하는 거버넌스 체계를 제안했습니다.","개발 착수 전 ‘기획 설문지’를 통해 데이터적인 최소 조건을 확정해 재작업 리스크를 최소화했습니다."]}
        ]
      },
      {
        "t": "blk",
        "h": "프로젝트 드랍 원인 분석",
        "body": [
          {"k":"h5","text":"비효율적인 의사결정 구조 (4인 공동 팀장 체제)"},
          {"k":"p","html":"저를 포함한 4명의 팀장(AD, TD, PD, 팀장)이 합의하는 구조였으나, 3명이 반대하면 합리적인 의견이라도 반영되지 않는 구조적 한계가 있었습니다. <b>최종 결정권자의 부재</b>가 위기 상황에서 빠른 대처를 불가능하게 만들었습니다."},
          {"k":"h5","text":"인적 리스크 방치 및 일정 관리 실패"},
          {"k":"p","html":"핵심 파트(UI)에서 지속적인 작업 지연과 퀄리티 이슈가 발생했습니다. 저는 해당 파트의 역량 부족이 전체 일정에 치명적일 것이라 판단해 강력한 리소스 재배치를 제안했습니다. 그러나 ‘대안 부재’와 ‘팀워크 유지’를 우선시한 타 임원진의 온정주의적 판단으로 적기 교체가 무산되었고, 결과적으로 특정 파트의 병목이 팀 전체의 사기 저하와 개발 동력 상실로 이어졌습니다."}
        ]
      },
      {
        "t": "blk",
        "h": "배운 점",
        "body": [
          {"k":"h5","text":"중요한 것은 명확한 거버넌스다"},
          {"k":"p","html":"아무리 뛰어난 팀원으로 구성되어도 의사결정 체계가 명확하지 않으면 프로젝트는 방향성을 잃습니다. 다수결에 의존하기보다, 각 파트의 전문성을 존중하되 위기 상황에서는 명확한 책임과 권한을 가진 최종 결정권자가 필수적임을 배웠습니다."},
          {"k":"h5","text":"리스크 방치의 결과는 애정의 상실이다"},
          {"k":"p","html":"초기에 발견한 문제를 ‘어떻게든 되겠지’로 방치했을 때 팀원들의 애정과 동기가 어떻게 잠식되는지 배웠습니다. 이후 <b>“빠른 실패와 빠른 피드백”</b>을 신조로 삼는 계기가 되었습니다."},
          {"k":"h5","text":"소통의 기술 — 설득의 근거"},
          {"k":"p","html":"돌아봤을 때 내 의견이 옳았더라도, 그 당시 다수를 설득하지 못하면 실행될 수 없음을 배웠습니다. 감정적 호소보다 구체적인 일정표와 리스크 지표로 설득하는 기술이 필요함을 절감했습니다."}
        ]
      },
      {
        "t": "blk",
        "h": "이후의 성장 서사",
        "body": [
          {"k":"h5","text":"1. 성찰과 내실의 시간"},
          {"k":"p","html":"프로젝트 중단 이후, 기술적 구현 능력만큼 중요한 것이 ‘팀을 유지하는 거버넌스’와 ‘위기 관리 능력’임을 절감했습니다. 한동안 프로젝트 개발을 멈추고 리더십의 본질과 시스템 설계에 대한 전공 심화 학습에 매진했습니다."},
          {"k":"h5","text":"2. 해결사로의 복귀"},
          {"k":"p","html":"반년 뒤 학기작 프로젝트와 유니티 X 청강 게임잼으로 복귀했습니다. 과거의 실패는 강력한 백신이 되었고, 리스크가 감지될 때 주저 없이 PD 직책을 수용하며 명확한 의사결정 체계 구축과 파트 간 중재를 통해 팀 전체를 완주로 이끌었습니다."},
          {"k":"h5","text":"3. 중장기 목표"},
          {"k":"p","html":"저는 <b>빌드 완수 중심의 테크니컬 PM</b>이 되고 싶습니다. 개발 지식을 바탕으로 기획과 아트 사이의 기술적 가교 역할을 수행하고, 개발에 소홀하지 않으면서 일정 관리를 겸임해 팀원들과 하나가 되는 팀을 만들어 나가겠습니다."}
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
        "tags": [
          {"text":"TD","kind":"role"},
          {"text":"프로그래밍 파트장","kind":"role"},
          {"text":"Unity 2021 LTS / PC"}
        ],
        "title": "Dirty Guilty",
        "lead": "<b>11인 팀</b>의 프로그래밍 파트장으로, A* 알고리즘을 직접 구현한 추격 AI와 분기·멀티 엔딩 구조를 설계했습니다.",
        "context": ["동아리 프로젝트","루프물 기반 다중 엔딩 도트 어드벤처"],
        "period": "2023.07 — 2023.08",
        "duration": "6주"
      },
      {"t":"shot","src":"assets/img/project/dirty.jpg","alt":"Dirty Guilty 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=yHMLPyDOVHo&t=110s","external":true,"icon":"▶","text":"플레이 영상 보기"}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "개요",
        "body": [
          {"k":"list","items":["<b>성격</b> — 루프물 기반의 다중 엔딩 도트 어드벤처 게임","<b>규모</b> — 11인 팀 / 6주 (1학년 2학기 여름방학)","<b>역할</b> — 프로그래밍 파트장 (Lead Programmer)"]}
        ]
      },
      {
        "t": "blk",
        "h": "개발 파트",
        "body": [
          {"k":"h5","text":"A* 알고리즘을 활용한 지능형 AI 및 추격전 시스템"},
          {"k":"p","html":"단순한 이동 패턴을 넘어 <b>A* 알고리즘을 직접 구현</b>해 장애물을 피해 플레이어를 추격하는 긴장감 있는 AI를 제작했습니다. 2D 맵 환경에서 몬스터가 플레이어를 지능적으로 추적하게 함으로써 어드벤처 장르 특유의 심리적 압박감과 몰입도를 높였습니다."},
          {"k":"h5","text":"시스템 아키텍처 및 콘텐츠 구현"},
          {"k":"list","items":["<b>인벤토리 및 상호작용</b> — 아이템을 수집하고 조사해 정보를 확인하는 인벤토리 시스템과, 맵 내 오브젝트와의 유기적인 상호작용 로직을 구축했습니다.","<b>분기 및 엔딩 시스템</b> — 플레이어의 선택에 따라 시나리오가 변하는 분기점 시스템과 이를 기반으로 한 멀티 엔딩 구조를 설계했습니다.","<b>시네마틱 및 쉐이더 연출</b> — 시네마신 연출과 분위기를 살리는 쉐이더 효과를 적용해 비주얼 퀄리티를 높였습니다."]}
        ]
      },
      {
        "t": "blk",
        "h": "배운 점",
        "body": [
          {"k":"h5","text":"기획의 볼륨 조절과 팀원 역량 파악의 중요성"},
          {"k":"p","html":"인원수에 맞춘 기획이라고 판단했으나, 실제 개발 과정에서 예상보다 큰 볼륨으로 인해 일정 관리와 리소스 배분에 어려움을 겪었습니다. 프로젝트 착수 전 <b>팀원 개개인의 역량과 작업 속도를 정확히 파악</b>하는 것이 성공적인 스코핑의 핵심임을 배웠습니다. 이 경험은 이후 실현 가능한 기획을 수립하고 기술적 병목을 미리 예측해 대비하는 관리 역량을 갖추는 계기가 되었습니다."}
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
        "tags": [
          {"text":"PD","kind":"role"},
          {"text":"프로그래머","kind":"role"},
          {"text":"Unity 2021 LTS / PC"},
          {"text":"교과목 A+ · 교내 데모데이 진출","kind":"win"}
        ],
        "title": "레이튼 모텔의 비밀",
        "lead": "CCTV 감시와 규칙 기반 플레이를 결합한 루프 구조를 설계했습니다. 동시에 리더로서 ‘열정의 강요’를 배운 프로젝트입니다.",
        "context": ["1인칭 3D 심리 호러","퍼즐"],
        "period": "2023.05 — 2023.06",
        "duration": "5주"
      },
      {"t":"shot","src":"assets/img/project/horror.jpg","alt":"레이튼 모텔의 비밀 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=YPM-Mq_N6Gc&t=8s","external":true,"icon":"▶","text":"플레이 영상 보기"}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "개요",
        "body": [
          {"k":"list","items":["<b>성격</b> — 1인칭 3D 심리 호러 / 퍼즐","<b>기간</b> — 5주 (1학년 1학기 수업 중 마지막 5주)","<b>성과</b> — 교과목 최종 성적 A+ 달성, 교내 데모데이 진출 및 발표"]}
        ]
      },
      {
        "t": "blk",
        "h": "개발 파트",
        "body": [
          {"k":"h5","text":"1인칭 호러 메커니즘 및 시스템 설계"},
          {"k":"list","items":["<b>CCTV 감시 및 이상 현상 시스템</b> — 플레이어가 관제실에서 CCTV로 모텔 내부를 감시하고, 이상 현상(문 열림, 피 흐름 등)을 발견해 직접 해결하러 가는 독특한 루프 구조를 설계했습니다.","<b>상호작용 및 규칙 기반 플레이</b> — ‘규칙서’라는 가이드를 기반으로 플레이어가 올바른 대응(대화 선택지, 오브젝트 조작)을 하도록 유도하는 복합 상호작용 시스템을 구현했습니다.","<b>UI 제작</b> — UI를 직접 제작하고, 옵저버 패턴 기반의 UI 매니저를 만들었습니다."]}
        ]
      },
      {
        "t": "blk",
        "h": "리더십 경험",
        "body": [
          {"k":"quote","text":"“200%의 열정이 100%의 강요가 되지 않도록”"},
          {"k":"p","html":"<b>위기</b> — 기획 단계부터 완성도를 높이기 위해 몰입하던 중, 팀원(기획자, 애니메이터)에게 제 기준에 맞춘 과도한 업무를 분배해 팀 내 피로도가 급증하는 상황이 발생했습니다."},
          {"k":"p","html":"<b>성찰과 해결</b> — “내가 200만큼 한다고 해서 타인에게 100을 당연하게 요구하는 것은 폭력이 될 수 있다”라는 것을 깨달았습니다. 이후 팀원 개개인의 상황과 컨디션을 고려한 <b>배려 중심의 스케줄링</b>으로 개발 방식을 전환했습니다."},
          {"k":"p","html":"<b>교훈</b> — 최고의 결과만큼이나 지속 가능한 개발 환경을 만드는 것이 PM의 핵심 역량임을 배우는 결정적 계기가 되었습니다."}
        ]
      },
      {
        "t": "blk",
        "h": "결과 및 피드백",
        "body": [
          {"k":"list","items":["<b>시장성 검증</b> — 데모데이 진출을 통해 전문가들에게 게임성을 검증받았습니다.","<b>한계 극복의 지표</b> — 최종적으로 상용화 단계에는 미치지 못했으나(플레이 타임 부족 등), 이는 유저 리텐션과 콘텐츠 볼륨에 대해 PD로서 고민을 시작하게 만든 값진 피드백이었습니다."]}
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
          {"text":"프로그래밍 파트장","kind":"role"},
          {"text":"Unity 2021 LTS / Stable Diffusion"}
        ],
        "title": "AI를 사용한 미연시",
        "lead": "그래픽 아티스트 부재라는 리스크를, 로컬 Stable Diffusion 파이프라인 구축으로 정면 돌파했습니다.",
        "context": ["생성형 AI 기반 비주얼 노벨"],
        "period": "2023.05",
        "duration": "10일"
      },
      {"t":"shot","src":"assets/img/project/ai.jpg","alt":"AI를 사용한 미연시 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=I3GUWCWDo0I","external":true,"icon":"▶","text":"플레이 영상 보기"}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "개요",
        "body": [
          {"k":"list","items":["<b>성격</b> — AI를 활용한 미연시 (비주얼 노벨)","<b>기간</b> — 10일 (1학년 1학기 수업 중)","<b>역할</b> — 프로그래밍 파트장 (Lead Programmer) 및 PD"]}
        ]
      },
      {
        "t": "blk",
        "h": "개발 파트",
        "body": [
          {"k":"h5","text":"CSV 파싱 및 구글 시트 기반 시나리오 시스템"},
          {"k":"list","items":["<b>데이터 관리 최적화</b> — 게임 내 방대한 대사와 선택지 데이터를 코드에 하드코딩하지 않고, 구글 스프레드시트와 연동된 CSV 파싱 시스템을 구축했습니다.","<b>유지보수성 확보</b> — 기획 수정이 발생해도 유니티 재빌드 없이 시트 수정만으로 대사, 캐릭터 표정값, 배경 전환 로직을 즉각 반영할 수 있도록 설계했습니다."]},
          {"k":"h5","text":"Stable Diffusion을 활용한 생성형 AI 리소스 제작"},
          {"k":"list","items":["<b>리소스 병목 해결</b> — 팀 내 그래픽 아티스트 부재라는 리스크를 해결하기 위해 Stable Diffusion 도입을 결정했습니다.","<b>프롬프트 엔지니어링 및 일관성 유지</b> — 로컬 환경에 Stable Diffusion을 직접 설치하고 GPU 연산을 수행했습니다. 동일 인물의 표정 변화(기쁨, 슬픔, 당황 등)를 일관성 있게 생성해 총 4명의 캐릭터 에셋을 완성했습니다."]}
        ]
      },
      {
        "t": "blk",
        "h": "배운 점",
        "body": [
          {"k":"quote","text":"“제한된 자원 속에서의 기술적 돌파구 마련”"},
          {"k":"p","html":"전문 그래픽 인력 없이 프로젝트가 시작되었습니다. PD로서 단순히 인력을 기다리는 대신, 당시 급성장하던 생성형 AI 기술을 파이프라인에 즉각 도입했습니다. 직접 기술 스택을 익히고 실행에 옮겨 프로젝트를 완수해내는 실행력을 발휘했습니다. 앞으로의 개발 환경에서 <b>최신 기술을 도구로 활용해 팀의 생산성을 극대화하는 법</b>을 익혔습니다."}
        ]
      },
      {
        "t": "blk",
        "h": "결과",
        "body": [
          {"k":"list","items":["<b>완성도 높은 데모</b> — AI로 생성한 고퀄리티 캐릭터 에셋과 체계적인 대사 시스템이 결합된 비주얼 노벨 프로토타입을 제작했습니다.","<b>기술적 확장성</b> — 이후 다른 프로젝트에서도 외부 데이터를 효율적으로 관리할 수 있는 데이터 파이프라인 설계 능력을 확보했습니다."]}
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
          {"text":"메인 프로그래머","kind":"role"},
          {"text":"Unity 5 / Mobile"}
        ],
        "title": "Hammzi-Swipe",
        "lead": "스와이프 조작 기반 벽돌깨기. 구글 시트 연동 CSV 파싱으로 기획자가 직접 밸런스를 만지는 구조를 만들었습니다.",
        "context": ["튜토리얼 게임잼","모바일 벽돌깨기"],
        "period": "2023.04",
        "duration": "3주"
      },
      {"t":"shot","src":"assets/img/project/tutorial.jpg","alt":"Hammzi-Swipe 스크린샷"},
      {
        "t": "links",
        "items": [
          {"href":"https://www.youtube.com/watch?v=K7eGIhjWkEU","external":true,"icon":"▶","text":"플레이 영상 보기"}
        ],
        "variant": "shot"
      },
      {
        "t": "blk",
        "h": "개요",
        "body": [
          {"k":"list","items":["<b>플랫폼 / 엔진</b> — 모바일 / Unity 5","<b>주요 특징</b> — 직관적인 스와이프 조작 기반의 벽돌깨기, CSV 데이터 연동 시스템","<b>역할</b> — PD(기획 및 일정 관리) 및 메인 프로그래밍"]}
        ]
      },
      {
        "t": "blk",
        "h": "개발 및 배운 점",
        "body": [
          {"k":"h5","text":"데이터 기반의 시스템 설계 (CSV & Google Sheets)"},
          {"k":"p","html":"게임 내 밸런스 데이터(벽돌 체력, 아이템 수치 등)를 하드코딩하지 않고 구글 시트와 연동된 CSV 파싱 시스템으로 관리했습니다. 기획자가 수치를 변경하면 즉시 게임에 반영되는 구조를 직접 설계하며 <b>유지보수가 용이한 데이터 파이프라인</b>의 중요성을 체감했습니다."},
          {"k":"h5","text":"협업을 통한 ‘함께 만드는 즐거움’ 습득"},
          {"k":"p","html":"애니메이터 선배와 협업하며 리소스가 게임에 적용되는 프로세스를 익혔습니다. PD로서 자신의 기획을 타 파트(아트)에 어떻게 전달하고 조율해야 하는지, 협업의 기초적인 커뮤니케이션 방법을 배웠습니다."},
          {"k":"h5","text":"게임 개발 프로세스의 전반적 이해"},
          {"k":"p","html":"기획부터 프로그래밍, UI 배치, 데이터 연동까지 1인 다역을 수행하며 게임 하나가 완성되는 전체 사이클을 경험했습니다. 간단한 캐주얼 게임이라도 ‘완성’까지 가는 과정이 쉽지 않음을 깨달았고, 이 성취감을 바탕으로 3D 게임 개발에 도전할 기술적 자신감을 얻었습니다."}
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
          {"text":"UI","kind":"role"},
          {"text":"Unity 2019 LTS / PC"}
        ],
        "title": "달려라 산타독!",
        "lead": "기획자 부재 상황에서 프로그래머가 기획과 UI까지 맡았던, 모든 것의 출발점.",
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
        "h": "개요",
        "body": [
          {"k":"list","items":["<b>성격</b> — 교내 첫 게임잼 참가작 / 2D 횡스크롤 러닝 게임","<b>기간</b> — 1개월 (게임잼 형식)","<b>역할</b> — 프로그래머 및 UI 담당"]}
        ]
      },
      {
        "t": "blk",
        "h": "주요 수행",
        "body": [
          {"k":"h5","text":"기획 부재 상황에서의 직무 확장"},
          {"k":"p","html":"팀 구성 과정에서 기획자의 부재로 개발 방향성이 불투명해진 위기가 발생했습니다. 프로그래머임에도 프로젝트 완수를 위해 <b>직접 기획과 UI 설계를 도맡았습니다.</b> 팀원들과 실시간으로 소통하며 게임의 핵심 룰을 정의하고, 이를 시각화할 UI를 직접 구성해 개발 병목을 해소했습니다."},
          {"k":"h5","text":"첫 개발의 기술적 도전"},
          {"k":"p","html":"횡스크롤 환경에서 지속적으로 생성되는 장애물과 플레이어의 점프 메커니즘 등 러닝 게임의 기초 시스템을 Unity 환경에서 구현했습니다. 대부분 프로젝트가 처음인 팀원들 사이에서 긍정적인 분위기를 주도하며 완수라는 공동의 목표를 향해 동기부여를 이끄는 리더십을 발휘했습니다."}
        ]
      },
      {
        "t": "blk",
        "h": "배운 점",
        "body": [
          {"k":"quote","text":"“즐거운 몰입이 가져다준 확신”"},
          {"k":"list","items":["<b>개발의 재미 발견</b> — 아무것도 모르는 상태에서 시작했지만, 상상하던 기획이 코드로 구현되어 직접 플레이할 수 있는 결과물로 나오는 과정에서 게임 개발에 대한 깊은 매력을 느꼈습니다.","<b>지속적 성장의 발판</b> — “이제 개발에 한 발자국 밟았다”는 확신을 얻었고, 이후 Dirty Guilty, 레이튼 모텔 등 더 난이도 높은 프로젝트에 도전하게 만든 원동력이 되었습니다.","<b>PM의 싹</b> — 기획자가 없는 상황에서 팀을 이끌어본 경험은 훗날 기술적 이해도를 갖춘 PM으로 성장하게 된 결정적인 초기 자산이 되었습니다."]}
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
        "html": "군 복무 중 <b>사지방(사이버지식정보방)</b>에서 바이브 코딩으로 웹 기반 게임과 사이트, 앱을 만들고 있습니다. 개발 환경이 제한된 조건에서도 손을 놓지 않기 위해 시작했고, 지금은 <b>아키텍처 설계 → 구현 → 테스트 → 배포</b>까지 혼자 돌리는 작업 방식으로 자리 잡았습니다. 아직 개발 중이며 상용화하지 않았습니다."
      },
      {
        "t": "vibe",
        "title": "AFK Meteor",
        "sub": "· 방치형 자동전투 성장 게임",
        "status": "● IN DEVELOPMENT",
        "lead": ["브라우저 탭에 띄워두고 방치하는 게임입니다. 뱀파이어 서바이버즈식 자동 전투에 방치형 성장을 얹고, 유저의 개입은 무기 강화·스킬 트리·빌드 구성 같은 <b>‘세팅’</b>에 집중시켰습니다.","기능을 먼저 쌓기보다 <b>ARCHITECTURE.md를 먼저 쓰고</b> 시작했습니다. 렌더링 기술 선택의 근거, 의존 방향, 결정론을 깨뜨리는 함수의 목록, 배제한 대안과 그 이유까지 문서에 남기고 그 문서를 기준으로 구현했습니다."],
        "tags": ["TypeScript","Vite","Canvas 2D","Vitest","Firebase Auth · Firestore","GitHub Pages"],
        "links": [
          {"href":"https://kevin04261004.github.io/claude-code-game/","external":true,"icon":"▶","text":"게임 바로 플레이하기"}
        ],
        "decs": [
          {"n":"DESIGN 01","title":"결정론적 시뮬레이션","desc":"고정 10 TPS 틱과 시드 기반 RNG로 <b>같은 입력이면 항상 같은 결과</b>가 나오게 했습니다. 브라우저마다 마지막 비트가 달라질 수 있는 <b>Math.sin/cos 사용을 금지</b>하고 룩업 테이블을 자체 구현해, 장시간 시뮬레이션에서 상태가 갈라지지 않도록 했습니다."},
          {"n":"DESIGN 02","title":"로직과 렌더링의 완전 분리","desc":"시뮬레이션 계층은 DOM과 Canvas를 <b>한 줄도 import하지 않습니다.</b> 덕분에 브라우저 목킹 없이 Node 환경에서 전투 로직을 테스트할 수 있고, 렌더러는 IRenderer 인터페이스만 구현하면 Canvas 2D에서 PixiJS로 통째로 교체됩니다."},
          {"n":"DESIGN 03","title":"균일 그리드 충돌 판정","desc":"적 300 × 투사체 200을 전수 비교하면 틱당 6만 회, 고속 따라잡기에서는 프레임당 360만 회가 됩니다. 월드를 격자로 나눠 <b>인접 9칸만 검사</b>하도록 바꾸고, 빠른 투사체는 선분–원 최근접 거리로 판정해 터널링을 막았습니다."},
          {"n":"DESIGN 04","title":"조합으로 만든 수천 개의 스킬","desc":"기본형 20 × 속성 8 × 등급 6 × 변형 = 약 <b>45만 가지 조합.</b> 스킬을 하드코딩하는 대신 조합을 ID 문자열에 인코딩해, 세이브에는 ID만 저장하고 로드 시 동일한 스킬을 재생성합니다."},
          {"n":"DESIGN 05","title":"오프라인 보상 정산","desc":"16시간을 전부 재생하면 CPU 예산을 넘습니다. 스탯 수식으로 추정하는 대신 <b>정산 시점에 실제 전투 30초를 헤드리스로 돌려 측정</b>하고 구간별로 외삽했습니다. 실제 재생과의 오차 ±10% 이내를 테스트로 상시 검증합니다."},
          {"n":"DESIGN 06","title":"세이브 복구 체인","desc":"주 세이브 파싱에 실패하면 백업으로, 그것도 실패하면 <b>손상본을 지우지 않고</b> 별도 키로 원문을 보존한 뒤 새 게임을 시작합니다. 어떤 단계에서도 기존 데이터를 덮어쓰며 시작하지 않습니다."}
        ],
        "foot": "▸ 사용 모델 — <b>Claude Fable 5</b> (설계 및 주 개발) · <b>Claude Sonnet</b> (가벼운 질의)<br/>▸ <b>지금 플레이 가능합니다.</b> 남은 작업은 밸런싱 조정, 몬스터 추가, 보스 다수 제작 — <b>전역일(2026.11.25) 전 정식 서비스</b>가 목표입니다.",
        "genre": "방치형 자동전투"
      },
      {"t":"h3","text":"그 외 제작 중"},
      {"t":"sub","html":"전부 같은 방식으로, 사지방에서 혼자 만들고 있습니다.","variant":"tight"},
      {
        "t": "decs",
        "items": [
          {"n":"WEB · APP","title":"속보 알림 서비스","desc":"중요한 속보가 뜨면 <b>카카오톡과 푸시 알림</b>으로 바로 보내주는 애플리케이션입니다. 뉴스 수집과 중요도 판별, 발송 채널 연동을 다루고 있습니다."},
          {"n":"WEB","title":"데이팅 캘린더","desc":"연인이 함께 쓰는 일정 관리 서비스. 두 사람의 일정을 한 화면에서 맞추고 기념일을 챙기는 데 초점을 뒀습니다."},
          {"n":"WEB","title":"이 포트폴리오","desc":"지금 보고 계신 이 페이지입니다. 노션 원본을 넘기고 <b>대화만으로</b> 이미지까지 담긴 단일 HTML 파일로 완성했습니다. 내용과 글은 전부 직접 작성했습니다."}
        ]
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
      {"t":"sub","html":"과제와 스터디로 만든 <b>19건</b>입니다. 전부 플레이 영상을 남겼습니다. 위 버튼으로 분야를 좁힐 수 있고, 카드를 누르면 영상으로 이동합니다."},
      {
        "t": "filters",
        "items": [
          {"f":"all","label":"전체","on":true},
          {"f":"unreal","label":"언리얼"},
          {"f":"unity","label":"유니티"},
          {"f":"net","label":"네트워크"},
          {"f":"gfx","label":"그래픽스"},
          {"f":"cpp","label":"C · C++"},
          {"f":"doc","label":"문서 · 발표"}
        ]
      },
      {
        "t": "cards",
        "dense": true,
        "items": [
          {"href":"https://www.youtube.com/watch?v=mthlYz6apw0","external":true,"k":"unreal net","img":"assets/img/solo/unreal-iocp.jpg","alt":"언리얼 IOCP 멀티 게임","title":"언리얼 IOCP 멀티 게임","meta":"Unreal 5.4 / IOCP · JobQueue · Protobuf","desc":"IOCP 서버와 UDP/TCP 통신, 로그인 암호화까지 직접 구현. 가장 오래 붙잡은 건 던전(텔레포트) 기능으로, 여러 룸을 만들고 룸 간 접속·이동을 구현하는 데 시간이 많이 들었습니다. 내부 테스트로 100명 동시 접속을 확인했습니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=dpLbemGFVuM&t=9s","external":true,"k":"unity xr","img":"assets/img/solo/drone-hunter-vr.jpg","alt":"Drone Hunter : VR","title":"Drone Hunter : VR","meta":"Unity / Meta Quest 3","desc":"Unity로 제작한 Meta Quest 3 대상 VR 슈팅. AR/VR 프로그래밍 기말과제입니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=hTDdtHfg0Es","external":true,"k":"unreal gfx","img":"assets/img/solo/cinematics.jpg","alt":"게임 시네마틱 제작 (모음집)","title":"게임 시네마틱 제작 (모음집)","meta":"Unreal 5.5 / Sequencer","desc":"게임 그래픽 엔진 활용 과목의 중간·기말과제로 제작한 시네마틱 3편 모음입니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=oTNETUWRGvU","external":true,"k":"gfx cpp","img":"assets/img/solo/dx11-car.jpg","alt":"자동차 이동 (DirectX11 FX)","title":"자동차 이동 (DirectX11 FX)","meta":"DirectX 11 / C++","desc":"그래픽스 프로그래밍 심화 기말과제. DirectX 11 FX 파이프라인으로 자동차 이동을 구현했습니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=tNlxN5e5zfk&t=65","external":true,"k":"unity net","img":"assets/img/solo/unity-multi-practice.jpg","alt":"유니티 멀티게임 연습","title":"유니티 멀티게임 연습","meta":"Unity 6 / UDP · TCP · MySQL · Docker","desc":"서버 구조를 직접 비교·검토하고 C/S UML을 설계한 뒤 구현한 멀티 게임입니다. 게임네트워크프로그래밍 기말과제.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=AafhnPcF1nA&t=19s","external":true,"k":"unity net","img":"assets/img/solo/swipe-car.jpg","alt":"멀티 자동차 게임 (Swipe Car)","title":"멀티 자동차 게임 (Swipe Car)","meta":"Unity 5 / UDP · MySQL · Docker","desc":"UDP 기반 실시간 동기화와 Docker로 띄운 MySQL을 연동한 멀티 레이싱. 게임네트워크프로그래밍 중간과제.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=xzU4uJq0PPw","external":true,"k":"unity net","img":"assets/img/solo/word-chain.jpg","alt":"멀티 끝말잇기 게임","title":"멀티 끝말잇기 게임","meta":"Unity 6 / TCP","desc":"TCP 소켓 기반 실시간 대전 끝말잇기. 개발 중 마주친 이슈를 별도 문서로 정리했습니다. 게임네트워크기초 기말과제.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=nLxbhIZMTjk","external":true,"k":"unity net doc","img":"assets/img/solo/multi-intro.jpg","alt":"멀티 게임 입문하기!","title":"멀티 게임 입문하기!","meta":"Unity 5 / Photon PUN2","desc":"스터디장으로서 동아리원들과 함께 개발한 Photon PUN2 기반 멀티 게임입니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=KGKYbO35mvg","external":true,"k":"cpp","img":"assets/img/solo/sfml-pacman.jpg","alt":"SFML(C++)을 활용한 팩맨","title":"SFML(C++)을 활용한 팩맨","meta":"C · C++ / SFML","desc":"고스트 추적 알고리즘을 직접 구현한 팩맨. 게임 인공지능 중간과제입니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=mXYi02y6b4M","external":true,"k":"cpp","img":"assets/img/solo/sort-grapher.jpg","alt":"Sort Grapher (WinAPI)","title":"Sort Grapher (WinAPI)","meta":"C · C++ / WinAPI 32","desc":"정렬 알고리즘의 동작 과정을 실시간 그래프로 시각화합니다. 게임 알고리듬 중간과제.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=VEbyM6-MCN8","external":true,"k":"cpp","img":"assets/img/solo/snake.jpg","alt":"Snake Game","title":"Snake Game","meta":"C · C++","desc":"콘솔 기반 스네이크 게임과 개발 보고서를 함께 작성했습니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=BjAkx_YjdaM","external":true,"k":"cpp","img":"assets/img/solo/ck-bank.jpg","alt":"CK Bank","title":"CK Bank","meta":"C++ / OOP","desc":"객체지향프로그래밍 고급 과제로 제작한 은행 시스템입니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=XcAeNlNNwFY","external":true,"k":"cpp","img":"assets/img/solo/vending-machine.jpg","alt":"청강 자판기","title":"청강 자판기","meta":"C++ / 자료구조","desc":"게임 자료구조 과제. 자판기 로직을 자료구조로 구현했습니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=YXQLgiVv_ns","external":true,"k":"cpp","img":"assets/img/solo/rps.jpg","alt":"가위바위보 게임","title":"가위바위보 게임","meta":"C++ / 자료구조","desc":"1학년 2학기 게임 자료구조 과제입니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=D_cSlYmh8VA&t=41s","external":true,"k":"xr","img":"assets/img/solo/msw.jpg","alt":"MSW Project","title":"MSW Project","meta":"MapleStoryWorld / Lua","desc":"메이플스토리 월드 플랫폼에서 Lua로 제작한 콘텐츠. XR콘텐츠의 이해 과제입니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=aPhMjhOIOtw","external":true,"k":"unity","img":"assets/img/solo/tower-defense.jpg","alt":"타워 디팬스 게임","title":"타워 디팬스 게임","meta":"Unity 5 / PC","desc":"개인 개발. 유튜브 강의를 참고하며 타워 디펜스의 기본 구조를 학습했습니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=oXFxrSt-D8g","external":true,"k":"unity","img":"assets/img/solo/mobile-shooter.jpg","alt":"모바일 슈팅 게임","title":"모바일 슈팅 게임","meta":"Unity 5 / Mobile","desc":"개인 개발. 모바일 환경의 입력과 UI를 학습하기 위해 제작했습니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=0Dg4RWkcYHU&t=220s","external":true,"k":"doc","img":"assets/img/solo/ai-npc-paper.jpg","alt":"인공지능을 활용한 NPC 네트워크의 현재와 미래","title":"인공지능을 활용한 NPC 네트워크의 현재와 미래","meta":"논문 · 발표 / KCI 유사도 검사","desc":"AI가 NPC와 네트워크 구조에 미칠 영향을 조사해 논문 형태로 작성하고 발표했습니다.","go":"▶ 영상"},
          {"href":"https://www.youtube.com/watch?v=8qhBb9M79r4","external":true,"k":"doc","img":"assets/img/solo/unity-study.jpg","alt":"유니티 기초 스터디!","title":"유니티 기초 스터디!","meta":"스터디 진행 · 약 2시간","desc":"유니티 입문자를 위해 직접 커리큘럼을 만들고 진행한 스터디입니다.","go":"▶ 영상"}
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
          {"img":"assets/img/cert/gamejam-award.jpg","alt":"유니티 게임잼 우수상 상장","date":"2024.07.19","title":"청강대 X 유니티 게임잼 우수상","desc":"청강대와 유니티가 함께 진행한 게임잼으로, 총 12개 팀 중 우수상을 수상했습니다. PD 및 프로그래밍 파트로 5일간 개발했습니다."},
          {"img":"assets/img/cert/info-processing.jpg","alt":"정보처리기능사 자격증","date":"2024.08","title":"정보처리기능사 (필기 / 실기)","desc":"청강대 재학 중 2학년 1학기 종료 후 준비하여 취득했습니다."},
          {"img":"assets/img/cert/hsk5.jpg","alt":"HSK 5급 성적표","date":"2022.09","title":"HSK 5급","desc":"중국어 공인 자격증. 중국 만방국제학교 재학 경험을 바탕으로 취득했습니다."}
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
      {"t":"sub","html":"코드를 잘 짜는 것을 넘어, 프로젝트의 흐름을 읽고 팀의 병목을 해결하는 테크니컬 PM을 목표로 하고 있습니다. 언제든 편하게 연락 주세요."},
      {"t":"contact","order":["mail","tel","github","youtube"]},
      {
        "t": "credit",
        "title": "COLOPHON",
        "html": "이 포트폴리오에 담긴 <b>모든 내용과 글은 김도윤 본인이 직접 작성</b>했습니다.<br/> 웹 페이지의 디자인과 코드는 <b>Claude (Opus 5)의 프로젝트 기능</b>을 활용한 바이브 코딩으로 제작되었습니다. 별도의 개발 환경 없이, 노션 원본을 넘기고 대화만으로 이 단일 HTML 파일을 완성했습니다."
      }
    ]
  }
];
