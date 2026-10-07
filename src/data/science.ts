// Data Modul Sains (Dunia Sains & Teknologi Tahun 1) — KSSR Semakan.
// Semua aktiviti berasaskan "ketik untuk pilih" supaya mesra kanak-kanak 7 tahun.

export type ScienceColor = 'green' | 'blue' | 'orange' | 'red' | 'purple'

export const SCIENCE_BADGE = {
  id: 'saintis-cilik',
  name: 'Saintis Cilik',
  emoji: '🔬',
  requiredCorrect: 15,
}

/** Satu titik "hotspot" pada gambar rajah — kedudukan dalam peratus (%). */
export interface SciencePart {
  label: string
  x: number
  y: number
}

/** Satu kad untuk Mod Belajar. */
export interface ScienceCard {
  emoji: string
  title: string
  desc: string
}

/** Soalan Sains — gabungan beberapa jenis aktiviti, semua ketik-untuk-pilih. */
export type ScienceQuestion =
  // Pilih jawapan betul daripada gambar
  | {
      kind: 'pilih'
      prompt: string
      speak: string
      image: string
      choices: string[]
      answer: string
      solution: string
    }
  // Tanda bahagian: subjek besar + titik berkelip, pilih nama bahagian ditunjuk
  | {
      kind: 'label'
      prompt: string
      speak: string
      subject: string
      /** Rajah lukis sendiri (bukan emoji) supaya setiap bahagian jelas & boleh dilabel. */
      diagram?: 'plant' | 'bird'
      parts: SciencePart[]
      targetIndex: number
      solution: string
    }
  // Pengelasan: satu kad, pilih kumpulan yang betul (2 petak)
  | {
      kind: 'sort'
      prompt: string
      speak: string
      image: string
      itemLabel: string
      bins: [string, string]
      answer: string
      solution: string
    }
  // Deria/eksperimen: objek → pilih rasa/deria yang betul
  | {
      kind: 'deria'
      prompt: string
      speak: string
      image: string
      choices: string[]
      answer: string
      solution: string
    }

export interface ScienceUnit {
  level: number
  title: string
  subtitle: string
  emoji: string
  color: ScienceColor
  learn: ScienceCard[]
  questions: ScienceQuestion[]
}

export const SCIENCE_UNITS: ScienceUnit[] = [
  // ---------------------------------------------------------------------------
  {
    level: 1,
    title: 'Unit 1',
    subtitle: 'Memerhati & Mengelas',
    emoji: '🔍',
    color: 'green',
    learn: [
      { emoji: '👀', title: 'Memerhati', desc: 'Kita guna mata untuk melihat dan memerhati benda di sekeliling.' },
      { emoji: '⚖️', title: 'Membanding', desc: 'Kita boleh banding saiz: besar atau kecil, panjang atau pendek.' },
      { emoji: '🗂️', title: 'Mengelas', desc: 'Mengumpul benda yang sama, contohnya warna sama atau bentuk sama.' },
      { emoji: '🔴', title: 'Kumpul Ikut Warna', desc: 'Kita boleh kumpulkan benda ikut warna: merah, biru, kuning dan hijau.' },
      { emoji: '🔺', title: 'Kumpul Ikut Bentuk', desc: 'Benda ada bentuk berbeza: bulat, segi empat dan segi tiga.' },
      { emoji: '📏', title: 'Kumpul Ikut Saiz', desc: 'Kita banding saiz benda: besar, sederhana atau kecil.' },
      { emoji: '🖐️', title: 'Pancaindera', desc: 'Kita memerhati guna mata, telinga, hidung, lidah dan kulit.' },
    ],
    questions: [
      { kind: 'pilih', prompt: 'Yang mana paling BESAR?', speak: 'Yang mana paling besar?', image: '🐘', choices: ['🐘', '🐈', '🐜'], answer: '🐘', solution: 'Gajah 🐘 paling besar.' },
      { kind: 'pilih', prompt: 'Yang mana paling KECIL?', speak: 'Yang mana paling kecil?', image: '🐜', choices: ['🐜', '🐕', '🐄'], answer: '🐜', solution: 'Semut 🐜 paling kecil.' },
      { kind: 'pilih', prompt: 'Yang mana paling PANJANG?', speak: 'Yang mana paling panjang?', image: '🐍', choices: ['🐍', '🐛', '🐞'], answer: '🐍', solution: 'Ular 🐍 paling panjang.' },
      { kind: 'pilih', prompt: 'Yang mana BUKAN buah-buahan?', speak: 'Yang mana bukan buah?', image: '🥕', choices: ['🥕', '🍎', '🍌'], answer: '🥕', solution: 'Lobak 🥕 ialah sayur, bukan buah.' },
      { kind: 'sort', prompt: 'Letakkan dalam kumpulan yang betul', speak: 'Epal ini warna apa?', image: '🍎', itemLabel: 'Epal', bins: ['Merah 🔴', 'Kuning 🟡'], answer: 'Merah 🔴', solution: 'Epal ini berwarna merah.' },
      { kind: 'sort', prompt: 'Letakkan dalam kumpulan yang betul', speak: 'Pisang ini warna apa?', image: '🍌', itemLabel: 'Pisang', bins: ['Merah 🔴', 'Kuning 🟡'], answer: 'Kuning 🟡', solution: 'Pisang berwarna kuning.' },
      { kind: 'pilih', prompt: 'Yang mana berbentuk BULAT?', speak: 'Yang mana bulat?', image: '⚽', choices: ['⚽', '📏', '📒'], answer: '⚽', solution: 'Bola ⚽ berbentuk bulat.' },
      { kind: 'pilih', prompt: 'Yang mana paling TINGGI?', speak: 'Yang mana paling tinggi?', image: '🦒', choices: ['🦒', '🐑', '🐇'], answer: '🦒', solution: 'Zirafah 🦒 paling tinggi.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    level: 2,
    title: 'Unit 2',
    subtitle: 'Deria Manusia',
    emoji: '🖐️',
    color: 'blue',
    learn: [
      { emoji: '👁️', title: 'Mata — Melihat', desc: 'Kita guna mata untuk melihat warna dan bentuk.' },
      { emoji: '👂', title: 'Telinga — Mendengar', desc: 'Kita guna telinga untuk mendengar bunyi.' },
      { emoji: '👃', title: 'Hidung — Menghidu', desc: 'Kita guna hidung untuk menghidu bau.' },
      { emoji: '👅', title: 'Lidah — Merasa', desc: 'Kita guna lidah untuk merasa manis, masam dan masin.' },
      { emoji: '✋', title: 'Kulit — Menyentuh', desc: 'Kita guna kulit untuk rasa sejuk, panas, licin atau kasar.' },
      { emoji: '🖐️', title: 'Lima Deria', desc: 'Kita ada lima deria untuk mengenali dunia di sekeliling kita.' },
      { emoji: '🛡️', title: 'Menjaga Deria', desc: 'Kita perlu jaga mata, telinga dan gigi supaya sentiasa sihat.' },
    ],
    questions: [
      { kind: 'label', prompt: 'Yang mana MATA?', speak: 'Yang mana mata?', subject: '🧒', parts: [{ label: 'Mata', x: 38, y: 46 }, { label: 'Hidung', x: 50, y: 58 }, { label: 'Mulut', x: 50, y: 72 }], targetIndex: 0, solution: 'Mata di bahagian atas muka — untuk melihat.' },
      { kind: 'label', prompt: 'Yang mana MULUT?', speak: 'Yang mana mulut?', subject: '🧒', parts: [{ label: 'Mata', x: 38, y: 46 }, { label: 'Hidung', x: 50, y: 58 }, { label: 'Mulut', x: 50, y: 72 }], targetIndex: 2, solution: 'Mulut di bahagian bawah muka — untuk makan dan bercakap.' },
      { kind: 'deria', prompt: 'Apakah RASA buah ini?', speak: 'Apakah rasa lemon?', image: '🍋', choices: ['Masam', 'Manis', 'Masin'], answer: 'Masam', solution: 'Lemon 🍋 rasanya masam.' },
      { kind: 'deria', prompt: 'Apakah RASA madu ini?', speak: 'Apakah rasa madu?', image: '🍯', choices: ['Manis', 'Masam', 'Pahit'], answer: 'Manis', solution: 'Madu 🍯 rasanya manis.' },
      { kind: 'deria', prompt: 'Deria apa untuk benda ini?', speak: 'Deria apa untuk loceng?', image: '🔔', choices: ['Telinga 👂', 'Mata 👁️', 'Lidah 👅'], answer: 'Telinga 👂', solution: 'Loceng 🔔 didengar dengan telinga.' },
      { kind: 'deria', prompt: 'Deria apa untuk benda ini?', speak: 'Deria apa untuk bunga?', image: '🌹', choices: ['Hidung 👃', 'Telinga 👂', 'Mata 👁️'], answer: 'Hidung 👃', solution: 'Bunga 🌹 dihidu dengan hidung.' },
      { kind: 'deria', prompt: 'Bagaimana rasa ais ini?', speak: 'Bagaimana rasa ais?', image: '🧊', choices: ['Sejuk', 'Panas', 'Manis'], answer: 'Sejuk', solution: 'Ais 🧊 terasa sejuk pada kulit.' },
      { kind: 'deria', prompt: 'Apakah RASA cili ini?', speak: 'Apakah rasa cili?', image: '🌶️', choices: ['Pedas', 'Manis', 'Masin'], answer: 'Pedas', solution: 'Cili 🌶️ rasanya pedas.' },
      { kind: 'pilih', prompt: 'Deria apa untuk melihat pelangi?', speak: 'Deria apa untuk melihat pelangi?', image: '🌈', choices: ['Mata 👁️', 'Hidung 👃', 'Lidah 👅'], answer: 'Mata 👁️', solution: 'Pelangi 🌈 dilihat dengan mata.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    level: 3,
    title: 'Unit 3',
    subtitle: 'Bahagian Tubuh Haiwan',
    emoji: '🦜',
    color: 'orange',
    learn: [
      { emoji: '🦅', title: 'Paruh & Kepak', desc: 'Burung ada paruh untuk makan dan kepak untuk terbang.' },
      { emoji: '🐠', title: 'Sirip & Sisik', desc: 'Ikan ada sirip untuk berenang dan sisik pada badannya.' },
      { emoji: '🐘', title: 'Belalai', desc: 'Gajah ada belalai yang panjang untuk minum air.' },
      { emoji: '🐈', title: 'Ekor & Kaki', desc: 'Banyak haiwan ada ekor dan kaki untuk bergerak.' },
      { emoji: '🦁', title: 'Bulu', desc: 'Banyak haiwan ada bulu untuk memanaskan badan mereka.' },
      { emoji: '🐢', title: 'Cengkerang', desc: 'Kura-kura ada cengkerang keras untuk melindungi badannya.' },
      { emoji: '🦌', title: 'Tanduk', desc: 'Sesetengah haiwan ada tanduk di atas kepala.' },
      { emoji: '🐍', title: 'Cara Bergerak', desc: 'Haiwan bergerak cara berbeza: berjalan, terbang, berenang dan melata.' },
    ],
    questions: [
      { kind: 'label', diagram: 'bird', prompt: 'Yang mana PARUH burung?', speak: 'Yang mana paruh burung?', subject: '🐦', parts: [{ label: 'Paruh', x: 13, y: 38 }, { label: 'Kepak', x: 52, y: 46 }, { label: 'Ekor', x: 88, y: 46 }], targetIndex: 0, solution: 'Paruh di hadapan kepala — burung guna untuk makan.' },
      { kind: 'label', diagram: 'bird', prompt: 'Yang mana EKOR burung?', speak: 'Yang mana ekor burung?', subject: '🐦', parts: [{ label: 'Paruh', x: 13, y: 38 }, { label: 'Kepak', x: 52, y: 46 }, { label: 'Ekor', x: 88, y: 46 }], targetIndex: 2, solution: 'Ekor di bahagian belakang burung.' },
      { kind: 'label', prompt: 'Yang mana SIRIP ikan?', speak: 'Yang mana sirip ikan?', subject: '🐟', parts: [{ label: 'Mata', x: 30, y: 44 }, { label: 'Sirip', x: 50, y: 80 }, { label: 'Ekor', x: 86, y: 48 }], targetIndex: 1, solution: 'Sirip membantu ikan berenang.' },
      { kind: 'pilih', prompt: 'Haiwan mana ada BELALAI?', speak: 'Haiwan mana ada belalai?', image: '🐘', choices: ['🐘', '🐴', '🐑'], answer: '🐘', solution: 'Gajah 🐘 ada belalai panjang.' },
      { kind: 'pilih', prompt: 'Haiwan mana boleh TERBANG?', speak: 'Haiwan mana boleh terbang?', image: '🦅', choices: ['🦅', '🐢', '🐟'], answer: '🦅', solution: 'Burung 🦅 ada kepak untuk terbang.' },
      { kind: 'sort', prompt: 'Haiwan ini tinggal di mana?', speak: 'Ikan tinggal di mana?', image: '🐟', itemLabel: 'Ikan', bins: ['Dalam Air 💧', 'Di Darat 🌳'], answer: 'Dalam Air 💧', solution: 'Ikan 🐟 hidup dalam air.' },
      { kind: 'sort', prompt: 'Haiwan ini tinggal di mana?', speak: 'Kucing tinggal di mana?', image: '🐈', itemLabel: 'Kucing', bins: ['Dalam Air 💧', 'Di Darat 🌳'], answer: 'Di Darat 🌳', solution: 'Kucing 🐈 hidup di darat.' },
      { kind: 'pilih', prompt: 'Haiwan mana ada CENGKERANG?', speak: 'Haiwan mana ada cengkerang?', image: '🐢', choices: ['🐢', '🐇', '🐓'], answer: '🐢', solution: 'Kura-kura 🐢 ada cengkerang keras.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    level: 4,
    title: 'Unit 4',
    subtitle: 'Bahagian Tumbuhan',
    emoji: '🌻',
    color: 'red',
    learn: [
      { emoji: '🌸', title: 'Bunga', desc: 'Bunga cantik dan berwarna-warni di bahagian atas tumbuhan.' },
      { emoji: '🍃', title: 'Daun', desc: 'Daun berwarna hijau dan membuat makanan untuk tumbuhan.' },
      { emoji: '🪵', title: 'Batang', desc: 'Batang menegakkan tumbuhan dan membawa air ke atas.' },
      { emoji: '🌱', title: 'Akar', desc: 'Akar di dalam tanah menyerap air untuk tumbuhan.' },
      { emoji: '🍎', title: 'Buah', desc: 'Buah tumbuh daripada bunga dan ada biji di dalamnya.' },
      { emoji: '🌰', title: 'Biji Benih', desc: 'Biji benih ditanam dan tumbuh menjadi pokok baharu.' },
      { emoji: '☀️', title: 'Keperluan Tumbuhan', desc: 'Tumbuhan perlukan air, cahaya matahari dan udara untuk hidup.' },
    ],
    questions: [
      { kind: 'label', diagram: 'plant', prompt: 'Yang mana BUNGA?', speak: 'Yang mana bunga?', subject: '🌻', parts: [{ label: 'Bunga', x: 50, y: 10 }, { label: 'Daun', x: 65, y: 46 }, { label: 'Batang', x: 50, y: 56 }, { label: 'Akar', x: 50, y: 90 }], targetIndex: 0, solution: 'Bunga di bahagian paling atas tumbuhan.' },
      { kind: 'label', diagram: 'plant', prompt: 'Yang mana AKAR?', speak: 'Yang mana akar?', subject: '🌻', parts: [{ label: 'Bunga', x: 50, y: 10 }, { label: 'Daun', x: 65, y: 46 }, { label: 'Batang', x: 50, y: 56 }, { label: 'Akar', x: 50, y: 90 }], targetIndex: 3, solution: 'Akar di dalam tanah — menyerap air.' },
      { kind: 'label', diagram: 'plant', prompt: 'Yang mana DAUN?', speak: 'Yang mana daun?', subject: '🌻', parts: [{ label: 'Bunga', x: 50, y: 10 }, { label: 'Daun', x: 65, y: 46 }, { label: 'Batang', x: 50, y: 56 }, { label: 'Akar', x: 50, y: 90 }], targetIndex: 1, solution: 'Daun berwarna hijau di sisi batang.' },
      { kind: 'pilih', prompt: 'Bahagian mana MENYERAP air?', speak: 'Bahagian mana menyerap air?', image: '🌱', choices: ['Akar 🌱', 'Bunga 🌸', 'Daun 🍃'], answer: 'Akar 🌱', solution: 'Akar menyerap air dari tanah.' },
      { kind: 'pilih', prompt: 'Bahagian mana berwarna HIJAU?', speak: 'Bahagian mana berwarna hijau?', image: '🍃', choices: ['Daun 🍃', 'Bunga 🌸', 'Akar 🌱'], answer: 'Daun 🍃', solution: 'Daun berwarna hijau.' },
      { kind: 'sort', prompt: 'Letakkan dalam kumpulan yang betul', speak: 'Pokok itu tumbuhan atau haiwan?', image: '🌳', itemLabel: 'Pokok', bins: ['Tumbuhan 🌿', 'Haiwan 🐾'], answer: 'Tumbuhan 🌿', solution: 'Pokok 🌳 ialah tumbuhan.' },
      { kind: 'sort', prompt: 'Letakkan dalam kumpulan yang betul', speak: 'Burung itu tumbuhan atau haiwan?', image: '🐦', itemLabel: 'Burung', bins: ['Tumbuhan 🌿', 'Haiwan 🐾'], answer: 'Haiwan 🐾', solution: 'Burung 🐦 ialah haiwan.' },
      { kind: 'pilih', prompt: 'Yang mana tumbuh menjadi POKOK?', speak: 'Yang mana tumbuh menjadi pokok?', image: '🌰', choices: ['🌰', '🪨', '⚽'], answer: '🌰', solution: 'Biji benih 🌰 tumbuh menjadi pokok.' },
    ],
  },
  // ---------------------------------------------------------------------------
  {
    level: 5,
    title: 'Unit 5',
    subtitle: 'Benda Hidup & Bukan Hidup',
    emoji: '🌱',
    color: 'purple',
    learn: [
      { emoji: '🐶', title: 'Benda Hidup', desc: 'Benda hidup bernafas, makan, membesar dan bergerak sendiri.' },
      { emoji: '🪨', title: 'Benda Bukan Hidup', desc: 'Benda bukan hidup tidak makan dan tidak membesar.' },
      { emoji: '🌳', title: 'Tumbuhan Hidup', desc: 'Pokok juga hidup — ia membesar dan perlukan air.' },
      { emoji: '🚗', title: 'Mesin Bukan Hidup', desc: 'Kereta bergerak, tetapi ia bukan hidup kerana tidak membesar.' },
      { emoji: '🍚', title: 'Makan', desc: 'Benda hidup perlu makan untuk mendapat tenaga.' },
      { emoji: '🌬️', title: 'Bernafas', desc: 'Benda hidup bernafas untuk terus hidup.' },
      { emoji: '🐣', title: 'Membesar', desc: 'Benda hidup membesar daripada kecil menjadi besar.' },
    ],
    questions: [
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Anjing hidup atau bukan hidup?', image: '🐶', itemLabel: 'Anjing', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Hidup 💚', solution: 'Anjing 🐶 bernafas dan makan — ia hidup.' },
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Batu hidup atau bukan hidup?', image: '🪨', itemLabel: 'Batu', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Bukan Hidup 🪨', solution: 'Batu 🪨 tidak makan — ia bukan hidup.' },
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Pokok hidup atau bukan hidup?', image: '🌳', itemLabel: 'Pokok', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Hidup 💚', solution: 'Pokok 🌳 membesar — ia hidup.' },
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Kereta hidup atau bukan hidup?', image: '🚗', itemLabel: 'Kereta', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Bukan Hidup 🪨', solution: 'Kereta 🚗 tidak membesar — ia bukan hidup.' },
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Ikan hidup atau bukan hidup?', image: '🐟', itemLabel: 'Ikan', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Hidup 💚', solution: 'Ikan 🐟 bernafas dan bergerak — ia hidup.' },
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Pensel hidup atau bukan hidup?', image: '✏️', itemLabel: 'Pensel', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Bukan Hidup 🪨', solution: 'Pensel ✏️ tidak hidup.' },
      { kind: 'pilih', prompt: 'Yang mana benda HIDUP?', speak: 'Yang mana benda hidup?', image: '🌼', choices: ['🌼', '🪨', '📱'], answer: '🌼', solution: 'Bunga 🌼 ialah benda hidup.' },
      { kind: 'pilih', prompt: 'Yang mana benda BUKAN HIDUP?', speak: 'Yang mana benda bukan hidup?', image: '📱', choices: ['📱', '🐱', '🌳'], answer: '📱', solution: 'Telefon 📱 ialah benda bukan hidup.' },
    ],
  },
]

export function getScienceUnit(level: number): ScienceUnit | undefined {
  return SCIENCE_UNITS.find((u) => u.level === level)
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Pilih `count` soalan rawak untuk unit, dengan pilihan jawapan dikocok. */
export function generateScienceQuiz(level: number, count: number): ScienceQuestion[] {
  const unit = getScienceUnit(level)
  if (!unit) return []
  const picked = shuffle(unit.questions).slice(0, Math.min(count, unit.questions.length))
  return picked.map((q) => {
    if (q.kind === 'pilih' || q.kind === 'deria') {
      return { ...q, choices: shuffle(q.choices) }
    }
    return q
  })
}
