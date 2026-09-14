/* ============================================================
   INTERACTIONS — behaviour that belongs to the content blocks
   themselves rather than to any one layout.

   The filter row, the state-machine readout and the skill meters
   work the same whether the block sits on a bound page or in a
   scrolling document. Navigation is injected: each layout decides
   what "go to page X" means for it.
   ============================================================ */
(function (P) {
  "use strict";

  function litMeters(scope) {
    [].forEach.call((scope || document).querySelectorAll(".steps"), function (el) {
      el.classList.add("is-lit");
    });
  }

  /* meters fill left to right, staggered, when a page arrives */
  function animateMeters(scope, delay) {
    var s = (scope || document).querySelectorAll(".steps");
    [].forEach.call(s, function (el) { el.classList.remove("is-lit"); });
    [].forEach.call(s, function (el, k) {
      setTimeout(function () { el.classList.add("is-lit"); }, (delay || 240) + k * 55);
    });
  }

  /* ---------------------------------------------------------- play */
  /* A project picture swaps itself for the embed when clicked. One video
     plays at a time, and a layout that moves a page out of view calls
     closePlayers so a parked iframe cannot keep talking. Privacy-preserving
     host, same as the entry screen. */
  var EMBED = "https://www.youtube-nocookie.com/embed/";

  function closePlayers(scope) {
    [].forEach.call((scope || document).querySelectorAll(".pplay.is-live"), function (el) {
      var f = el.querySelector(".pplay__v");
      if (f) f.parentNode.removeChild(f);
      el.classList.remove("is-live");
    });
  }

  function openPlayer(btn) {
    if (btn.classList.contains("is-live")) return;
    closePlayers(document);
    var f = document.createElement("iframe");
    f.className = "pplay__v";
    f.src = EMBED + encodeURIComponent(btn.dataset.video) +
      "?autoplay=1&rel=0&modestbranding=1&playsinline=1" +
      (btn.dataset.start ? "&start=" + encodeURIComponent(btn.dataset.start) : "");
    f.title = btn.getAttribute("aria-label") || "플레이 영상";
    f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.referrerPolicy = "strict-origin-when-cross-origin";
    f.setAttribute("allowfullscreen", "");
    btn.appendChild(f);
    btn.classList.add("is-live");
  }

  function shownCards(scope) {
    return [].slice.call(scope.querySelectorAll(".grid > .card"))
      .filter(function (c) { return c.style.display !== "none"; });
  }

  /* opts.goto(id)      — called when a [data-goto] element is activated
     opts.afterFilter(scope) — called after a filter changes what is visible */
  function bind(opts) {
    opts = opts || {};
    var root = opts.root || document;

    if (opts.goto) {
      root.addEventListener("click", function (e) {
        var t = e.target.closest && e.target.closest("[data-goto]");
        if (!t) return;
        e.preventDefault();
        opts.goto(t.dataset.goto);
      });
    }

    root.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".filt");
      if (!b) return;
      /* a filter row only governs the grid inside its own block scope */
      var wrap = b.closest(".pg") || b.closest("section") || root;
      [].forEach.call(wrap.querySelectorAll(".filt"), function (x) { x.classList.remove("is-on"); });
      b.classList.add("is-on");
      var f = b.dataset.f;
      [].forEach.call(wrap.querySelectorAll(".card"), function (c) {
        c.style.display = (f === "all" || (c.dataset.k || "").indexOf(f) > -1) ? "" : "none";
      });
      if (opts.afterFilter) opts.afterFilter(wrap);
    });

    root.addEventListener("click", function (e) {
      var p = e.target.closest && e.target.closest(".pplay");
      if (!p || p.classList.contains("is-live")) return;
      e.preventDefault();
      openPlayer(p);
    });

    root.addEventListener("mouseover", function (e) {
      var n = e.target.closest && e.target.closest(".node");
      if (!n) return;
      var f = n.closest(".fsm");
      if (!f) return;
      var r = f.querySelector(".fsm__read");
      if (r) r.textContent = "STATE ▸ " + n.dataset.state;
    });
  }

  P.interactions = {
    bind: bind,
    closePlayers: closePlayers,
    litMeters: litMeters,
    animateMeters: animateMeters,
    shownCards: shownCards
  };
})(window.PORTFOLIO);
