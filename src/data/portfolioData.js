// src/data/portfolioData.js
// Tanpa level bar / persentase / tier kemahiran untuk skill apa pun.

export const playerProfile = {
  name: "Yehezkiel Darren Putra Wardoyo",
  handle: "th3Sisyphus",
  title: "durenzz",
  role: "Junior AI Engineer (Game AI) & Full-Stack Developer",
  bioShort:
    "Manusia biasa yang sedang belajar menjadi lebih profesional di bidang yang ditekuni. Seorang pribadi yang mampu bekerja dengan baik secara berkelompok, menyukai eksplorasi kecerdasan buatan di dalam video game, arsitektur web, musik, dan seduhan kopi manual.",
  location: "Sleman, Yogyakarta / Indonesia",
  hobbies: [
    "Main Game",
    "Main Piano",
    "Main Gitar",
    "Mendengarkan Musik",
    "Home Brewer",
  ],
  currentStatus: {
    updatedAt: "6 November 2026",
    currentlyDoing:
      "Skripsi Game AI (Behaviour Tree & Blackboard NPC), Investasi di Growtopia, Eksplorasi semua jenis kopi",
    currentlyLearning:
      "Metode penelitian eksperimen Game AI & arsitektur pengambilan keputusan Companion NPC",
    currentObsession: "Bermain Growtopia & ngulik semua metode seduh V60",
  },
  socials: {
    github: "https://github.com/th3Sisyphus",
    linkedin: "https://www.linkedin.com/in/yehezkiel-darren-304bb1352/",
    instagram: "https://www.instagram.com/darrenpw_/",
    email: "darren.wardoyo@gmail.com",
  },
};

export const projectCategories = ["All", "Game AI & Dev", "Web & Systems"];

export const projectsData = [
  {
    id: 1,
    title: "Wave of Zombies",
    category: "Game AI & Dev",
    subtitle: "2D Top-Down Survival Shooter",
    description:
      "Game survival shooter 2D yang dibangun dari nol. Mengimplementasikan sistem wave spawner dinamis, pathfinding musuh, manajemen state senjata, dan optimasi performa objek.",
    image: "/assets/project-wave-of-zombies.png",
    tech: ["Python", "Pygame", "Game Loop", "AI Pathfinding"],
    link: "https://github.com/th3Sisyphus/wave-of-zombies",
  },
  {
    id: 2,
    title: "Kameka",
    category: "Web & Systems",
    subtitle: "Full-Stack Web Platform",
    description:
      "Pengembangan aplikasi web modern dengan arsitektur database relasional yang terstruktur, antarmuka responsif, dan manajemen alur data backend yang rapi.",
    image: "/assets/project-kameka.jpg",
    tech: ["PHP", "Laravel", "JavaScript", "MariaDB", "Tailwind CSS"],
    link: "https://github.com/th3Sisyphus/kameka",
  },
  {
    id: 3,
    title: "Context-Aware Companion NPC",
    category: "Game AI & Dev",
    subtitle: "Skripsi / Game AI Research",
    description:
      "Pengembangan Context-Aware Behaviour Tree berbasis Blackboard untuk pengambilan keputusan Companion NPC yang adaptif terhadap situasi pertarungan dan lingkungan pemain.",
    // Tetap gunakan path aset yang ada agar tidak broken image
    image: "/assets/research-indo-nlp.jpg",
    tech: ["Game AI", "Behaviour Tree", "Blackboard System", "Python"],
    link: "https://github.com/th3Sisyphus",
  },
];

export const questsData = [
  {
    id: "quest-1",
    period: "Sekarang",
    title: "Final Boss: Skripsi Game AI",
    organization: "Universitas Kristen Duta Wacana (UKDW)",
    description:
      "Pengembangan Context-Aware Behaviour Tree Berbasis Blackboard untuk Pengambilan Keputusan Companion NPC. Meneliti bagaimana NPC pendamping membaca konteks pertarungan dan lingkungan sebelum memilih aksi.",
    type: "Main Quest",
    featured: true,
    // Tetap gunakan path aset yang ada agar tidak broken image
    image: "/assets/research-indo-nlp.jpg",
    caption: "THESIS DOSSIER // COMPANION NPC",
    tags: ["Behaviour Tree", "Blackboard", "Companion NPC", "Game AI"],
  },
  {
    id: "quest-2",
    period: "Masa Kuliah",
    title: "Informatics Engineering Excavation",
    organization: "Universitas Kristen Duta Wacana (UKDW)",
    description:
      "Mendalami rekayasa perangkat lunak, kecerdasan buatan terapan, struktur data, dan pengembangan sistem web full-stack maupun game.",
    type: "Guild History",
    tags: ["Software Engineering", "Applied AI", "Full-Stack"],
  },
  {
    id: "quest-3",
    period: "Ongoing",
    title: "Home Brewer & Musician Journey",
    organization: "Personal Life",
    description:
      "Mengulik variabel seduhan kopi V60 (rasio, suhu, grind size), bermain piano dan gitar, serta menjaga kewarasan lewat musik dan game.",
    type: "Side Quest",
    tags: ["V60", "Piano", "Gitar"],
  },
  {
    id: "quest-4",
    period: "2026",
    title: "ANIMIT Project Lead",
    organization: "Academic Software Architecture Group",
    description:
      "Memimpin arsitektur rekayasa untuk aplikasi streaming konten desktop: menyusun data flow diagram, skema database yang konsisten, serta parameter validasi anti-cheat.",
    type: "Guild History",
    tags: ["System Architecture", "Anti-Cheat Validation", "Data Flow Diagrams"],
  },
  {
    id: "quest-5",
    period: "2025",
    title: "Tournament Lead & Designer",
    organization: "Open Challenge Badminton: King of The Court",
    description:
      "Mengarahkan materi pemasaran, komunikasi peserta, dan identitas visual turnamen terbuka: banner panggung, sertifikat, kampanye sosial, dan logistik pendaftaran.",
    type: "Guild History",
    tags: ["Media Production", "Tournament Operations", "Brand Identity"],
  },
];

export const fieldNoteCategories = [
  "All",
  "Game AI & Tech",
  "Coffee & Music",
  "Thoughts",
];

export const fieldNotesData = [
  {
    id: "note-1",
    title: "Kenapa Behaviour Tree + Blackboard Cocok untuk Companion NPC",
    date: "2026-11-06",
    category: "Game AI & Tech",
    status: "Evergreen",
    summary:
      "Catatan seputar arsitektur pengambilan keputusan NPC agar tidak terasa kaku seperti robot saat menemani player.",
    content: `Dalam pengembangan game modern, Companion NPC sering kali terasa membebani pemain karena keputusan AI yang tidak peka konteks. Dengan memadukan Behaviour Tree dan Blackboard sebagai memori bersama (shared memory), NPC bisa membaca konteks lingkungan secara real-time sebelum mengeksekusi node aksi.`,
  },
  {
    id: "note-2",
    title: "Catatan Seduh V60: Mencari Sweet Spot",
    date: "2026-11-01",
    category: "Coffee & Music",
    status: "Seedling",
    summary:
      "Log eksperimen rasio air, suhu, dan teknik pouring untuk mengeluarkan karakter terbaik dari biji kopi.",
    content: `Catatan ini masih berupa draf. Resep lengkap akan ditulis setelah eksperimen selesai.

Variabel yang sedang diulik: rasio kopi dan air, suhu air, ukuran gilingan, serta teknik tuang. Satu variabel diubah per seduhan, supaya perbedaan rasa bisa ditelusuri penyebabnya.`,
  },
];

// TANPA LEVEL BAR - hanya nama, kategori, dan deskripsi fungsi
export const inventoryData = {
  techArsenal: [
    {
      id: "tech-1",
      name: "HTML + CSS + JS",
      tag: "Language",
      category: "Core Web",
      desc: "Fondasi antarmuka web interaktif dan styling kustom.",
    },
    {
      id: "tech-2",
      name: "Node.js",
      tag: "Language",
      category: "Runtime & Backend",
      desc: "Eksekusi JavaScript sisi server dan tooling modern.",
    },
    {
      id: "tech-3",
      name: "PHP & Laravel",
      tag: "Framework",
      category: "Full-Stack Framework",
      desc: "Pengembangan aplikasi web skala penuh yang kokoh dan terstruktur.",
    },
    {
      id: "tech-4",
      name: "Python",
      tag: "Language",
      category: "AI & Scripting",
      desc: "Bahasa utama untuk eksperimen Game AI, logika algoritma, dan prototipe.",
    },
    {
      id: "tech-5",
      name: "MariaDB",
      tag: "Database",
      category: "Relational DB",
      desc: "Manajemen basis data relasional untuk aplikasi produksi.",
    },
    {
      id: "tech-6",
      name: "PostgreSQL",
      tag: "Database",
      category: "Relational DB",
      desc: "Sistem database tingkat lanjut dengan integritas data tinggi.",
    },
    {
      id: "tech-7",
      name: "Behaviour Trees & Game AI",
      tag: "Game AI",
      category: "Decision Making",
      desc: "Arsitektur pengambilan keputusan NPC berbasis Behaviour Tree dan Blackboard untuk skripsi.",
    },
  ],
  personalGear: [
    {
      id: "gear-1",
      name: "Lenovo Ideapad Gaming 3 15 series",
      category: "Workstation",
      desc: "Mesin utama untuk ngoding, simulasi Behaviour Tree, dan render.",
    },
    {
      id: "gear-2",
      name: "V60 Dripper + Grinder + Kettle",
      category: "Coffee Rig",
      desc: "Senjata utama home brewer setiap pagi dan malam.",
    },
    {
      id: "gear-3",
      name: "Piano & Gitar",
      category: "Instruments",
      desc: "Pelarian terbaik saat butuh jeda dari layar monitor.",
    },
    {
      id: "gear-4",
      name: "Nakamichi TW018ENC",
      category: "Audio",
      desc: "Teman setia mendengarkan musik sambil menyusun kode.",
    },
  ],
  tavernLogs: [
    {
      id: "log-1",
      name: "Growtopia",
      category: "Game",
      desc: "Aktif trading dan investasi item di dalam ekonomi game.",
    },
    {
      id: "log-2",
      name: "Eksplorasi Metode V60",
      category: "Coffee",
      desc: "Mencoba berbagai biji single origin dan variasi teknik tuangan.",
    },
    {
      id: "log-3",
      name: "Sesi Piano & Gitar",
      category: "Music",
      desc: "Latihan lagu favorit di sela-sela pengerjaan skripsi.",
    },
  ],
};

export const channelsData = [
  {
    id: "github",
    tag: "HUB",
    name: "GitHub Network",
    address: "github.com/th3Sisyphus",
    url: playerProfile.socials.github,
  },
  {
    id: "linkedin",
    tag: "LINK",
    name: "LinkedIn Profile",
    address: "linkedin.com/in/yehezkiel-darren",
    url: playerProfile.socials.linkedin,
  },
  {
    id: "instagram",
    tag: "SNAP",
    name: "Instagram",
    address: "@darrenpw_",
    url: playerProfile.socials.instagram,
  },
  {
    id: "email",
    tag: "MAIL",
    name: "Direct Transmission",
    address: playerProfile.socials.email,
    url: `mailto:${playerProfile.socials.email}`,
  },
];

// Agregat kompatibilitas untuk import lama `portfolioData`
export const portfolioData = {
  profile: playerProfile,
  projects: projectsData,
  quests: questsData,
  notes: fieldNotesData,
  inventory: inventoryData,
  channels: channelsData,
};
