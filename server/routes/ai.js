import express from "express";

const router = express.Router();

// GET /api/ai/health
router.get("/health", (req, res) => {
  const groqKey = process.env.GROQ_API_KEY;
  const xaiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
  const provider = groqKey ? "groq" : (xaiKey ? "xai" : null);
  res.json({ ok: true, provider, hasKey: Boolean(groqKey || xaiKey) });
});

// POST /api/ai/chat
router.post("/chat", async (req, res) => {
  try {
    const groqKey = process.env.GROQ_API_KEY;
    const xaiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
    const provider = groqKey ? "groq" : (xaiKey ? "xai" : null);
    const demo = process.env.AI_DEMO_FALLBACK === 'true';
    const { messages = [], trip } = req.body || {};

    // If demo mode is enabled, allow responses even without an API key
    if (!provider && demo) {
      const fallback = buildFallbackReply(messages, trip);
      return res.json({ choices: [{ message: { content: fallback } }] });
    }
    if (!provider) {
      const fallback = buildFallbackReply(messages, trip);
      return res.json({ choices: [{ message: { content: fallback } }], meta: { demo: true, reason: "missing_api_key" } });
    }

    const systemPrompt = [
      {
        role: "system",
        content:
          "You are WanderNest's expert Indian travel planner. Create concise, actionable travel answers and itineraries. Always use INR for costs and show practical visa notes (not legal advice). Be specific with neighborhoods/areas."
      },
      {
        role: "system",
        content:
          `Trip context (Indian national): ${JSON.stringify(trip || {}, null, 2)}\nIf destination missing, ask for it. Prefer family-friendly and dietary constraints from notes.`
      }
    ];

    // Build payload compatible with OpenAI-style chat completions
    const model = provider === 'groq'
      ? (process.env.GROQ_MODEL || 'llama-3.1-70b-versatile')
      : (process.env.XAI_MODEL || 'grok-4-latest');
    const payload = {
      model,
      stream: false,
      temperature: 0.4,
      messages: [...systemPrompt, ...messages]
    };

    const endpoint = provider === 'groq'
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://api.x.ai/v1/chat/completions';
    const key = provider === 'groq' ? groqKey : xaiKey;

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      let details;
      try {
        details = await resp.json();
      } catch {
        details = await resp.text();
      }
      console.error("/api/ai/chat upstream error", resp.status, details);
      const fallback = buildFallbackReply(messages, trip);
      return res.json({ choices: [{ message: { content: fallback } }], meta: { demo: true, reason: "upstream_error", details } });
    }

    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error("/api/ai/chat error", err);
    const { messages = [], trip } = req.body || {};
    const fallback = buildFallbackReply(messages, trip);
    return res.json({ choices: [{ message: { content: fallback } }], meta: { demo: true, reason: "exception" } });
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

export default router;
