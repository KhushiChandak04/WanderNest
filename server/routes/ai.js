import express from "express";

const router = express.Router();

// GET /api/ai/health
router.get("/health", (req, res) => {
  const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
  res.json({ ok: true, hasKey: Boolean(apiKey) });
});

// POST /api/ai/chat
router.post("/chat", async (req, res) => {
  try {
    const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
    const demo = process.env.AI_DEMO_FALLBACK === 'true';
    const { messages = [], trip } = req.body || {};

    // If demo mode is enabled, allow responses even without an API key
    if (!apiKey && demo) {
      const fallback = buildFallbackReply(messages, trip);
      return res.json({ choices: [{ message: { content: fallback } }] });
    }
    if (!apiKey) {
      return res.status(500).json({ error: "Missing XAI_API_KEY in server environment." });
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

    const payload = {
      model: "grok-4-latest",
      stream: false,
      temperature: 0.4,
      messages: [...systemPrompt, ...messages]
    };

    const resp = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
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
      if (process.env.AI_DEMO_FALLBACK === 'true') {
        const fallback = buildFallbackReply(messages, trip);
        return res.json({ choices: [{ message: { content: fallback } }] });
      }
      return res.status(resp.status).json({ error: "Upstream error", details });
    }

    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error("/api/ai/chat error", err);
    if (process.env.AI_DEMO_FALLBACK === 'true') {
      const { messages = [], trip } = req.body || {};
      const fallback = buildFallbackReply(messages, trip);
      return res.json({ choices: [{ message: { content: fallback } }] });
    }
    res.status(500).json({ error: "AI proxy failed" });
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
