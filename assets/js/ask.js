/* ============================================================
   ASK — behaviour for the offline Q&A block.

   Binds to every .bot element it is given, so a layout can show the
   block once, twice or not at all. Answers come from PORTFOLIO.qa;
   nothing here talks to the network.
   ============================================================ */
(function (P) {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function norm(s) {
    return (s || "").toLowerCase().replace(/[\s.,!?~'"()[\]]/g, "");
  }

  /* Score every entry by how much of its trigger vocabulary the question
     contains; longer matches count for more. */
  function reply(raw) {
    var qa = P.qa, q = norm(raw), best = null, bs = 0;
    for (var i = 0; i < qa.entries.length; i++) {
      var e = qa.entries[i], s = 0;
      for (var j = 0; j < e.k.length; j++) {
        var kw = norm(e.k[j]);
        if (kw.length > 1 && q.indexOf(kw) > -1) s += kw.length;
      }
      if (s > bs) { bs = s; best = e; }
    }
    return (best && bs >= 2) ? best.a : qa.fallback;
  }

  function mountOne(bot) {
    if (bot.dataset.askReady) return;
    bot.dataset.askReady = "1";

    var qa = P.qa;
    var log = bot.querySelector(".bot__log"),
        chipBox = bot.querySelector(".bot__chips"),
        form = bot.querySelector(".bot__in"),
        input = form.querySelector("input");

    function push(label, html, cls) {
      var d = document.createElement("div");
      d.className = "msg msg--" + cls;
      d.innerHTML = '<div class="msg__who">' + label + '</div><div class="msg__b">' + html + "</div>";
      log.appendChild(d);
      log.scrollTop = log.scrollHeight;
      return d;
    }

    /* typewriter — keeps the answer's HTML structure (bold, lists, links)
       intact and only reveals the characters in order */
    var typing = null;
    function finishTyping() { if (typing) typing.stop(true); }

    function typeInto(box, html) {
      if (reduce) { box.innerHTML = html; log.scrollTop = log.scrollHeight; return; }
      box.innerHTML = "";
      var src = document.createElement("div");
      src.innerHTML = html;
      var ops = [], total = 0;
      (function walk(from, to) {
        for (var n = from.firstChild; n; n = n.nextSibling) {
          if (n.nodeType === 3) {
            ops.push([to, document.createTextNode(""), n.nodeValue]);
            total += n.nodeValue.length;
          } else if (n.nodeType === 1) {
            var el = n.cloneNode(false);
            ops.push([to, el, null]);
            walk(n, el);
          }
        }
      })(src, box);

      box.classList.add("is-typing");
      var i = 0, pos = 0, step = Math.max(1, Math.ceil(total / 170)), timer = null;

      function stop(fill) {
        if (timer) { clearInterval(timer); timer = null; }
        if (fill) box.innerHTML = html;
        box.classList.remove("is-typing");
        if (typing && typing.box === box) typing = null;
        log.scrollTop = log.scrollHeight;
      }
      typing = { box: box, stop: stop };

      timer = setInterval(function () {
        var budget = step;
        while (budget > 0) {
          if (i >= ops.length) { stop(false); return; }
          var op = ops[i];
          if (op[2] === null) { op[0].appendChild(op[1]); i++; continue; }
          if (!op[1].parentNode) op[0].appendChild(op[1]);
          var take = Math.min(budget, op[2].length - pos);
          pos += take; budget -= take;
          op[1].nodeValue = op[2].slice(0, pos);
          if (pos >= op[2].length) { i++; pos = 0; }
        }
        log.scrollTop = log.scrollHeight;
      }, 16);
    }

    function ask(raw) {
      if (!raw || !raw.trim()) return;
      finishTyping();
      push(qa.youLabel, raw.replace(/</g, "&lt;"), "you");
      var t = push(qa.botLabel, '<span class="dots"><i></i><i></i><i></i></span>', "bot");
      var html = reply(raw);
      setTimeout(function () { typeInto(t.querySelector(".msg__b"), html); }, reduce ? 0 : 400);
    }

    log.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) return;
      finishTyping();
    });

    qa.chips.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = c;
      b.addEventListener("click", function () { ask(c); });
      chipBox.appendChild(b);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value;
      input.value = "";
      ask(v);
    });

    push(qa.botLabel, qa.greeting, "bot");
  }

  P.ask = {
    reply: reply,
    mount: function (root) {
      var scope = root || document;
      [].forEach.call(scope.querySelectorAll(".bot"), mountOne);
    }
  };
})(window.PORTFOLIO);
