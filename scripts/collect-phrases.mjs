// Kumpul semua teks sebutan daripada DATA SEBENAR app (via esbuild) dan tulis
// ke scripts/phrases.json. Dijalankan sebelum generate-tts.py.
//
//   node scripts/collect-phrases.mjs
//
// Guna esbuild (sudah ada dalam node_modules) untuk transpile + bundle entri TS,
// jadi kita boleh import data .ts terus tanpa pelari TS tambahan.
import { build } from 'esbuild'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { writeFileSync, rmSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'

const here = dirname(fileURLToPath(import.meta.url))
const root = dirname(here)
const tmp = join(mkdtempSync(join(tmpdir(), 'phrases-')), 'entry.mjs')

await build({
  entryPoints: [join(here, '_collect-entry.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: tmp,
  logLevel: 'warning',
})

const { collectPhrases } = await import(pathToFileURL(tmp).href)
const { phrases, bandingCombos } = collectPhrases()

// Dedup (teks sama → satu klip). Simpan modul PERTAMA yang menemuinya.
const seen = new Map()
for (const p of phrases) if (!seen.has(p.text)) seen.set(p.text, p.module)

const unique = [...seen.entries()].map(([text, module]) => ({ text, module }))
unique.sort((a, b) => a.text.localeCompare(b.text))

// Ringkasan ikut modul
const byModule = {}
for (const { module } of unique) byModule[module] = (byModule[module] || 0) + 1

writeFileSync(join(here, 'phrases.json'), JSON.stringify(unique.map((u) => u.text), null, 0) + '\n')

console.log(`Jumlah teks unik: ${unique.length}`)
for (const [m, n] of Object.entries(byModule).sort()) console.log(`  ${m}: ${n}`)
console.log(`(Matematik "banding" ayat penuh dilangkau: ~${bandingCombos.toLocaleString()} kombinasi)`)

rmSync(dirname(tmp), { recursive: true, force: true })
