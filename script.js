document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // ===== Mobile Navigation Toggle =====
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ===== Interactive Sandbox Diorama: Mine Block & Gems =====
  const punchBtn = document.getElementById("punchIslandBtn");
  const dioramaArt = document.getElementById("dioramaArt");
  const gemCountEl = document.getElementById("gemCount");
  const sparkleTag = document.getElementById("sparkleTag");
  const cycleBiomeBtn = document.getElementById("cycleBiomeBtn");
  const currentBiomeText = document.getElementById("currentBiomeText");
  const heroDiorama = document.getElementById("heroDiorama");

  let currentGems = 1450;
  const gemDrops = ["+10 GEMS!", "+25 RARE GEMS!", "+50 WORLD LOCK!"];
  let gemDropIndex = 0;

  function triggerMineBlock() {
    currentGems += 10;
    if (gemCountEl) {
      gemCountEl.textContent = currentGems.toLocaleString();
    }

    if (!prefersReducedMotion && dioramaArt) {
      dioramaArt.classList.add("dig-shake");
      setTimeout(() => dioramaArt.classList.remove("dig-shake"), 220);
    }

    if (sparkleTag) {
      sparkleTag.textContent = gemDrops[gemDropIndex % gemDrops.length];
      gemDropIndex++;
      sparkleTag.classList.add("pop");
      setTimeout(() => sparkleTag.classList.remove("pop"), 600);
    }
  }

  if (punchBtn) {
    punchBtn.addEventListener("click", triggerMineBlock);
  }
  if (dioramaArt) {
    dioramaArt.addEventListener("click", triggerMineBlock);
  }

  // Biome Switcher (Daylight Sandbox Biomes)
  const biomes = [
    { name: "Daylight", bg: "#e5dec9" },
    { name: "Sunny Plains", bg: "#dce7c8" },
    { name: "Sky Oasis", bg: "#d5eaf7" },
  ];
  let biomeIdx = 0;

  if (cycleBiomeBtn && currentBiomeText && heroDiorama) {
    cycleBiomeBtn.addEventListener("click", () => {
      biomeIdx = (biomeIdx + 1) % biomes.length;
      const b = biomes[biomeIdx];
      currentBiomeText.textContent = b.name;
      heroDiorama.style.backgroundColor = b.bg;
    });
  }

  // ===== Interactive Inventory Vault & Equip/Inspect Skill System =====
  let activeSkillId = "laravel";

  const inventoryData = {
    laravel: {
      name: "Laravel 12 Framework",
      rarity: "LEGENDARY TOOL",
      subtitle: "Full-Stack Backend Alchemist",
      stat1Key: "BACKEND EFFICIENCY",
      stat1Val: "+94",
      stat1Pct: 94,
      stat2Key: "ARCHITECTURE SCORE",
      stat2Val: "+88",
      stat2Pct: 88,
      desc: "Primary weapon for building scalable web engines, REST services, database seeders, and authentications. Used across enterprise academic systems and café portals.",
      tags: ["PHP 8.3 Engine", "Eloquent ORM", "Security Shield", "MVC Core"],
    },
    python: {
      name: "Python 3",
      rarity: "COMPUTATIONAL ALCHEMY",
      subtitle: "NLP & Machine Learning Specialist",
      stat1Key: "MODEL ACCURACY",
      stat1Val: "+94",
      stat1Pct: 94,
      stat2Key: "PIPELINE SPEED",
      stat2Val: "+89",
      stat2Pct: 89,
      desc: "Primary engine for NLP stance detection models, recursive algorithmic scripts, and Tkinter GUI simulations.",
      tags: ["PyTorch", "Scikit-Learn", "Pandas", "Algorithm Core"],
    },
    javascript: {
      name: "Modern JavaScript",
      rarity: "REACTIVE RUNTIME",
      subtitle: "Client-Side & Canvas Engineer",
      stat1Key: "DOM RESPONSIVENESS",
      stat1Val: "+92",
      stat1Pct: 92,
      stat2Key: "ANIMATION FPS",
      stat2Val: "+90",
      stat2Pct: 90,
      desc: "High-performance reactive frontend engine. Powers custom DOM state management, canvas diorama physics, and zero-dependency retro UI interactions.",
      tags: ["ES6+ Standards", "Canvas 2D API", "Async Pipeline", "Event Dispatch"],
    },
    compose: {
      name: "Android Compose",
      rarity: "MOBILE FORGE",
      subtitle: "Declarative Mobile Architect",
      stat1Key: "LAYOUT FLUIDITY",
      stat1Val: "+86",
      stat1Pct: 86,
      stat2Key: "STATE ISOLATION",
      stat2Val: "+89",
      stat2Pct: 89,
      desc: "Modern declarative Android interface system. Architects reactive mobile screens, stateful viewmodels, and responsive native gesture pipelines.",
      tags: ["Kotlin Runtime", "Declarative UI", "State Hoisting", "Material 3"],
    },
    postgres: {
      name: "PostgreSQL Database",
      rarity: "RELATIONAL CITADEL",
      subtitle: "Enterprise ACID Database Architect",
      stat1Key: "ACID RELIABILITY",
      stat1Val: "+95",
      stat1Pct: 95,
      stat2Key: "QUERY THROUGHPUT",
      stat2Val: "+91",
      stat2Pct: 91,
      desc: "Rock-solid enterprise relational data store. Configured with optimized b-tree indexing, foreign key constraints, JSONB schemas, and transactional security.",
      tags: ["Index Optimizer", "ACID Reliability", "JSONB Engine", "Concurrency"],
    },
    mariadb: {
      name: "MariaDB / MySQL",
      rarity: "TRANSACTION CORE",
      subtitle: "High-Speed Relational Core",
      stat1Key: "QUERY SPEED",
      stat1Val: "+89",
      stat1Pct: 89,
      stat2Key: "TABLE THROUGHPUT",
      stat2Val: "+85",
      stat2Pct: 85,
      desc: "Fast, dependable relational database core used in web portals and transactional ordering queues. Configured with optimized indexes and role privileges.",
      tags: ["InnoDB Engine", "Foreign Key Mesh", "Order Queues", "Fast Queries"],
    },
    nlp: {
      name: "Stance Detection NLP",
      rarity: "MYTHIC RESEARCH",
      subtitle: "Ideological Vector Specialist",
      stat1Key: "STANCE ACCURACY",
      stat1Val: "+96",
      stat1Pct: 96,
      stat2Key: "FEATURE EXTRACTION",
      stat2Val: "+91",
      stat2Pct: 91,
      desc: "Undergraduate thesis specialisation: fine-tuning classification vectors to analyze political stance and filter Indonesian misinformation streams.",
      tags: ["Indonesian Corpus", "Stance Vectors", "Hoax Detector", "TF-IDF / BERT"],
    },
    cv: {
      name: "Digital Image Processing",
      rarity: "VISION SENSOR",
      subtitle: "Spatial Matrix & Kernel Specialist",
      stat1Key: "SPATIAL FILTERING",
      stat1Val: "+88",
      stat1Pct: 88,
      stat2Key: "MATRIX PRECISION",
      stat2Val: "+87",
      stat2Pct: 87,
      desc: "Pixel manipulation, spatial convolution filters, edge detection kernels, and matrix transformations for discrete computer vision operations.",
      tags: ["Convolution Kernel", "Frequency Domain", "Morphology Ops", "Pixel Matrix"],
    },
  };

  const slotButtons = Array.from(document.querySelectorAll(".slot-item"));
  const slotDetailPane = document.getElementById("slotDetailPane");
  const itemNameEl = document.getElementById("itemName");
  const itemRarityEl = document.getElementById("itemRarity");
  const itemSubtitleEl = document.getElementById("itemSubtitle");
  const itemStatKey1El = document.getElementById("itemStatKey1");
  const itemStatVal1El = document.getElementById("itemStatVal1");
  const itemStatBar1El = document.getElementById("itemStatBar1");
  const itemStatKey2El = document.getElementById("itemStatKey2");
  const itemStatVal2El = document.getElementById("itemStatVal2");
  const itemStatBar2El = document.getElementById("itemStatBar2");
  const itemDescEl = document.getElementById("itemDesc");
  const itemAttributesEl = document.getElementById("itemAttributes");

  function selectSkillSlot(slotKey) {
    const data = inventoryData[slotKey];
    if (!data) return;

    activeSkillId = slotKey;

    slotButtons.forEach((btn) => {
      const isSelected = btn.getAttribute("data-slot") === slotKey;
      btn.classList.toggle("active", isSelected);
      btn.setAttribute("aria-selected", String(isSelected));
    });

    if (itemNameEl) itemNameEl.textContent = data.name;
    if (itemRarityEl) itemRarityEl.textContent = data.rarity;
    if (itemSubtitleEl) itemSubtitleEl.textContent = data.subtitle;
    if (itemStatKey1El) itemStatKey1El.textContent = data.stat1Key;
    if (itemStatVal1El) itemStatVal1El.textContent = data.stat1Val;
    if (itemStatBar1El) itemStatBar1El.style.width = `${data.stat1Pct}%`;
    if (itemStatKey2El) itemStatKey2El.textContent = data.stat2Key;
    if (itemStatVal2El) itemStatVal2El.textContent = data.stat2Val;
    if (itemStatBar2El) itemStatBar2El.style.width = `${data.stat2Pct}%`;
    if (itemDescEl) itemDescEl.textContent = data.desc;

    if (itemAttributesEl && Array.isArray(data.tags)) {
      itemAttributesEl.innerHTML = "";
      data.tags.forEach((tag) => {
        const pill = document.createElement("span");
        pill.className = "attr-pill";
        pill.textContent = tag;
        itemAttributesEl.appendChild(pill);
      });
    }

    // Staggered text entrance animation
    if (!prefersReducedMotion && slotDetailPane) {
      slotDetailPane.classList.remove("slot-inspect-anim");
      void slotDetailPane.offsetWidth;
      slotDetailPane.classList.add("slot-inspect-anim");
    }
  }

  // Bind click & keyboard accessibility (Tab, Enter, Space, Arrow keys)
  slotButtons.forEach((slotBtn, index) => {
    slotBtn.addEventListener("click", () => {
      const slotKey = slotBtn.getAttribute("data-slot");
      if (slotKey) selectSkillSlot(slotKey);
    });

    slotBtn.addEventListener("keydown", (e) => {
      let targetIndex = -1;
      const cols = window.innerWidth <= 600 ? 2 : 4;

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const slotKey = slotBtn.getAttribute("data-slot");
        if (slotKey) selectSkillSlot(slotKey);
        return;
      }

      if (e.key === "ArrowRight") {
        targetIndex = (index + 1) % slotButtons.length;
      } else if (e.key === "ArrowLeft") {
        targetIndex = (index - 1 + slotButtons.length) % slotButtons.length;
      } else if (e.key === "ArrowDown") {
        targetIndex = index + cols < slotButtons.length ? index + cols : index;
      } else if (e.key === "ArrowUp") {
        targetIndex = index - cols >= 0 ? index - cols : index;
      }

      if (targetIndex !== -1 && targetIndex !== index) {
        e.preventDefault();
        const nextBtn = slotButtons[targetIndex];
        nextBtn.focus();
        const slotKey = nextBtn.getAttribute("data-slot");
        if (slotKey) selectSkillSlot(slotKey);
      }
    });
  });

  // Initialize with default equipped skill
  selectSkillSlot(activeSkillId);

  // ===== Scroll-Triggered Staggered Reveal =====
  const revealTargets = document.querySelectorAll(
    ".quest-card, .artifact-card, .freq-channel, .slot-item",
  );

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("reveal-in"));
  } else {
    revealTargets.forEach((el, index) => {
      el.classList.add("reveal-init");
      el.style.transitionDelay = `${(index % 4) * 60}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
    );

    revealTargets.forEach((el) => observer.observe(el));
  }

  // ===== Active Navigation Link Tracking =====
  const navAnchorLinks = document.querySelectorAll(".nav-links a[href^='#']");
  const sections = document.querySelectorAll("main > section[id]");

  if (
    sections.length &&
    navAnchorLinks.length &&
    "IntersectionObserver" in window
  ) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const currentId = entry.target.id;
          navAnchorLinks.forEach((link) => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === `#${currentId}`);
          });
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((sec) => navObserver.observe(sec));
  }

  // ===== 2D Sandbox Weather Machine Controller (Crafted Artifacts) =====
  const weatherBtn = document.getElementById("weatherMachineBtn");
  const weatherLabel = document.getElementById("weatherLabel");
  const weatherIcon = document.getElementById("weatherIcon");
  const artifactsSection = document.getElementById("projects");

  const weatherStates = [
    {
      id: "daylight",
      label: "[ BIOME TIME: DAYLIGHT ]",
      iconSvg:
        '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" shape-rendering="crispEdges"><rect x="6" y="0" width="4" height="2"/><rect x="6" y="14" width="4" height="2"/><rect x="0" y="6" width="2" height="4"/><rect x="14" y="6" width="2" height="4"/><rect x="2" y="2" width="2" height="2"/><rect x="12" y="2" width="2" height="2"/><rect x="2" y="12" width="2" height="2"/><rect x="12" y="12" width="2" height="2"/><rect x="4" y="4" width="8" height="8"/></svg>',
    },
    {
      id: "sunset",
      label: "[ BIOME TIME: SUNSET ]",
      iconSvg:
        '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" shape-rendering="crispEdges"><rect x="0" y="12" width="16" height="2"/><rect x="2" y="14" width="12" height="2"/><rect x="4" y="8" width="8" height="4"/><rect x="6" y="6" width="4" height="2"/><rect x="1" y="6" width="2" height="2"/><rect x="13" y="6" width="2" height="2"/></svg>',
    },
    {
      id: "starlight",
      label: "[ BIOME TIME: STARLIGHT ]",
      iconSvg:
        '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" shape-rendering="crispEdges"><rect x="6" y="2" width="6" height="2"/><rect x="4" y="4" width="4" height="2"/><rect x="2" y="6" width="4" height="4"/><rect x="4" y="10" width="4" height="2"/><rect x="6" y="12" width="6" height="2"/><rect x="12" y="4" width="2" height="2"/><rect x="12" y="10" width="2" height="2"/><rect x="13" y="7" width="2" height="2"/></svg>',
    },
  ];

  let currentWeatherIdx = 0;

  if (weatherBtn && artifactsSection) {
    weatherBtn.addEventListener("click", () => {
      currentWeatherIdx = (currentWeatherIdx + 1) % weatherStates.length;
      const state = weatherStates[currentWeatherIdx];
      artifactsSection.setAttribute("data-biome-time", state.id);
      if (weatherLabel) weatherLabel.textContent = state.label;
      if (weatherIcon) weatherIcon.innerHTML = state.iconSvg;
    });
  }

  // ===== Lightweight Parallax via IntersectionObserver (Zero scroll listener) =====
  const biomeClouds = document.getElementById("biomeClouds");
  const biomeMountainsFar = document.getElementById("biomeMountainsFar");
  const biomeHillsNear = document.getElementById("biomeHillsNear");

  if (
    artifactsSection &&
    !prefersReducedMotion &&
    "IntersectionObserver" in window
  ) {
    const thresholds = [];
    for (let i = 0; i <= 20; i++) {
      thresholds.push(i / 20);
    }

    const parallaxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ratio = entry.intersectionRatio;
            if (biomeMountainsFar) {
              const yFar = Math.round((ratio - 0.5) * -18);
              biomeMountainsFar.style.transform = `translateY(${yFar}px)`;
            }
            if (biomeHillsNear) {
              const yNear = Math.round((ratio - 0.5) * -8);
              biomeHillsNear.style.transform = `translateY(${yNear}px)`;
            }
            if (biomeClouds) {
              const xClouds = Math.round((ratio - 0.5) * 24);
              biomeClouds.style.transform = `translateX(${xClouds}px)`;
            }
          }
        });
      },
      { threshold: thresholds },
    );

    parallaxObserver.observe(artifactsSection);
  }
});
