import { supabase, connectDB } from "../config/db.js";

export const protect = async (req, res, next) => {
  let token;

  // Expect "Authorization: Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    if (!supabase) {
      // Lazy initialize if server startup is still warming
      try { await connectDB(); } catch {}
    }
    if (!supabase) {
      return res.status(503).json({ message: "Auth temporarily unavailable" });
    }

    // Validate the JWT via Supabase
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }

    // Attach a simplified user object similar to the previous shape
    const user = data.user;
    req.user = { id: user.id, name: user.user_metadata?.name, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
