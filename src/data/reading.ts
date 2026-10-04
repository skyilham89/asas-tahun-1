// Data Modul Membaca (Bahasa Melayu Tahun 1) — disusun mengikut peringkat KSSR.

export interface ReadingWord {
  word: string
  /** Pecahan suku kata, cth: ["ke", "re", "ta"] */
  syllables: string[]
  /** Gambar visual (emoji) */
  image: string
}

export interface ReadingPassage {
  image: string
  sentences: string[]
  questions: { q: string; choices: string[]; answer: string }[]
}

export interface ReadingLevel {
  level: number
  title: string
  subtitle: string
  emoji: string
  gradient: string
  /** Perkataan untuk Mod Belajar & Kuiz (Peringkat 2–4). */
  words: ReadingWord[]
  /** Carta suku kata untuk Peringkat 1 (baris vokal + KV). */
  syllableChart?: string[][]
  /** Petikan kefahaman untuk Peringkat 5. */
  passages?: ReadingPassage[]
}

export const READING_BADGE = {
  id: 'pakar-membaca',
  name: 'Pakar Membaca',
  emoji: '📖',
  requiredCorrect: 15,
}

export const READING_LEVELS: ReadingLevel[] = [
  {
    level: 1,
    title: 'Peringkat 1',
    subtitle: 'Vokal & Suku Kata (KV)',
    emoji: '🅰️',
    gradient: 'from-rose-400 to-pink-500',
    words: [],
    // 15 baris × 5 = 75 suku kata untuk variasi yang luas.
    syllableChart: [
      ['a', 'e', 'i', 'o', 'u'],
      ['ba', 'be', 'bi', 'bo', 'bu'],
      ['ca', 'ce', 'ci', 'co', 'cu'],
      ['da', 'de', 'di', 'do', 'du'],
      ['ga', 'ge', 'gi', 'go', 'gu'],
      ['ha', 'he', 'hi', 'ho', 'hu'],
      ['ja', 'je', 'ji', 'jo', 'ju'],
      ['ka', 'ke', 'ki', 'ko', 'ku'],
      ['la', 'le', 'li', 'lo', 'lu'],
      ['ma', 'me', 'mi', 'mo', 'mu'],
      ['na', 'ne', 'ni', 'no', 'nu'],
      ['pa', 'pe', 'pi', 'po', 'pu'],
      ['ra', 're', 'ri', 'ro', 'ru'],
      ['sa', 'se', 'si', 'so', 'su'],
      ['ta', 'te', 'ti', 'to', 'tu'],
    ],
  },
  {
    level: 2,
    title: 'Peringkat 2',
    subtitle: 'Perkataan KV + KV',
    emoji: '📗',
    gradient: 'from-amber-400 to-orange-500',
    words: [
      { word: 'baju', syllables: ['ba', 'ju'], image: '👕' },
      { word: 'bola', syllables: ['bo', 'la'], image: '⚽' },
      { word: 'buku', syllables: ['bu', 'ku'], image: '📘' },
      { word: 'kuda', syllables: ['ku', 'da'], image: '🐴' },
      { word: 'roti', syllables: ['ro', 'ti'], image: '🍞' },
      { word: 'susu', syllables: ['su', 'su'], image: '🥛' },
      { word: 'topi', syllables: ['to', 'pi'], image: '🎩' },
      { word: 'lori', syllables: ['lo', 'ri'], image: '🚚' },
      { word: 'dadu', syllables: ['da', 'du'], image: '🎲' },
      { word: 'gigi', syllables: ['gi', 'gi'], image: '🦷' },
      { word: 'kaki', syllables: ['ka', 'ki'], image: '🦶' },
      { word: 'mata', syllables: ['ma', 'ta'], image: '👁️' },
      { word: 'batu', syllables: ['ba', 'tu'], image: '🪨' },
      { word: 'bayi', syllables: ['ba', 'yi'], image: '👶' },
      { word: 'cili', syllables: ['ci', 'li'], image: '🌶️' },
      { word: 'kari', syllables: ['ka', 'ri'], image: '🍛' },
      { word: 'lima', syllables: ['li', 'ma'], image: '5️⃣' },
      { word: 'tiga', syllables: ['ti', 'ga'], image: '3️⃣' },
      { word: 'padi', syllables: ['pa', 'di'], image: '🌾' },
      { word: 'paku', syllables: ['pa', 'ku'], image: '🔩' },
      { word: 'peta', syllables: ['pe', 'ta'], image: '🗺️' },
      { word: 'raja', syllables: ['ra', 'ja'], image: '🤴' },
      { word: 'sapu', syllables: ['sa', 'pu'], image: '🧹' },
      { word: 'tali', syllables: ['ta', 'li'], image: '🪢' },
      { word: 'teko', syllables: ['te', 'ko'], image: '🫖' },
      { word: 'sofa', syllables: ['so', 'fa'], image: '🛋️' },
      { word: 'dasi', syllables: ['da', 'si'], image: '👔' },
      { word: 'gula', syllables: ['gu', 'la'], image: '🍬' },
      { word: 'kayu', syllables: ['ka', 'yu'], image: '🪵' },
      { word: 'labu', syllables: ['la', 'bu'], image: '🎃' },
      { word: 'keju', syllables: ['ke', 'ju'], image: '🧀' },
      { word: 'bulu', syllables: ['bu', 'lu'], image: '🪶' },
      { word: 'guli', syllables: ['gu', 'li'], image: '🔵' },
      { word: 'jari', syllables: ['ja', 'ri'], image: '👆' },
      { word: 'muka', syllables: ['mu', 'ka'], image: '🙂' },
    ],
  },
  {
    level: 3,
    title: 'Peringkat 3',
    subtitle: 'Suku Kata Tertutup (KVK)',
    emoji: '📙',
    gradient: 'from-lime-400 to-green-500',
    words: [
      { word: 'bas', syllables: ['bas'], image: '🚌' },
      { word: 'jam', syllables: ['jam'], image: '⏰' },
      { word: 'kek', syllables: ['kek'], image: '🍰' },
      { word: 'gajah', syllables: ['ga', 'jah'], image: '🐘' },
      { word: 'rumah', syllables: ['ru', 'mah'], image: '🏠' },
      { word: 'epal', syllables: ['e', 'pal'], image: '🍎' },
      { word: 'ikan', syllables: ['i', 'kan'], image: '🐟' },
      { word: 'ayam', syllables: ['a', 'yam'], image: '🐔' },
      { word: 'awan', syllables: ['a', 'wan'], image: '☁️' },
      { word: 'telur', syllables: ['te', 'lur'], image: '🥚' },
      { word: 'bulan', syllables: ['bu', 'lan'], image: '🌙' },
      { word: 'cawan', syllables: ['ca', 'wan'], image: '☕' },
      { word: 'cermin', syllables: ['cer', 'min'], image: '🪞' },
      { word: 'garam', syllables: ['ga', 'ram'], image: '🧂' },
      { word: 'hutan', syllables: ['hu', 'tan'], image: '🌳' },
      { word: 'jalan', syllables: ['ja', 'lan'], image: '🛣️' },
      { word: 'kapal', syllables: ['ka', 'pal'], image: '🚢' },
      { word: 'lampu', syllables: ['lam', 'pu'], image: '💡' },
      { word: 'lilin', syllables: ['li', 'lin'], image: '🕯️' },
      { word: 'motor', syllables: ['mo', 'tor'], image: '🏍️' },
      { word: 'pensel', syllables: ['pen', 'sel'], image: '✏️' },
      { word: 'rambut', syllables: ['ram', 'but'], image: '💇' },
      { word: 'roket', syllables: ['ro', 'ket'], image: '🚀' },
      { word: 'tikus', syllables: ['ti', 'kus'], image: '🐭' },
      { word: 'ular', syllables: ['u', 'lar'], image: '🐍' },
      { word: 'lembu', syllables: ['lem', 'bu'], image: '🐄' },
      { word: 'pokok', syllables: ['po', 'kok'], image: '🌲' },
      { word: 'botol', syllables: ['bo', 'tol'], image: '🍾' },
      { word: 'kotak', syllables: ['ko', 'tak'], image: '📦' },
      { word: 'katak', syllables: ['ka', 'tak'], image: '🐸' },
      { word: 'bantal', syllables: ['ban', 'tal'], image: '🛏️' },
      { word: 'sampan', syllables: ['sam', 'pan'], image: '🛶' },
      { word: 'kasut', syllables: ['ka', 'sut'], image: '👟' },
      { word: 'cincin', syllables: ['cin', 'cin'], image: '💍' },
      { word: 'jarum', syllables: ['ja', 'rum'], image: '🪡' },
      { word: 'garpu', syllables: ['gar', 'pu'], image: '🍴' },
    ],
  },
  {
    level: 4,
    title: 'Peringkat 4',
    subtitle: 'Digraf & Diftong (ng, ny, ai, au)',
    emoji: '📕',
    gradient: 'from-sky-400 to-blue-500',
    words: [
      { word: 'bunga', syllables: ['bu', 'nga'], image: '🌸' },
      { word: 'payung', syllables: ['pa', 'yung'], image: '☂️' },
      { word: 'penyu', syllables: ['pe', 'nyu'], image: '🐢' },
      { word: 'pulau', syllables: ['pu', 'lau'], image: '🏝️' },
      { word: 'singa', syllables: ['si', 'nga'], image: '🦁' },
      { word: 'kucing', syllables: ['ku', 'cing'], image: '🐱' },
      { word: 'monyet', syllables: ['mo', 'nyet'], image: '🐵' },
      { word: 'harimau', syllables: ['ha', 'ri', 'mau'], image: '🐯' },
      { word: 'kerbau', syllables: ['ker', 'bau'], image: '🐃' },
      { word: 'sungai', syllables: ['su', 'ngai'], image: '🏞️' },
      { word: 'burung', syllables: ['bu', 'rung'], image: '🐦' },
      { word: 'bintang', syllables: ['bin', 'tang'], image: '⭐' },
      { word: 'gunung', syllables: ['gu', 'nung'], image: '⛰️' },
      { word: 'pisang', syllables: ['pi', 'sang'], image: '🍌' },
      { word: 'tangan', syllables: ['ta', 'ngan'], image: '✋' },
      { word: 'tudung', syllables: ['tu', 'dung'], image: '🧕' },
      { word: 'terung', syllables: ['te', 'rung'], image: '🍆' },
      { word: 'bawang', syllables: ['ba', 'wang'], image: '🧅' },
      { word: 'loceng', syllables: ['lo', 'ceng'], image: '🔔' },
      { word: 'anjing', syllables: ['an', 'jing'], image: '🐕' },
      { word: 'gendang', syllables: ['gen', 'dang'], image: '🥁' },
      { word: 'kentang', syllables: ['ken', 'tang'], image: '🥔' },
      { word: 'benang', syllables: ['be', 'nang'], image: '🧵' },
      { word: 'nyamuk', syllables: ['nya', 'muk'], image: '🦟' },
      { word: 'nyanyi', syllables: ['nya', 'nyi'], image: '🎤' },
      { word: 'pantai', syllables: ['pan', 'tai'], image: '🏖️' },
      { word: 'tupai', syllables: ['tu', 'pai'], image: '🐿️' },
      { word: 'kedai', syllables: ['ke', 'dai'], image: '🏪' },
      { word: 'gulai', syllables: ['gu', 'lai'], image: '🍲' },
      { word: 'pisau', syllables: ['pi', 'sau'], image: '🔪' },
      { word: 'hijau', syllables: ['hi', 'jau'], image: '💚' },
      { word: 'limau', syllables: ['li', 'mau'], image: '🍊' },
      { word: 'surau', syllables: ['su', 'rau'], image: '🕌' },
      { word: 'angsa', syllables: ['ang', 'sa'], image: '🦢' },
      { word: 'jagung', syllables: ['ja', 'gung'], image: '🌽' },
    ],
  },
  {
    level: 5,
    title: 'Peringkat 5',
    subtitle: 'Ayat & Kefahaman',
    emoji: '📚',
    gradient: 'from-violet-400 to-purple-600',
    words: [],
    passages: [
      {
        image: '🐱',
        sentences: ['Ali ada seekor kucing.', 'Kucing itu berwarna hitam.'],
        questions: [
          { q: 'Apakah haiwan peliharaan Ali?', choices: ['Kucing', 'Anjing', 'Ikan'], answer: 'Kucing' },
          { q: 'Apakah warna kucing itu?', choices: ['Hitam', 'Putih', 'Jingga'], answer: 'Hitam' },
        ],
      },
      {
        image: '🍎',
        sentences: ['Siti suka makan epal.', 'Epal itu berwarna merah.'],
        questions: [
          { q: 'Apakah Siti suka makan?', choices: ['Epal', 'Pisang', 'Roti'], answer: 'Epal' },
          { q: 'Apakah warna epal itu?', choices: ['Merah', 'Hijau', 'Kuning'], answer: 'Merah' },
        ],
      },
      {
        image: '⚽',
        sentences: ['Rahman bermain bola di padang.', 'Dia bermain dengan kawan-kawan.'],
        questions: [
          { q: 'Di manakah Rahman bermain?', choices: ['Di padang', 'Di rumah', 'Di sekolah'], answer: 'Di padang' },
          { q: 'Rahman bermain dengan siapa?', choices: ['Kawan-kawan', 'Guru', 'Ibu'], answer: 'Kawan-kawan' },
        ],
      },
      {
        image: '🐦',
        sentences: ['Seekor burung hinggap di pokok.', 'Burung itu berbunyi merdu.'],
        questions: [
          { q: 'Di manakah burung itu hinggap?', choices: ['Di pokok', 'Di atap', 'Di tanah'], answer: 'Di pokok' },
          { q: 'Bagaimanakah bunyi burung itu?', choices: ['Merdu', 'Kuat', 'Sedih'], answer: 'Merdu' },
        ],
      },
      {
        image: '🌧️',
        sentences: ['Hari ini hujan turun dengan lebat.', 'Aminah memakai payung ke sekolah.'],
        questions: [
          { q: 'Bagaimanakah cuaca hari ini?', choices: ['Hujan', 'Panas', 'Berangin'], answer: 'Hujan' },
          { q: 'Apakah yang Aminah pakai?', choices: ['Payung', 'Topi', 'Jaket'], answer: 'Payung' },
        ],
      },
      {
        image: '🐟',
        sentences: ['Abu pergi memancing di sungai.', 'Dia mendapat seekor ikan besar.'],
        questions: [
          { q: 'Di manakah Abu memancing?', choices: ['Di sungai', 'Di laut', 'Di kolam'], answer: 'Di sungai' },
          { q: 'Apakah yang Abu dapat?', choices: ['Ikan', 'Ketam', 'Udang'], answer: 'Ikan' },
        ],
      },
      {
        image: '🎂',
        sentences: ['Hari ini hari jadi Mei.', 'Ibu membuat kek coklat untuknya.'],
        questions: [
          { q: 'Hari ini hari apa untuk Mei?', choices: ['Hari jadi', 'Hari sukan', 'Hari guru'], answer: 'Hari jadi' },
          { q: 'Apakah kek yang ibu buat?', choices: ['Kek coklat', 'Kek keju', 'Kek pisang'], answer: 'Kek coklat' },
        ],
      },
      {
        image: '🌳',
        sentences: ['Datuk menanam pokok di kebun.', 'Pokok itu berbuah manis.'],
        questions: [
          { q: 'Di manakah datuk menanam pokok?', choices: ['Di kebun', 'Di rumah', 'Di sekolah'], answer: 'Di kebun' },
          { q: 'Bagaimanakah rasa buah itu?', choices: ['Manis', 'Masam', 'Pahit'], answer: 'Manis' },
        ],
      },
      {
        image: '🐘',
        sentences: ['Gajah ialah haiwan yang besar.', 'Ia suka makan daun.'],
        questions: [
          { q: 'Gajah ialah haiwan yang bagaimana?', choices: ['Besar', 'Kecil', 'Laju'], answer: 'Besar' },
          { q: 'Apakah makanan gajah?', choices: ['Daun', 'Ikan', 'Daging'], answer: 'Daun' },
        ],
      },
      {
        image: '🚌',
        sentences: ['Setiap hari Zaki naik bas ke sekolah.', 'Bas itu berwarna kuning.'],
        questions: [
          { q: 'Bagaimanakah Zaki ke sekolah?', choices: ['Naik bas', 'Berjalan', 'Naik basikal'], answer: 'Naik bas' },
          { q: 'Apakah warna bas itu?', choices: ['Kuning', 'Merah', 'Biru'], answer: 'Kuning' },
        ],
      },
      {
        image: '🌙',
        sentences: ['Pada waktu malam, bulan bersinar terang.', 'Bintang berkelip di langit.'],
        questions: [
          { q: 'Bila bulan bersinar?', choices: ['Waktu malam', 'Waktu pagi', 'Waktu petang'], answer: 'Waktu malam' },
          { q: 'Apakah yang berkelip di langit?', choices: ['Bintang', 'Awan', 'Burung'], answer: 'Bintang' },
        ],
      },
      {
        image: '👩‍🍳',
        sentences: ['Ibu memasak nasi di dapur.', 'Baunya sangat sedap.'],
        questions: [
          { q: 'Apakah yang ibu masak?', choices: ['Nasi', 'Mi', 'Roti'], answer: 'Nasi' },
          { q: 'Di manakah ibu memasak?', choices: ['Di dapur', 'Di bilik', 'Di taman'], answer: 'Di dapur' },
        ],
      },
      {
        image: '🐰',
        sentences: ['Arnab itu berbulu putih.', 'Ia suka makan lobak.'],
        questions: [
          { q: 'Apakah warna bulu arnab?', choices: ['Putih', 'Hitam', 'Coklat'], answer: 'Putih' },
          { q: 'Apakah arnab suka makan?', choices: ['Lobak', 'Rumput', 'Buah'], answer: 'Lobak' },
        ],
      },
      {
        image: '🏫',
        sentences: ['Cikgu Ani mengajar di sekolah.', 'Murid-murid suka belajar dengannya.'],
        questions: [
          { q: 'Di manakah Cikgu Ani mengajar?', choices: ['Di sekolah', 'Di rumah', 'Di pasar'], answer: 'Di sekolah' },
          { q: 'Siapakah yang suka belajar?', choices: ['Murid-murid', 'Guru lain', 'Ibu bapa'], answer: 'Murid-murid' },
        ],
      },
      {
        image: '🦋',
        sentences: ['Rama-rama terbang di taman.', 'Sayapnya sangat cantik.'],
        questions: [
          { q: 'Di manakah rama-rama terbang?', choices: ['Di taman', 'Di dalam rumah', 'Di sungai'], answer: 'Di taman' },
          { q: 'Bagaimanakah sayap rama-rama?', choices: ['Cantik', 'Buruk', 'Kotor'], answer: 'Cantik' },
        ],
      },
      {
        image: '🍚',
        sentences: ['Waktu tengah hari, keluarga Hasan makan bersama.', 'Mereka makan nasi dan ayam.'],
        questions: [
          { q: 'Bila keluarga Hasan makan bersama?', choices: ['Tengah hari', 'Pagi', 'Malam'], answer: 'Tengah hari' },
          { q: 'Apakah yang mereka makan?', choices: ['Nasi dan ayam', 'Roti dan susu', 'Mi dan telur'], answer: 'Nasi dan ayam' },
        ],
      },
      {
        image: '🐒',
        sentences: ['Monyet itu memanjat pokok.', 'Ia mengambil sebiji pisang.'],
        questions: [
          { q: 'Apakah yang monyet panjat?', choices: ['Pokok', 'Pagar', 'Rumah'], answer: 'Pokok' },
          { q: 'Apakah yang monyet ambil?', choices: ['Pisang', 'Epal', 'Jagung'], answer: 'Pisang' },
        ],
      },
      {
        image: '☀️',
        sentences: ['Hari ini cuaca panas.', 'Kami minum air sejuk.'],
        questions: [
          { q: 'Bagaimanakah cuaca hari ini?', choices: ['Panas', 'Sejuk', 'Hujan'], answer: 'Panas' },
          { q: 'Apakah yang kami minum?', choices: ['Air sejuk', 'Air panas', 'Susu'], answer: 'Air sejuk' },
        ],
      },
      {
        image: '🚗',
        sentences: ['Ayah memandu kereta ke pekan.', 'Dia membeli barang di kedai.'],
        questions: [
          { q: 'Ke manakah ayah pergi?', choices: ['Ke pekan', 'Ke sekolah', 'Ke pantai'], answer: 'Ke pekan' },
          { q: 'Apakah yang ayah buat di kedai?', choices: ['Membeli barang', 'Makan', 'Tidur'], answer: 'Membeli barang' },
        ],
      },
      {
        image: '🐓',
        sentences: ['Setiap pagi, ayam berkokok.', 'Bunyinya membangunkan Pak Abu.'],
        questions: [
          { q: 'Bila ayam berkokok?', choices: ['Setiap pagi', 'Setiap malam', 'Setiap petang'], answer: 'Setiap pagi' },
          { q: 'Siapakah yang terjaga?', choices: ['Pak Abu', 'Mak Timah', 'Cikgu'], answer: 'Pak Abu' },
        ],
      },
      {
        image: '🏖️',
        sentences: ['Pada hujung minggu, kami pergi ke pantai.', 'Kami bermain pasir di tepi laut.'],
        questions: [
          { q: 'Bila mereka pergi ke pantai?', choices: ['Hujung minggu', 'Hari sekolah', 'Waktu malam'], answer: 'Hujung minggu' },
          { q: 'Apakah yang mereka main?', choices: ['Pasir', 'Bola', 'Layang-layang'], answer: 'Pasir' },
        ],
      },
      {
        image: '📚',
        sentences: ['Lina suka membaca buku cerita.', 'Dia membaca setiap malam.'],
        questions: [
          { q: 'Apakah Lina suka baca?', choices: ['Buku cerita', 'Surat khabar', 'Majalah'], answer: 'Buku cerita' },
          { q: 'Bila Lina membaca?', choices: ['Setiap malam', 'Setiap pagi', 'Setiap petang'], answer: 'Setiap malam' },
        ],
      },
    ],
  },
]

export function getReadingLevel(level: number): ReadingLevel | undefined {
  return READING_LEVELS.find((l) => l.level === level)
}
