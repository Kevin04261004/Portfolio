/* ============================================================
   DOCUMENT — a second layout over the same content.

   It loads the identical data and renderer as the book and asks for
   the same page HTML; the only difference is that it stacks the
   pages in one scroll instead of binding them. Roughly forty lines
   of layout code is the whole cost of a new presentation.
   ============================================================ */
(function (P) {
  "use strict";

  var R = P.render, doc = document.getElementById("doc"), nav = document.getElementById("dnav");
  var deck = R.deck();

  /* ---------------------------------------------------------- sections */
  doc.innerHTML = P.pages.map(function (p, i) {
    return '<section class="dsec' + (p.blocks.length === 1 && p.blocks[0].t === "cover" ? " dsec--cover" : "") +
      '" id="sec-' + R.esc(p.id) + '"' + ' data-i="' + i + '">' +
      '<div class="dsec__num"><b>' + String(i + 1).padStart(2, "0") + "</b> / " +
      String(deck.count).padStart(2, "0") + "<span>" + R.esc(p.title) + "</span></div>" +
      /* same call the book makes -- the running footer is the one thing a
         continuous document does not need */
      R.page(p, { foot: false }) +
      "</section>";
  }).join("");

  P.ask.mount(doc);
  P.interactions.litMeters(doc);

  function goById(id) {
    var el = document.getElementById("sec-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  P.interactions.bind({ goto: goById });

  /* ---------------------------------------------------------- chapter nav */
  var navBtns = R.nav().map(function (g) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = g.label;
    b.addEventListener("click", function () { goById(P.pages[g.start].id); });
    nav.appendChild(b);
    return { el: b, group: g };
  });

  var sections = [].slice.call(doc.children);
  function markCurrent() {
    var line = window.innerHeight * 0.35, cur = 0;
    sections.forEach(function (s, i) {
      if (s.getBoundingClientRect().top <= line) cur = i;
    });
    navBtns.forEach(function (n) {
      n.el.classList.toggle("is-on", cur >= n.group.start && cur <= n.group.end);
    });
  }
  var tick = false;
  window.addEventListener("scroll", function () {
    if (tick) return;
    tick = true;
    requestAnimationFrame(function () { markCurrent(); tick = false; });
  }, { passive: true });
  markCurrent();

  /* ---------------------------------------------------------- theme */
  var root = document.documentElement, tb = document.getElementById("themeBtn");
  tb.addEventListener("click", function () {
    var night = root.getAttribute("data-theme") === "night";
    root.setAttribute("data-theme", night ? "day" : "night");
    tb.textContent = night ? "☾" : "☀";
  });
  document.getElementById("printBtn").addEventListener("click", function () { window.print(); });
})(window.PORTFOLIO);
