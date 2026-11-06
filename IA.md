# Information Architecture (IA) & Data Structure

## 1. Arsitektur Komponen (Vite React SPA)
Website menggunakan pola **3D Canvas Background (`Scene.jsx`) + HTML Scroll/View Overlay (`Overlay.jsx`)**.

```text
src/App.jsx
├── src/components/Cursor.jsx (Global Pickaxe Cursor)
├── src/components/Navbar.jsx (Navigasi Section)
├── src/components/Scene.jsx (3D WebGL Background)
│   ├── ExcavationEnvironment.jsx
│   └── ComicPlane.jsx (Menggunakan ComicShaderMaterial.jsx)
└── src/components/Overlay.jsx (Kontainer Utama UI)
    ├── HeroSection.jsx (+ Snippet Status "Now" & Bio Pribadi)
    ├── ProjectsSection.jsx (Artefak Proyek + Filter Kategori)
    ├── QuestsSection.jsx (Linimasa Kuliah, Riset Game AI & Karir)
    ├── GardenSection.jsx [BARU] (Field Notes / Tulisan & Modal Baca)
    ├── InventoryVault.jsx [UPDATE] (Tab: Tech Arsenal | Personal Gear | Tavern Logs)
    ├── ContactSection.jsx
    └── Footer.jsx
```

## 2. Navigasi (`Navbar.jsx`)
1. `Home` (`#hero`) - Identitas & Active Quest (Now)
2. `Excavations` (`#projects`) - Karya & Proyek
3. `Quests` (`#quests`) - Perjalanan Akademik & Pengalaman
4. `Field Notes` (`#notes`) - Catatan Skripsi, Seduhan Kopi & Opini
5. `Vault` (`#vault`) - Tech Arsenal (Tanpa Level), Gear & Hobi
6. `Contact` (`#contact`) - Kontak & Sosial Media

## 3. Struktur Data Lengkap (`src/data/portfolioData.js`)
Data di bawah ini menggabungkan isi web sebelumnya (Kameka, Wave of Zombies, UKDW) dengan pembaruan topik skripsi Game AI, tech stack tanpa level, dan profil personal.

```javascript
// src/data/portfolioData.js

export const playerProfile = {
  name: "Yehezkiel Darren Putra Wardoyo",
  handle: "th3Sisyphus",
  title: "durenzz",
  role: "Junior AI Engineer (Game AI) & Full-Stack Developer",
  bioShort: "Manusia biasa yang sedang belajar menjadi lebih profesional di bidang yang ditekuni. Seorang pribadi yang mampu bekerja dengan baik secara berkelompok, menyukai eksplorasi kecerdasan buatan di dalam video game, arsitektur web, musik, dan seduhan kopi manual.",
  location: "Sleman, Yogyakarta / Indonesia",
  hobbies: ["Main Game", "Main Piano", "Main Gitar", "Mendengarkan Musik", "Home Brewer"],
  currentStatus: {
    updatedAt: "6 November 2026",
    currentlyDoing: "Skripsi Game AI (Behaviour Tree & Blackboard NPC), Investasi di Growtopia, Eksplorasi semua jenis kopi",
    currentlyLearning: "Metode penelitian eksperimen Game AI & arsitektur pengambilan keputusan Companion NPC",
    currentObsession: "Bermain Growtopia & ngulik semua metode seduh V60"
  },
  socials: {
    github: "https://github.com/th3Sisyphus",
    linkedin: "https://www.linkedin.com/in/yehezkiel-darren-304bb1352/",
    instagram: "https://www.instagram.com/darrenpw_/",
    email: "darren.wardoyo@gmail.com"
  }
};

export const projectsData = [
  {
    id: 1,
    title: "Wave of Zombies",
    category: "Game AI & Dev",
    subtitle: "2D Top-Down Survival Shooter",
    description: "Game survival shooter 2D yang dibangun dari nol. Mengimplementasikan sistem wave spawner dinamis, pathfinding musuh, manajemen state senjata, dan optimasi performa objek.",
    image: "/assets/project-wave-of-zombies.jpg",
    tech: ["Python", "Pygame", "Game Loop", "AI Pathfinding"],
    link: "https://github.com/th3Sisyphus"
  },
  {
    id: 2,
    title: "Kameka",
    category: "Web & Systems",
    subtitle: "Full-Stack Web Platform",
    description: "Pengembangan aplikasi web modern dengan arsitektur database relasional yang terstruktur, antarmuka responsif, dan manajemen alur data backend yang rapi.",
    image: "/assets/project-kameka.jpg",
    tech: ["PHP", "Laravel", "JavaScript", "MariaDB", "Tailwind CSS"],
    link: "https://github.com/th3Sisyphus"
  },
  {
    id: 3,
    title: "Context-Aware Companion NPC",
    category: "Game AI & Dev",
    subtitle: "Skripsi / Game AI Research",
    description: "Pengembangan Context-Aware Behaviour Tree berbasis Blackboard untuk pengambilan keputusan Companion NPC yang adaptif terhadap situasi pertarungan dan lingkungan pemain.",
    image: "/assets/research-indo-nlp.jpg", // Tetap gunakan path aset yang ada agar tidak broken image
    tech: ["Game AI", "Behaviour Tree", "Blackboard System", "Python"],
    link: "https://github.com/th3Sisyphus"
  }
];

export const questsData = [
  {
    id: "quest-1",
    period: "Sekarang",
    title: "Final Boss: Skripsi Game AI",
    organization: "Universitas Kristen Duta Wacana (UKDW)",
    description: "Meneliti dan mengembangkan Context-Aware Behaviour Tree berbasis Blackboard untuk pengambilan keputusan Companion NPC.",
    type: "Main Quest"
  },
  {
    id: "quest-2",
    period: "Masa Kuliah",
    title: "Informatics Engineering Excavation",
    organization: "Universitas Kristen Duta Wacana (UKDW)",
    description: "Mendalami rekayasa perangkat lunak, kecerdasan buatan terapan, struktur data, dan pengembangan sistem web full-stack maupun game.",
    type: "Guild History"
  },
  {
    id: "quest-3",
    period: "Ongoing",
    title: "Home Brewer & Musician Journey",
    organization: "Personal Life",
    description: "Mengulik variabel seduhan kopi V60 (rasio, suhu, grind size), bermain piano dan gitar, serta menjaga kewarasan lewat musik dan game.",
    type: "Side Quest"
  }
];

export const fieldNotesData = [
  {
    id: "note-1",
    title: "Kenapa Behaviour Tree + Blackboard Cocok untuk Companion NPC",
    date: "2026-11-06",
    category: "Game AI & Tech",
    status: "Evergreen",
    summary: "Catatan seputar arsitektur pengambilan keputusan NPC agar tidak terasa kaku seperti robot saat menemani player.",
    content: `Dalam pengembangan game modern, Companion NPC sering kali terasa membebani pemain karena keputusan AI yang tidak peka konteks. Dengan memadukan Behaviour Tree dan Blackboard sebagai memori bersama (shared memory), NPC bisa membaca konteks lingkungan secara real-time sebelum mengeksekusi node aksi.`
  },
  {
    id: "note-2",
    title: "Catatan Seduh V60: Mencari Sweet Spot",
    date: "2026-11-01",
    category: "Coffee & Music",
    status: "Budding",
    summary: "Log eksperimen rasio air, suhu, dan teknik pouring untuk mengeluarkan karakter terbaik dari biji kopi.",
    content: `[ISI_CATATAN_RESEP_V60_FAVORITMU_DI_SINI]`
  }
];

// TANPA LEVEL BAR - Hanya nama, kategori, dan deskripsi fungsi
export const inventoryData = {
  techArsenal: [
    { id: "tech-1", name: "HTML + CSS + JS", category: "Core Web", desc: "Fondasi antarmuka web interaktif dan styling kustom." },
    { id: "tech-2", name: "Node.js", category: "Runtime & Backend", desc: "Eksekusi JavaScript sisi server dan tooling modern." },
    { id: "tech-3", name: "PHP & Laravel", category: "Full-Stack Framework", desc: "Pengembangan aplikasi web skala penuh yang kokoh dan terstruktur." },
    { id: "tech-4", name: "Python", category: "AI & Scripting", desc: "Bahasa utama untuk eksperimen Game AI, logika algoritma, dan prototipe." },
    { id: "tech-5", name: "MariaDB", category: "Relational DB", desc: "Manajemen basis data relasional untuk aplikasi produksi." },
    { id: "tech-6", name: "PostgreSQL", category: "Relational DB", desc: "Sistem database tingkat lanjut dengan integritas data tinggi." }
  ],
  personalGear: [
    { id: "gear-1", name: "Lenovo Ideapad Gaming 3 15 series", category: "Workstation", desc: "Mesin utama untuk ngoding, simulasi Behaviour Tree, dan render." },
    { id: "gear-2", name: "V60 Dripper + Grinder + Kettle", category: "Coffee Rig", desc: "Senjata utama home brewer setiap pagi dan malam." },
    { id: "gear-3", name: "Piano & Gitar", category: "Instruments", desc: "Pelarian terbaik saat butuh jeda dari layar monitor." },
    { id: "gear-4", name: "Nakamichi TW018ENC", category: "Audio", desc: "Teman setia mendengarkan musik sambil menyusun kode." }
  ],
  tavernLogs: [
    { id: "log-1", title: "Growtopia", type: "Game", notes: "Aktif trading dan investasi item di dalam ekonomi game." },
    { id: "log-2", title: "Eksplorasi Metode V60", type: "Coffee", notes: "Mencoba berbagai biji single origin dan variasi teknik tuangan." },
    { id: "log-3", title: "Sesi Piano & Gitar", type: "Music", notes: "Latihan lagu favorit di sela-sela pengerjaan skripsi." }
  ]
};
```
