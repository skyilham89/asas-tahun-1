import { useState } from 'react'
import type { Profile } from '../types'
import { createProfile } from '../lib/storage'
import { playTap } from '../lib/audio'

const AVATARS = ['🦁', '🐯', '🐶', '🐱', '🐵', '🐼', '🦊', '🐸', '🦄', '🐢', '🐥', '🐙']

export function ProfileScreen({
  profiles,
  onPick,
  onCreate,
  onDelete,
  onBack,
}: {
  profiles: Profile[]
  onPick: (name: string) => void
  onCreate: (p: Profile) => void
  onDelete: (name: string) => void
  onBack: () => void
}) {
  const [creating, setCreating] = useState(profiles.length === 0)
  const [editing, setEditing] = useState(false)
  const [confirmName, setConfirmName] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState(AVATARS[0])

  function handleCreate() {
    const trimmed = name.trim()
    if (!trimmed) return
    playTap()
    onCreate(createProfile(trimmed, avatar))
  }

  function handleDelete(target: string) {
    playTap()
    onDelete(target)
    setConfirmName(null)
    if (profiles.length <= 1) setEditing(false)
  }

  return (
    <div className="flex min-h-full flex-col gap-6 bg-gradient-to-b from-violet-200 to-pink-200 p-6">
      <div className="flex items-center gap-3">
        <BackButton onClick={onBack} />
        <h2 className="flex-1 text-2xl font-extrabold text-violet-800 sm:text-3xl">Siapa main hari ini?</h2>
        {!creating && profiles.length > 0 && (
          <button
            onClick={() => {
              playTap()
              setEditing((e) => !e)
            }}
            className={`rounded-full px-5 py-2.5 text-base font-extrabold shadow-md transition active:scale-95 ${
              editing ? 'bg-emerald-500 text-white' : 'bg-white text-violet-600'
            }`}
          >
            {editing ? '✅ Selesai' : '✏️ Urus'}
          </button>
        )}
      </div>

      {!creating && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {profiles.map((p) => (
              <div key={p.name} className="animate-pop-in relative">
                <button
                  onClick={() => {
                    playTap()
                    onPick(p.name)
                  }}
                  disabled={editing}
                  className="flex w-full flex-col items-center gap-2 rounded-3xl bg-white p-5 shadow-md transition active:scale-95 disabled:active:scale-100"
                >
                  <span className={`text-5xl sm:text-6xl ${editing ? 'animate-wiggle' : ''}`}>{p.avatar}</span>
                  <span className="text-lg font-bold text-slate-700">{p.name}</span>
                  <span className="text-sm font-semibold text-amber-500">⭐ {p.stars}</span>
                </button>
                {editing && (
                  <button
                    onClick={() => {
                      playTap()
                      setConfirmName(p.name)
                    }}
                    aria-label={`Padam ${p.name}`}
                    className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-xl text-white shadow-lg ring-4 ring-white transition active:scale-90"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
            {!editing && (
              <button
                onClick={() => {
                  playTap()
                  setCreating(true)
                }}
                className="flex flex-col items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-violet-400 bg-white/50 p-5 text-violet-600 transition active:scale-95"
              >
                <span className="text-5xl sm:text-6xl">➕</span>
                <span className="text-lg font-bold">Pemain Baru</span>
              </button>
            )}
          </div>
        </>
      )}

      {confirmName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="animate-pop-in flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white p-6 text-center shadow-2xl">
            <span className="text-5xl">🗑️</span>
            <h3 className="text-xl font-extrabold text-slate-800">Padam pemain "{confirmName}"?</h3>
            <p className="font-semibold text-slate-500">Semua bintang & lencana pemain ini akan hilang. Tindakan ini tidak boleh dibatalkan.</p>
            <div className="mt-2 flex w-full gap-3">
              <button
                onClick={() => {
                  playTap()
                  setConfirmName(null)
                }}
                className="flex-1 rounded-full bg-slate-200 py-3 text-lg font-bold text-slate-600 transition active:scale-95"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(confirmName)}
                className="flex-1 rounded-full bg-gradient-to-b from-rose-400 to-rose-500 py-3 text-lg font-extrabold text-white shadow-md transition active:scale-95"
              >
                Padam
              </button>
            </div>
          </div>
        </div>
      )}

      {creating && (
        <div className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-md">
          <label className="text-lg font-bold text-slate-700">Nama kamu:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="Tulis nama di sini…"
            maxLength={12}
            autoFocus
            className="rounded-2xl border-4 border-violet-300 px-4 py-3 text-xl font-bold text-slate-700 outline-none focus:border-violet-500"
          />

          <p className="text-lg font-bold text-slate-700">Pilih haiwan kamu:</p>
          <div className="grid grid-cols-6 gap-2">
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`rounded-2xl p-2 text-3xl transition active:scale-90 ${
                  avatar === a ? 'scale-110 bg-violet-200 ring-4 ring-violet-400' : 'bg-slate-100'
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            {profiles.length > 0 && (
              <button
                onClick={() => {
                  playTap()
                  setCreating(false)
                }}
                className="flex-1 rounded-full bg-slate-200 py-4 text-lg font-bold text-slate-600 transition active:scale-95"
              >
                Kembali
              </button>
            )}
            <button
              onClick={handleCreate}
              disabled={!name.trim()}
              className="flex-1 rounded-full bg-gradient-to-b from-emerald-400 to-green-500 py-4 text-lg font-extrabold text-white shadow-md transition active:scale-95 disabled:opacity-40"
            >
              Jom Main! 🎮
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={() => {
        playTap()
        onClick()
      }}
      aria-label="Kembali"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-2xl shadow-md transition active:scale-90"
    >
      ⬅️
    </button>
  )
}
