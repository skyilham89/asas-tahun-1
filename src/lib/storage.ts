import type { Profile } from '../types'

const KEY = 'matematik-t1:profiles'
const ACTIVE_KEY = 'matematik-t1:active'

export function loadProfiles(): Profile[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Profile[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveProfiles(profiles: Profile[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(profiles))
  } catch {
    // Local Storage penuh / dihalang — abaikan dengan senyap.
  }
}

export function getActiveName(): string | null {
  return localStorage.getItem(ACTIVE_KEY)
}

export function setActiveName(name: string | null): void {
  if (name) localStorage.setItem(ACTIVE_KEY, name)
  else localStorage.removeItem(ACTIVE_KEY)
}

export function createProfile(name: string, avatar: string): Profile {
  return { name, avatar, stars: 0, badges: [], progress: {} }
}
