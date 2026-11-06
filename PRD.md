# Product Requirements Document (PRD): Personal Hub & Excavation RPG

## 1. Tujuan Produk
Perluas web portofolio bertema RPG/Excavation (`Vite + React + 3D Comic Shader`) dari sekadar pajangan karir menjadi hub personal menyeluruh (Game AI & Engineering, Tulisan/Field Notes, Hobi/Home Brewer & Musik, Status Terkini). Pertahankan 100% kanvas 3D, shader komik, kursor pickaxe, dan UI yang ada dengan standar desain `taste-skill`.

## 2. Identitas & Variabel Pengguna (Diisi di `src/data/portfolioData.js`)
- **Nama / Player Name**: `Yehezkiel Darren Putra Wardoyo`
- **Handle / Class**: `th3Sisyphus`
- **Title / Tagline**: `durenzz`
- **Base / Location**: `Sleman, Yogyakarta / Indonesia`
- **Main Guild (Karir/Kuliah)**: `Junior AI Engineer (Game AI Focus) & Full-Stack Web Developer`
- **Active Thesis / Main Quest**: `Pengembangan Context-Aware Behaviour Tree Berbasis Blackboard untuk Pengambilan Keputusan Companion NPC`
- **Sub-Classes (Minat/Hobi)**: `Main Game (Growtopia), Main Piano, Main Gitar, Mendengarkan Musik, Home Brewer (V60)`
- **Kontak & Sosial**:
  - Email: `darren.wardoyo@gmail.com`
  - GitHub: `https://github.com/th3Sisyphus`
  - LinkedIn: `https://www.linkedin.com/in/yehezkiel-darren-304bb1352/`
  - Instagram: `https://www.instagram.com/darrenpw_/`

## 3. Fitur & Ekspansi Section (Di dalam `Overlay.jsx` / View State)
Karena arsitektur memakai 3D `Scene.jsx` + `Overlay.jsx` (SPA), ekspansi dilakukan lewat tab/section baru atau modal komik tanpa merusak konteks WebGL.

### 3.1. Hero & Now Status (`HeroSection.jsx`)
- **Player Intro**: Tetap gunakan visual pulau (`hero-island.jpg`) dan gaya komik. Tampilkan bio personal (`Manusia biasa yang sedang belajar menjadi lebih profesional di bidang yang ditekuni...`) serta identitas multi-disiplin.
- **Current Quest Banner (Now)**: Kotak status aktif di dekat Hero:
  - *Doing*: Skripsi (Context-Aware Behaviour Tree & Blackboard untuk Companion NPC), Investasi di Growtopia, Eksplorasi jenis biji kopi.
  - *Learning*: Metode penelitian Game AI & arsitektur Behaviour Tree.
  - *Obsession*: Growtopia & ngulik metode seduh V60.

### 3.2. Main Quests & Excavations (`ProjectsSection.jsx` & `QuestsSection.jsx`)
- **Projects (Artefak Proyek)**: Pertahankan proyek lama (`Wave of Zombies`, `Kameka`, `Context-Aware Behaviour Tree NPC`) dan tambah tab filter: `All`, `Game AI & Dev`, `Web & Systems`.
- **Quests (Linimasa Pengalaman)**: Pertahankan `QuestsSection.jsx` (Studi Informatika UKDW, AI Research & Game Dev, Full-Stack & System Architecture).

### 3.3. The Archives / Field Notes (Baru: `GardenSection.jsx`)
- **Fungsi**: Tempat tulisan, log dev skripsi Game AI, catatan racikan kopi V60, dan pemikiran bebas.
- **UI**: Gaya panel komik/kotak dialog yang seragam dengan kartu di `QuestsSection`.
- **Fitur Baca**: Klik item membuka **Comic Reader Modal** (overlay pop-up di atas scene).
- **Filter**: `All`, `Game AI & Tech`, `Coffee & Music`, `Thoughts`.

### 3.4. Side Quests & Inventory (`InventoryVault.jsx` + Ekspansi Tanpa Level)
- **Aturan Utama**: **HAPUS indikator level/persentase** pada bahasa pemrograman & skill. Tampilkan sebagai koleksi badge/item artefak yang setara.
- **Tab 1 - Tech Arsenal**: `HTML + CSS + JS`, `Node.js`, `PHP`, `Laravel`, `Python`, `MariaDB`, `PostgreSQL`, `Behaviour Trees & Game AI`.
- **Tab 2 - Personal Gear (`/uses`)**: Perangkat tempur harian (Laptop/PC, Alat Seduh Kopi V60, Instrumen Musik Piano/Gitar).
- **Tab 3 - Tavern Logs (Hobi & Media)**: Log seduhan kopi (biji, rasio, metode V60), rotasi musik, instrumen, dan progress Growtopia.

### 3.5. Send Raven / Contact (`ContactSection.jsx` & `Footer.jsx`)
- Pertahankan `ContactSection.jsx` dan `Footer.jsx` yang sudah ada.

## 4. Batasan Teknis
- **Stack Tetap**: Vite + React (`.jsx`), Tailwind CSS, Three.js / React Three Fiber (`ComicShaderMaterial.jsx`).
- **Design Skill**: Terapkan prinsip `taste-skill` (hindari AI slop, jaga ketajaman border komik, ritme tipografi, dan micro-interactions yang presisi).
- **Zero Asset Damage**: Kursor kapak (`golden-pickaxe.png`, `cursor-pickaxe.svg`) dan shader wajib tetap berjalan mulus.