import { Session } from '@supabase/supabase-js';
import { resolve } from 'node:path';
import {
  writeFileSync,
  readFileSync,
  existsSync,
  mkdirSync,
  unlinkSync,
} from 'node:fs';
import { homedir } from 'node:os';

const sessionDir = resolve(homedir(), '.supabase-auth-helpers-cli');

export function saveSession(session: Session, key: string) {
  const sessionPath = resolve(sessionDir, `${key}.json`);
  if (!existsSync(sessionDir)) {
    mkdirSync(sessionDir);
  }
  writeFileSync(sessionPath, JSON.stringify(session));
}

export function getSession(key: string): Session | null {
  const sessionPath = resolve(sessionDir, `${key}.json`);
  if (!existsSync(sessionPath)) {
    return null;
  }
  const session = readFileSync(sessionPath, { encoding: 'utf-8' });
  return JSON.parse(session) as Session;
}

export function deleteSession(key: string) {
  const sessionPath = resolve(sessionDir, `${key}.json`);
  if (existsSync(sessionPath)) {
    unlinkSync(sessionPath);
  }
}
