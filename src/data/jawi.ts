// Data Modul Jawi (Tulisan Jawi Tahun 1) — KSSR Semakan.
// Semua aktiviti berasaskan "ketik untuk pilih / ketik untuk bina" supaya
// mesra kanak-kanak 7 tahun. Teks Jawi dipaparkan dengan kelas `.jawi`
// (font naskh + susunan kanan-ke-kiri) di dalam skrin.
//
// NOTA SEBUTAN: Sebutan huruf dibaca melalui Text-to-Speech menggunakan nama
// Rumi (cth: "nga", "pa") kerana TTS biasa tidak menyebut glif Jawi secara
// tepat. Jika ada klip audio asli pada masa depan, medan `speak` boleh diganti
// dengan URL audio di lapisan paparan.

export type JawiColor = 'green' | 'blue' | 'orange' | 'red' | 'purple'

export const JAWI_BADGE = {
  id: 'pakar-jawi',
  name: 'Pakar Jawi',
  emoji: '🖋️',
  requiredCorrect: 15,
}

/** Satu kad untuk Mod Belajar. */
export interface JawiCard {
  /** Teks Jawi besar (huruf / suku kata / perkataan). */
  glyph?: string
  /** Gambar visual (emoji) — digunakan untuk kad perkataan. */
  emoji?: string
  /** Padanan Rumi (cth: "ba", "buku"). */
  rumi?: string
  title: string
  desc: string
  /** Teks untuk dibaca kuat (Text-to-Speech). */
  speak: string
}

/** Soalan Jawi — gabungan beberapa jenis aktiviti. */
export type JawiQuestion =
  // Padan huruf Rumi → Jawi: tunjuk huruf Rumi, pilih glif Jawi yang betul.
  | {
      kind: 'padan'
      prompt: string
      speak: string
      rumi: string
      choices: string[]
      answer: string
      solution: string
    }
  // Dengar & pilih: TTS sebut bunyi huruf, murid pilih glif Jawi yang betul.
  | {
      kind: 'dengar'
      prompt: string
      speak: string
      choices: string[]
      answer: string
      solution: string
    }
  // Asingkan huruf boleh/tidak boleh disambung (huruf sombong).
  | {
      kind: 'asing'
      prompt: string
      speak: string
      letter: string
      rumi: string
      bins: [string, string]
      answer: string
      solution: string
    }
  // Bina perkataan/suku kata: ketik kepingan ikut turutan betul (RTL auto-join).
  | {
      kind: 'sambung'
      prompt: string
      speak: string
      image: string
      rumiMeaning: string
      /** Kepingan dalam turutan logik (kiri = huruf pertama perkataan). */
      pieces: string[]
      /** Jawapan = pieces.join(''). */
      answer: string
      solution: string
    }
  // Pilih perkataan Jawi yang betul mengikut gambar.
  | {
      kind: 'pilih'
      prompt: string
      speak: string
      image: string
      choices: string[]
      answer: string
      solution: string
    }

export interface JawiUnit {
  level: number
  title: string
  subtitle: string
  emoji: string
  color: JawiColor
  learn: JawiCard[]
  questions: JawiQuestion[]
}

// Petak jawapan yang dikongsi untuk aktiviti "asing".
const BINS_SAMBUNG: [string, string] = ['Boleh Sambung ✅', 'Huruf Sombong 🚫']

export const JAWI_UNITS: JawiUnit[] = [
  // ===========================================================================
  // UNIT 1 — Huruf-huruf Jawi Tunggal
  // ===========================================================================
  {
    level: 1,
    title: 'Unit 1',
    subtitle: 'Huruf Jawi Tunggal',
    emoji: '🔤',
    color: 'green',
    learn: [
      { glyph: 'ا', rumi: 'alif', title: 'Alif', desc: 'Huruf pertama Jawi. Bunyinya "a".', speak: 'alif' },
      { glyph: 'ب', rumi: 'ba', title: 'Ba', desc: 'Huruf ba berbunyi "ba". Ada satu titik di bawah.', speak: 'ba' },
      { glyph: 'ت', rumi: 'ta', title: 'Ta', desc: 'Huruf ta berbunyi "ta". Ada dua titik di atas.', speak: 'ta' },
      { glyph: 'ث', rumi: 'sa', title: 'Sa', desc: 'Huruf sa berbunyi "sa". Ada tiga titik di atas.', speak: 'sa' },
      { glyph: 'ج', rumi: 'jim', title: 'Jim', desc: 'Huruf jim berbunyi "ja". Ada satu titik di dalam.', speak: 'jim' },
      { glyph: 'چ', rumi: 'ca', title: 'Ca', desc: 'Huruf ca berbunyi "ca". Ada tiga titik di dalam.', speak: 'ca' },
      { glyph: 'ح', rumi: 'ha', title: 'Ha', desc: 'Huruf ha (besar) berbunyi "ha".', speak: 'ha' },
      { glyph: 'خ', rumi: 'kha', title: 'Kha', desc: 'Huruf kha berbunyi "kha". Ada satu titik di atas.', speak: 'kha' },
      { glyph: 'د', rumi: 'dal', title: 'Dal', desc: 'Huruf dal berbunyi "da".', speak: 'dal' },
      { glyph: 'ذ', rumi: 'zal', title: 'Zal', desc: 'Huruf zal berbunyi "za". Ada satu titik di atas.', speak: 'zal' },
      { glyph: 'ر', rumi: 'ra', title: 'Ra', desc: 'Huruf ra berbunyi "ra".', speak: 'ra' },
      { glyph: 'ز', rumi: 'zai', title: 'Zai', desc: 'Huruf zai berbunyi "za". Ada satu titik di atas.', speak: 'zai' },
      { glyph: 'س', rumi: 'sin', title: 'Sin', desc: 'Huruf sin berbunyi "sa".', speak: 'sin' },
      { glyph: 'ش', rumi: 'syin', title: 'Syin', desc: 'Huruf syin berbunyi "sya". Ada tiga titik di atas.', speak: 'syin' },
      { glyph: 'ص', rumi: 'sad', title: 'Sad', desc: 'Huruf sad berbunyi "sa".', speak: 'sad' },
      { glyph: 'ض', rumi: 'dad', title: 'Dad', desc: 'Huruf dad berbunyi "da". Ada satu titik di atas.', speak: 'dad' },
      { glyph: 'ط', rumi: 'ta', title: 'Ta (tho)', desc: 'Huruf ta berbunyi "tha".', speak: 'tho' },
      { glyph: 'ظ', rumi: 'za', title: 'Za (zho)', desc: 'Huruf za berbunyi "zha". Ada satu titik di atas.', speak: 'zho' },
      { glyph: 'ع', rumi: 'ain', title: 'Ain', desc: 'Huruf ain berbunyi "a".', speak: 'ain' },
      { glyph: 'غ', rumi: 'ghain', title: 'Ghain', desc: 'Huruf ghain berbunyi "gha". Ada satu titik di atas.', speak: 'ghain' },
      { glyph: 'ڠ', rumi: 'nga', title: 'Nga', desc: 'Huruf Melayu. Berbunyi "nga". Ada tiga titik di atas.', speak: 'nga' },
      { glyph: 'ف', rumi: 'fa', title: 'Fa', desc: 'Huruf fa berbunyi "fa". Ada satu titik di atas.', speak: 'fa' },
      { glyph: 'ڤ', rumi: 'pa', title: 'Pa', desc: 'Huruf Melayu. Berbunyi "pa". Ada tiga titik di atas.', speak: 'pa' },
      { glyph: 'ق', rumi: 'qaf', title: 'Qaf', desc: 'Huruf qaf berbunyi "qa". Ada dua titik di atas.', speak: 'qaf' },
      { glyph: 'ک', rumi: 'kaf', title: 'Kaf', desc: 'Huruf kaf berbunyi "ka".', speak: 'kaf' },
      { glyph: 'ݢ', rumi: 'ga', title: 'Ga', desc: 'Huruf Melayu. Berbunyi "ga". Ada satu titik di atas.', speak: 'ga' },
      { glyph: 'ل', rumi: 'lam', title: 'Lam', desc: 'Huruf lam berbunyi "la".', speak: 'lam' },
      { glyph: 'م', rumi: 'mim', title: 'Mim', desc: 'Huruf mim berbunyi "ma".', speak: 'mim' },
      { glyph: 'ن', rumi: 'nun', title: 'Nun', desc: 'Huruf nun berbunyi "na". Ada satu titik di atas.', speak: 'nun' },
      { glyph: 'و', rumi: 'wau', title: 'Wau', desc: 'Huruf wau berbunyi "wa". Juga untuk bunyi "u" dan "o".', speak: 'wau' },
      { glyph: 'ۏ', rumi: 'va', title: 'Va', desc: 'Huruf Melayu. Berbunyi "va". Ada satu titik di atas wau.', speak: 'va' },
      { glyph: 'ه', rumi: 'ha', title: 'Ha (kecil)', desc: 'Huruf ha (kecil) berbunyi "ha".', speak: 'ha' },
      { glyph: 'ء', rumi: 'hamzah', title: 'Hamzah', desc: 'Tanda hamzah untuk henti bunyi.', speak: 'hamzah' },
      { glyph: 'ي', rumi: 'ya', title: 'Ya', desc: 'Huruf ya berbunyi "ya". Juga untuk bunyi "i".', speak: 'ya' },
      { glyph: 'ڽ', rumi: 'nya', title: 'Nya', desc: 'Huruf Melayu. Berbunyi "nya". Ada tiga titik di atas.', speak: 'nya' },
    ],
    questions: [
      { kind: 'dengar', prompt: 'Dengar bunyi, pilih hurufnya.', speak: 'ba', choices: ['ب', 'ت', 'ن', 'ث'], answer: 'ب', solution: 'Huruf "ba" ialah ب — satu titik di bawah.' },
      { kind: 'dengar', prompt: 'Dengar bunyi, pilih hurufnya.', speak: 'ta', choices: ['ت', 'ب', 'ث', 'ن'], answer: 'ت', solution: 'Huruf "ta" ialah ت — dua titik di atas.' },
      { kind: 'dengar', prompt: 'Dengar bunyi, pilih hurufnya.', speak: 'jim', choices: ['ج', 'چ', 'ح', 'خ'], answer: 'ج', solution: 'Huruf "jim" ialah ج — satu titik di dalam.' },
      { kind: 'dengar', prompt: 'Dengar bunyi, pilih hurufnya.', speak: 'ca', choices: ['چ', 'ج', 'ح', 'خ'], answer: 'چ', solution: 'Huruf "ca" ialah چ — tiga titik di dalam.' },
      { kind: 'dengar', prompt: 'Dengar bunyi, pilih hurufnya.', speak: 'nga', choices: ['ڠ', 'غ', 'ع', 'ق'], answer: 'ڠ', solution: 'Huruf "nga" ialah ڠ — tiga titik di atas.' },
      { kind: 'dengar', prompt: 'Dengar bunyi, pilih hurufnya.', speak: 'pa', choices: ['ڤ', 'ف', 'ق', 'ب'], answer: 'ڤ', solution: 'Huruf "pa" ialah ڤ — tiga titik di atas.' },
      { kind: 'dengar', prompt: 'Dengar bunyi, pilih hurufnya.', speak: 'ga', choices: ['ݢ', 'ک', 'ق', 'ف'], answer: 'ݢ', solution: 'Huruf "ga" ialah ݢ — satu titik di atas kaf.' },
      { kind: 'dengar', prompt: 'Dengar bunyi, pilih hurufnya.', speak: 'nya', choices: ['ڽ', 'ن', 'ي', 'ت'], answer: 'ڽ', solution: 'Huruf "nya" ialah ڽ — tiga titik di atas.' },
      { kind: 'padan', prompt: 'Huruf apakah ini?', speak: 'Huruf apakah ini?', rumi: 'alif', choices: ['ا', 'ل', 'ب', 'د'], answer: 'ا', solution: 'Alif ialah ا — huruf tegak yang pertama.' },
      { kind: 'padan', prompt: 'Pilih huruf yang betul.', speak: 'Pilih huruf dal.', rumi: 'dal', choices: ['د', 'ذ', 'ر', 'و'], answer: 'د', solution: 'Dal ialah د — tiada titik.' },
      { kind: 'padan', prompt: 'Pilih huruf yang betul.', speak: 'Pilih huruf ra.', rumi: 'ra', choices: ['ر', 'ز', 'د', 'و'], answer: 'ر', solution: 'Ra ialah ر — tiada titik.' },
      { kind: 'padan', prompt: 'Pilih huruf yang betul.', speak: 'Pilih huruf sin.', rumi: 'sin', choices: ['س', 'ش', 'ص', 'ث'], answer: 'س', solution: 'Sin ialah س — tiada titik.' },
      { kind: 'padan', prompt: 'Pilih huruf yang betul.', speak: 'Pilih huruf mim.', rumi: 'mim', choices: ['م', 'ن', 'و', 'ل'], answer: 'م', solution: 'Mim ialah م.' },
      { kind: 'padan', prompt: 'Pilih huruf yang betul.', speak: 'Pilih huruf wau.', rumi: 'wau', choices: ['و', 'ۏ', 'ر', 'د'], answer: 'و', solution: 'Wau ialah و — juga bunyi "u" dan "o".' },
      { kind: 'padan', prompt: 'Pilih huruf yang betul.', speak: 'Pilih huruf ya.', rumi: 'ya', choices: ['ي', 'ب', 'ت', 'ن'], answer: 'ي', solution: 'Ya ialah ي — juga bunyi "i".' },
      { kind: 'padan', prompt: 'Pilih huruf yang betul.', speak: 'Pilih huruf kaf.', rumi: 'kaf', choices: ['ک', 'ݢ', 'ل', 'ق'], answer: 'ک', solution: 'Kaf ialah ک.' },
    ],
  },

  // ===========================================================================
  // UNIT 2 — Huruf Padanan Rumi–Jawi
  // ===========================================================================
  {
    level: 2,
    title: 'Unit 2',
    subtitle: 'Padanan Rumi–Jawi',
    emoji: '🔄',
    color: 'blue',
    learn: [
      { glyph: 'ا', rumi: 'A', title: 'A = ا', desc: 'Huruf Rumi A menjadi alif ا dalam Jawi.', speak: 'a, alif' },
      { glyph: 'ب', rumi: 'B', title: 'B = ب', desc: 'Huruf Rumi B menjadi ba ب.', speak: 'ba' },
      { glyph: 'ت', rumi: 'T', title: 'T = ت', desc: 'Huruf Rumi T menjadi ta ت.', speak: 'ta' },
      { glyph: 'چ', rumi: 'C', title: 'C = چ', desc: 'Huruf Rumi C menjadi ca چ.', speak: 'ca' },
      { glyph: 'د', rumi: 'D', title: 'D = د', desc: 'Huruf Rumi D menjadi dal د.', speak: 'dal' },
      { glyph: 'ف', rumi: 'F', title: 'F = ف', desc: 'Huruf Rumi F menjadi fa ف.', speak: 'fa' },
      { glyph: 'ݢ', rumi: 'G', title: 'G = ݢ', desc: 'Huruf Rumi G menjadi ga ݢ.', speak: 'ga' },
      { glyph: 'ه', rumi: 'H', title: 'H = ه', desc: 'Huruf Rumi H menjadi ha ه.', speak: 'ha' },
      { glyph: 'ي', rumi: 'I', title: 'I = ي', desc: 'Bunyi "i" ditulis dengan ya ي.', speak: 'i, ya' },
      { glyph: 'ج', rumi: 'J', title: 'J = ج', desc: 'Huruf Rumi J menjadi jim ج.', speak: 'jim' },
      { glyph: 'ک', rumi: 'K', title: 'K = ک', desc: 'Huruf Rumi K menjadi kaf ک.', speak: 'kaf' },
      { glyph: 'ل', rumi: 'L', title: 'L = ل', desc: 'Huruf Rumi L menjadi lam ل.', speak: 'lam' },
      { glyph: 'م', rumi: 'M', title: 'M = م', desc: 'Huruf Rumi M menjadi mim م.', speak: 'mim' },
      { glyph: 'ن', rumi: 'N', title: 'N = ن', desc: 'Huruf Rumi N menjadi nun ن.', speak: 'nun' },
      { glyph: 'ڠ', rumi: 'NG', title: 'NG = ڠ', desc: 'Gabungan "ng" menjadi nga ڠ.', speak: 'nga' },
      { glyph: 'ڽ', rumi: 'NY', title: 'NY = ڽ', desc: 'Gabungan "ny" menjadi nya ڽ.', speak: 'nya' },
      { glyph: 'و', rumi: 'O', title: 'O = و', desc: 'Bunyi "o" ditulis dengan wau و.', speak: 'o, wau' },
      { glyph: 'ڤ', rumi: 'P', title: 'P = ڤ', desc: 'Huruf Rumi P menjadi pa ڤ.', speak: 'pa' },
      { glyph: 'ق', rumi: 'Q', title: 'Q = ق', desc: 'Huruf Rumi Q menjadi qaf ق.', speak: 'qaf' },
      { glyph: 'ر', rumi: 'R', title: 'R = ر', desc: 'Huruf Rumi R menjadi ra ر.', speak: 'ra' },
      { glyph: 'س', rumi: 'S', title: 'S = س', desc: 'Huruf Rumi S menjadi sin س.', speak: 'sin' },
      { glyph: 'و', rumi: 'U', title: 'U = و', desc: 'Bunyi "u" ditulis dengan wau و.', speak: 'u, wau' },
      { glyph: 'ۏ', rumi: 'V', title: 'V = ۏ', desc: 'Huruf Rumi V menjadi va ۏ.', speak: 'va' },
      { glyph: 'و', rumi: 'W', title: 'W = و', desc: 'Huruf Rumi W menjadi wau و.', speak: 'wau' },
      { glyph: 'ي', rumi: 'Y', title: 'Y = ي', desc: 'Huruf Rumi Y menjadi ya ي.', speak: 'ya' },
      { glyph: 'ز', rumi: 'Z', title: 'Z = ز', desc: 'Huruf Rumi Z menjadi zai ز.', speak: 'zai' },
    ],
    questions: [
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "A".', speak: 'Pilih huruf Jawi untuk a.', rumi: 'A', choices: ['ا', 'ب', 'ل', 'د'], answer: 'ا', solution: 'A = ا (alif).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "B".', speak: 'Pilih huruf Jawi untuk ba.', rumi: 'B', choices: ['ب', 'ت', 'ن', 'ث'], answer: 'ب', solution: 'B = ب (ba).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "T".', speak: 'Pilih huruf Jawi untuk ta.', rumi: 'T', choices: ['ت', 'ب', 'ث', 'ن'], answer: 'ت', solution: 'T = ت (ta).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "K".', speak: 'Pilih huruf Jawi untuk kaf.', rumi: 'K', choices: ['ک', 'ݢ', 'ق', 'ل'], answer: 'ک', solution: 'K = ک (kaf).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "P".', speak: 'Pilih huruf Jawi untuk pa.', rumi: 'P', choices: ['ڤ', 'ف', 'ب', 'ق'], answer: 'ڤ', solution: 'P = ڤ (pa).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "G".', speak: 'Pilih huruf Jawi untuk ga.', rumi: 'G', choices: ['ݢ', 'ک', 'ج', 'چ'], answer: 'ݢ', solution: 'G = ݢ (ga).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "C".', speak: 'Pilih huruf Jawi untuk ca.', rumi: 'C', choices: ['چ', 'ج', 'ح', 'خ'], answer: 'چ', solution: 'C = چ (ca).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "D".', speak: 'Pilih huruf Jawi untuk dal.', rumi: 'D', choices: ['د', 'ذ', 'ر', 'و'], answer: 'د', solution: 'D = د (dal).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "L".', speak: 'Pilih huruf Jawi untuk lam.', rumi: 'L', choices: ['ل', 'م', 'ن', 'ا'], answer: 'ل', solution: 'L = ل (lam).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "M".', speak: 'Pilih huruf Jawi untuk mim.', rumi: 'M', choices: ['م', 'ن', 'ل', 'و'], answer: 'م', solution: 'M = م (mim).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "N".', speak: 'Pilih huruf Jawi untuk nun.', rumi: 'N', choices: ['ن', 'ت', 'ب', 'ث'], answer: 'ن', solution: 'N = ن (nun).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "S".', speak: 'Pilih huruf Jawi untuk sin.', rumi: 'S', choices: ['س', 'ش', 'ص', 'ث'], answer: 'س', solution: 'S = س (sin).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "R".', speak: 'Pilih huruf Jawi untuk ra.', rumi: 'R', choices: ['ر', 'ز', 'د', 'و'], answer: 'ر', solution: 'R = ر (ra).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "NG".', speak: 'Pilih huruf Jawi untuk nga.', rumi: 'NG', choices: ['ڠ', 'غ', 'ع', 'ن'], answer: 'ڠ', solution: 'NG = ڠ (nga).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "NY".', speak: 'Pilih huruf Jawi untuk nya.', rumi: 'NY', choices: ['ڽ', 'ن', 'ي', 'ت'], answer: 'ڽ', solution: 'NY = ڽ (nya).' },
      { kind: 'padan', prompt: 'Pilih huruf Jawi untuk "W".', speak: 'Pilih huruf Jawi untuk wau.', rumi: 'W', choices: ['و', 'ۏ', 'ر', 'ي'], answer: 'و', solution: 'W = و (wau).' },
    ],
  },

  // ===========================================================================
  // UNIT 3 — Penyambungan Huruf Jawi
  // ===========================================================================
  {
    level: 3,
    title: 'Unit 3',
    subtitle: 'Penyambungan Huruf',
    emoji: '🔗',
    color: 'orange',
    learn: [
      { title: 'Huruf Bersambung', desc: 'Dalam Jawi, huruf disambung untuk membentuk perkataan.', speak: 'Dalam Jawi, huruf disambung untuk membentuk perkataan.' },
      { glyph: 'بـ ـبـ ـب', rumi: 'ba', title: 'Bentuk Berubah', desc: 'Huruf ba berubah bentuk di awal, tengah dan akhir perkataan.', speak: 'ba' },
      { glyph: 'سـ ـسـ ـس', rumi: 'sin', title: 'Sin Bersambung', desc: 'Huruf sin juga berubah bentuk apabila disambung.', speak: 'sin' },
      { glyph: 'تـ ـتـ ـت', rumi: 'ta', title: 'Ta Bersambung', desc: 'Huruf ta boleh menyambung sebelum dan selepasnya.', speak: 'ta' },
      { glyph: 'بت', rumi: 'bt', title: 'Boleh Disambung', desc: 'Ba dan ta boleh bercantum menjadi satu.', speak: 'ba ta' },
      { title: 'Huruf Sombong', desc: 'Ada 7 huruf "sombong". Ia tidak menyambung dengan huruf selepasnya.', speak: 'Ada tujuh huruf sombong. Ia tidak menyambung dengan huruf selepasnya.' },
      { glyph: 'ا', rumi: 'alif', title: 'Alif Sombong', desc: 'Alif tidak boleh disambung dengan huruf selepasnya.', speak: 'alif' },
      { glyph: 'د', rumi: 'dal', title: 'Dal Sombong', desc: 'Dal tidak boleh disambung dengan huruf selepasnya.', speak: 'dal' },
      { glyph: 'ذ', rumi: 'zal', title: 'Zal Sombong', desc: 'Zal tidak boleh disambung dengan huruf selepasnya.', speak: 'zal' },
      { glyph: 'ر', rumi: 'ra', title: 'Ra Sombong', desc: 'Ra tidak boleh disambung dengan huruf selepasnya.', speak: 'ra' },
      { glyph: 'ز', rumi: 'zai', title: 'Zai Sombong', desc: 'Zai tidak boleh disambung dengan huruf selepasnya.', speak: 'zai' },
      { glyph: 'و', rumi: 'wau', title: 'Wau Sombong', desc: 'Wau tidak boleh disambung dengan huruf selepasnya.', speak: 'wau' },
      { glyph: 'ۏ', rumi: 'va', title: 'Va Sombong', desc: 'Va juga tidak boleh disambung dengan huruf selepasnya.', speak: 'va' },
      { glyph: 'دا', rumi: 'da', title: 'Contoh Sombong', desc: 'Lihat: dal دا tidak bercantum dengan alif selepasnya.', speak: 'da' },
      { glyph: 'با', rumi: 'ba', title: 'Contoh Sambung', desc: 'Lihat: ba با bercantum kerana ba bukan huruf sombong.', speak: 'ba' },
      { title: 'Ingat Ya!', desc: 'Huruf sombong: alif, dal, zal, ra, zai, wau dan va.', speak: 'Huruf sombong: alif, dal, zal, ra, zai, wau dan va.' },
    ],
    questions: [
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'alif', letter: 'ا', rumi: 'alif', bins: BINS_SAMBUNG, answer: 'Huruf Sombong 🚫', solution: 'Alif ا ialah huruf sombong — tidak menyambung selepasnya.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'dal', letter: 'د', rumi: 'dal', bins: BINS_SAMBUNG, answer: 'Huruf Sombong 🚫', solution: 'Dal د ialah huruf sombong.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'ra', letter: 'ر', rumi: 'ra', bins: BINS_SAMBUNG, answer: 'Huruf Sombong 🚫', solution: 'Ra ر ialah huruf sombong.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'wau', letter: 'و', rumi: 'wau', bins: BINS_SAMBUNG, answer: 'Huruf Sombong 🚫', solution: 'Wau و ialah huruf sombong.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'zai', letter: 'ز', rumi: 'zai', bins: BINS_SAMBUNG, answer: 'Huruf Sombong 🚫', solution: 'Zai ز ialah huruf sombong.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'zal', letter: 'ذ', rumi: 'zal', bins: BINS_SAMBUNG, answer: 'Huruf Sombong 🚫', solution: 'Zal ذ ialah huruf sombong.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'va', letter: 'ۏ', rumi: 'va', bins: BINS_SAMBUNG, answer: 'Huruf Sombong 🚫', solution: 'Va ۏ ialah huruf sombong.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'ba', letter: 'ب', rumi: 'ba', bins: BINS_SAMBUNG, answer: 'Boleh Sambung ✅', solution: 'Ba ب boleh disambung di kedua-dua belah.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'ta', letter: 'ت', rumi: 'ta', bins: BINS_SAMBUNG, answer: 'Boleh Sambung ✅', solution: 'Ta ت boleh disambung.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'sin', letter: 'س', rumi: 'sin', bins: BINS_SAMBUNG, answer: 'Boleh Sambung ✅', solution: 'Sin س boleh disambung.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'mim', letter: 'م', rumi: 'mim', bins: BINS_SAMBUNG, answer: 'Boleh Sambung ✅', solution: 'Mim م boleh disambung.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'nun', letter: 'ن', rumi: 'nun', bins: BINS_SAMBUNG, answer: 'Boleh Sambung ✅', solution: 'Nun ن boleh disambung.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'lam', letter: 'ل', rumi: 'lam', bins: BINS_SAMBUNG, answer: 'Boleh Sambung ✅', solution: 'Lam ل boleh disambung.' },
      { kind: 'asing', prompt: 'Huruf ini boleh disambung atau sombong?', speak: 'kaf', letter: 'ک', rumi: 'kaf', bins: BINS_SAMBUNG, answer: 'Boleh Sambung ✅', solution: 'Kaf ک boleh disambung.' },
    ],
  },

  // ===========================================================================
  // UNIT 4 — Suku Kata Terbuka & Tertutup
  // ===========================================================================
  {
    level: 4,
    title: 'Unit 4',
    subtitle: 'Suku Kata',
    emoji: '🧩',
    color: 'red',
    learn: [
      { title: 'Suku Kata Terbuka', desc: 'Suku kata terbuka berakhir dengan bunyi vokal (a, i, u).', speak: 'Suku kata terbuka berakhir dengan bunyi vokal.' },
      { glyph: 'با', rumi: 'ba', title: 'ba = با', desc: 'Ba + alif = با.', speak: 'ba' },
      { glyph: 'بي', rumi: 'bi', title: 'bi = بي', desc: 'Ba + ya = بي.', speak: 'bi' },
      { glyph: 'بو', rumi: 'bu', title: 'bu = بو', desc: 'Ba + wau = بو.', speak: 'bu' },
      { glyph: 'تا', rumi: 'ta', title: 'ta = تا', desc: 'Ta + alif = تا.', speak: 'ta' },
      { glyph: 'تي', rumi: 'ti', title: 'ti = تي', desc: 'Ta + ya = تي.', speak: 'ti' },
      { glyph: 'تو', rumi: 'tu', title: 'tu = تو', desc: 'Ta + wau = تو.', speak: 'tu' },
      { glyph: 'کا', rumi: 'ka', title: 'ka = کا', desc: 'Kaf + alif = کا.', speak: 'ka' },
      { glyph: 'کي', rumi: 'ki', title: 'ki = کي', desc: 'Kaf + ya = کي.', speak: 'ki' },
      { glyph: 'کو', rumi: 'ku', title: 'ku = کو', desc: 'Kaf + wau = کو.', speak: 'ku' },
      { glyph: 'ما', rumi: 'ma', title: 'ma = ما', desc: 'Mim + alif = ما.', speak: 'ma' },
      { glyph: 'مي', rumi: 'mi', title: 'mi = مي', desc: 'Mim + ya = مي.', speak: 'mi' },
      { glyph: 'سا', rumi: 'sa', title: 'sa = سا', desc: 'Sin + alif = سا.', speak: 'sa' },
      { glyph: 'سو', rumi: 'su', title: 'su = سو', desc: 'Sin + wau = سو.', speak: 'su' },
      { glyph: 'لا', rumi: 'la', title: 'la = لا', desc: 'Lam + alif = لا.', speak: 'la' },
      { glyph: 'را', rumi: 'ra', title: 'ra = را', desc: 'Ra + alif = را.', speak: 'ra' },
      { title: 'Suku Kata Tertutup', desc: 'Suku kata tertutup berakhir dengan bunyi konsonan.', speak: 'Suku kata tertutup berakhir dengan bunyi konsonan.' },
      { glyph: 'بس', rumi: 'bas', title: 'bas = بس', desc: 'Ba + sin = بس (bas).', speak: 'bas' },
      { glyph: 'جم', rumi: 'jam', title: 'jam = جم', desc: 'Jim + mim = جم (jam).', speak: 'jam' },
      { glyph: 'کن', rumi: 'kan', title: 'kan = کن', desc: 'Kaf + nun = کن.', speak: 'kan' },
      { glyph: 'تن', rumi: 'tan', title: 'tan = تن', desc: 'Ta + nun = تن.', speak: 'tan' },
      { glyph: 'لم', rumi: 'lam', title: 'lam = لم', desc: 'Lam + mim = لم.', speak: 'lam' },
    ],
    questions: [
      { kind: 'sambung', prompt: 'Bina suku kata "ba".', speak: 'Bina suku kata ba.', image: '🔤', rumiMeaning: 'ba', pieces: ['ب', 'ا'], answer: 'با', solution: 'Ba + alif = با.' },
      { kind: 'sambung', prompt: 'Bina suku kata "bi".', speak: 'Bina suku kata bi.', image: '🔤', rumiMeaning: 'bi', pieces: ['ب', 'ي'], answer: 'بي', solution: 'Ba + ya = بي.' },
      { kind: 'sambung', prompt: 'Bina suku kata "bu".', speak: 'Bina suku kata bu.', image: '🔤', rumiMeaning: 'bu', pieces: ['ب', 'و'], answer: 'بو', solution: 'Ba + wau = بو.' },
      { kind: 'sambung', prompt: 'Bina suku kata "ku".', speak: 'Bina suku kata ku.', image: '🔤', rumiMeaning: 'ku', pieces: ['ک', 'و'], answer: 'کو', solution: 'Kaf + wau = کو.' },
      { kind: 'sambung', prompt: 'Bina suku kata "jam".', speak: 'Bina suku kata jam.', image: '🔤', rumiMeaning: 'jam', pieces: ['ج', 'م'], answer: 'جم', solution: 'Jim + mim = جم.' },
      { kind: 'pilih', prompt: 'Pilih suku kata "ba".', speak: 'Pilih suku kata ba.', image: '🔤', choices: ['با', 'بي', 'بو', 'تا'], answer: 'با', solution: 'ba = با.' },
      { kind: 'pilih', prompt: 'Pilih suku kata "bi".', speak: 'Pilih suku kata bi.', image: '🔤', choices: ['بي', 'با', 'بو', 'تي'], answer: 'بي', solution: 'bi = بي.' },
      { kind: 'pilih', prompt: 'Pilih suku kata "bu".', speak: 'Pilih suku kata bu.', image: '🔤', choices: ['بو', 'با', 'بي', 'تو'], answer: 'بو', solution: 'bu = بو.' },
      { kind: 'pilih', prompt: 'Pilih suku kata "ta".', speak: 'Pilih suku kata ta.', image: '🔤', choices: ['تا', 'تي', 'تو', 'با'], answer: 'تا', solution: 'ta = تا.' },
      { kind: 'pilih', prompt: 'Pilih suku kata "ku".', speak: 'Pilih suku kata ku.', image: '🔤', choices: ['کو', 'کا', 'کي', 'سو'], answer: 'کو', solution: 'ku = کو.' },
      { kind: 'pilih', prompt: 'Pilih suku kata "sa".', speak: 'Pilih suku kata sa.', image: '🔤', choices: ['سا', 'سو', 'ما', 'لا'], answer: 'سا', solution: 'sa = سا.' },
      { kind: 'pilih', prompt: 'Pilih suku kata tertutup "bas".', speak: 'Pilih suku kata bas.', image: '🚌', choices: ['بس', 'با', 'بو', 'بي'], answer: 'بس', solution: 'bas = بس (tertutup).' },
      { kind: 'pilih', prompt: 'Pilih suku kata tertutup "jam".', speak: 'Pilih suku kata jam.', image: '🕐', choices: ['جم', 'جا', 'جو', 'جي'], answer: 'جم', solution: 'jam = جم (tertutup).' },
      { kind: 'sambung', prompt: 'Bina suku kata "sa".', speak: 'Bina suku kata sa.', image: '🔤', rumiMeaning: 'sa', pieces: ['س', 'ا'], answer: 'سا', solution: 'Sin + alif = سا.' },
    ],
  },

  // ===========================================================================
  // UNIT 5 — Perkataan Mudah Bergambar
  // ===========================================================================
  {
    level: 5,
    title: 'Unit 5',
    subtitle: 'Perkataan Bergambar',
    emoji: '🖼️',
    color: 'purple',
    learn: [
      { glyph: 'بوکو', emoji: '📚', rumi: 'buku', title: 'buku = بوکو', desc: 'بو + کو. Dua suku kata terbuka.', speak: 'buku' },
      { glyph: 'کودا', emoji: '🐴', rumi: 'kuda', title: 'kuda = کودا', desc: 'کو + دا. Dal tidak sambung alif.', speak: 'kuda' },
      { glyph: 'باجو', emoji: '👕', rumi: 'baju', title: 'baju = باجو', desc: 'با + جو.', speak: 'baju' },
      { glyph: 'ماتا', emoji: '👁️', rumi: 'mata', title: 'mata = ماتا', desc: 'ما + تا.', speak: 'mata' },
      { glyph: 'بولا', emoji: '⚽', rumi: 'bola', title: 'bola = بولا', desc: 'بو + لا.', speak: 'bola' },
      { glyph: 'روتي', emoji: '🍞', rumi: 'roti', title: 'roti = روتي', desc: 'رو + تي.', speak: 'roti' },
      { glyph: 'باتو', emoji: '🪨', rumi: 'batu', title: 'batu = باتو', desc: 'با + تو.', speak: 'batu' },
      { glyph: 'سوسو', emoji: '🥛', rumi: 'susu', title: 'susu = سوسو', desc: 'سو + سو.', speak: 'susu' },
      { glyph: 'کاکي', emoji: '🦵', rumi: 'kaki', title: 'kaki = کاکي', desc: 'کا + کي.', speak: 'kaki' },
      { glyph: 'دادو', emoji: '🎲', rumi: 'dadu', title: 'dadu = دادو', desc: 'دا + دو.', speak: 'dadu' },
      { glyph: 'لمبو', emoji: '🐮', rumi: 'lembu', title: 'lembu = لمبو', desc: 'لم + بو. "e" pepet tidak ditulis.', speak: 'lembu' },
      { glyph: 'ݢيݢي', emoji: '🦷', rumi: 'gigi', title: 'gigi = ݢيݢي', desc: 'ݢي + ݢي. Guna huruf ga.', speak: 'gigi' },
    ],
    questions: [
      { kind: 'sambung', prompt: 'Bina perkataan mengikut gambar.', speak: 'buku', image: '📚', rumiMeaning: 'buku', pieces: ['ب', 'و', 'ک', 'و'], answer: 'بوکو', solution: 'buku = بوکو.' },
      { kind: 'sambung', prompt: 'Bina perkataan mengikut gambar.', speak: 'kuda', image: '🐴', rumiMeaning: 'kuda', pieces: ['ک', 'و', 'د', 'ا'], answer: 'کودا', solution: 'kuda = کودا.' },
      { kind: 'sambung', prompt: 'Bina perkataan mengikut gambar.', speak: 'baju', image: '👕', rumiMeaning: 'baju', pieces: ['ب', 'ا', 'ج', 'و'], answer: 'باجو', solution: 'baju = باجو.' },
      { kind: 'sambung', prompt: 'Bina perkataan mengikut gambar.', speak: 'mata', image: '👁️', rumiMeaning: 'mata', pieces: ['م', 'ا', 'ت', 'ا'], answer: 'ماتا', solution: 'mata = ماتا.' },
      { kind: 'sambung', prompt: 'Susun suku kata mengikut gambar.', speak: 'kuda', image: '🐴', rumiMeaning: 'kuda', pieces: ['کو', 'دا'], answer: 'کودا', solution: 'کو + دا = کودا.' },
      { kind: 'sambung', prompt: 'Susun suku kata mengikut gambar.', speak: 'bola', image: '⚽', rumiMeaning: 'bola', pieces: ['بو', 'لا'], answer: 'بولا', solution: 'بو + لا = بولا.' },
      { kind: 'sambung', prompt: 'Susun suku kata mengikut gambar.', speak: 'roti', image: '🍞', rumiMeaning: 'roti', pieces: ['رو', 'تي'], answer: 'روتي', solution: 'رو + تي = روتي.' },
      { kind: 'pilih', prompt: 'Pilih perkataan untuk gambar ini.', speak: 'buku', image: '📚', choices: ['بوکو', 'کودا', 'باجو', 'بولا'], answer: 'بوکو', solution: 'Ini buku = بوکو.' },
      { kind: 'pilih', prompt: 'Pilih perkataan untuk gambar ini.', speak: 'kuda', image: '🐴', choices: ['کودا', 'لمبو', 'ماتا', 'باتو'], answer: 'کودا', solution: 'Ini kuda = کودا.' },
      { kind: 'pilih', prompt: 'Pilih perkataan untuk gambar ini.', speak: 'baju', image: '👕', choices: ['باجو', 'بولا', 'روتي', 'سوسو'], answer: 'باجو', solution: 'Ini baju = باجو.' },
      { kind: 'pilih', prompt: 'Pilih perkataan untuk gambar ini.', speak: 'susu', image: '🥛', choices: ['سوسو', 'ساتو', 'سوکا', 'سيسي'], answer: 'سوسو', solution: 'Ini susu = سوسو.' },
      { kind: 'pilih', prompt: 'Pilih perkataan untuk gambar ini.', speak: 'gigi', image: '🦷', choices: ['ݢيݢي', 'کاکي', 'دادو', 'لمبو'], answer: 'ݢيݢي', solution: 'Ini gigi = ݢيݢي.' },
      { kind: 'pilih', prompt: 'Pilih perkataan untuk gambar ini.', speak: 'lembu', image: '🐮', choices: ['لمبو', 'کودا', 'باتو', 'بولا'], answer: 'لمبو', solution: 'Ini lembu = لمبو.' },
      { kind: 'sambung', prompt: 'Bina perkataan mengikut gambar.', speak: 'batu', image: '🪨', rumiMeaning: 'batu', pieces: ['ب', 'ا', 'ت', 'و'], answer: 'باتو', solution: 'batu = باتو.' },
    ],
  },
]

export function getJawiUnit(level: number): JawiUnit | undefined {
  return JAWI_UNITS.find((u) => u.level === level)
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
export function generateJawiQuiz(level: number, count: number): JawiQuestion[] {
  const unit = getJawiUnit(level)
  if (!unit) return []
  const picked = shuffle(unit.questions).slice(0, Math.min(count, unit.questions.length))
  return picked.map((q) => {
    if (q.kind === 'padan' || q.kind === 'dengar' || q.kind === 'pilih') {
      return { ...q, choices: shuffle(q.choices) }
    }
    return q
  })
}
