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
    if (!apiKey) {
      return res.status(500).json({ error: "Missing XAI_API_KEY in server environment." });
    }

    const { messages = [], trip } = req.body || {};

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
      return res.status(resp.status).json({ error: "Upstream error", details });
    }

    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error("/api/ai/chat error", err);
    res.status(500).json({ error: "AI proxy failed" });
  }
});

export default router;
