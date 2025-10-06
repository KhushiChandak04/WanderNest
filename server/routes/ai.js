import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET /api/ai/health
router.get("/health", (req, res) => {
  const provider = (process.env.AI_PROVIDER || 'groq').toLowerCase();
  const groq = {
    apiKeyPresent: Boolean(process.env.GROQ_API_KEY || process.env.GROQ_API_KEY_FILE || process.env.GROQ_TOKEN),
    model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
  };
  const xai = {
    apiKeyPresent: Boolean(process.env.XAI_API_KEY || process.env.GROK_API_KEY),
    model: process.env.XAI_MODEL || 'grok-2-latest'
  };
  const ollama = {
    baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    model: process.env.OLLAMA_MODEL || 'llama3.1'
  };
  res.json({ ok: true, provider, groq, xai, ollama });
});

// POST /api/ai/chat
router.post("/chat", protect, async (req, res) => {
  try {
    const provider = (process.env.AI_PROVIDER || 'groq').toLowerCase();
    const { messages = [], trip } = req.body || {};
    // If explicitly in demo mode or demo fallback is requested, short-circuit
    if (provider === 'demo' || String(process.env.AI_DEMO_FALLBACK).toLowerCase() === 'true') {
      const content = buildFallbackReply(messages, trip);
      return res.json({ choices: [{ message: { content } }], meta: { provider: 'demo', demo: true } });
    }

    const systemPrompt = [
      { role: 'system', content: "You are WanderNest's expert Indian travel planner. Create concise, actionable travel answers and itineraries. Always use INR for costs and show practical visa notes (not legal advice). Be specific with neighborhoods/areas." },
      { role: 'system', content: `Trip context (Indian national): ${JSON.stringify(trip || {}, null, 2)}\nIf destination missing, ask for it. Prefer family-friendly and dietary constraints from notes.` }
    ];

    if (provider === 'ollama') {
      const resp = await callOllama([...systemPrompt, ...messages]);
      return res.json(resp);
    }
    if (provider === 'groq') {
      try {
        const resp = await callGroq([...systemPrompt, ...messages]);
        return res.json(resp);
      } catch (e) {
        const status = e?.status || e?.responseStatus;
        if (status === 401 || status === 403) {
          try {
            const fallback = await callOllama([...systemPrompt, ...messages]);
            return res.json({ ...fallback, meta: { provider: 'ollama', fallbackFrom: 'groq' } });
          } catch (e2) {
            // As a last resort, return a demo reply rather than an error
            const content = buildFallbackReply(messages, trip);
            return res.json({ choices: [{ message: { content } }], meta: { provider: 'demo', demo: true, error: toErr(e), fallbackError: toErr(e2) } });
          }
        }
        throw e;
      }
    }
    // default to x.ai if explicitly configured
    try {
      const resp = await callXAI([...systemPrompt, ...messages]);
      return res.json(resp);
    } catch (e) {
      const status = e?.status || e?.responseStatus;
      if (status === 401 || status === 403) {
        try {
          const fallback = await callOllama([...systemPrompt, ...messages]);
          return res.json({ ...fallback, meta: { provider: 'ollama', fallbackFrom: 'xai' } });
        } catch (e2) {
          // As a last resort, return a demo reply rather than an error
          const content = buildFallbackReply(messages, trip);
          return res.json({ choices: [{ message: { content } }], meta: { provider: 'demo', demo: true, error: toErr(e), fallbackError: toErr(e2) } });
        }
      }
      throw e;
    }
  } catch (err) {
    console.error("/api/ai/chat error", err);
    // Return a demo/fallback reply instead of failing hard
    try {
      const { messages = [], trip } = req.body || {};
      const content = buildFallbackReply(messages, trip);
      return res.json({ choices: [{ message: { content } }], meta: { demo: true, provider: 'demo', error: String(err?.message || err) } });
    } catch (e2) {
      return res.status(500).json({ error: "Unhandled server error", details: String(err?.message || err) });
    }
  }
});

function buildFallbackReply(messages = [], trip = {}) {
  const lastUser = [...messages].reverse().find(m => m?.role === 'user')?.content || 'Plan my trip';
  const t = trip || {};
  const dest = t.destination || 'your destination';
  const start = t.startDate || 'Not set';
  const end = t.endDate || 'Not set';
  const budget = typeof t.budgetINR === 'number' ? `₹${Number(t.budgetINR).toLocaleString('en-IN')}` : 'N/A';
  const notes = t.notes ? `Notes: ${t.notes}` : '';
  return [
    `Demo itinerary for ${dest} (${start} - ${end})`,
    `${notes}`,
    `Budget: ${budget} (INR)`,
    '',
    'Day 1: Arrival, local orientation walk, dinner at a popular spot',
    'Day 2: Major sights and a neighborhood food crawl',
    'Day 3: Museums/landmarks + evening show',
    'Day 4: Day trip / hidden gems',
    'Day 5: Shopping + departure',
    '',
    'Food: Add vegetarian/halal-friendly places near main attractions.',
    'Transport: Use metro/bus passes where available.',
    'Visa tips: Keep insurance, funds proof, and bookings handy (Schengen: €30,000 coverage).',
    '',
    `Request: "${lastUser}"`
  ].filter(Boolean).join('\n');
}

function toErr(e) {
  try { return typeof e === 'string' ? e : (e?.message || JSON.stringify(e)); } catch { return 'unknown'; }
}

async function callXAI(messages) {
  const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
  if (!apiKey) {
    const err = new Error('Missing XAI_API_KEY');
    err.status = 401;
    throw err;
  }
  const model = process.env.XAI_MODEL || 'grok-2-latest';
  const payload = {
    model,
    stream: false,
    temperature: 0.4,
    messages
  };
  const resp = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) {
    const details = await safeRead(resp);
    const err = new Error('x.ai upstream error');
    err.status = resp.status;
    err.details = details;
    throw err;
  }
  const data = await resp.json();
  return { ...data, meta: { provider: 'xai', model } };
}

async function callOllama(messages) {
  const base = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'llama3.1';
  // Ollama chat API
  const payload = { model, messages, stream: false, options: { temperature: 0.4 } };
  const url = `${base.replace(/\/$/, '')}/api/chat`;
  const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (!resp.ok) {
    const details = await safeRead(resp);
    const err = new Error('ollama error');
    err.status = resp.status;
    err.details = details;
    throw err;
  }
  const data = await resp.json();
  // Normalize to OpenAI-like shape
  // Ollama returns { message: { role, content }, ... }
  const content = data?.message?.content || '';
  return { choices: [{ message: { content } }], meta: { provider: 'ollama', model } };
}

async function safeRead(resp) {
  try { return await resp.json(); } catch { try { return await resp.text(); } catch { return null; } }
}

async function callGroq(messages) {
  let apiKey = process.env.GROQ_API_KEY || process.env.GROQ_TOKEN;
  // Optional: support docker/k8s style mounted secrets GROQ_API_KEY_FILE
  if (!apiKey && process.env.GROQ_API_KEY_FILE) {
    try {
      const fs = await import('fs');
      apiKey = fs.readFileSync(process.env.GROQ_API_KEY_FILE, 'utf8').trim();
    } catch {}
  }
  if (!apiKey) {
    const err = new Error('Missing GROQ_API_KEY');
    err.status = 401;
    throw err;
  }
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const payload = {
    model,
    stream: false,
    temperature: 0.4,
    messages
  };
  const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) {
    const details = await safeRead(resp);
    const err = new Error('groq upstream error');
    err.status = resp.status;
    err.details = details;
    throw err;
  }
  const data = await resp.json();
  return { ...data, meta: { provider: 'groq', model } };
}

export default router;
