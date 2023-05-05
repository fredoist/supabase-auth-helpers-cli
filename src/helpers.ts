import { Session } from '@supabase/supabase-js'
import { resolve } from 'node:path'
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs'
import { homedir } from 'node:os'

const sessionDir = resolve(homedir(), '.supabase-auth-helpers-cli')
const sessionPath = resolve(sessionDir, 'session.json')

export function saveSession(session: Session) {
  if (!existsSync(sessionDir)) {
    mkdirSync(sessionDir)
  }
  writeFileSync(sessionPath, JSON.stringify(session))
}

export function getSession(): Session | null {
  if (!existsSync(sessionPath)) {
    return null
  }
  const session = readFileSync(sessionPath, { encoding: 'utf-8' })
  return JSON.parse(session) as Session
}

export function deleteSession() {
  if (existsSync(sessionPath)) {
    writeFileSync(sessionPath, '')
  }
}
