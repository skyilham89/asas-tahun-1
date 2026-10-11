#!/usr/bin/env python3
"""Jana klip audio MP3 untuk setiap teks sebutan (`speak:`) dalam app.

PERCUMA — guna Google Translate TTS melalui pakej `gTTS` (tiada kunci API /
akaun diperlukan). Dijalankan SEKALI untuk menghasilkan fail audio statik yang
dibundel dengan app. Pada masa larian, app memainkan klip ini jika ada; jika
tiada (cth soalan matematik dinamik), ia jatuh balik ke TTS peranti.

Guna:  python3 scripts/generate-tts.py
Pasang:  python3 -m pip install gTTS

Sifat idempoten: nama fail ialah hash teks, jadi larian semula hanya menjana
klip baharu dan melangkau yang sedia ada.
"""
import os
import re
import json
import time
import hashlib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")
OUT_DIR = os.path.join(ROOT, "public", "tts")
MANIFEST = os.path.join(ROOT, "src", "data", "ttsManifest.json")
LANG = "ms"  # Bahasa Melayu

# Padan: speak: '....'  (rentetan petik tunggal; benarkan apostrof terpelepas)
SPEAK_RE = re.compile(r"speak:\s*'((?:[^'\\]|\\.)*)'")


PHRASES_JSON = os.path.join(ROOT, "scripts", "phrases.json")


def collect_phrases():
    # Utamakan senarai yang dijana daripada DATA SEBENAR (scripts/collect-phrases.mjs).
    # Ini menyeluruh (semua modul + ayat gabungan) berbanding imbasan regex.
    if os.path.exists(PHRASES_JSON):
        with open(PHRASES_JSON, encoding="utf-8") as fh:
            items = json.load(fh)
        return sorted({s.strip() for s in items if s and s.strip()})

    # Sandaran: imbas kod untuk `speak: '...'` jika senarai belum dijana.
    phrases = set()
    for root, _dirs, files in os.walk(SRC):
        for f in files:
            if not f.endswith((".ts", ".tsx")):
                continue
            text = open(os.path.join(root, f), encoding="utf-8").read()
            for raw in SPEAK_RE.findall(text):
                s = raw.replace("\\'", "'").replace('\\"', '"').strip()
                if s:
                    phrases.add(s)
    return sorted(phrases)


def clip_name(phrase):
    h = hashlib.md5(phrase.encode("utf-8")).hexdigest()[:12]
    return f"{h}.mp3"


def main():
    from gtts import gTTS

    os.makedirs(OUT_DIR, exist_ok=True)
    phrases = collect_phrases()
    print(f"Jumpa {len(phrases)} teks sebutan unik.")

    manifest = {}
    made, skipped, failed = 0, 0, 0
    for i, phrase in enumerate(phrases, 1):
        name = clip_name(phrase)
        path = os.path.join(OUT_DIR, name)
        manifest[phrase] = name
        if os.path.exists(path) and os.path.getsize(path) > 0:
            skipped += 1
            continue
        ok = False
        for attempt in range(3):
            try:
                gTTS(phrase, lang=LANG).save(path)
                ok = True
                break
            except Exception as e:  # noqa: BLE001
                if attempt == 2:
                    print(f"  GAGAL [{i}/{len(phrases)}] {phrase!r}: {e}")
                else:
                    time.sleep(2.0)  # mungkin dihadkan kadar — cuba lagi
        if ok:
            made += 1
            if made % 20 == 0:
                print(f"  ... {made} klip baharu dijana")
            time.sleep(0.35)  # elak hadkan kadar
        else:
            failed += 1
            del manifest[phrase]

    with open(MANIFEST, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=0, sort_keys=True)

    print(f"Siap: {made} baharu, {skipped} dilangkau, {failed} gagal.")
    print(f"Manifest: {MANIFEST} ({len(manifest)} catatan)")


if __name__ == "__main__":
    main()
