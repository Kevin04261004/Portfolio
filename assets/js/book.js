/* ============================================================
   BOOK — the bound-volume layout.

   Builds one sheet per entry in PORTFOLIO.pages, then handles the
   page turn, the flat "read it all" mode and the print/PDF picker.
   The entry screen it hands off to lives in intro.js. All of the copy
   it shows comes from the data files; this file only decides how the
   sheets move.
   ============================================================ */
(function (P) {
  "use strict";

  var R = P.render, pagesData = P.pages, N = pagesData.length;

  /* ---------------------------------------------------------- build sheets */
  var store = document.getElementById("store");
  store.innerHTML = pagesData.map(function (p) {
    return '<div class="pg" data-id="' + R.esc(p.id) + '">' + R.page(p) + "</div>";
  }).join("");
  var pages = [].slice.call(store.children);
  P.ask.mount(store);

  var book = document.getElementById("book"),
      slots = [document.getElementById("slot0"), document.getElementById("slot1")],
      leaf = document.getElementById("leaf"),
      lFront = document.getElementById("leafFront"),
      lBack = document.getElementById("leafBack"),
      shF = document.getElementById("shF"), shB = document.getElementById("shB"),
      counter = document.getElementById("counter"), ticks = document.getElementById("ticks"),
      nav = document.getElementById("nav"),
      prevBtn = document.getElementById("prevBtn"), nextBtn = document.getElementById("nextBtn");

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var PP = 2, base = 0, busy = false;

  function isSingle() { return window.innerWidth <= 820 || window.innerHeight < 520; }
  function applyMode() {
    PP = isSingle() ? 1 : 2;
    book.classList.toggle("is-single", PP === 1);
    base = Math.floor(base / PP) * PP;
  }
  function park(host) { var c = host.querySelector(".pg"); if (c) store.appendChild(c); }
  function put(host, i) {
    var c = host.querySelector(".pg");
    if (c === pages[i]) return;
    if (c) store.appendChild(c);
    if (i >= 0 && i < N) host.appendChild(pages[i]);
  }
  function litMeters(p, animate) {
    if (!p.querySelector(".steps")) return;
    if (!animate || reduce || document.body.classList.contains("flat")) P.interactions.litMeters(p);
    else P.interactions.animateMeters(p);
  }

  /* ---------- entrance: red CTAs drift up, project cards fade in ---------- */
  var animOn = [];
  function stripAnim(el) { el.classList.remove("rise-red", "soft-in"); el.style.removeProperty("--d"); }
  function clearAnim() { animOn.forEach(stripAnim); animOn = []; }
  function byTop(a, b) { return a.getBoundingClientRect().top - b.getBoundingClientRect().top; }
  function play(els, cls, from, step, cap) {
    if (reduce || document.body.classList.contains("flat") || !els.length) return;
    els.forEach(stripAnim);
    void els[0].offsetWidth;                     /* force the animation to restart */
    els.forEach(function (el, i) {
      el.classList.add(cls);
      el.style.setProperty("--d", Math.round(from + Math.min(i, cap === undefined ? 9999 : cap) * step) + "ms");
      animOn.push(el);
      el.addEventListener("animationend", function done() {
        el.removeEventListener("animationend", done); stripAnim(el);
      });
    });
  }
  var ENTRANTS = ".plink, .grid > .card";
  function preHide(p) {
    if (reduce || document.body.classList.contains("flat") || !p) return;
    [].forEach.call(p.querySelectorAll(ENTRANTS), function (el) {
      stripAnim(el); el.classList.add("pre-anim");
    });
    [].forEach.call(p.querySelectorAll(".steps"), function (el) { el.classList.remove("is-lit"); });
  }
  function reveal(p, animate) {
    if (!p) return;
    if (animate && !reduce && !document.body.classList.contains("flat")) {
      var btns = [].slice.call(p.querySelectorAll(".plink"));
      btns.sort(byTop);
      play(btns, "rise-red", 130, 95);
      play(P.interactions.shownCards(p), "soft-in", 90, 100);   /* one box every 0.1s */
    }
    litMeters(p, animate);
    /* drop the pre-hide only after the entrance classes are in place */
    [].forEach.call(p.querySelectorAll(".pre-anim"), function (el) { el.classList.remove("pre-anim"); });
  }

  function paint() {
    var a = base + 1, b = Math.min(base + PP, N);
    counter.innerHTML = (PP === 2 && b > a) ? ("<b>" + a + "–" + b + "</b> / " + N) : ("<b>" + a + "</b> / " + N);
    prevBtn.disabled = (base <= 0); nextBtn.disabled = (base + PP >= N);
    [].forEach.call(ticks.children, function (t, i) { t.classList.toggle("is-on", i >= base && i < base + PP); });
    [].forEach.call(nav.children, function (bt) {
      var s = +bt.dataset.i, e = bt.dataset.range ? +bt.dataset.range : s;
      bt.classList.toggle("is-on", base + PP > s && base <= e);
    });
  }

  var shownIdx = [];
  function render() {
    for (var k = 0; k < 2; k++) {
      if (PP === 1) { if (k === 0) park(slots[0]); else put(slots[1], base); }
      else put(slots[k], base + k);
    }
    clearAnim();
    var now = [];
    for (var j = 0; j < PP; j++) {
      var pi = base + j;
      if (pi >= N) continue;
      now.push(pi);
      var sc = pages[pi].querySelector(".pg__body");
      if (sc) sc.scrollTop = 0;
      reveal(pages[pi], shownIdx.indexOf(pi) < 0);
    }
    shownIdx = now;
    paint();
  }

  function setAngle(a) {
    leaf.style.transform = "rotateY(" + a + "deg)";
    var t = Math.min(Math.abs(a) / 180, 1);
    shF.style.opacity = t * 0.9; shB.style.opacity = (1 - t) * 0.85;
  }
  function prep(dir) {
    if (dir > 0) {
      put(lFront, base + PP - 1);
      put(lBack, base + PP);
      if (PP === 2) { put(slots[0], base); put(slots[1], base + PP + 1); }
      else park(slots[1]);
      if (base + PP < N) preHide(pages[base + PP]);
      if (PP === 2 && base + PP + 1 < N) preHide(pages[base + PP + 1]);
      setAngle(0);
    } else {
      put(lFront, base - 1);
      put(lBack, base);
      if (PP === 2) { put(slots[0], base - PP); put(slots[1], base + 1); }
      else park(slots[1]);
      if (base - 1 >= 0) preHide(pages[base - 1]);
      if (PP === 2 && base - PP >= 0) preHide(pages[base - PP]);
      setAngle(-180);
    }
    leaf.classList.add("is-live"); leaf.classList.remove("is-snap");
    document.body.classList.add("turning");
  }
  function finish(dir, commit) {
    busy = true;
    leaf.classList.add("is-snap");
    setAngle(dir > 0 ? (commit ? -180 : 0) : (commit ? 0 : -180));
    var fired = false;
    function done() {
      if (fired) return; fired = true;
      leaf.removeEventListener("transitionend", done);
      /* fill the slots while the leaf still covers them, then hide it in the same
         task — otherwise the outgoing page shows for one frame */
      if (commit) base += dir * PP;
      render();
      park(lFront); park(lBack);
      leaf.classList.remove("is-live", "is-snap");
      document.body.classList.remove("turning");
      busy = false;
    }
    if (reduce) { done(); return; }
    leaf.addEventListener("transitionend", done);
    setTimeout(done, 1000);
  }
  function goPage(i) {
    if (busy || i < 0 || i >= N) return;
    var nb = Math.floor(i / PP) * PP;
    if (nb === base) return;
    document.body.classList.add("turned");
    if (document.body.classList.contains("flat")) {
      base = nb; paint(); pages[i].scrollIntoView({ behavior: "smooth", block: "start" }); return;
    }
    if (Math.abs(nb - base) === PP) {
      var d = nb > base ? 1 : -1; prep(d);
      requestAnimationFrame(function () { requestAnimationFrame(function () { finish(d, true); }); });
    } else { base = nb; render(); }
  }
  function goById(id) {
    var i = R.deck().byId[id];
    if (i != null) goPage(i);
  }

  /* ---------------------------------------------------------- drag */
  var dragging = false, dir = 0, x0 = 0, y0 = 0, axis = null, W = 1, didDrag = false;
  function skip(t) { return t.closest && t.closest("a,button,input,textarea,select,.bot__log"); }
  book.addEventListener("pointerdown", function (e) {
    if (busy || document.body.classList.contains("flat")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (skip(e.target)) return;
    dragging = true; axis = null; x0 = e.clientX; y0 = e.clientY; dir = 0;
    W = (PP === 2 ? book.clientWidth / 2 : book.clientWidth) || 1;
  });
  window.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    var dx = e.clientX - x0, dy = e.clientY - y0;
    if (!axis) {
      if (Math.abs(dx) < 9 && Math.abs(dy) < 9) return;
      axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (axis === "y") { dragging = false; return; }
      dir = dx < 0 ? 1 : -1;
      if ((dir > 0 && base + PP >= N) || (dir < 0 && base <= 0)) { dragging = false; return; }
      document.body.classList.add("turned");
      prep(dir);
    }
    if (e.cancelable) e.preventDefault();
    var p = Math.min(Math.max(Math.abs(dx) / W, 0), 1);
    setAngle(dir > 0 ? -180 * p : -180 + 180 * p);
  }, { passive: false });
  function endDrag(e) {
    if (!dragging) return; dragging = false;
    if (axis !== "x") return;
    didDrag = true; setTimeout(function () { didDrag = false; }, 160);
    var dx = ((e && e.clientX) || x0) - x0;
    finish(dir, Math.min(Math.abs(dx) / W, 1) > 0.26);
  }
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);
  document.addEventListener("dragstart", function (e) { e.preventDefault(); });
  document.addEventListener("selectstart", function (e) {
    var t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
    e.preventDefault();
  });

  /* ---------------------------------------------------------- controls */
  prevBtn.addEventListener("click", function () { goPage(base - PP); });
  nextBtn.addEventListener("click", function () { goPage(base + PP); });
  document.addEventListener("keydown", function (e) {
    var a = document.activeElement;
    if (a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA")) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); goPage(base + PP); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); goPage(base - PP); }
    else if (e.key === "Home") { goPage(0); }
    else if (e.key === "End") { goPage(N - 1); }
  });
  book.addEventListener("wheel", function (e) {
    if (document.body.classList.contains("flat")) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) + 12) {
      if (e.cancelable) e.preventDefault();
      if (!busy) goPage(base + (e.deltaX > 0 ? PP : -PP));
    }
  }, { passive: false });

  P.interactions.bind({
    goto: goById,
    afterFilter: function (wrap) { play(P.interactions.shownCards(wrap), "soft-in", 0, 100); }
  });

  /* clicking the desk around the book turns to the next page */
  document.getElementById("stage").addEventListener("click", function (e) {
    if (didDrag || busy) return;
    if (document.body.classList.contains("flat")) return;
    if (e.target.closest(".book")) return;
    goPage(e.clientX < window.innerWidth / 2 ? base - PP : base + PP);
  });
  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      var was = PP; applyMode();
      if (was !== PP && !document.body.classList.contains("flat")) {
        park(lFront); park(lBack); leaf.classList.remove("is-live"); render();
      }
    }, 160);
  });

  /* ---------------------------------------------------------- nav + ticks */
  pagesData.forEach(function (m, i) {
    var t = document.createElement("button"); t.type = "button"; t.className = "tick";
    t.setAttribute("aria-label", (i + 1) + "쪽 " + (m.title || m.label));
    t.addEventListener("click", function () { goPage(i); });
    ticks.appendChild(t);
  });
  R.nav().forEach(function (o) {
    var b = document.createElement("button"); b.type = "button"; b.textContent = o.label;
    b.dataset.i = o.start;
    if (o.end !== o.start) b.dataset.range = o.end;
    b.addEventListener("click", function () { goPage(o.start); });
    nav.appendChild(b);
  });

  /* ---------------------------------------------------------- theme / mode */
  var root = document.documentElement, tb = document.getElementById("themeBtn");
  tb.addEventListener("click", function () {
    var night = root.getAttribute("data-theme") === "night";
    root.setAttribute("data-theme", night ? "day" : "night");
    tb.textContent = night ? "☾" : "☀";
  });
  var mb = document.getElementById("modeBtn");
  function flatten(on) {
    if (on) {
      park(slots[0]); park(slots[1]); park(lFront); park(lBack);
      leaf.classList.remove("is-live");
      pages.forEach(function (p) {
        var w = document.createElement("div"); w.className = "paper"; w.dataset.wrap = "1";
        w.appendChild(p); book.appendChild(w);
      });
      document.body.classList.add("flat"); mb.textContent = "📖 책으로 보기";
      P.interactions.litMeters(document);
    } else {
      [].slice.call(book.querySelectorAll('[data-wrap="1"]')).forEach(function (w) {
        var p = w.querySelector(".pg"); if (p) store.appendChild(p);
        w.remove();
      });
      document.body.classList.remove("flat"); mb.textContent = "☰ 전체보기";
      render();
    }
  }
  mb.addEventListener("click", function () { flatten(!document.body.classList.contains("flat")); });

  /* ---------------------------------------------------------- PDF modal */
  var modal = document.getElementById("pdfModal"),
      pdfGrid = document.getElementById("pdfGrid"),
      pdfPicker = document.getElementById("pdfPicker"),
      pdfCount = document.getElementById("pdfCount");
  document.getElementById("pdfAllN").textContent = N + "쪽";
  pagesData.forEach(function (m, i) {
    var l = document.createElement("label"); l.className = "pk";
    l.innerHTML = '<input type="checkbox" data-i="' + i + '"><span class="n">' +
      String(i + 1).padStart(2, "0") + '</span><span class="t"></span><span class="l"></span>';
    l.querySelector(".t").textContent = m.title || m.label;
    l.querySelector(".l").textContent = m.label;
    pdfGrid.appendChild(l);
  });
  function boxes() { return [].slice.call(pdfGrid.querySelectorAll("input")); }
  function scope() { return (document.querySelector('input[name="pdfscope"]:checked') || {}).value || "all"; }
  function selected() {
    var s = scope();
    if (s === "all") return pagesData.map(function (_, i) { return i; });
    if (s === "cur") { var a = []; for (var i = base; i < Math.min(base + PP, N); i++) a.push(i); return a; }
    return boxes().filter(function (b) { return b.checked; }).map(function (b) { return +b.dataset.i; });
  }
  function refresh() {
    pdfPicker.hidden = (scope() !== "pick");
    var n = selected().length;
    pdfCount.textContent = n ? ("선택 " + n + "쪽") : "선택된 쪽이 없습니다";
    document.getElementById("pdfGo").disabled = (n === 0);
  }
  [].forEach.call(document.querySelectorAll('input[name="pdfscope"]'), function (r) {
    r.addEventListener("change", refresh);
  });
  pdfGrid.addEventListener("change", refresh);
  [].forEach.call(document.querySelectorAll(".picker__tools button"), function (b) {
    b.addEventListener("click", function () {
      var on = b.dataset.all === "1";
      boxes().forEach(function (x) { x.checked = on; });
      refresh();
    });
  });
  function openModal() {
    var a = base + 1, b = Math.min(base + PP, N);
    document.getElementById("pdfCurN").textContent = (b > a ? ("P." + a + "–" + b) : ("P." + a));
    if (scope() === "pick" && !selected().length) boxes().forEach(function (x) { x.checked = true; });
    modal.hidden = false; refresh();
    setTimeout(function () { var f = modal.querySelector("input"); if (f) f.focus(); }, 30);
  }
  function closeModal() { modal.hidden = true; }
  document.getElementById("printBtn").addEventListener("click", openModal);
  document.getElementById("pdfClose").addEventListener("click", closeModal);
  document.getElementById("pdfCancel").addEventListener("click", closeModal);
  modal.addEventListener("mousedown", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  var restoreBook = false;
  document.getElementById("pdfGo").addEventListener("click", function () {
    var list = selected(); if (!list.length) return;
    closeModal();
    restoreBook = !document.body.classList.contains("flat");
    if (restoreBook) flatten(true);
    var wraps = [].slice.call(book.querySelectorAll('[data-wrap="1"]'));
    wraps.forEach(function (w, i) {
      w.classList.remove("is-lastprint");
      if (list.indexOf(i) > -1) w.dataset.sel = "1"; else w.removeAttribute("data-sel");
    });
    var last = list[list.length - 1];
    if (wraps[last]) wraps[last].classList.add("is-lastprint");
    document.body.classList.add("printsel");
    setTimeout(function () { window.print(); }, 180);
  });
  function afterPrint() {
    if (!document.body.classList.contains("printsel")) return;
    document.body.classList.remove("printsel");
    [].forEach.call(book.querySelectorAll('[data-wrap="1"]'), function (w) {
      w.removeAttribute("data-sel"); w.classList.remove("is-lastprint");
    });
    if (restoreBook) { flatten(false); restoreBook = false; }
  }
  window.addEventListener("afterprint", afterPrint);
  if (window.matchMedia) {
    var mq = window.matchMedia("print");
    if (mq.addEventListener) mq.addEventListener("change", function (e) { if (!e.matches) afterPrint(); });
  }

  /* ---------------------------------------------------------- entry screen */
  var intro = document.getElementById("intro"), entered = false;

  /* pageId lets a reader open the book straight at the game they clicked */
  function enterBook(pageId) {
    var target = pageId ? R.deck().byId[pageId] : 0;
    if (target == null) target = 0;
    if (entered) { goPage(target); return; }
    entered = true;
    intro.classList.add("is-open");
    document.body.classList.add("entered");
    base = Math.floor(target / PP) * PP;
    if (base > 0) document.body.classList.add("turned");
    shownIdx = []; setTimeout(function () { render(); }, reduce ? 0 : 380);
    setTimeout(function () { intro.classList.add("is-gone"); }, reduce ? 0 : 900);
  }
  function exitBook() {
    if (!entered) return; entered = false;
    if (document.body.classList.contains("flat")) flatten(false);
    intro.classList.remove("is-gone");
    document.body.classList.remove("entered");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { intro.classList.remove("is-open"); });
    });
  }
  P.intro.mount(intro, { onEnter: enterBook });
  document.getElementById("homeBtn").addEventListener("click", exitBook);

  applyMode();
  render();
})(window.PORTFOLIO);
