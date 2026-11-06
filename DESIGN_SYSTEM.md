# Design System: Comic Shader, Excavation RPG & `taste-skill` Rules

## 1. Prinsip Mutlak: Zero Visual Regression + `taste-skill`
DILARANG merusak gaya visual yang sudah tertanam di `src/index.css`, `style.css`, `tailwind.config.js`, dan `src/shaders/ComicShaderMaterial.jsx`. Padukan estetika buku komik / ekskavasi RPG dengan disiplin desain **`taste-skill`**:
- **Anti-Generic AI Slop**: Dilarang memakai kartu glassmorphism generik, gradien ungu-biru standar AI, atau bayangan blur lembut (`shadow-lg` biasa).
- **Hard-Edge Comic Aesthetics**: Wajib gunakan border tegas (`border-2` atau `border-4` hitam/gelap), offset hard shadow khas buku komik, dan kontras warna tinggi.
- **Tipografi Berkarakter**: Pertahankan hierarki font display komik/retro untuk judul dan font baca yang bersih untuk konten panjang di modal.

## 2. Elemen Inti yang Wajib Dipertahankan
- **Custom Cursor (`src/components/Cursor.jsx`)**:
  - Default: `/assets/cursor-pickaxe.svg` / `golden-pickaxe.png`
  - Active/Click: `/assets/cursor-pickaxe-active.svg` / `golden-pickaxe-active.png`
  - Semua tombol, tab filter, dan kartu baru wajib memicu state hover/active kursor ini.
- **3D & Shaders (`Scene.jsx`, `ExcavationEnvironment.jsx`, `ComicPlane.jsx`)**:
  - Jangan ubah parameter pencahayaan, outline komik, atau posisi kamera.

## 3. Aturan Pembuatan & Update Komponen

### 3.1. Field Notes / Garden (`GardenSection.jsx`)
- **Container**: Salin class wrapper dan spacing dari `QuestsSection.jsx` atau `ProjectsSection.jsx`.
- **Card Item**: Gunakan border tegas, warna background, dan efek hover bergeser (translate) yang sama persis dengan kartu di `QuestsSection.jsx`.
- **Reader Modal (Pop-up Baca Tulisan)**:
  - Saat tulisan diklik, tampilkan modal di tengah layar dengan backdrop gelap.
  - Gunakan bingkai bergaya panel komik/kotak dialog RPG.
  - Sediakan tombol `[X] Close` yang jelas dan berinteraksi dengan `Cursor.jsx`.

### 3.2. Update `InventoryVault.jsx` (Tanpa Level Bar)
- **Hapus Level/Progress Bar**: Jangan tampilkan bar persentase atau angka level pada bahasa pemrograman. Gunakan tag kategori (`Language`, `Framework`, `Database`, `Game AI`).
- **Tab Switcher**: Tambahkan tab di bagian atas vault: `[Tech Arsenal]` | `[Personal Gear]` | `[Tavern Logs]`.
- Gaya tombol tab wajib meniru tombol navigasi di `Navbar.jsx`.

### 3.3. Status "Now" Banner (`HeroSection.jsx`)
- Buat komponen kotak status bergaya "Active Quest Log" di dalam atau tepat di bawah `HeroSection.jsx`.
- Gunakan aksen emas/kuning (senada dengan `golden-pickaxe`) dan border hitam tebal.