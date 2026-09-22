(() => {
  const LIB = window.LIBRARY || [];
  const COLORS = window.COLOR_FAMILIES || {};
  const CATS = window.CATEGORIES || [];
  const app = document.getElementById("app");

  // Filter dimensions. `key` is the URL param, `field` the item property.
  const FACETS = [
    { key: "category", label: "Type", field: "category" },
    { key: "tone", label: "Tone", field: "tone" },
    { key: "style", label: "Style", field: "styles" },
    { key: "color", label: "Color", field: "colors" },
    { key: "mood", label: "Mood", field: "mood" },
  ];
  const GROUPS = [
    { key: "category", label: "Type" },
    { key: "style", label: "Style" },
    { key: "color", label: "Color" },
    { key: "project", label: "Project", field: "project" },
    { key: "none", label: "None" },
  ];

  const byId = Object.fromEntries(LIB.map((it) => [it.id, it]));
  const vals = (it, field) => [].concat(it[field] ?? []);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const enc = encodeURIComponent;
  const thumb = (file) => `images/thumbs/${file.replace(/\.[^.]+$/, "")}.jpg`;
  const full = (file) => `images/${file}`;
  const imgFallback = (file) => `onerror="this.onerror=null;this.src='${esc(full(file))}'"`;

  document.getElementById("count").textContent = `${LIB.length} pieces`;

  // ---------- storage (best effort) ----------
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  // ---------- theme ----------
  const savedTheme = store.get("inspo-theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  document.getElementById("themeToggle").addEventListener("click", () => {
    const cur = document.documentElement.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    store.set("inspo-theme", next);
  });

  // ---------- copy ----------
  const toastEl = document.getElementById("toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1600);
  }
  async function copy(text, msg) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    toast(msg);
  }

  // ---------- routing / state ----------
  function parseHash() {
    const h = location.hash.replace(/^#/, "") || "/";
    const [path, qs = ""] = h.split("?");
    const params = new URLSearchParams(qs);
    const m = path.match(/^\/item\/(.+)$/);
    if (m) return { view: "item", id: decodeURIComponent(m[1]) };
    const state = { view: "library", q: params.get("q") || "", group: params.get("group") || store.get("inspo-group") || "category", f: {} };
    for (const fc of FACETS) {
      const v = params.get(fc.key);
      state.f[fc.key] = v ? v.split(",").filter(Boolean) : [];
    }
    return state;
  }
  function libraryHash(s) {
    const p = new URLSearchParams();
    if (s.q) p.set("q", s.q);
    if (s.group && s.group !== "category") p.set("group", s.group);
    for (const fc of FACETS) if (s.f[fc.key].length) p.set(fc.key, s.f[fc.key].join(","));
    const qs = p.toString();
    return "#/" + (qs ? "?" + qs : "");
  }
  const filterLink = (key, value) => `#/?${key}=${enc(value)}`;

  // ---------- filtering ----------
  function matches(it, s, skipKey) {
    if (s.q) {
      const hay = [it.title, it.project, it.category, it.tone, it.brief, it.prompt, it.notes,
        ...vals(it, "styles"), ...vals(it, "mood"), ...vals(it, "colors")].join(" ").toLowerCase();
      if (!s.q.toLowerCase().split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    for (const fc of FACETS) {
      if (fc.key === skipKey) continue;
      const sel = s.f[fc.key];
      if (sel.length && !vals(it, fc.field).some((v) => sel.includes(v))) return false;
    }
    return true;
  }

  function facetOptions(fc, s) {
    const counts = new Map();
    for (const it of LIB) {
      if (!matches(it, s, fc.key)) continue;
      for (const v of vals(it, fc.field)) counts.set(v, (counts.get(v) || 0) + 1);
    }
    // keep selected options visible even at 0
    for (const v of s.f[fc.key]) if (!counts.has(v)) counts.set(v, 0);
    let order;
    if (fc.key === "category") order = CATS;
    else if (fc.key === "color") order = Object.keys(COLORS);
    const keys = [...counts.keys()];
    if (order) keys.sort((a, b) => idx(order, a) - idx(order, b));
    else keys.sort((a, b) => counts.get(b) - counts.get(a) || a.localeCompare(b));
    return keys.map((k) => [k, counts.get(k)]);
  }
  const idx = (arr, v) => { const i = arr.indexOf(v); return i < 0 ? 999 : i; };

  // ---------- library view ----------
  let state;
  const expanded = new Set();

  function renderLibrary() {
    app.innerHTML = `
      <section class="controls">
        <div class="search-row">
          <label class="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input id="q" type="search" placeholder="Search titles, briefs, styles, moods…" value="${esc(state.q)}" autocomplete="off" />
          </label>
          <div class="seg" id="groupSeg" role="group" aria-label="Group by">
            <span class="label">Group by</span>
            ${GROUPS.map((g) => `<button data-group="${g.key}" aria-pressed="${state.group === g.key}">${g.label}</button>`).join("")}
          </div>
          <button class="btn ghost facets-toggle" id="facetsToggle">Filters</button>
        </div>
        <div class="facets" id="facets"></div>
      </section>
      <section id="results"></section>`;

    const q = document.getElementById("q");
    q.addEventListener("input", () => { state.q = q.value.trim(); update(); });
    document.getElementById("groupSeg").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-group]");
      if (!b) return;
      state.group = b.dataset.group;
      store.set("inspo-group", state.group);
      document.querySelectorAll("#groupSeg button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      update();
    });
    document.getElementById("facetsToggle").addEventListener("click", () =>
      document.getElementById("facets").classList.toggle("collapsed"));
    if (matchMedia("(max-width: 640px)").matches && !FACETS.some((f) => state.f[f.key].length))
      document.getElementById("facets").classList.add("collapsed");

    document.getElementById("facets").addEventListener("click", (e) => {
      const chip = e.target.closest("[data-facet]");
      const moreBtn = e.target.closest("[data-more]");
      if (moreBtn) {
        const k = moreBtn.dataset.more;
        expanded.has(k) ? expanded.delete(k) : expanded.add(k);
        renderFacets();
      } else if (chip) {
        const list = state.f[chip.dataset.facet];
        const v = chip.dataset.value;
        const i = list.indexOf(v);
        i < 0 ? list.push(v) : list.splice(i, 1);
        update();
      } else if (e.target.closest("#clearAll")) {
        FACETS.forEach((f) => (state.f[f.key] = []));
        state.q = ""; q.value = "";
        update();
      }
    });

    update();
  }

  function update() {
    history.replaceState(null, "", libraryHash(state));
    lastLibraryHash = location.hash;
    renderFacets();
    renderResults();
  }

  function renderFacets() {
    const any = state.q || FACETS.some((f) => state.f[f.key].length);
    document.getElementById("facets").innerHTML =
      FACETS.map((fc) => {
        const opts = facetOptions(fc, state);
        if (!opts.length) return "";
        const LIMIT = 12;
        const open = expanded.has(fc.key);
        const shown = open || opts.length <= LIMIT + 2 ? opts
          : opts.filter(([v], n) => n < LIMIT || state.f[fc.key].includes(v));
        const more = opts.length > LIMIT + 2
          ? `<button class="clear" data-more="${fc.key}">${open ? "Show less" : `+ ${opts.length - shown.length} more`}</button>` : "";
        return `<div class="facet"><span class="label">${fc.label}</span><div class="chips">${shown
          .map(([v, n]) => {
            const dot = fc.key === "color" ? `<span class="dot" style="background:${COLORS[v] || "#999"}"></span>` : "";
            return `<button class="chip" data-facet="${fc.key}" data-value="${esc(v)}" aria-pressed="${state.f[fc.key].includes(v)}">${dot}${esc(v)} <span class="n">${n}</span></button>`;
          })
          .join("")}${more}</div></div>`;
      }).join("") + (any ? `<div class="facet"><span class="label"></span><button class="clear" id="clearAll">Clear all filters</button></div>` : "");
  }

  function groupItems(items, groupKey) {
    if (groupKey === "none") return [["All", items]];
    const g = GROUPS.find((x) => x.key === groupKey);
    const field = g.field || FACETS.find((f) => f.key === groupKey).field;
    const map = new Map();
    for (const it of items) for (const v of vals(it, field)) {
      if (!map.has(v)) map.set(v, []);
      map.get(v).push(it);
    }
    let keys = [...map.keys()];
    const order = groupKey === "category" ? CATS : groupKey === "color" ? Object.keys(COLORS) : null;
    if (order) keys.sort((a, b) => idx(order, a) - idx(order, b));
    else keys.sort((a, b) => map.get(b).length - map.get(a).length || a.localeCompare(b));
    return keys.map((k) => [k, map.get(k)]);
  }

  function card(it) {
    const first = it.images[0];
    return `<a class="card" href="#/item/${enc(it.id)}">
      <div class="thumb">
        <img src="${esc(thumb(first))}" ${imgFallback(first)} alt="${esc(it.title)}" loading="lazy" />
        ${it.images.length > 1 ? `<span class="frames">${it.images.length} frames</span>` : ""}
      </div>
      <div class="meta">
        <div class="row">
          <span class="label">${esc(it.project)} · ${esc(it.category)}</span>
          <span class="mini-palette">${(it.palette || []).map((c) => `<span style="background:${esc(c)}"></span>`).join("")}</span>
        </div>
        <h3>${esc(it.title)}</h3>
        <div class="tags">${esc(vals(it, "styles").slice(0, 3).join(" · "))}</div>
      </div>
    </a>`;
  }

  function renderResults() {
    const items = LIB.filter((it) => matches(it, state));
    const el = document.getElementById("results");
    if (!items.length) {
      el.innerHTML = `<div class="empty">Nothing matches those filters.</div>`;
      return;
    }
    el.innerHTML = groupItems(items, state.group)
      .map(([name, list]) => {
        const sw = state.group === "color" && COLORS[name] ? `<span class="swatch" style="background:${COLORS[name]}"></span>` : "";
        return `<section class="group">
          <div class="group-head"><h2>${sw}${esc(name)}</h2><span class="label">${list.length}</span></div>
          <div class="grid">${list.map(card).join("")}</div>
        </section>`;
      })
      .join("");
  }

  // ---------- detail view ----------
  function renderItem(id) {
    const it = byId[id];
    if (!it) {
      app.innerHTML = `<a class="back" href="#/">← Library</a><div class="empty">That piece isn't in the library.</div>`;
      return;
    }
    const i = LIB.indexOf(it);
    const prev = LIB[(i - 1 + LIB.length) % LIB.length];
    const next = LIB[(i + 1) % LIB.length];
    const related = LIB.filter((o) => o !== it)
      .map((o) => ({ o, score: (o.project === it.project ? 2 : 0) + vals(o, "styles").filter((s) => it.styles.includes(s)).length + vals(o, "colors").filter((c) => it.colors.includes(c)).length * 0.5 }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((x) => x.o);

    const tagRow = (label, key, list) =>
      list.length ? `<div class="facet"><span class="label">${label}</span><div class="chips">${list
        .map((v) => {
          const dot = key === "color" ? `<span class="dot" style="background:${COLORS[v] || "#999"}"></span>` : "";
          return `<a class="chip" href="${filterLink(key, v)}">${dot}${esc(v)}</a>`;
        })
        .join("")}</div></div>` : "";

    app.innerHTML = `
      <a class="back" href="#/">← Library</a>
      <div class="detail">
        <div class="stage">
          <a class="stage-main" id="stageLink" href="${esc(full(it.images[0]))}" target="_blank" title="Open full size">
            <img id="stageImg" src="${esc(full(it.images[0]))}" alt="${esc(it.title)}" />
          </a>
          ${it.images.length > 1 ? `<div class="stage-frames" id="frames">${it.images
            .map((f, n) => `<button data-src="${esc(full(f))}" aria-pressed="${n === 0}" aria-label="Frame ${n + 1}"><img src="${esc(thumb(f))}" ${imgFallback(f)} alt="" /></button>`)
            .join("")}</div>` : ""}
        </div>

        <aside class="panel">
          <div>
            <span class="label">${esc(it.project)} · ${esc(it.category)} · ${esc(it.tone || "")}</span>
            <h1>${esc(it.title)}</h1>
            ${it.source ? `<div class="sub"><a href="${esc(it.source)}" target="_blank" rel="noopener">${esc(it.source)}</a></div>` : ""}
          </div>

          <div class="copy-row">
            <button class="btn" data-copy="brief">Copy brief</button>
            <button class="btn" data-copy="prompt">Copy prompt</button>
            <button class="btn ghost" data-copy="both">Copy both</button>
          </div>

          <div class="copy-block">
            <div class="head"><span class="label">Image brief</span><button class="btn ghost" data-copy="brief">Copy</button></div>
            <p>${esc(it.brief)}</p>
          </div>

          <div class="copy-block prompt">
            <div class="head"><span class="label">Image prompt</span><button class="btn ghost" data-copy="prompt">Copy</button></div>
            <p>${esc(it.prompt)}</p>
          </div>

          ${(it.palette || []).length ? `<div>
            <div class="head" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <span class="label">Palette, click to copy</span>
              <button class="btn ghost" data-copy="palette">Copy all</button>
            </div>
            <div class="palette">${it.palette
              .map((c) => `<button data-hex="${esc(c)}"><div class="sw" style="background:${esc(c)}"></div><div class="hex">${esc(c)}</div></button>`)
              .join("")}</div>
          </div>` : ""}

          <div class="taglist">
            ${tagRow("Type", "category", [it.category])}
            ${tagRow("Style", "style", vals(it, "styles"))}
            ${tagRow("Color", "color", vals(it, "colors"))}
            ${tagRow("Mood", "mood", vals(it, "mood"))}
          </div>

          ${it.notes ? `<div class="notes">${esc(it.notes)}</div>` : ""}

          <nav class="pager">
            <a href="#/item/${enc(prev.id)}"><span class="label">← Prev</span>${esc(prev.title)}</a>
            <a href="#/item/${enc(next.id)}" style="text-align:right"><span class="label">Next →</span>${esc(next.title)}</a>
          </nav>
        </aside>
      </div>

      ${related.length ? `<section class="related group">
        <div class="group-head"><h2>Related</h2><span class="label">${related.length}</span></div>
        <div class="grid">${related.map(card).join("")}</div>
      </section>` : ""}`;

    const texts = {
      brief: it.brief,
      prompt: it.prompt,
      both: `${it.title}\n\nBRIEF\n${it.brief}\n\nPROMPT\n${it.prompt}`,
      palette: (it.palette || []).join(", "),
    };
    const labels = { brief: "Brief copied", prompt: "Prompt copied", both: "Brief + prompt copied", palette: "Palette copied" };
    app.querySelectorAll("[data-copy]").forEach((b) =>
      b.addEventListener("click", () => copy(texts[b.dataset.copy], labels[b.dataset.copy])));
    app.querySelectorAll("[data-hex]").forEach((b) =>
      b.addEventListener("click", () => copy(b.dataset.hex, `${b.dataset.hex} copied`)));

    const frames = document.getElementById("frames");
    if (frames) frames.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-src]");
      if (!b) return;
      document.getElementById("stageImg").src = b.dataset.src;
      document.getElementById("stageLink").href = b.dataset.src;
      frames.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    });

    detailKeys = { prev: prev.id, next: next.id };
  }

  let detailKeys = null;
  document.addEventListener("keydown", (e) => {
    if (!detailKeys || e.target.closest("input, textarea")) return;
    if (e.key === "ArrowLeft") location.hash = `#/item/${enc(detailKeys.prev)}`;
    else if (e.key === "ArrowRight") location.hash = `#/item/${enc(detailKeys.next)}`;
    else if (e.key === "Escape") history.length > 1 ? history.back() : (location.hash = "#/");
  });

  // ---------- router ----------
  const scrollMemo = {};
  let lastLibraryHash = "#/";
  function route() {
    const r = parseHash();
    if (r.view === "item") {
      scrollMemo.library = window.scrollY;
      detailKeys = null;
      renderItem(r.id);
      window.scrollTo(0, 0);
      document.title = `${byId[r.id]?.title || "Not found"} · Inspiration Library`;
    } else {
      detailKeys = null;
      state = r;
      renderLibrary();
      document.title = "Inspiration Library";
      if (location.hash === lastLibraryHash && scrollMemo.library) window.scrollTo(0, scrollMemo.library);
      lastLibraryHash = location.hash;
    }
  }
  window.addEventListener("hashchange", route);
  route();
})();
