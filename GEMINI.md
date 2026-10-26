# Role & Objective

Act as a Senior Creative Technologist and WebGL Frontend Architect (specializing in Active Theory-style interactive web experiences).
Your objective is to refactor and rebuild my current vanilla HTML/CSS/JS portfolio (`index.html`, `style.css`, `script.js`) into a scroll-driven, 3D WebGL interactive experience using **Vite + React + Tailwind CSS + Three.js (@react-three/fiber & @react-three/drei) + GSAP (ScrollTrigger) + Lenis**.

The visual theme combines my existing 2D sandbox/mining game aesthetic (pickaxes, floating islands, excavation) with a high-contrast, ink-stipple/halftone comic book WebGL shader aesthetic inspired by Active Theory's "The Notturno Experience".

---

# Step 1: Workspace Inspection & Content Extraction

1. Read my existing `index.html`, `style.css`, `script.js`, and `README.md` in the root directory.
2. Extract all my personal bio data, navigation links, project titles, descriptions, tech tags, and external URLs so no portfolio content is lost during the migration.
3. Preserve all existing assets in `/assets`:
   - `assets/hero-island.jpg`
   - `assets/project-kameka.jpg`
   - `assets/project-wave-of-zombies.jpg`
   - `assets/research-indo-nlp.jpg`
   - `assets/cursor-pickaxe.svg` & `assets/cursor-pickaxe-active.svg`
   - `assets/golden-pickaxe.png`, `assets/golden-pickaxe-active.png`, `assets/golden-pickaxe-raw.png`

---

# Step 2: Architecture & Dependency Setup

1. Initialize or convert the workspace into a **Vite + React** project while keeping `/assets` accessible in `public/assets/`.
2. Install the required packages:
   `three @react-three/fiber @react-three/drei gsap lenis lucide-react tailwindcss postcss autoprefixer`
3. Configure Tailwind CSS with a dark, high-contrast comic/sandbox palette (`#0a0a0c` obsidian black, `#f4f1ea` comic paper off-white, `#e62429` crimson accent, and `#f59e0b` golden pickaxe accent).

---

# Step 3: Core Features to Implement

### 1. Smooth Inertial Scroll & GSAP Sync (`src/App.jsx`)

- Initialize `Lenis` for smooth momentum scrolling.
- Synchronize `Lenis` scroll events with `gsap.registerPlugin(ScrollTrigger)` and bind `gsap.ticker` to `lenis.raf`.
- Layer a fixed full-viewport `<Canvas>` (`fixed inset-0 z-0 pointer-events-none`) behind a scrollable HTML/DOM overlay (`relative z-10`).

### 2. Custom GLSL Comic/Halftone & Excavation Shader (`src/shaders/ComicShaderMaterial.jsx`)

- Create a custom `shaderMaterial` using `@react-three/drei`.
- **Vertex Shader:** Pass UV coordinates and add a subtle wave/parallax distortion uniform (`uScrollVelocity`) that bends the mesh slightly based on how fast the user scrolls.
- **Fragment Shader:**
  - Sample the image texture (`uTexture`).
  - Convert luminance to a high-contrast comic ink threshold / halftone dot pattern when `uHover` is `0.0`.
  - Smoothly transition (`mix`) from the inked comic halftone look to the full-color original texture + a glowing border when `uHover` animates toward `1.0`.
  - Include a pixelation/voxel block-breaking transition uniform (`uBreakProgress`) when clicked.

### 3. 3D Scroll-Driven Camera & Scene (`src/components/Scene.jsx`)

- Load `hero-island.jpg`, `project-kameka.jpg`, `project-wave-of-zombies.jpg`, and `research-indo-nlp.jpg` as `THREE.Texture` planes positioned along a 3D descending mineshaft/excavation path on the Y and Z axes.
- Add floating 3D low-poly voxel/dust particles (`<Sparkles />` or custom `THREE.Points`) in the background to give depth as the camera travels through the scene.
- Build a master `gsap.timeline` with `ScrollTrigger` (`scrub: 1`) that animates the Three.js `camera.position` (X, Y, Z) and `camera.rotation` through keyframes corresponding to each DOM section:
  - **Section 1 (Hero):** Camera frames the `hero-island.jpg` plane with subtle mouse-parallax tilt.
  - **Section 2 (Project - Kameka):** Camera dives down and pans left to frame `project-kameka.jpg`.
  - **Section 3 (Project - Wave of Zombies):** Camera pans right and deeper down Z-axis to frame `project-wave-of-zombies.jpg`.
  - **Section 4 (Research - Indo NLP):** Camera centers at the bottom of the shaft to frame `research-indo-nlp.jpg`.
  - **Section 5 (About / Contact):** Camera pulls back to show the full constellation of planes.

### 4. Comic Panel DOM Overlay & Interactive Pickaxe Cursor (`src/components/Cursor.jsx` & `src/components/Overlay.jsx`)

- Style the HTML project cards to look like sharp, bold comic-book narrative boxes (`border-2 border-[#f4f1ea] bg-[#0a0a0c]/90 shadow-[6px_6px_0px_#e62429]`) paired with sandbox RPG stat badges for tech stacks.
- Build a custom interactive cursor component using `golden-pickaxe.png` / `cursor-pickaxe.svg` that follows the mouse with spring physics, rotates/swings on `mousedown` (`cursor-pickaxe-active.svg`), and spawns small 2D/canvas block debris particles on click.

---

# Step 4: Execution Rules

1. Do not give me placeholders or `// TODO` comments. Write the complete, production-ready code for all files.
2. Ensure proper cleanup of Three.js geometries, materials, GSAP ScrollTriggers, and Lenis instances on component unmount.
3. Make sure the layout degrades gracefully on mobile viewports by adjusting camera FOV and plane scales based on `useThree().viewport`.
4. After creating the files, run the dev server or build check to verify there are no import, syntax, or shader compilation errors.
