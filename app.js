async function loadContent() {
  const response = await fetch("content/site.json", { cache: "no-store" });
  if (!response.ok) throw new Error("No se ha podido cargar content/site.json");
  return response.json();
}

function text(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined) el.textContent = value;
}

function image(id, src, alt = "") {
  const el = document.getElementById(id);
  if (el) {
    el.src = src;
    el.alt = alt;
  }
}

function renderCollections(items) {
  const grid = document.getElementById("collection-grid");
  grid.innerHTML = items.map((item, index) => `
    <article class="collection-card reveal">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="collection-caption">
        <h3>${item.title}</h3>
        <span>0${index + 1}</span>
      </div>
    </article>
  `).join("");
}

function renderProjects(items) {
  const list = document.getElementById("projects-list");
  list.innerHTML = items.map((item, index) => `
    <article class="project reveal">
      <div class="project-media">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </div>
      <div class="project-copy">
        <div class="project-number">PROJECT / ${String(index + 1).padStart(3, "0")}</div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="tags">
          ${(item.tags || []).map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    </article>
  `).join("");
}

function renderArchive(items) {
  const grid = document.getElementById("archive-grid");
  grid.innerHTML = items.map((item, index) => `
    <figure class="archive-item reveal">
      <img src="${item.image}" alt="${item.alt || `Fotografía ${index + 1}`}" loading="lazy">
    </figure>
  `).join("");
}

function renderSocials(items) {
  const holder = document.getElementById("socials");
  holder.innerHTML = items
    .filter(item => item.url)
    .map(item => `<a href="${item.url}" ${item.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${item.label}</a>`)
    .join("");
}

function enableReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function enableCursor() {
  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  document.addEventListener("mousemove", e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll("a, .collection-card, .project").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
}

async function init() {
  try {
    const data = await loadContent();

    image("hero-image", data.hero.image, "Portada de La galería de Paula");
    text("hero-kicker", data.hero.kicker);
    text("hero-description", data.hero.description);
    text("hero-location", data.hero.location);
    text("hero-year", data.hero.year);
    text("intro-text", data.intro);
    text("quote", data.quote);

    renderCollections(data.collections || []);
    renderProjects(data.projects || []);
    renderArchive(data.archive || []);

    image("about-image", data.about.image, "Sobre La galería de Paula");
    text("about-text", data.about.text);
    text("about-location", data.about.location);

    renderSocials(data.socials || []);
    text("current-year", new Date().getFullYear());

    enableReveal();
    enableCursor();
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML("beforeend",
      '<p style="position:fixed;bottom:12px;left:12px;background:#fff;padding:10px;z-index:9999">Error cargando el contenido.</p>'
    );
  }
}

init();
