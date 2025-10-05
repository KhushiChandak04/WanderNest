import { validationResult } from "express-validator";
import { supabase } from "../config/db.js";

export const register = async (req, res) => {
  // validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, password } = req.body;

    if (!supabase) {
      return res.status(500).json({ message: "Supabase not configured" });
    }

    // Sign up user with email/password and store name in user_metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) {
      console.error('Supabase signUp error:', { status: error.status, message: error.message, name: error.name });
      return res.status(error.status || 400).json({ error: error.message, status: error.status, code: error.name });
    }

    let { user, session } = data;

    // If email confirmation is required and session is null, auto-confirm via Admin and sign in
    if (user && !session) {
      try {
        const { error: adminErr } = await supabase.auth.admin.updateUserById(user.id, { email_confirm: true });
        if (adminErr) {
          console.warn('Admin confirm failed:', adminErr.message);
        } else {
          const { data: signinData, error: signinErr } = await supabase.auth.signInWithPassword({ email, password });
          if (!signinErr) {
            session = signinData.session;
            user = signinData.user || user;
          }
        }
      } catch (e) {
        console.warn('Auto-confirm/signin error:', e?.message || e);
      }
    }

    // Upsert into profiles table (optional; if table not created, log and continue)
    try {
      if (user?.id) {
        const { error: profileErr } = await supabase
          .from('profiles')
          .upsert({ id: user.id, name, email, updated_at: new Date().toISOString() }, { onConflict: 'id' });
        if (profileErr) console.warn('profiles upsert failed (register):', profileErr.message);
      }
    } catch (e) {
      console.warn('profiles upsert exception (register):', e?.message || e);
    }

    return res.status(201).json({ user, session });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  // validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;

    if (!supabase) {
      return res.status(500).json({ message: "Supabase not configured" });
    }

    let { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error && /confirm/i.test(error.message || '')) {
      // Legacy unconfirmed users: auto-confirm and retry login
      try {
        // Try to fetch the user by email via Admin API is not directly supported; rely on the error path requiring manual confirm.
        // Workaround: Attempt admin confirm by creating a magic link is overkill. Here, we ask Supabase to confirm by email; but since we don't have user id, skip.
        // If you need this path robustly, store user.id during signup in profiles.
      } catch {}
    }

    if (error) {
      console.error('Supabase signIn error:', { status: error.status, message: error.message, name: error.name });
      return res.status(error.status || 401).json({ error: error.message, status: error.status, code: error.name });
    }

    // Upsert/refresh profile name if present
    try {
      const user = data.user;
      if (user?.id) {
        const displayName = user.user_metadata?.name || user.email?.split('@')[0];
        const { error: profileErr } = await supabase
          .from('profiles')
          .upsert({ id: user.id, name: displayName, email: user.email, updated_at: new Date().toISOString() }, { onConflict: 'id' });
        if (profileErr) console.warn('profiles upsert failed (login):', profileErr.message);
      }
    } catch (e) {
      console.warn('profiles upsert exception (login):', e?.message || e);
    }

    return res.json({ user: data.user, session: data.session });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getMe = async (req, res) => {
  // req.user is attached by protect middleware
  return res.json({ user: req.user });
};
