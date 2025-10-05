// config/db.js — Supabase client
import { createClient } from '@supabase/supabase-js';

// Live binding for the Supabase client; initialized by connectDB()
export let supabase = null;

const clean = (v) => (typeof v === 'string' ? v.trim().replace(/^"|"$/g, '') : v);

// Keep exported names so server.js doesn't need changes.
export const connectDB = async () => {
  const url = clean(process.env.SUPABASE_URL);
  // Use service role key only on the server
  const key = clean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!url || !key) {
    console.warn('⚠️  SUPABASE_URL or SUPABASE_* key not provided — Supabase disabled.');
    return;
  }

  try {
    supabase = createClient(url, key);
    console.log('✅ Supabase client initialized');
  } catch (e) {
    console.error('❌ Failed to initialize Supabase client:', e?.message || e);
  }
};

export const dbHealth = () => {
  return { status: supabase ? 'Ready' : 'NotConfigured' };
};
