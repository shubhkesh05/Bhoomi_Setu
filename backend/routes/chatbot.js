import express from 'express';
const router = express.Router();

// Simple rule-based chatbot — hardened against invalid request bodies
router.post('/', async (req, res) => {
  try {
    console.log('Chatbot request body:', req.body);

    // Safely obtain message as a string
    const rawMsg = req && req.body && req.body.message !== undefined ? req.body.message : '';
    const userMsg = String(rawMsg || '').toLowerCase();

    // Default rule-based answers
    let reply = "I didn't understand. Please try again.";

    const ruleAnswers = {
      land: "You can check your land record from the dashboard → Records section.",
      record: "You can check your land record from the dashboard → Records section.",
      demarcation: "To request demarcation, go to Dashboard → Demarcation Request form.",
      partition: "For partition services, choose Mutual/Family Partition from dashboard.",
      login: "If you face login issues, try resetting your password or contact admin.",
      otp: "If you face login issues, try resetting your password or contact admin.",
    };

    // If the input is empty, prompt the user
    if (userMsg.trim().length === 0) {
      return res.json({ response: "Please type a message so I can help." });
    }

    // Quick rule-based match first
    for (const key of Object.keys(ruleAnswers)) {
      if (userMsg.includes(key)) {
        reply = ruleAnswers[key];
        // continue to optionally enhance with AI below
        break;
      }
    }

    // If an OpenAI key is present, ask the model for a more helpful response
    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (OPENAI_KEY) {
      // Use fetch to call OpenAI REST API. Node 18+ has global fetch.
      try {
        const systemPrompt = `You are BhoomiSetu assistant. Provide concise, helpful answers about land records, demarcation, partition, dashboard navigation and site features. When appropriate, include step-by-step actions the user can take in the app. Keep answers polite and concise (<=150 words).`;

        const payload = {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: String(rawMsg) }
          ],
          max_tokens: 300,
          temperature: 0.2
        };

        const r = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_KEY}`
          },
          body: JSON.stringify(payload)
        });

        const jr = await r.json();
        if (jr && jr.choices && jr.choices[0] && jr.choices[0].message && jr.choices[0].message.content) {
          // Prefer AI answer
          reply = jr.choices[0].message.content.trim();
        } else {
          console.warn('OpenAI returned no usable text, falling back to rule answer', jr);
        }
      } catch (aiErr) {
        console.error('OpenAI call failed, using rule-based reply:', aiErr);
        // keep reply from rules
      }
    }

    return res.json({ response: reply });
  } catch (err) {
    console.error('Chatbot handler error:', err);
    return res.status(500).json({ response: "Server error" });
  }
});

export default router;
