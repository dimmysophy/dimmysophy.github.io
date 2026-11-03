(function () {
  "use strict";

  var S = window.SITE;
  var P = S.profile;

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function $(id) { return document.getElementById(id); }
  function has(x) { return Array.isArray(x) ? x.length > 0 : !!x; }

  var ICONS = {
    mail: '<path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><path d="M2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
    scholar: '<path d="m12 3 10 6-10 6L2 9z"/><path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/>',
    orcid: '<circle cx="12" cy="12" r="10"/><path d="M8.5 10v7M8.5 7v.01M12 10v7h2.5a3.5 3.5 0 0 0 0-7z"/>',
    researchgate: '<circle cx="12" cy="12" r="10"/><path d="M9 17V7h3a3 3 0 0 1 0 6H9m3 0 3 4"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    link: '<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4"/>',
    quote: '<path d="M7 7h4v4c0 3-2 5-4 6M15 7h4v4c0 3-2 5-4 6"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
    file: '<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function icon(name) {
    return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + "</svg>";
  }

  // Bold the site owner's name in author lists; mark corresponding author with *
  function formatAuthors(pub) {
    var out = esc(pub.authors);
    (P.authorAliases || []).forEach(function (a) {
      var safe = esc(a);
      out = out.split(safe).join("<strong>" + safe + (pub.corresponding ? "<sup>*</sup>" : "") + "</strong>");
    });
    return out;
  }

  function bibtex(pub) {
    var kind = pub.type === "conference" ? "inproceedings" : pub.type === "preprint" ? "misc" : "article";
    var authors = pub.authors.replace(/,?\s*(…|et al\.?)\s*,?/g, ", ").split(/,\s*/)
      .filter(Boolean).join(" and ");
    if (/…|et al/.test(pub.authors)) authors += " and others";
    var f = [["title", pub.title], ["author", authors]];
    f.push([kind === "inproceedings" ? "booktitle" : "journal", pub.venue]);
    if (pub.volume) f.push(["volume", pub.volume]);
    if (pub.pages) f.push(["pages", pub.pages]);
    if (kind === "inproceedings" && pub.details) f.push(["address", pub.details]);
    f.push(["year", pub.year]);
    if (pub.doi) f.push(["doi", pub.doi]);
    return "@" + kind + "{" + pub.id + ",\n" +
      f.map(function (p) { return "  " + p[0] + " = {" + p[1] + "}"; }).join(",\n") + "\n}";
  }

  function badges(pub) {
    var b = [];
    if (pub.inProgress) b.push('<span class="badge badge-muted">In progress</span>');
    else b.push('<span class="badge badge-type">' + esc(pub.type) + "</span>");
    if (pub.openAccess) b.push('<span class="badge badge-oa">Open access</span>');
    if (pub.corresponding) b.push('<span class="badge badge-gold">Corresponding author</span>');
    return '<div class="badges">' + b.join("") + "</div>";
  }

  function pubActions(pub) {
    if (pub.inProgress) return "";
    var a = [];
    if (pub.doi) a.push('<a class="chip-btn" href="https://doi.org/' + esc(pub.doi) + '" target="_blank" rel="noopener">' + icon("link") + "DOI</a>");
    if (pub.url) a.push('<a class="chip-btn" href="' + esc(pub.url) + '" target="_blank" rel="noopener">' + icon("file") + "Paper</a>");
    if (pub.code) a.push('<a class="chip-btn" href="' + esc(pub.code) + '" target="_blank" rel="noopener">' + icon("code") + "Code</a>");
    a.push('<button class="chip-btn" type="button" data-bib="' + esc(pub.id) + '" aria-expanded="false">' + icon("quote") + "BibTeX</button>");
    return '<div class="pub-actions">' + a.join("") +
      '</div><div class="bib" id="bib-' + esc(pub.id) + '" hidden><button class="copy-btn" type="button" data-copy="' + esc(pub.id) + '">' +
      icon("copy") + '<span>Copy</span></button><pre><code>' + esc(bibtex(pub)) + "</code></pre></div>";
  }

  function pubMeta(pub) {
    return '<p class="pub-venue"><em>' + esc(pub.venue) + "</em>" +
      (pub.details ? ", " + esc(pub.details) : "") + (pub.year ? " (" + esc(pub.year) + ")" : "") + "</p>";
  }

  // ---------- sidebar ----------
  function initials(name) {
    return name.split(/\s+/).filter(Boolean).map(function (w) { return w[0]; }).slice(0, 2).join("");
  }

  function renderSidebar() {
    var L = P.links || {};
    var links = [
      ["email", "mail", "Email", L.email ? "mailto:" + L.email : ""],
      ["github", "github", "GitHub", L.github],
      ["linkedin", "linkedin", "LinkedIn", L.linkedin],
      ["scholar", "scholar", "Google Scholar", L.scholar],
      ["orcid", "orcid", "ORCID", L.orcid],
      ["researchgate", "researchgate", "ResearchGate", L.researchgate]
    ].filter(function (l) { return l[3]; });

    var avatar = P.photo
      ? '<img class="avatar" src="' + esc(P.photo) + '" alt="Portrait of ' + esc(P.name) + '">'
      : '<div class="avatar avatar-initials" aria-hidden="true">' + esc(initials(P.shortName || P.name)) + "</div>";

    $("sidebar").innerHTML =
      '<div class="sidebar-card">' + avatar +
      '<h1 class="name">' + esc(P.name) + "</h1>" +
      '<p class="title">' + esc(P.title) + "</p>" +
      '<ul class="roles">' + P.roles.map(function (r) {
        var org = r.url ? '<a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.org) + "</a>" : esc(r.org);
        return "<li>" + esc(r.text) + "<br>" + org + "</li>";
      }).join("") + "</ul>" +
      (P.location ? '<p class="location">' + icon("pin") + esc(P.location) + "</p>" : "") +
      '<ul class="social">' + links.map(function (l) {
        var ext = l[0] === "email" ? "" : ' target="_blank" rel="noopener"';
        return '<li><a href="' + esc(l[3]) + '"' + ext + ">" + icon(l[1]) + "<span>" + l[2] + "</span></a></li>";
      }).join("") + "</ul>" +
      (P.cv ? '<a class="cv-btn" href="' + esc(P.cv) + '" target="_blank" rel="noopener">' + icon("file") + "Download CV</a>" : "") +
      "</div>";
  }

  // ---------- hero ----------
  function renderHero() {
    var H = S.hero;
    var featured = (S.publications || []).filter(function (p) { return p.id === H.featuredPublication; })[0];
    var card = "";
    if (featured) {
      card = '<article class="feature-card">' +
        '<p class="feature-label"><span class="dot"></span>Latest publication</p>' +
        '<h2 class="feature-title">' + esc(featured.title) + "</h2>" +
        '<p class="pub-authors">' + formatAuthors(featured) + "</p>" + pubMeta(featured) +
        (featured.summary ? '<p class="feature-summary">' + esc(featured.summary) + "</p>" : "") +
        badges(featured) + pubActions(featured).replace(/id="bib-/, 'id="bib-hero-').replace(/data-bib="/, 'data-bib="hero-').replace(/data-copy="/, 'data-copy="hero-') +
        "</article>";
    }
    $("hero").innerHTML =
      '<p class="eyebrow">' + esc(H.eyebrow) + "</p>" +
      '<h2 class="headline">' + esc(H.headline) + ' <span class="rotator" id="rotator" aria-live="polite">' +
      esc(H.rotating[0] || "") + "</span></h2>" + card;
  }

  function startRotator() {
    var words = S.hero.rotating || [];
    var el = $("rotator");
    if (!el || words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var i = 0;
    setInterval(function () {
      el.classList.add("out");
      setTimeout(function () {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.classList.remove("out");
      }, 350);
    }, 3200);
  }

  // ---------- sections ----------
  var sections = [];
  function section(id, label, html) {
    if (!html) return;
    sections.push({ id: id, label: label, html: html });
  }

  function tags(list, cls) {
    if (!has(list)) return "";
    return '<ul class="tags ' + (cls || "") + '">' + list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
  }

  function buildSections() {
    var A = S.about;
    if (A) section("about", "About",
      A.paragraphs.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<h3 class="sub">Research interests</h3>' + tags(A.interests, "tags-gold"));

    if (has(S.news)) {
      var vis = S.newsVisible || S.news.length;
      section("news", "News",
        '<ul class="news" id="news-list">' + S.news.map(function (n, i) {
          return '<li class="' + (i >= vis ? "news-extra" : "") + '"' + (i >= vis ? " hidden" : "") + '><span class="news-date">' + esc(n.date) +
            '</span><p>' + esc(n.text) + (n.link ? ' <a href="' + esc(n.link) + '" target="_blank" rel="noopener">Link →</a>' : "") + "</p></li>";
        }).join("") + "</ul>" +
        (S.news.length > vis ? '<button class="text-btn" id="news-more" type="button">Show all ' + S.news.length + " updates</button>" : ""));
    }

    if (has(S.publications)) {
      var done = S.publications.filter(function (p) { return !p.inProgress; })
        .sort(function (a, b) { return b.year - a.year; });
      var wip = S.publications.filter(function (p) { return p.inProgress; });
      var n = done.length, lastYear = null, html = "";
      done.forEach(function (p) {
        if (p.year !== lastYear) { html += '<h3 class="year">' + esc(p.year) + "</h3>"; lastYear = p.year; }
        html += '<article class="pub"><span class="pub-num">[' + (n--) + "]</span><div>" +
          '<h4 class="pub-title">' + esc(p.title) + "</h4>" +
          '<p class="pub-authors">' + formatAuthors(p) + "</p>" + pubMeta(p) + badges(p) + pubActions(p) + "</div></article>";
      });
      if (wip.length) {
        html += '<h3 class="year">Work in progress</h3>' + wip.map(function (p) {
          return '<article class="pub"><span class="pub-num">–</span><div><h4 class="pub-title">' + esc(p.title) + "</h4>" +
            (p.authors ? '<p class="pub-authors">' + formatAuthors(p) + "</p>" : "") +
            (p.note ? '<p class="pub-venue">' + esc(p.note) + "</p>" : "") + badges(p) + "</div></article>";
        }).join("");
      }
      if (S.publications.some(function (p) { return p.corresponding; })) html += '<p class="footnote">* Corresponding author</p>';
      section("publications", "Publications", html);
    }

    if (has(S.experience)) section("experience", "Experience", S.experience.map(function (e) {
      return '<article class="entry"><div class="entry-head"><h3>' + esc(e.role) + '</h3><span class="dates">' + esc(e.dates) + "</span></div>" +
        '<p class="org">' + esc(e.org) + "</p>" + tags(e.tags) +
        (has(e.bullets) ? '<ul class="bullets">' + e.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>" : "") +
        "</article>";
    }).join(""));

    var T = S.teaching;
    if (T && (has(T.courses) || has(T.roles))) section("teaching", "Teaching & Mentoring",
      (has(T.courses) ? '<h3 class="sub">Courses taught</h3>' + tags(T.courses, "tags-gold") : "") +
      (has(T.roles) ? '<ul class="timeline">' + T.roles.map(function (r) {
        return '<li><span class="dates">' + esc(r.dates) + "</span><span>" + esc(r.title) + "</span></li>";
      }).join("") + "</ul>" : ""));

    if (has(S.education)) section("education", "Education", S.education.map(function (e) {
      return '<article class="entry"><div class="entry-head"><h3>' + esc(e.degree) + '</h3><span class="dates">' + esc(e.dates) + "</span></div>" +
        '<p class="org">' + esc(e.school) + "</p>" +
        (has(e.notes) ? '<ul class="notes">' + e.notes.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") +
        "</article>";
    }).join(""));

    if (has(S.projects)) section("projects", "Projects", '<div class="cards">' + S.projects.map(function (p) {
      return '<article class="card"><h3>' + esc(p.title) + "</h3><p>" + esc(p.text) + "</p>" + tags(p.tags) +
        (p.link ? '<a class="card-link" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.linkLabel || "View project") + icon("arrow") + "</a>" : "") +
        "</article>";
    }).join("") + "</div>");

    if (has(S.awards)) section("awards", "Honours & Awards", '<ul class="awards">' + S.awards.map(function (a) {
      return '<li><span class="award-year">' + esc(a.year) + '</span><div><p class="award-title">' + esc(a.title) + "</p>" +
        (a.note ? '<p class="award-note">' + esc(a.note) + "</p>" : "") + "</div></li>";
    }).join("") + "</ul>");

    if (has(S.skills)) section("skills", "Skills", '<div class="skills">' + S.skills.map(function (g) {
      return '<div class="skill-group"><h3 class="skill-head">' + esc(g.group) + "</h3>" + tags(g.items) + "</div>";
    }).join("") + "</div>");

    var L = P.links || {};
    var cta = [];
    if (L.email) cta.push('<a class="btn btn-primary" href="mailto:' + esc(L.email) + '">' + icon("mail") + "Email me</a>");
    if (L.linkedin) cta.push('<a class="btn" href="' + esc(L.linkedin) + '" target="_blank" rel="noopener">' + icon("linkedin") + "LinkedIn</a>");
    if (L.github) cta.push('<a class="btn" href="' + esc(L.github) + '" target="_blank" rel="noopener">' + icon("github") + "GitHub</a>");
    if (L.scholar) cta.push('<a class="btn" href="' + esc(L.scholar) + '" target="_blank" rel="noopener">' + icon("scholar") + "Google Scholar</a>");
    if (L.orcid) cta.push('<a class="btn" href="' + esc(L.orcid) + '" target="_blank" rel="noopener">' + icon("orcid") + "ORCID</a>");
    section("contact", "Contact", '<p class="lead">' + esc(S.contact.text) + '</p><div class="cta">' + cta.join("") + "</div>");
  }

  function renderSections() {
    var content = $("content");
    sections.forEach(function (s, i) {
      var el = document.createElement("section");
      el.className = "section";
      el.id = s.id;
      el.innerHTML = '<h2 class="section-title"><span class="section-num">' + String(i + 1).padStart(2, "0") +
        "</span>" + esc(s.label) + "</h2>" + s.html;
      content.appendChild(el);
    });
    $("nav").innerHTML = sections.map(function (s) {
      return '<a href="#' + s.id + '" data-nav="' + s.id + '">' + esc(s.label.split(" ")[0]) + "</a>";
    }).join("");
    $("brand").textContent = P.shortName || P.name;
    $("footer").innerHTML = "<p>© " + new Date().getFullYear() + " " + esc(P.name) + "</p>";
  }

  // ---------- interactions ----------
  function setThemeIcon() {
    var dark = document.documentElement.getAttribute("data-theme") !== "light";
    $("theme-toggle").innerHTML = icon(dark ? "sun" : "moon");
  }

  function bindInteractions() {
    setThemeIcon();
    $("theme-toggle").addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      setThemeIcon();
    });

    var menuBtn = $("menu-toggle");
    menuBtn.innerHTML = icon("menu");
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.innerHTML = icon(open ? "close" : "menu");
    });
    $("nav").addEventListener("click", function (e) {
      if (e.target.closest("a") && document.body.classList.contains("menu-open")) menuBtn.click();
    });

    document.addEventListener("click", function (e) {
      var bibBtn = e.target.closest("[data-bib]");
      if (bibBtn) {
        var box = $("bib-" + bibBtn.getAttribute("data-bib"));
        box.hidden = !box.hidden;
        bibBtn.setAttribute("aria-expanded", String(!box.hidden));
        bibBtn.classList.toggle("active", !box.hidden);
        return;
      }
      var copyBtn = e.target.closest("[data-copy]");
      if (copyBtn) {
        var text = $("bib-" + copyBtn.getAttribute("data-copy")).querySelector("code").textContent;
        var done = function () {
          copyBtn.querySelector("span").textContent = "Copied";
          setTimeout(function () { copyBtn.querySelector("span").textContent = "Copy"; }, 1600);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
        return;
      }
      if (e.target.id === "news-more") {
        var extras = document.querySelectorAll(".news-extra");
        var showing = !extras[0].hidden;
        extras.forEach(function (li) { li.hidden = showing; });
        e.target.textContent = showing ? "Show all " + S.news.length + " updates" : "Show fewer";
      }
    });

    // Highlight the nav link of the section in view
    var links = {};
    document.querySelectorAll("[data-nav]").forEach(function (a) { links[a.getAttribute("data-nav")] = a; });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          Object.keys(links).forEach(function (k) { links[k].classList.toggle("active", k === en.target.id); });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(function (s) { io.observe($(s.id)); });
    }
  }

  renderSidebar();
  renderHero();
  buildSections();
  renderSections();
  bindInteractions();
  startRotator();
})();
