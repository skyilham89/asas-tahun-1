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
    <div className="flex min-h-full flex-col gap-6 bg-[color:var(--color-duo-snow)] p-6">
      <div className="flex items-center gap-3">
        <BackButton onClick={onBack} />
        <h2 className="flex-1 text-2xl font-extrabold text-slate-700 sm:text-3xl">Siapa main hari ini?</h2>
        {!creating && profiles.length > 0 && (
          <button
            onClick={() => {
              playTap()
              setEditing((e) => !e)
            }}
            className={`duo-btn px-5 py-2.5 text-base ${editing ? 'duo-green' : 'duo-white'}`}
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
                  className="duo-card flex w-full flex-col items-center gap-2 p-5 transition active:translate-y-1 disabled:active:translate-y-0"
                >
                  <span className={`text-5xl sm:text-6xl ${editing ? 'animate-wiggle' : ''}`}>{p.avatar}</span>
                  <span className="w-full break-words text-center text-lg font-bold leading-tight text-slate-700">{p.name}</span>
                  <span className="text-sm font-extrabold text-[color:var(--color-duo-orange)]">⭐ {p.stars}</span>
                </button>
                {editing && (
                  <button
                    onClick={() => {
                      playTap()
                      setConfirmName(p.name)
                    }}
                    aria-label={`Padam ${p.name}`}
                    className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-duo-red)] text-xl text-white shadow-lg ring-4 ring-white transition active:scale-90"
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
                className="flex flex-col items-center justify-center gap-2 rounded-[1.25rem] border-2 border-dashed border-[color:var(--color-duo-blue)] bg-sky-50 p-5 text-[color:var(--color-duo-blue)] transition active:scale-95"
              >
                <span className="text-5xl sm:text-6xl">➕</span>
                <span className="text-lg font-extrabold">Pemain Baru</span>
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
                className="duo-btn duo-white flex-1 py-3 text-lg"
              >
                Batal
              </button>
              <button onClick={() => handleDelete(confirmName)} className="duo-btn duo-red flex-1 py-3 text-lg">
                Padam
              </button>
            </div>
          </div>
        </div>
      )}

      {creating && (
        <div className="duo-card flex flex-col gap-5 p-6">
          <label className="text-lg font-bold text-slate-700">Nama penuh kamu:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="Tulis nama penuh di sini…"
            maxLength={40}
            autoFocus
            className="rounded-2xl border-2 border-[color:var(--color-duo-swan)] px-4 py-3 text-xl font-bold text-slate-700 outline-none focus:border-[color:var(--color-duo-blue)]"
          />

          <p className="text-lg font-bold text-slate-700">Pilih haiwan kamu:</p>
          <div className="grid grid-cols-6 gap-2">
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`rounded-2xl p-2 text-3xl transition active:scale-90 ${
                  avatar === a ? 'scale-110 bg-sky-100 ring-4 ring-[color:var(--color-duo-blue)]' : 'bg-slate-100'
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
                className="duo-btn duo-white flex-1 py-4 text-lg"
              >
                Kembali
              </button>
            )}
            <button onClick={handleCreate} disabled={!name.trim()} className="duo-btn duo-green flex-1 py-4 text-lg">
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
      className="duo-btn duo-white h-12 w-12 shrink-0 !rounded-full text-2xl"
    >
      ⬅️
    </button>
  )
}
