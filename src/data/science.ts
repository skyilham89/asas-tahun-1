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
      { emoji: '👁️', title: 'Deria Lihat', desc: 'Mata ialah deria lihat. Kita lihat warna, saiz dan bentuk benda.' },
      { emoji: '👂', title: 'Deria Dengar', desc: 'Telinga ialah deria dengar. Kita dengar bunyi kuat atau perlahan.' },
      { emoji: '👃', title: 'Deria Bau', desc: 'Hidung ialah deria bau. Kita bau bunga wangi atau makanan sedap.' },
      { emoji: '👅', title: 'Deria Rasa', desc: 'Lidah ialah deria rasa. Kita rasa manis, masin, masam dan pahit.' },
      { emoji: '🤚', title: 'Deria Sentuh', desc: 'Kulit ialah deria sentuh. Kita rasa kasar, licin, panas atau sejuk.' },
      { emoji: '🔍', title: 'Kanta Pembesar', desc: 'Kanta pembesar membuat benda kecil kelihatan lebih besar.' },
      { emoji: '🐜', title: 'Lihat Benda Kecil', desc: 'Guna kanta pembesar untuk lihat semut dan benda yang halus.' },
      { emoji: '📐', title: 'Panjang & Pendek', desc: 'Kita banding panjang benda: ada yang panjang, ada yang pendek.' },
      { emoji: '📊', title: 'Tinggi & Rendah', desc: 'Kita banding ketinggian: ada benda tinggi dan ada yang rendah.' },
      { emoji: '🏋️', title: 'Berat & Ringan', desc: 'Ada benda berat seperti batu, ada yang ringan seperti bulu.' },
      { emoji: '📚', title: 'Tebal & Nipis', desc: 'Buku ada yang tebal dan ada yang nipis. Kita boleh banding.' },
      { emoji: '⬛', title: 'Bentuk Segi Empat', desc: 'Segi empat ada empat sisi, contohnya tingkap dan buku.' },
      { emoji: '🔻', title: 'Bentuk Segi Tiga', desc: 'Segi tiga ada tiga sisi, contohnya topi dan tanda jalan.' },
      { emoji: '🥚', title: 'Bentuk Bujur', desc: 'Bujur berbentuk seperti telur, bulat panjang.' },
      { emoji: '🟤', title: 'Tekstur Kasar', desc: 'Benda kasar seperti batu dan kulit kayu. Kita rasa dengan kulit.' },
      { emoji: '🧊', title: 'Tekstur Licin', desc: 'Benda licin seperti cermin dan ais. Terasa lembut dan licin.' },
      { emoji: '🌈', title: 'Banyak Warna', desc: 'Pelangi ada banyak warna: merah, jingga, kuning dan biru.' },
      { emoji: '🟢', title: 'Warna Hijau', desc: 'Daun dan rumput berwarna hijau. Kita lihat guna mata.' },
      { emoji: '🔵', title: 'Warna Biru', desc: 'Langit dan laut berwarna biru. Biru warna yang sejuk.' },
      { emoji: '🧮', title: 'Membilang', desc: 'Kita bilang bilangan benda satu, dua, tiga semasa memerhati.' },
      { emoji: '📝', title: 'Merekod', desc: 'Kita catat apa yang kita lihat supaya tidak lupa pemerhatian.' },
      { emoji: '🔢', title: 'Menyusun Turutan', desc: 'Kita susun benda ikut turutan: dari kecil ke besar atau sebaliknya.' },
      { emoji: '🟰', title: 'Persamaan', desc: 'Persamaan ialah ciri yang sama antara dua benda, contohnya warna.' },
      { emoji: '↔️', title: 'Perbezaan', desc: 'Perbezaan ialah ciri yang berlainan antara dua benda.' },
      { emoji: '🍊', title: 'Kumpul Ikut Rasa', desc: 'Kita boleh kumpul makanan ikut rasa: manis atau masam.' },
      { emoji: '🐾', title: 'Ciri Sepunya', desc: 'Benda dalam satu kumpulan ada ciri sepunya, contohnya berkaki empat.' },
      { emoji: '🌼', title: 'Memerhati Alam', desc: 'Kita memerhati bunga, pokok dan haiwan di sekeliling kita.' },
      { emoji: '🧺', title: 'Mengumpul', desc: 'Kita masukkan benda yang sama ciri ke dalam satu kumpulan.' },
      { emoji: '⭐', title: 'Bentuk Bintang', desc: 'Bintang ialah satu bentuk yang mempunyai banyak bucu tajam.' },
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
      { kind: 'deria', prompt: 'Deria mana kita guna untuk MELIHAT warna?', speak: 'Deria mana untuk melihat warna?', image: '👁️', choices: ['👁️', '👂', '👃'], answer: '👁️', solution: 'Kita guna mata 👁️ untuk melihat warna.' },
      { kind: 'deria', prompt: 'Deria mana kita guna untuk MENDENGAR bunyi?', speak: 'Deria mana untuk mendengar bunyi?', image: '👂', choices: ['👂', '👅', '👁️'], answer: '👂', solution: 'Kita guna telinga 👂 untuk mendengar.' },
      { kind: 'deria', prompt: 'Deria mana kita guna untuk MENGHIDU bau?', speak: 'Deria mana untuk menghidu bau?', image: '👃', choices: ['👃', '🤚', '👂'], answer: '👃', solution: 'Kita guna hidung 👃 untuk menghidu bau.' },
      { kind: 'deria', prompt: 'Deria mana kita guna untuk MERASA makanan?', speak: 'Deria mana untuk merasa makanan?', image: '👅', choices: ['👅', '👁️', '👂'], answer: '👅', solution: 'Kita guna lidah 👅 untuk merasa.' },
      { kind: 'pilih', prompt: 'Yang mana paling BERAT?', speak: 'Yang mana paling berat?', image: '🪨', choices: ['🪨', '🍂', '🪶'], answer: '🪨', solution: 'Batu 🪨 paling berat.' },
      { kind: 'pilih', prompt: 'Yang mana paling PENDEK?', speak: 'Yang mana paling pendek?', image: '✏️', choices: ['✏️', '📏', '🔪'], answer: '✏️', solution: 'Pensel pendek ✏️ paling pendek.' },
      { kind: 'pilih', prompt: 'Yang mana berbentuk SEGI TIGA?', speak: 'Yang mana segi tiga?', image: '🔺', choices: ['🔺', '⚽', '📒'], answer: '🔺', solution: 'Ini 🔺 berbentuk segi tiga.' },
      { kind: 'pilih', prompt: 'Yang mana alat untuk LIHAT benda kecil?', speak: 'Yang mana alat untuk lihat benda kecil?', image: '🔍', choices: ['🔍', '📏', '✂️'], answer: '🔍', solution: 'Kanta pembesar 🔍 membesarkan benda kecil.' },
      { kind: 'sort', prompt: 'Letakkan dalam kumpulan yang betul', speak: 'Daun ini warna apa?', image: '🍃', itemLabel: 'Daun', bins: ['Hijau 🟢', 'Biru 🔵'], answer: 'Hijau 🟢', solution: 'Daun berwarna hijau.' },
      { kind: 'sort', prompt: 'Letakkan dalam kumpulan yang betul', speak: 'Gajah ini haiwan atau buah?', image: '🐘', itemLabel: 'Gajah', bins: ['Haiwan 🐾', 'Buah 🍎'], answer: 'Haiwan 🐾', solution: 'Gajah ialah seekor haiwan.' },
      { kind: 'sort', prompt: 'Letakkan dalam kumpulan yang betul', speak: 'Batu ini berat atau ringan?', image: '🪨', itemLabel: 'Batu', bins: ['Berat 🏋️', 'Ringan 🪶'], answer: 'Berat 🏋️', solution: 'Batu terasa berat.' },
      { kind: 'pilih', prompt: 'Yang mana berbentuk BUJUR seperti telur?', speak: 'Yang mana bujur seperti telur?', image: '🥚', choices: ['🥚', '⬛', '🔺'], answer: '🥚', solution: 'Telur 🥚 berbentuk bujur.' },
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
      { emoji: '🌈', title: 'Mata Nampak Warna', desc: 'Dengan mata kita boleh nampak warna seperti merah, biru dan kuning.' },
      { emoji: '🔺', title: 'Mata Nampak Bentuk', desc: 'Mata membantu kita kenal bentuk bulat, segi tiga dan segi empat.' },
      { emoji: '💡', title: 'Mata Perlu Cahaya', desc: 'Mata perlu cahaya untuk melihat sesuatu dengan jelas.' },
      { emoji: '🌑', title: 'Gelap Sukar Dilihat', desc: 'Dalam gelap, mata sukar melihat kerana tiada cahaya.' },
      { emoji: '📢', title: 'Bunyi Kuat', desc: 'Telinga boleh dengar bunyi yang kuat seperti bunyi loceng.' },
      { emoji: '🤫', title: 'Bunyi Perlahan', desc: 'Telinga juga boleh dengar bunyi yang perlahan seperti bisikan.' },
      { emoji: '🎵', title: 'Mendengar Muzik', desc: 'Kita guna telinga untuk menikmati muzik yang merdu.' },
      { emoji: '🌸', title: 'Bau Wangi', desc: 'Hidung dapat menghidu bau wangi seperti bunga dan sabun.' },
      { emoji: '🗑️', title: 'Bau Busuk', desc: 'Hidung juga dapat menghidu bau busuk seperti sampah.' },
      { emoji: '🍬', title: 'Rasa Manis', desc: 'Lidah merasa manis apabila kita makan gula-gula.' },
      { emoji: '🍋', title: 'Rasa Masam', desc: 'Lidah merasa masam apabila kita makan lemon.' },
      { emoji: '🧂', title: 'Rasa Masin', desc: 'Lidah merasa masin apabila kita makan makanan bergaram.' },
      { emoji: '☕', title: 'Rasa Pahit', desc: 'Lidah merasa pahit apabila kita minum kopi tanpa gula.' },
      { emoji: '🌶️', title: 'Rasa Pedas', desc: 'Lidah merasa pedas apabila kita makan cili.' },
      { emoji: '🔥', title: 'Kulit Rasa Panas', desc: 'Kulit dapat rasa panas apabila dekat dengan api.' },
      { emoji: '❄️', title: 'Kulit Rasa Sejuk', desc: 'Kulit dapat rasa sejuk apabila memegang ais.' },
      { emoji: '🪨', title: 'Permukaan Kasar', desc: 'Kulit dapat rasa permukaan kasar seperti batu.' },
      { emoji: '🧊', title: 'Permukaan Licin', desc: 'Kulit dapat rasa permukaan licin seperti kaca.' },
      { emoji: '🧸', title: 'Permukaan Lembut', desc: 'Kulit dapat rasa benda lembut seperti patung beruang.' },
      { emoji: '🧼', title: 'Basuh Tangan', desc: 'Kita basuh tangan supaya kulit dan badan bersih.' },
      { emoji: '🦷', title: 'Gosok Gigi', desc: 'Kita gosok gigi supaya mulut dan gigi sihat.' },
      { emoji: '🙉', title: 'Jauhi Bunyi Kuat', desc: 'Jangan dengar bunyi yang terlalu kuat kerana boleh rosakkan telinga.' },
      { emoji: '🕶️', title: 'Lindung Mata', desc: 'Pakai cermin mata hitam untuk lindung mata dari cahaya terang.' },
      { emoji: '📖', title: 'Membaca dengan Cahaya', desc: 'Baca buku di tempat yang terang supaya mata tidak penat.' },
      { emoji: '🤝', title: 'Guna Dua Deria', desc: 'Kadang kita guna beberapa deria serentak, seperti mata dan telinga.' },
      { emoji: '🍎', title: 'Makan Guna Deria', desc: 'Semasa makan kita guna mata, hidung dan lidah bersama-sama.' },
      { emoji: '🦮', title: 'Kawan Kurang Upaya', desc: 'Ada kawan yang kurang penglihatan dan guna anjing pembantu.' },
      { emoji: '🤟', title: 'Bahasa Isyarat', desc: 'Kawan yang kurang pendengaran boleh berbual guna bahasa isyarat.' },
      { emoji: '🧑‍🦯', title: 'Tongkat Putih', desc: 'Kawan yang kurang penglihatan guna tongkat putih untuk berjalan.' },
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
      { kind: 'deria', prompt: 'Deria apa untuk benda ini?', speak: 'Deria apa untuk pelangi?', image: '🌈', choices: ['Mata 👁️', 'Hidung 👃', 'Lidah 👅'], answer: 'Mata 👁️', solution: 'Pelangi 🌈 dilihat dengan mata.' },
      { kind: 'deria', prompt: 'Deria apa untuk benda ini?', speak: 'Deria apa untuk muzik?', image: '🎵', choices: ['Telinga 👂', 'Mata 👁️', 'Hidung 👃'], answer: 'Telinga 👂', solution: 'Muzik 🎵 didengar dengan telinga.' },
      { kind: 'deria', prompt: 'Apakah RASA gula-gula ini?', speak: 'Apakah rasa gula-gula?', image: '🍬', choices: ['Manis', 'Masam', 'Masin'], answer: 'Manis', solution: 'Gula-gula 🍬 rasanya manis.' },
      { kind: 'deria', prompt: 'Bagaimana rasa api ini?', speak: 'Bagaimana rasa api?', image: '🔥', choices: ['Panas', 'Sejuk', 'Licin'], answer: 'Panas', solution: 'Api 🔥 terasa panas pada kulit.' },
      { kind: 'pilih', prompt: 'Organ mana untuk menghidu?', speak: 'Organ mana untuk menghidu bau?', image: '👃', choices: ['Hidung', 'Telinga', 'Mata'], answer: 'Hidung', solution: 'Kita menghidu bau menggunakan hidung.' },
      { kind: 'pilih', prompt: 'Apa kita guna untuk mendengar?', speak: 'Apa kita guna untuk mendengar?', image: '👂', choices: ['Telinga', 'Lidah', 'Kulit'], answer: 'Telinga', solution: 'Kita mendengar bunyi menggunakan telinga.' },
      { kind: 'pilih', prompt: 'Berapa deria yang kita ada?', speak: 'Berapa deria yang kita ada?', image: '🖐️', choices: ['Lima', 'Tiga', 'Dua'], answer: 'Lima', solution: 'Kita ada lima deria.' },
      { kind: 'pilih', prompt: 'Bagaimana jaga telinga?', speak: 'Bagaimana cara menjaga telinga?', image: '👂', choices: ['Jauhi bunyi kuat', 'Dengar bunyi kuat', 'Masuk air banyak'], answer: 'Jauhi bunyi kuat', solution: 'Jauhi bunyi kuat supaya telinga tidak rosak.' },
      { kind: 'pilih', prompt: 'Apa lindung mata dari cahaya terang?', speak: 'Apa yang melindungi mata dari cahaya terang?', image: '🕶️', choices: ['Cermin mata hitam', 'Topi keledar', 'Sarung tangan'], answer: 'Cermin mata hitam', solution: 'Cermin mata hitam melindungi mata dari cahaya terang.' },
      { kind: 'sort', prompt: 'Letak bunga di deria yang betul.', speak: 'Deria apa untuk bunga wangi?', image: '🌸', itemLabel: 'Bunga 🌸', bins: ['Hidung 👃', 'Telinga 👂'], answer: 'Hidung 👃', solution: 'Bunga 🌸 dihidu dengan hidung.' },
      { kind: 'sort', prompt: 'Rasa manis atau masam?', speak: 'Buah epal rasa manis atau masam?', image: '🍎', itemLabel: 'Epal 🍎', bins: ['Manis', 'Masam'], answer: 'Manis', solution: 'Epal 🍎 selalunya rasanya manis.' },
      { kind: 'sort', prompt: 'Permukaan ini kasar atau licin?', speak: 'Batu permukaannya kasar atau licin?', image: '🪨', itemLabel: 'Batu 🪨', bins: ['Kasar', 'Licin'], answer: 'Kasar', solution: 'Batu 🪨 permukaannya kasar.' },
      { kind: 'sort', prompt: 'Panas atau sejuk?', speak: 'Ais panas atau sejuk?', image: '❄️', itemLabel: 'Ais ❄️', bins: ['Sejuk', 'Panas'], answer: 'Sejuk', solution: 'Ais ❄️ terasa sejuk pada kulit.' },
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
      { emoji: '🪶', title: 'Bulu Pelepah', desc: 'Burung ada bulu pelepah yang ringan untuk menutup badannya.' },
      { emoji: '🐟', title: 'Insang', desc: 'Ikan ada insang untuk bernafas di dalam air.' },
      { emoji: '🦷', title: 'Gading', desc: 'Gajah ada gading yang panjang dan keras di muncungnya.' },
      { emoji: '🐱', title: 'Misai Kucing', desc: 'Kucing ada misai untuk merasa benda di sekelilingnya.' },
      { emoji: '🐜', title: 'Sesungut', desc: 'Semut dan serangga ada sesungut untuk merasa dan mencium.' },
      { emoji: '🦅', title: 'Cakar', desc: 'Burung helang ada cakar tajam untuk menangkap makanan.' },
      { emoji: '🐾', title: 'Tapak Kaki', desc: 'Haiwan ada tapak kaki untuk berjalan dengan selesa.' },
      { emoji: '🐰', title: 'Telinga', desc: 'Arnab ada telinga panjang untuk mendengar dengan baik.' },
      { emoji: '👁️', title: 'Mata', desc: 'Haiwan guna mata untuk melihat benda di sekelilingnya.' },
      { emoji: '🐷', title: 'Muncung', desc: 'Babi ada muncung untuk mencium dan mencari makanan.' },
      { emoji: '🦎', title: 'Kulit', desc: 'Sesetengah haiwan ada kulit licin yang menutup badannya.' },
      { emoji: '🐸', title: 'Melompat', desc: 'Katak ada kaki belakang yang kuat untuk melompat jauh.' },
      { emoji: '🐒', title: 'Memanjat', desc: 'Monyet guna kaki dan tangan untuk memanjat pokok.' },
      { emoji: '🐌', title: 'Melata', desc: 'Siput dan ular bergerak dengan melata di atas tanah.' },
      { emoji: '🦆', title: 'Tapak Berselaput', desc: 'Itik ada tapak kaki berselaput untuk berenang di air.' },
      { emoji: '🐓', title: 'Jengger', desc: 'Ayam jantan ada jengger merah di atas kepalanya.' },
      { emoji: '🦏', title: 'Culah', desc: 'Badak sumbu ada culah di hidung untuk melindungi diri.' },
      { emoji: '🦀', title: 'Sepit', desc: 'Ketam ada sepit yang kuat untuk menangkap makanan.' },
      { emoji: '🕷️', title: 'Lapan Kaki', desc: 'Labah-labah ada lapan kaki untuk berjalan dan memanjat.' },
      { emoji: '🐙', title: 'Tentakel', desc: 'Sotong ada tentakel panjang untuk menangkap mangsa.' },
      { emoji: '🦔', title: 'Duri', desc: 'Landak ada duri tajam untuk melindungi badannya.' },
      { emoji: '🐳', title: 'Hidup Di Air', desc: 'Ikan dan ketam hidup di dalam air sepanjang masa.' },
      { emoji: '🌳', title: 'Hidup Di Darat', desc: 'Kucing, lembu dan ayam hidup di atas darat.' },
      { emoji: '🦋', title: 'Hidup Di Udara', desc: 'Burung dan rama-rama boleh terbang tinggi di udara.' },
      { emoji: '🥬', title: 'Makan Tumbuhan', desc: 'Lembu dan arnab suka makan rumput dan sayur.' },
      { emoji: '🥩', title: 'Makan Daging', desc: 'Singa dan harimau suka makan daging haiwan lain.' },
      { emoji: '🐄', title: 'Kaki Berkuku', desc: 'Lembu dan kuda ada kuku keras di hujung kaki.' },
      { emoji: '🐦', title: 'Membina Sarang', desc: 'Burung membina sarang untuk tempat tinggal dan bertelur.' },
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
      { kind: 'pilih', prompt: 'Haiwan mana ada GADING?', speak: 'Haiwan mana ada gading?', image: '🐘', choices: ['🐘', '🐫', '🐖'], answer: '🐘', solution: 'Gajah 🐘 ada sepasang gading yang panjang.' },
      { kind: 'pilih', prompt: 'Haiwan mana ada MISAI?', speak: 'Haiwan mana ada misai?', image: '🐱', choices: ['🐱', '🐔', '🐸'], answer: '🐱', solution: 'Kucing 🐱 ada misai untuk merasa.' },
      { kind: 'pilih', prompt: 'Haiwan mana ada SIRIP untuk berenang?', speak: 'Haiwan mana ada sirip?', image: '🐠', choices: ['🐠', '🐓', '🐘'], answer: '🐠', solution: 'Ikan 🐠 ada sirip untuk berenang.' },
      { kind: 'pilih', prompt: 'Haiwan mana ada TELINGA panjang?', speak: 'Haiwan mana ada telinga panjang?', image: '🐰', choices: ['🐰', '🐟', '🐢'], answer: '🐰', solution: 'Arnab 🐰 ada telinga yang panjang.' },
      { kind: 'sort', prompt: 'Haiwan ini bergerak bagaimana?', speak: 'Burung bergerak bagaimana?', image: '🐦', itemLabel: 'Burung', bins: ['Terbang 🪽', 'Berenang 💧'], answer: 'Terbang 🪽', solution: 'Burung 🐦 terbang guna kepak.' },
      { kind: 'sort', prompt: 'Haiwan ini bergerak bagaimana?', speak: 'Ikan bergerak bagaimana?', image: '🐟', itemLabel: 'Ikan', bins: ['Terbang 🪽', 'Berenang 💧'], answer: 'Berenang 💧', solution: 'Ikan 🐟 berenang guna sirip.' },
      { kind: 'sort', prompt: 'Haiwan ini makan apa?', speak: 'Lembu makan apa?', image: '🐄', itemLabel: 'Lembu', bins: ['Tumbuhan 🥬', 'Daging 🥩'], answer: 'Tumbuhan 🥬', solution: 'Lembu 🐄 makan rumput dan sayur.' },
      { kind: 'sort', prompt: 'Haiwan ini makan apa?', speak: 'Singa makan apa?', image: '🦁', itemLabel: 'Singa', bins: ['Tumbuhan 🥬', 'Daging 🥩'], answer: 'Daging 🥩', solution: 'Singa 🦁 makan daging haiwan lain.' },
      { kind: 'deria', prompt: 'Haiwan guna apa untuk bernafas dalam air?', speak: 'Ikan guna apa untuk bernafas dalam air?', image: '🐟', choices: ['Insang', 'Sirip', 'Sisik'], answer: 'Insang', solution: 'Ikan 🐟 bernafas guna insang.' },
      { kind: 'deria', prompt: 'Burung guna apa untuk makan?', speak: 'Burung guna apa untuk makan?', image: '🐦', choices: ['Paruh', 'Kepak', 'Ekor'], answer: 'Paruh', solution: 'Burung 🐦 guna paruh untuk makan.' },
      { kind: 'pilih', prompt: 'Haiwan mana boleh MELOMPAT?', speak: 'Haiwan mana boleh melompat?', image: '🐸', choices: ['🐸', '🐟', '🐌'], answer: '🐸', solution: 'Katak 🐸 melompat guna kaki belakang.' },
      { kind: 'deria', prompt: 'Kucing guna apa untuk melihat waktu malam?', speak: 'Kucing guna apa untuk melihat?', image: '🐱', choices: ['Mata', 'Ekor', 'Bulu'], answer: 'Mata', solution: 'Kucing 🐱 guna mata untuk melihat.' },
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
      { emoji: '🌿', title: 'Pucuk', desc: 'Pucuk ialah daun muda yang baru tumbuh di hujung batang.' },
      { emoji: '🌳', title: 'Dahan', desc: 'Dahan ialah cabang pada batang tempat daun dan buah tumbuh.' },
      { emoji: '🪵', title: 'Kulit Kayu', desc: 'Kulit kayu melindungi batang pokok daripada rosak.' },
      { emoji: '🌵', title: 'Duri', desc: 'Duri tajam melindungi tumbuhan daripada haiwan yang mahu memakannya.' },
      { emoji: '💧', title: 'Air', desc: 'Tumbuhan perlukan air supaya tidak layu dan terus hidup.' },
      { emoji: '🌞', title: 'Cahaya Matahari', desc: 'Cahaya matahari membantu daun membuat makanan untuk tumbuhan.' },
      { emoji: '💨', title: 'Udara', desc: 'Tumbuhan menghirup udara untuk bernafas dan hidup sihat.' },
      { emoji: '🟤', title: 'Tanah', desc: 'Akar tumbuh di dalam tanah dan mendapat makanan daripadanya.' },
      { emoji: '🌳', title: 'Pokok Besar', desc: 'Pokok besar seperti pokok mangga mempunyai batang yang tebal dan tinggi.' },
      { emoji: '🌾', title: 'Rumput', desc: 'Rumput ialah tumbuhan kecil dan rendah yang tumbuh di tanah.' },
      { emoji: '🌺', title: 'Pokok Bunga', desc: 'Pokok bunga seperti bunga raya ditanam kerana bunganya cantik.' },
      { emoji: '🥬', title: 'Pokok Sayur', desc: 'Pokok sayur seperti lobak dan bayam boleh kita makan.' },
      { emoji: '🥭', title: 'Pokok Buah', desc: 'Pokok buah seperti pokok mangga memberi kita buah yang sedap.' },
      { emoji: '🌿', title: 'Paku-pakis', desc: 'Paku-pakis ialah tumbuhan hijau yang suka tumbuh di tempat lembap.' },
      { emoji: '🥭', title: 'Pokok Mangga', desc: 'Pokok mangga ialah pokok buah yang tinggi dan berbuah manis.' },
      { emoji: '🥥', title: 'Pokok Kelapa', desc: 'Pokok kelapa tinggi dan berbuah kelapa di bahagian atasnya.' },
      { emoji: '🌺', title: 'Bunga Raya', desc: 'Bunga raya ialah bunga kebangsaan Malaysia yang berwarna merah.' },
      { emoji: '🥕', title: 'Lobak', desc: 'Lobak ialah sayur berwarna oren yang tumbuh di dalam tanah.' },
      { emoji: '🌻', title: 'Fungsi Bunga', desc: 'Bunga menjadi buah dan menarik lebah untuk datang.' },
      { emoji: '🍂', title: 'Fungsi Daun', desc: 'Daun membuat makanan dengan bantuan cahaya matahari.' },
      { emoji: '🪜', title: 'Fungsi Batang', desc: 'Batang menyokong tumbuhan dan membawa air ke daun.' },
      { emoji: '🫚', title: 'Fungsi Akar', desc: 'Akar menyerap air dan mencengkam tumbuhan di tanah.' },
      { emoji: '🌲', title: 'Tempat Tumbuh', desc: 'Tumbuhan boleh tumbuh di hutan, taman, kebun dan sawah.' },
      { emoji: '🌱', title: 'Pertumbuhan', desc: 'Biji benih tumbuh menjadi anak pokok, kemudian pokok dewasa.' },
      { emoji: '🥦', title: 'Sayur Boleh Dimakan', desc: 'Sayur seperti brokoli dan bayam baik untuk kesihatan kita.' },
      { emoji: '🍌', title: 'Buah Boleh Dimakan', desc: 'Buah seperti pisang dan mangga sedap dan manis dimakan.' },
      { emoji: '🌴', title: 'Pelbagai Pokok', desc: 'Ada pokok tinggi, pokok rendah dan pokok yang berbuah.' },
      { emoji: '🪴', title: 'Menanam Pokok', desc: 'Kita menanam biji benih dan menyiramnya dengan air setiap hari.' },
      { emoji: '🐝', title: 'Lebah dan Bunga', desc: 'Lebah hinggap di bunga dan membantu tumbuhan membuat buah.' },
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
      { kind: 'pilih', prompt: 'Bahagian mana MENEGAKKAN tumbuhan?', speak: 'Bahagian mana menegakkan tumbuhan?', image: '🪵', choices: ['Batang 🪵', 'Bunga 🌸', 'Buah 🍎'], answer: 'Batang 🪵', solution: 'Batang menyokong dan menegakkan tumbuhan.' },
      { kind: 'pilih', prompt: 'Tumbuhan perlukan apa untuk hidup?', speak: 'Tumbuhan perlukan apa untuk hidup?', image: '💧', choices: ['Air 💧', 'Gula-gula 🍬', 'Mainan 🧸'], answer: 'Air 💧', solution: 'Tumbuhan perlukan air untuk hidup.' },
      { kind: 'pilih', prompt: 'Apa yang membantu daun membuat makanan?', speak: 'Apa yang membantu daun membuat makanan?', image: '☀️', choices: ['Cahaya matahari ☀️', 'Bulan 🌙', 'Bintang ⭐'], answer: 'Cahaya matahari ☀️', solution: 'Cahaya matahari membantu daun membuat makanan.' },
      { kind: 'pilih', prompt: 'Yang mana ada DURI tajam?', speak: 'Yang mana ada duri tajam?', image: '🌵', choices: ['Kaktus 🌵', 'Daun 🍃', 'Bunga 🌸'], answer: 'Kaktus 🌵', solution: 'Kaktus 🌵 mempunyai duri yang tajam.' },
      { kind: 'sort', prompt: 'Letakkan dalam kumpulan yang betul', speak: 'Lobak itu sayur atau buah?', image: '🥕', itemLabel: 'Lobak', bins: ['Sayur 🥬', 'Buah 🍎'], answer: 'Sayur 🥬', solution: 'Lobak 🥕 ialah sayur yang boleh dimakan.' },
      { kind: 'sort', prompt: 'Letakkan dalam kumpulan yang betul', speak: 'Mangga itu sayur atau buah?', image: '🥭', itemLabel: 'Mangga', bins: ['Sayur 🥬', 'Buah 🍎'], answer: 'Buah 🍎', solution: 'Mangga 🥭 ialah buah yang manis.' },
      { kind: 'sort', prompt: 'Letakkan dalam kumpulan yang betul', speak: 'Pokok kelapa itu pokok besar atau rumput?', image: '🥥', itemLabel: 'Pokok Kelapa', bins: ['Pokok Besar 🌳', 'Rumput 🌾'], answer: 'Pokok Besar 🌳', solution: 'Pokok kelapa 🥥 ialah pokok besar yang tinggi.' },
      { kind: 'pilih', prompt: 'Di mana AKAR tumbuh?', speak: 'Di mana akar tumbuh?', image: '🟤', choices: ['Dalam tanah 🟤', 'Dalam air laut 🌊', 'Dalam awan ☁️'], answer: 'Dalam tanah 🟤', solution: 'Akar tumbuh di dalam tanah.' },
      { kind: 'pilih', prompt: 'Buah tumbuh daripada apa?', speak: 'Buah tumbuh daripada apa?', image: '🌸', choices: ['Bunga 🌸', 'Akar 🌱', 'Batang 🪵'], answer: 'Bunga 🌸', solution: 'Buah tumbuh daripada bunga.' },
      { kind: 'pilih', prompt: 'Apa nama bunga kebangsaan Malaysia?', speak: 'Apa nama bunga kebangsaan Malaysia?', image: '🌺', choices: ['Bunga raya 🌺', 'Bunga ros 🌹', 'Bunga matahari 🌻'], answer: 'Bunga raya 🌺', solution: 'Bunga raya ialah bunga kebangsaan Malaysia.' },
      { kind: 'deria', prompt: 'Guna deria apa untuk melihat warna bunga?', speak: 'Guna deria apa untuk melihat warna bunga?', image: '👁️', choices: ['Mata 👁️', 'Telinga 👂', 'Hidung 👃'], answer: 'Mata 👁️', solution: 'Kita guna mata untuk melihat warna bunga.' },
      { kind: 'deria', prompt: 'Guna deria apa untuk menghidu bau bunga?', speak: 'Guna deria apa untuk menghidu bau bunga?', image: '👃', choices: ['Hidung 👃', 'Mata 👁️', 'Lidah 👅'], answer: 'Hidung 👃', solution: 'Kita guna hidung untuk menghidu bau bunga.' },
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
      { emoji: '🐛', title: 'Bergerak Sendiri', desc: 'Benda hidup boleh bergerak sendiri tanpa ditolak.' },
      { emoji: '🐥', title: 'Membiak', desc: 'Benda hidup membiak untuk mendapat anak baru.' },
      { emoji: '💧', title: 'Perlukan Air', desc: 'Semua benda hidup perlukan air untuk terus hidup.' },
      { emoji: '👋', title: 'Bertindak Balas', desc: 'Benda hidup bertindak balas apabila disentuh atau dengar bunyi.' },
      { emoji: '🧒', title: 'Manusia Hidup', desc: 'Manusia bernafas, makan dan membesar — ia benda hidup.' },
      { emoji: '🐱', title: 'Kucing Hidup', desc: 'Kucing makan dan bergerak sendiri — ia benda hidup.' },
      { emoji: '🐦', title: 'Burung Hidup', desc: 'Burung terbang, makan dan membiak — ia benda hidup.' },
      { emoji: '🐟', title: 'Ikan Hidup', desc: 'Ikan berenang dan bernafas dalam air — ia benda hidup.' },
      { emoji: '🐜', title: 'Serangga Hidup', desc: 'Semut ialah serangga yang hidup dan bergerak sendiri.' },
      { emoji: '🦋', title: 'Rama-rama Hidup', desc: 'Rama-rama membesar daripada ulat — ia benda hidup.' },
      { emoji: '🌼', title: 'Bunga Hidup', desc: 'Bunga tumbuh daripada tumbuhan — ia benda hidup.' },
      { emoji: '🌱', title: 'Benih Membesar', desc: 'Benih membesar menjadi pokok apabila disiram air.' },
      { emoji: '✏️', title: 'Pensel Bukan Hidup', desc: 'Pensel tidak bernafas dan tidak membesar.' },
      { emoji: '📱', title: 'Telefon Bukan Hidup', desc: 'Telefon tidak makan — ia benda bukan hidup.' },
      { emoji: '🪑', title: 'Kerusi Bukan Hidup', desc: 'Kerusi tidak bergerak sendiri — ia benda bukan hidup.' },
      { emoji: '🍾', title: 'Botol Bukan Hidup', desc: 'Botol tidak bernafas — ia benda bukan hidup.' },
      { emoji: '⚽', title: 'Bola Bukan Hidup', desc: 'Bola bergerak hanya apabila ditendang — ia bukan hidup.' },
      { emoji: '📖', title: 'Buku Bukan Hidup', desc: 'Buku tidak makan dan tidak membesar — ia bukan hidup.' },
      { emoji: '☕', title: 'Cawan Bukan Hidup', desc: 'Cawan tidak bernafas — ia benda bukan hidup.' },
      { emoji: '⏰', title: 'Jam Bukan Hidup', desc: 'Jam bergerak jarumnya tetapi ia bukan hidup.' },
      { emoji: '🪵', title: 'Pernah Hidup', desc: 'Kayu dahulunya pokok yang hidup, kini ia tidak hidup.' },
      { emoji: '🍂', title: 'Daun Kering', desc: 'Daun kering pernah hidup pada pokok dahulu.' },
      { emoji: '🥚', title: 'Telur Menetas', desc: 'Telur haiwan boleh menetas menjadi anak yang hidup.' },
      { emoji: '🌞', title: 'Keperluan Hidup', desc: 'Benda hidup perlukan udara, air dan makanan untuk hidup.' },
      { emoji: '🌧️', title: 'Air Untuk Hidup', desc: 'Tanpa air, tumbuhan dan haiwan tidak boleh hidup.' },
      { emoji: '🍃', title: 'Udara Untuk Hidup', desc: 'Benda hidup perlu udara bersih untuk bernafas.' },
      { emoji: '🏠', title: 'Tempat Tinggal', desc: 'Benda hidup perlukan tempat selamat untuk tinggal.' },
      { emoji: '🔍', title: 'Banding Hidup', desc: 'Bandingkan benda: adakah ia makan dan membesar?' },
      { emoji: '💚', title: 'Jaga Benda Hidup', desc: 'Kita perlu menyayangi dan menjaga semua benda hidup.' },
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
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Burung hidup atau bukan hidup?', image: '🐦', itemLabel: 'Burung', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Hidup 💚', solution: 'Burung 🐦 terbang dan makan — ia hidup.' },
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Kerusi hidup atau bukan hidup?', image: '🪑', itemLabel: 'Kerusi', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Bukan Hidup 🪨', solution: 'Kerusi 🪑 tidak bergerak sendiri — ia bukan hidup.' },
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Bunga hidup atau bukan hidup?', image: '🌼', itemLabel: 'Bunga', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Hidup 💚', solution: 'Bunga 🌼 membesar dan perlukan air — ia hidup.' },
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Bola hidup atau bukan hidup?', image: '⚽', itemLabel: 'Bola', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Bukan Hidup 🪨', solution: 'Bola ⚽ bergerak hanya bila ditendang — ia bukan hidup.' },
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Semut hidup atau bukan hidup?', image: '🐜', itemLabel: 'Semut', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Hidup 💚', solution: 'Semut 🐜 bergerak sendiri dan makan — ia hidup.' },
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Jam hidup atau bukan hidup?', image: '⏰', itemLabel: 'Jam', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Bukan Hidup 🪨', solution: 'Jam ⏰ tidak bernafas — ia bukan hidup.' },
      { kind: 'pilih', prompt: 'Benda hidup perlukan apa untuk hidup?', speak: 'Benda hidup perlukan apa untuk hidup?', image: '💧', choices: ['💧', '📱', '🪨'], answer: '💧', solution: 'Benda hidup perlukan air 💧 untuk terus hidup.' },
      { kind: 'pilih', prompt: 'Ciri manakah milik benda hidup?', speak: 'Ciri manakah milik benda hidup?', image: '🐣', choices: ['Membesar 🐣', 'Berkarat 🪨', 'Pecah 💥'], answer: 'Membesar 🐣', solution: 'Benda hidup membesar daripada kecil menjadi besar.' },
      { kind: 'pilih', prompt: 'Yang mana benda HIDUP?', speak: 'Yang mana satu benda hidup?', image: '🐱', choices: ['🐱', '📖', '☕'], answer: '🐱', solution: 'Kucing 🐱 bernafas dan makan — ia benda hidup.' },
      { kind: 'pilih', prompt: 'Yang mana benda BUKAN HIDUP?', speak: 'Yang mana satu benda bukan hidup?', image: '🍾', choices: ['🍾', '🦋', '🌱'], answer: '🍾', solution: 'Botol 🍾 tidak makan — ia benda bukan hidup.' },
      { kind: 'pilih', prompt: 'Benda hidup bernafas menggunakan apa?', speak: 'Benda hidup bernafas menggunakan apa?', image: '🍃', choices: ['Udara 🍃', 'Batu 🪨', 'Pensel ✏️'], answer: 'Udara 🍃', solution: 'Benda hidup bernafas menggunakan udara 🍃.' },
      { kind: 'sort', prompt: 'Hidup atau bukan hidup?', speak: 'Manusia hidup atau bukan hidup?', image: '🧒', itemLabel: 'Manusia', bins: ['Hidup 💚', 'Bukan Hidup 🪨'], answer: 'Hidup 💚', solution: 'Manusia 🧒 bernafas, makan dan membesar — ia hidup.' },
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
