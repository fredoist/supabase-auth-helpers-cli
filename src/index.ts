import {
  createClient,
  Session,
  SupabaseClientOptions,
} from '@supabase/supabase-js';
import { deleteSession, getSession, saveSession } from './helpers';

export function createCLISupabaseClient(
  supabaseUrl: string,
  supabaseKey: string,
  options?: SupabaseClientOptions<'public'> | undefined
) {
  const key = supabaseUrl.split('//')[1].split('.')[0];
  let currentSession = getSession(key) ?? null;

  return createClient(supabaseUrl, supabaseKey, {
    ...options,
    auth: {
      detectSessionInUrl: false,
      autoRefreshToken: false,
      storage: {
        getItem() {
          return JSON.stringify(currentSession);
        },
        setItem(_, value: string) {
          const session: Session = JSON.parse(value);
          currentSession = session;
          saveSession(session, key);
        },
        removeItem() {
          if (!currentSession) return;
          currentSession = null;
          deleteSession(key);
        },
      },
    },
  });
}
