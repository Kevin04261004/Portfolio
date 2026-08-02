/* ============================================================
   INTRO — the entry screen.

   Two things answer "what did he build" before anything is clicked:
   a play video that starts on arrival, and the full list of games.
   No photographs or illustrations; the only picture on the screen is
   the game running.

   Both are derived from PORTFOLIO.pages, so shipping a project adds it
   here — list row, reel slot and all.

   Layout-agnostic: mount it anywhere, hand it an onEnter callback.
   Call stop() when leaving so the video does not keep playing behind
   whatever comes next.
   ============================================================ */
(function (P) {
  "use strict";

  var R = P.render;
  var esc = R.esc;
  var SLOT_MS = 13000;                  /* how long each game holds the reel */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = !window.matchMedia || window.matchMedia("(hover: hover)").matches;

  /* "Unreal Engine 5.4 / PC" -> "UNREAL"; anything unrecognised keeps its own
     first token rather than being forced into a bucket. */
  function engineOf(stack) {
    if (/^Unreal/i.test(stack)) return "UNREAL";
    if (/^Unity/i.test(stack)) return "UNITY";
    if (/TypeScript|Vite|Canvas/i.test(stack)) return "WEB";
    return stack.split(/[\s/·]/)[0].toUpperCase();
  }

  function embedSrc(v, muted, autoplay) {
    return "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(v.id) +
      "?autoplay=" + (autoplay ? 1 : 0) +
      "&mute=" + (muted ? 1 : 0) +
      "&start=" + (v.start || 0) +
      "&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1" +
      "&loop=1&playlist=" + encodeURIComponent(v.id);
  }

  function gameRow(g, i) {
    return '<button class="game' + (g.wip ? " game--wip" : "") + '" type="button"' +
      ' data-enter="' + esc(g.id) + '" data-slot="' + i + '">' +
      '<span class="game__yr">' + esc(g.wip ? "NOW" : g.year) + "</span>" +
      '<span class="game__t">' + esc(g.title) + "</span>" +
      '<span class="game__g">' + esc(g.genre) + "</span>" +
      '<span class="game__e">' + esc(engineOf(g.stack)) + "</span>" +
      '<span class="game__r">' + esc(g.roles.join(" · ")) + "</span>" +
      '<span class="game__w">' + esc(g.award || (g.wip ? g.status : "")) + "</span>" +
      "</button>";
  }

  function build(games, reel) {
    var pr = P.profile, t = R.tally();
    var shipped = games.filter(function (g) { return !g.wip; });
    var wip = games.filter(function (g) { return g.wip; });

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

      /* the reel: one iframe, swapped as the selection moves */
      '<section class="reel" aria-label="플레이 영상">' +
      '<div class="reel__frame">' +
      '<iframe class="reel__v" title="플레이 영상" allow="autoplay; encrypted-media; picture-in-picture"' +
      ' referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' +
      '<div class="reel__veil"></div>' +
      "</div>" +
      '<div class="reel__now">' +
      '<div class="reel__label"><span class="reel__dot"></span>PLAYING' +
      '<span class="reel__i"></span></div>' +
      '<h2 class="reel__t"></h2>' +
      '<div class="reel__g"></div>' +
      '<div class="reel__r"></div>' +
      '<div class="reel__ctl">' +
      '<button type="button" data-reel="prev" aria-label="이전 영상">◀</button>' +
      '<button type="button" data-reel="toggle" aria-label="자동 넘김 멈춤">❚❚</button>' +
      '<button type="button" data-reel="next" aria-label="다음 영상">▶</button>' +
      '<button type="button" data-reel="sound" class="reel__snd">🔇 소리 켜기</button>' +
      "</div>" +
      '<button class="reel__go" type="button" data-enter="">이 프로젝트 읽기 →</button>' +
      "</div></section>" +

      '<h2 class="intro__sec">만든 게임 <em>' + shipped.length + "</em>" +
      '<small>' + (canHover ? "이름 위에 올리면 그 영상이 재생됩니다" : "이름을 누르면 프로젝트로 들어갑니다") +
      "</small></h2>" +
      '<div class="glist">' + shipped.map(function (g) {
        return gameRow(g, reel.indexOf(g));
      }).join("") + "</div>" +

      (wip.length
        ? '<h2 class="intro__sec">지금 만드는 중 <em>' + wip.length + "</em></h2>" +
          '<div class="glist">' + wip.map(function (g) {
            return gameRow(g, reel.indexOf(g));
          }).join("") + "</div>"
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
      var games = R.games();
      /* only the games with a video can hold the reel */
      var reel = games.filter(function (g) { return g.video; });

      el.innerHTML = build(games, reel);

      var frame = el.querySelector(".reel__v"),
          rows = [].slice.call(el.querySelectorAll(".game")),
          now = {
            i: el.querySelector(".reel__i"), t: el.querySelector(".reel__t"),
            g: el.querySelector(".reel__g"), r: el.querySelector(".reel__r"),
            go: el.querySelector(".reel__go")
          },
          toggleBtn = el.querySelector('[data-reel="toggle"]'),
          soundBtn = el.querySelector(".reel__snd");

      var at = 0, timer = null, muted = true, rolling = !reduce, live = false;

      function paint() {
        var g = reel[at];
        now.i.textContent = (at + 1) + " / " + reel.length;
        now.t.textContent = g.title;
        now.g.textContent = g.genre + (g.year ? " · " + g.year : "");
        now.r.textContent = engineOf(g.stack) + " · " + g.roles.join(" · ") +
          (g.award ? " · " + g.award : "");
        now.go.dataset.enter = g.id;
        now.go.textContent = g.title + " 읽기 →";
        rows.forEach(function (row) {
          row.classList.toggle("is-playing", +row.dataset.slot === at);
        });
      }

      function load(autoplay) {
        frame.src = embedSrc(reel[at].video, muted, autoplay);
        live = true;
        paint();
      }

      function schedule() {
        clearTimeout(timer);
        if (!rolling) return;
        timer = setTimeout(function () { go(at + 1, true); }, SLOT_MS);
      }

      function go(next, autoplay) {
        at = (next + reel.length) % reel.length;
        load(autoplay !== false);
        schedule();
      }

      function setRolling(on) {
        rolling = on;
        toggleBtn.textContent = on ? "❚❚" : "▶";
        toggleBtn.setAttribute("aria-label", on ? "자동 넘김 멈춤" : "자동 넘김 시작");
        if (on) schedule(); else clearTimeout(timer);
      }

      /* hovering the list takes the reel off autopilot and pins that game */
      if (canHover) {
        var hoverTimer = null;
        rows.forEach(function (row) {
          var slot = +row.dataset.slot;
          if (slot < 0) return;                       /* no video for this one */
          row.addEventListener("mouseenter", function () {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(function () {
              if (slot === at) return;
              setRolling(false);
              go(slot);
            }, 220);                                  /* ignore a passing cursor */
          });
          row.addEventListener("mouseleave", function () { clearTimeout(hoverTimer); });
        });
      }

      el.addEventListener("click", function (e) {
        var ctl = e.target.closest && e.target.closest("[data-reel]");
        if (ctl) {
          e.preventDefault();
          var what = ctl.dataset.reel;
          if (what === "next") { setRolling(false); go(at + 1); }
          else if (what === "prev") { setRolling(false); go(at - 1); }
          else if (what === "toggle") { setRolling(!rolling); }
          else if (what === "sound") {
            muted = !muted;
            soundBtn.textContent = muted ? "🔇 소리 켜기" : "🔊 소리 끄기";
            load(true);
          }
          return;
        }
        var b = e.target.closest && e.target.closest("[data-enter]");
        if (!b) return;
        e.preventDefault();
        if (opts.onEnter) opts.onEnter(b.dataset.enter || null);
      });

      /* start it: muted, because browsers refuse to autoplay with sound */
      at = 0;
      if (reduce) {
        setRolling(false);
        frame.src = embedSrc(reel[0].video, true, false);
        paint();
      } else {
        load(true);
        schedule();
      }

      /* stop()/start() so the video does not keep running out of sight */
      P.intro.stop = function () {
        clearTimeout(timer);
        if (live) { frame.removeAttribute("src"); live = false; }
      };
      P.intro.start = function () {
        if (live) return;
        load(!reduce);
        if (rolling) schedule();
      };
    },

    stop: function () {},
    start: function () {}
  };
})(window.PORTFOLIO);
