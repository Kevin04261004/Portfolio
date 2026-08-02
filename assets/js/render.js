/* ============================================================
   RENDER — blocks in, HTML out.

   This is the only place that knows what a block looks like. It has
   no opinion about where the HTML ends up: a bound page, a scrolling
   document, a print sheet, a slide. Layouts call PORTFOLIO.render.page()
   (or .blocks() for just the material) and wrap the result themselves.

   The deck model below derives chapters, page numbers, the table of
   contents and the top-level nav from PORTFOLIO.pages, so those stay
   correct when pages are added, removed or reordered.
   ============================================================ */
(function (P) {
  "use strict";

  /* ---------------------------------------------------------- helpers */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function attr(name, value) {
    return value == null || value === false ? "" : " " + name + '="' + esc(value) + '"';
  }
  function join(list, fn) { return list.map(fn).join(""); }
  function pad(n) { return String(n).padStart(2, "0"); }

  var ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  /* an <a> that leaves the site opens in a new tab */
  function anchor(item, cls, inner) {
    return "<a" + (cls ? ' class="' + cls + '"' : "") + attr("href", item.href) +
      (item.external ? ' target="_blank" rel="noopener"' : "") + ">" + inner + "</a>";
  }

  /* ---------------------------------------------------------- deck model */
  /* Groups consecutive pages that share a chapter. A page with no chapter
     (the cover) forms a group of its own, labelled with its own label. */
  function buildDeck(pages) {
    var groups = [];
    pages.forEach(function (p, i) {
      var key = p.chapter || p.label;
      var last = groups[groups.length - 1];
      if (last && last.label === key) last.pages.push(i);
      else groups.push({ label: key, pages: [i] });
    });

    var byId = {};
    var meta = pages.map(function (p, i) { byId[p.id] = i; return { page: p, n: i + 1 }; });

    groups.forEach(function (g) {
      g.start = g.pages[0];
      g.end = g.pages[g.pages.length - 1];
      g.pages.forEach(function (pi, k) {
        meta[pi].group = g;
        meta[pi].inChapter = k + 1;
        meta[pi].chapterOf = g.pages.length;
      });
    });

    return { pages: pages, groups: groups, meta: meta, byId: byId, count: pages.length };
  }

  var deck = null;
  function D() { return deck || (deck = buildDeck(P.pages)); }

  /* Chapters worth listing in a table of contents: everything past the
     contents page itself. */
  function tocGroups() {
    var d = D();
    var tocIndex = d.byId.toc;
    return d.groups.filter(function (g) {
      return tocIndex == null ? g.start > 0 : g.start > tocIndex;
    });
  }

  /* ---------------------------------------------------------- game index */
  /* The play video a page links to.

     These are recordings of demos and presentations, so second 0 is
     usually a title card. `highlight` (seconds, on the phead block) says
     where the game actually starts showing; without one, a video is not
     worth playing unattended, and `hasHighlight` lets the entry screen
     keep it out of the unattended rotation. */
  function videoIn(page) {
    var found = null, highlight = null;
    page.blocks.forEach(function (b) {
      if (b.t === "phead" && b.highlight != null) highlight = b.highlight;
      var items = b.t === "links" ? b.items : (b.t === "vibe" ? b.links : null);
      if (!items || found) return;
      items.forEach(function (l) {
        if (found) return;
        var m = l.href.match(/youtube\.com\/watch\?v=([\w-]+)/);
        if (!m) return;
        var t = l.href.match(/[?&]t=(\d+)/);
        found = { id: m[1], start: t ? +t[1] : 0, href: l.href };
      });
    });
    if (found) {
      if (highlight != null) found.start = highlight;
      found.hasHighlight = found.start > 0;
    }
    return found;
  }

  /* Everything that is a game, pulled out of the pages that describe one.
     Used by the entry screen; nothing here is authored twice. */
  function games() {
    var out = [];
    D().pages.forEach(function (p, i) {
      p.blocks.forEach(function (b) {
        if (b.t === "phead") {
          out.push({
            id: p.id, index: i, title: b.title, genre: b.genre,
            year: (b.period.match(/\d{4}/) || [""])[0],
            period: b.period, duration: b.duration,
            context: b.context.join(" · "),
            stack: b.tags.filter(function (t) { return !t.kind; })
              .map(function (t) { return t.text; }).join(" · "),
            roles: b.tags.filter(function (t) { return t.kind === "role"; })
              .map(function (t) { return t.text; }),
            award: (b.tags.filter(function (t) { return t.kind === "win"; })[0] || {}).text || null,
            video: videoIn(p),
            wip: false
          });
        } else if (b.t === "vibe") {
          out.push({
            id: p.id, index: i, title: b.title, genre: b.genre,
            year: "", period: "", duration: "",
            context: b.sub.replace(/^·\s*/, ""),
            stack: b.tags.slice(0, 2).join(" · "),
            roles: ["개인 개발"],
            award: null,
            video: videoIn(p),          /* null: it links a playable build, not a video */
            play: (b.links[0] || {}).href || null,
            status: b.status.replace(/^●\s*/, ""),
            wip: true
          });
        }
      });
    });
    return out;
  }

  /* Counts the entry screen quotes, derived rather than kept in sync by hand. */
  function tally() {
    var g = games(), roles = {};
    g.forEach(function (x) {
      if (x.wip) return;
      x.roles.forEach(function (r) { roles[r] = (roles[r] || 0) + 1; });
    });
    var soloCards = 0;
    D().pages.forEach(function (p) {
      p.blocks.forEach(function (b) { if (b.t === "cards") soloCards += b.items.length; });
    });
    return {
      team: g.filter(function (x) { return !x.wip; }).length,
      wip: g.filter(function (x) { return x.wip; }).length,
      solo: soloCards,
      roles: roles
    };
  }

  /* ---------------------------------------------------------- blocks */
  var block = {};

  block.cover = function () {
    var pr = P.profile;
    var contacts = pr.contactOrder.map(function (k) { return pr.contact[k]; });
    return '<div class="cover"><div>' +
      '<div class="cover__eyebrow">' + pr.eyebrow + "</div>" +
      '<h1 class="cover__name">' + esc(pr.name) + "<span>" + esc(pr.nameLatin) + "</span></h1>" +
      '<div class="cover__role">' + esc(pr.role) + "</div>" +
      '<p class="cover__thesis">' + pr.thesis + "</p>" +
      '<div class="chips">' + join(pr.chips, function (c) {
        return '<span class="chip">' + esc(c) + "</span>";
      }) + "</div>" +
      contactList(contacts) +
      "</div>" +
      '<figure class="cover__photo"><img' + attr("src", pr.photo.src) + attr("alt", pr.photo.alt) + "></figure>" +
      "</div>";
  };

  function contactList(items) {
    return '<div class="contact">' + join(items, function (c) {
      return anchor(c, null, "<i>" + esc(c.label) + "</i> " + esc(c.text));
    }) + "</div>";
  }

  block.contact = function (b) {
    var pr = P.profile;
    return contactList((b.order || pr.contactOrder).map(function (k) { return pr.contact[k]; }));
  };

  block.h = function (b) { return '<h2 class="h">' + esc(b.text) + "</h2>"; };
  block.h3 = function (b) { return '<h3 class="h3">' + esc(b.text) + "</h3>"; };
  block.endmark = function (b) { return '<h2 class="endmark">' + esc(b.text) + "</h2>"; };

  block.sub = function (b) {
    var cls = "sub" + (b.variant ? " sub--" + b.variant : "");
    return '<p class="' + cls + '">' + b.html.replace(/\{\{count\}\}/g, D().count) + "</p>";
  };

  block.toc = function () {
    var d = D();
    return join(tocGroups(), function (g, gi) {
      var range = g.start === g.end ? pad(g.start + 1) : pad(g.start + 1) + "—" + pad(g.end + 1);
      return '<div class="tocg">' +
        '<div class="tocg__h">' +
        '<span class="tocg__n">' + (ROMAN[gi] || gi + 1) + "</span>" +
        '<span class="tocg__t">' + esc(g.label) + "</span>" +
        '<span class="tocg__c">' + range + "</span></div>" +
        '<div class="tocl">' + join(g.pages, function (pi) {
          var p = d.pages[pi];
          return '<button type="button"' + attr("data-goto", p.id) + ">" +
            '<span class="toc__t">' + esc(p.title) + "</span>" +
            '<span class="lead"></span>' +
            '<span class="toc__p">' + pad(pi + 1) + "</span></button>";
        }) + "</div></div>";
    });
  };

  block.hire = function (b) {
    return '<div class="hire">' + join(b.cells, function (c) {
      return '<div class="hire__cell"><div class="hire__k">' + esc(c.k) + "</div>" +
        '<div class="hire__v">' + esc(c.v) +
        (c.note ? "<span>" + esc(c.note) + "</span>" : "") + "</div></div>";
    }) + "</div>";
  };

  block.ledger = function (b) {
    return '<div class="ledger">' + join(b.cols, function (col) {
      return '<div class="led"><div class="led__t">' + esc(col.title) + "</div>" +
        join(col.rows, function (r) {
          return '<div class="led__row"><span class="led__d">' + esc(r.d) + "</span>" +
            '<span class="led__v">' + r.v + "</span></div>";
        }) + "</div>";
    }) + "</div>";
  };

  block.fsm = function (b) {
    var track = b.nodes.map(function (n) {
      return '<button class="node' + (n.drop ? " node--drop" : "") + '" type="button"' +
        attr("data-goto", n.goto) + attr("data-state", n.state) + ">" +
        '<div class="node__top"><span>' + esc(n.step) + "</span><b>" + esc(n.date) + "</b></div>" +
        '<div class="node__in"><div class="node__k">' + esc(n.state) + "</div>" +
        '<div class="node__d">' + n.desc + "</div></div></button>";
    }).join('<div class="wireseg"></div>');
    return '<div class="fsm">' +
      '<div class="fsm__bar"><b>' + esc(b.title) + "</b><span>" + esc(b.sub) + "</span>" +
      '<span class="fsm__read">' + esc(b.read) + "</span></div>" +
      '<div class="fsm__body"><div class="fsm__track">' + track + "</div></div>" +
      '<div class="fsm__foot">' + esc(b.foot) + "</div></div>";
  };

  function tags(list, extraClass) {
    return '<div class="pmeta' + (extraClass ? " " + extraClass : "") + '">' + join(list, function (t) {
      var o = typeof t === "string" ? { text: t } : t;
      return '<span class="tag' + (o.kind ? " tag--" + o.kind : "") + '">' + esc(o.text) + "</span>";
    }) + "</div>";
  }

  /* "학기작 프로젝트 · 스타일리쉬 액션 · 2024.08 — 2024.12 · 15주"
     Stored in parts so other views can pick out just the year or the genre. */
  function pheadMeta(b) {
    return b.context.concat([b.period, b.duration]).join(" · ");
  }

  block.phead = function (b) {
    return '<div class="phead">' + tags(b.tags) +
      '<h2 class="phead__t">' + esc(b.title) + "</h2>" +
      '<div class="phead__s">' + esc(pheadMeta(b)) + "</div>" +
      '<p class="phead__one">' + b.lead + "</p></div>";
  };

  block.shot = function (b) {
    return '<img class="pshot"' + attr("src", b.src) + attr("alt", b.alt) + ' loading="lazy">';
  };

  block.links = function (b) { return linkRow(b.items, b.variant); };

  function linkRow(items, variant) {
    return '<div class="links' + (variant ? " links--" + variant : "") + '">' +
      join(items, function (l) {
        return anchor(l, "plink" + (l.ghost ? " plink--ghost" : ""),
          "<i>" + esc(l.icon) + "</i> " + esc(l.text));
      }) + "</div>";
  }

  block.blk = function (b) {
    var out = "";
    b.body.forEach(function (part) {
      if (part.k === "list") {
        out += "<ul>" + join(part.items, function (li) { return "<li>" + li + "</li>"; }) + "</ul>";
      } else if (part.k === "h5") {
        out += "<h5>" + esc(part.text) + "</h5>";
      } else if (part.k === "p") {
        out += "<p>" + part.html + "</p>";
      } else if (part.k === "quote") {
        out += '<div class="quote">' + esc(part.text) + "</div>";
      }
    });
    return '<div class="blk"><h4 class="blk__h">' + esc(b.h) + "</h4>" + out + "</div>";
  };

  function decs(items) {
    return '<div class="decs">' + join(items, function (d) {
      return '<div class="dec"><div class="dec__n">' + esc(d.n) + "</div>" +
        '<h4 class="dec__t">' + esc(d.title) + "</h4>" +
        '<p class="dec__d">' + d.desc + "</p></div>";
    }) + "</div>";
  }

  block.decs = function (b) { return decs(b.items); };

  block.vibe = function (b) {
    return '<div class="vibe">' +
      '<div class="vibe__bar"><b>' + esc(b.title) + "</b><span>" + esc(b.sub) + "</span>" +
      '<span class="vibe__st">' + esc(b.status) + "</span></div>" +
      '<div class="vibe__body"><div class="vibe__lead">' +
      join(b.lead, function (p) { return "<p>" + p + "</p>"; }) +
      tags(b.tags, "pmeta--inline") + linkRow(b.links) + "</div>" +
      decs(b.decs) + "</div>" +
      '<div class="vibe__foot">' + b.foot + "</div></div>";
  };

  block.filters = function (b) {
    return '<div class="filters">' + join(b.items, function (f) {
      return '<button class="filt' + (f.on ? " is-on" : "") + '"' + attr("data-f", f.f) +
        ' type="button">' + esc(f.label) + "</button>";
    }) + "</div>";
  };

  block.cards = function (b) {
    var lead = b.variant === "lead";
    return '<div class="grid' + (b.dense ? " grid--dense" : "") +
      (lead ? " grid--lead" : "") + '">' + join(b.items, function (c) {
        var body = "<img" + attr("src", c.img) + attr("alt", c.alt) + ' loading="lazy">' +
          '<div class="card__in"><h3 class="card__t">' + esc(c.title) + "</h3>" +
          '<div class="card__s">' + esc(c.meta) + "</div>" +
          '<p class="card__d">' + c.desc + "</p>";

        /* A lead card carries a second link to the source, so it cannot be one
           big anchor — the links sit inside a plain container instead. */
        if (!lead) {
          return '<a class="card"' + attr("data-k", c.k) + attr("href", c.href) +
            (c.external ? ' target="_blank" rel="noopener"' : "") + ">" + body +
            '<span class="card__go">' + esc(c.go) + "</span></div></a>";
        }
        return '<div class="card card--lead"' + attr("data-k", c.k) + ">" + body +
          '<div class="card__links">' +
          anchor({ href: c.href, external: c.external }, "card__go", esc(c.go)) +
          (c.repo
            ? anchor({ href: c.repo, external: true }, "card__go card__go--ghost", "&lt;/&gt; 코드")
            : "") +
          "</div></div></div>";
      }) + "</div>";
  };

  block.skills = function (b) {
    return '<div class="skills">' + join(b.groups, function (g) {
      return '<div class="sgrp"><div class="sgrp__t">' + esc(g.title) + "</div>" +
        join(g.rows, function (r) {
          var mark = r.icon
            ? "<img" + attr("src", r.icon) + ' alt="">'
            : '<span class="badge">' + esc(r.badge) + "</span>";
          var steps = "";
          for (var i = 0; i < 3; i++) steps += '<i class="' + (i < r.level ? "on" : "") + '"></i>';
          return '<div class="srow' + (r.hi ? " srow--hi" : "") + '">' + mark +
            '<span class="srow__n">' + esc(r.name) + "</span>" +
            '<span class="steps">' + steps + "</span>" +
            '<span class="srow__v">' + esc(r.label) + "</span></div>";
        }) + "</div>";
    }) + "</div>";
  };

  block.certs = function (b) {
    return '<div class="certs">' + join(b.items, function (c) {
      return '<div class="cert"><img' + attr("src", c.img) + attr("alt", c.alt) + ' loading="lazy">' +
        '<div class="cert__in"><div class="cert__d">' + esc(c.date) + "</div>" +
        '<h3 class="cert__t">' + esc(c.title) + "</h3>" +
        '<p class="cert__x">' + c.desc + "</p></div></div>";
    }) + "</div>";
  };

  block.ask = function (b) {
    return '<div class="bot">' +
      '<div class="bot__bar"><b>' + esc(b.title) + "</b><span>" + esc(b.sub) + "</span>" +
      '<span class="bot__st">' + esc(b.status) + "</span></div>" +
      '<div class="bot__log" aria-live="polite"></div>' +
      '<div class="bot__chips"></div>' +
      '<form class="bot__in">' +
      '<label class="vh">질문 입력<input type="text" autocomplete="off"' +
      attr("placeholder", b.placeholder) + "></label>" +
      "<button type=\"submit\">" + esc(b.send) + "</button></form>" +
      '<div class="bot__foot">' + b.foot + "</div></div>";
  };

  block.credit = function (b) {
    return '<div class="credit"><div class="credit__t">' + esc(b.title) + "</div>" +
      '<p class="credit__p">' + b.html + "</p></div>";
  };

  block.raw = function (b) { return b.html; };

  /* ---------------------------------------------------------- public */
  function renderBlocks(blocks) {
    return join(blocks, function (b) {
      var fn = block[b.t];
      if (!fn) throw new Error("render: unknown block type " + b.t);
      return fn(b);
    });
  }

  /* One page, header and footer included. `opts.head`/`opts.foot` can be
     set false by layouts that supply their own furniture. */
  function renderPage(page, opts) {
    opts = opts || {};
    var d = D();
    var i = d.byId[page.id];
    var m = d.meta[i];
    var bare = page.blocks.length === 1 && page.blocks[0].t === "cover";

    var html = "";
    if (opts.head !== false && page.chapter) {
      html += '<div class="pg__head"><span class="pg__ch">' + esc(page.chapter) + "</span>" +
        (m.chapterOf > 1
          ? '<span class="pg__ix">' + pad(m.inChapter) + " / " + pad(m.chapterOf) + "</span>"
          : "") + "</div>";
    }

    var body = renderBlocks(page.blocks);
    html += bare ? body : '<div class="pg__body">' + body + "</div>";

    if (opts.foot !== false) {
      html += '<div class="pg__foot"><span>' + esc(P.profile.runningFoot) + "</span>" +
        '<span class="rt"><b>' + pad(i + 1) + "</b> / " + pad(d.count) + "</span></div>";
    }
    return html;
  }

  P.render = {
    esc: esc,
    page: renderPage,
    blocks: renderBlocks,
    block: block,
    deck: D,
    tocGroups: tocGroups,
    games: games,
    tally: tally,
    /* top-level nav model: one entry per chapter group */
    nav: function () {
      return D().groups.map(function (g) {
        return { label: g.label, start: g.start, end: g.end };
      });
    }
  };
})(window.PORTFOLIO);
