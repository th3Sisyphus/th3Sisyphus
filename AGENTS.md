# AI Coding Agent Instructions (`agents.md`)

## 1. Konteks Repo & Skill Desain
Kamu bekerja pada repositori Vite + React (JavaScript `.jsx`), menggunakan Tailwind CSS, custom CSS (`src/index.css`, `style.css`), serta komponen 3D WebGL (`Scene.jsx`, `ExcavationEnvironment.jsx`, `ComicPlane.jsx`, `ComicShaderMaterial.jsx`).
**PENTING**: Gunakan prinsip **`taste-skill`** dalam setiap penulisan UI/CSS—hindari tampilan AI generik, pertahankan ketegasan border komik, kontras tinggi, dan micro-interactions yang presisi.

## 2. Aturan Mutlak (Strict Constraints)
1. **DILARANG MERUSAK UI/UX & 3D SCENE**: Jangan ubah `Scene.jsx`, `ExcavationEnvironment.jsx`, `ComicPlane.jsx`, `ComicShaderMaterial.jsx`, maupun `Cursor.jsx`.
2. **GUNAKAN `.jsx` & `.js`**: Repo ini memakai JavaScript/JSX murni. Jangan buat file `.ts` atau `.tsx`.
3. **TANPA LEVEL SKILL**: Di `InventoryVault.jsx` dan `portfolioData.js`, **JANGAN** tampilkan level bar, angka persentase, atau tier tingkat kemahiran untuk bahasa pemrograman (`HTML+CSS+JS`, `Node.js`, `PHP/Laravel`, `Python`, `MariaDB`, `PostgreSQL`). Tampilkan sebagai badge/artefak yang setara.
4. **TOPIK RISET/SKRIPSI**: Ubah referensi riset NLP lama menjadi topik skripsi Game AI: *"Pengembangan Context-Aware Behaviour Tree Berbasis Blackboard untuk Pengambilan Keputusan Companion NPC"* (namun tetap gunakan path gambar `/assets/research-indo-nlp.jpg` jika belum ada gambar baru agar tidak broken image).

## 3. Langkah Eksekusi (Step-by-Step)

### Langkah 1: Baca & Pahami Kode Eksisting
- Baca `src/App.jsx`, `src/components/Overlay.jsx`, `src/components/Navbar.jsx`, dan `src/data/portfolioData.js`.
- Perhatikan cara `Cursor.jsx` mendeteksi elemen interaktif.

### Langkah 2: Update `src/data/portfolioData.js`
- Terapkan skema data dari `information-architecture.md` yang sudah berisi profil lengkap **Yehezkiel Darren Putra Wardoyo (`th3Sisyphus` / `durenzz`)**.
- Pastikan экspor lama tetap kompatibel atau sesuaikan import di komponen terkait.

### Langkah 3: Update `HeroSection.jsx`
- Tampilkan bio utuh dan tambahkan komponen **Current Quest / Now Status** (`currentStatus` dari `playerProfile`) yang menampilkan kesibukan Skripsi Behaviour Tree NPC, investasi Growtopia, dan ngulik kopi V60.

### Langkah 4: Buat `src/components/GardenSection.jsx` (Field Notes)
- Buat section baru dengan gaya visual identik seperti `QuestsSection.jsx` + disiplin `taste-skill`.
- Sediakan filter kategori (`All`, `Game AI & Tech`, `Coffee & Music`, `Thoughts`).
- Klik kartu membuka **Modal Reader** bergaya komik untuk membaca artikel penuh.

### Langkah 5: Perbarui `src/components/InventoryVault.jsx`
- Hapus semua bar/indikator level pada skill.
- Tambahkan tab switcher di atas Vault: `Tech Arsenal`, `Personal Gear`, `Tavern Logs`.
- Render daftar tech (`HTML+CSS+JS`, `Node.js`, `PHP & Laravel`, `Python`, `MariaDB`, `PostgreSQL`), gear, dan hobi sesuai tab aktif.

### Langkah 6: Integrasi di `Overlay.jsx` & `Navbar.jsx`
- Masukkan `<GardenSection />` ke dalam `src/components/Overlay.jsx`.
- Update link di `src/components/Navbar.jsx`.
- Jalankan `npm run build` untuk memastikan build sukses tanpa error.
