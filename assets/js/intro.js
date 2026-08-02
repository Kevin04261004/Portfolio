/* ============================================================
   INTRO — the entry screen.

   No photographs, no illustration: the first thing a reader sees is
   the list of games, so "what did he actually build" is answered
   before anything is clicked. Every row is derived from
   PORTFOLIO.pages, so shipping a new project adds it here too.

   Layout-agnostic: mount it wherever, hand it an onEnter callback.
   Clicking a game passes that game's page id, so the reader can go
   straight to it instead of starting at the cover.
   ============================================================ */
(function (P) {
  "use strict";

  var R = P.render;

  function esc(s) { return R.esc(s); }

  /* "Unreal Engine 5.4 / PC" -> "UNREAL"; anything unrecognised keeps its
     own first token rather than being forced into a bucket. */
  function engineOf(stack) {
    if (/^Unreal/i.test(stack)) return "UNREAL";
    if (/^Unity/i.test(stack)) return "UNITY";
    if (/TypeScript|Vite|Canvas/i.test(stack)) return "WEB";
    return stack.split(/[\s/·]/)[0].toUpperCase();
  }

  function gameRow(g) {
    return '<button class="game' + (g.wip ? " game--wip" : "") + '" type="button"' +
      ' data-enter="' + esc(g.id) + '">' +
      '<span class="game__yr">' + esc(g.wip ? "NOW" : g.year) + "</span>" +
      '<span class="game__t">' + esc(g.title) + "</span>" +
      '<span class="game__g">' + esc(g.genre) + "</span>" +
      '<span class="game__e">' + esc(engineOf(g.stack)) + "</span>" +
      '<span class="game__r">' + esc(g.roles.join(" · ")) + "</span>" +
      '<span class="game__w">' + esc(g.award || (g.wip ? g.status : "")) + "</span>" +
      "</button>";
  }

  function build() {
    var pr = P.profile, t = R.tally(), games = R.games();
    var shipped = games.filter(function (g) { return !g.wip; });
    var wip = games.filter(function (g) { return g.wip; });

    /* counted off the role tags, so this can never drift from the pages */
    var role = function (k) { return (t.roles[k] || 0) + "회"; };
    var stats = [
      ["팀 프로젝트", t.team + "건"],
      ["개인 프로젝트 · 학습", t.solo + "건"],
      ["PD", role("PD")],
      ["TD", role("TD")],
      ["프로그래밍 파트장", role("프로그래밍 파트장")]
    ];

    return '<div class="intro__inner">' +
      "<header>" +
      '<div class="intro__eyebrow">' + pr.eyebrow + "</div>" +
      '<h1 class="intro__name">' + esc(pr.name) +
      "<span>" + esc(pr.nameLatin) + "</span></h1>" +
      '<p class="intro__thesis">' + pr.thesis + "</p>" +
      '<dl class="intro__stats">' + stats.map(function (s) {
        return "<div><dt>" + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd></div>";
      }).join("") + "</dl>" +
      "</header>" +

      '<h2 class="intro__sec">만든 게임 <em>' + shipped.length + "</em></h2>" +
      '<div class="glist">' + shipped.map(gameRow).join("") + "</div>" +

      (wip.length
        ? '<h2 class="intro__sec">지금 만드는 중 <em>' + wip.length + "</em></h2>" +
          '<div class="glist">' + wip.map(gameRow).join("") + "</div>"
        : "") +

      '<p class="intro__more">그 밖에 과제와 스터디로 만든 <b>' + t.solo +
      "건</b>이 더 있습니다 — 언리얼 · 유니티 · 네트워크 · 그래픽스 · C · C++ · 문서 · 발표.</p>" +

      '<div class="intro__foot">' +
      '<button class="intro__go" type="button" data-enter="">포트폴리오 전체 보기</button>' +
      '<span class="intro__hint">게임 이름을 누르면 그 프로젝트로 바로 들어갑니다</span>' +
      "</div></div>";
  }

  P.intro = {
    engineOf: engineOf,
    /* opts.onEnter(pageId) — pageId is "" for "read the whole thing" */
    mount: function (el, opts) {
      opts = opts || {};
      el.innerHTML = build();
      el.addEventListener("click", function (e) {
        var b = e.target.closest && e.target.closest("[data-enter]");
        if (!b) return;
        e.preventDefault();
        if (opts.onEnter) opts.onEnter(b.dataset.enter || null);
      });
      el.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && e.target === el) {
          e.preventDefault();
          if (opts.onEnter) opts.onEnter(null);
        }
      });
    }
  };
})(window.PORTFOLIO);
