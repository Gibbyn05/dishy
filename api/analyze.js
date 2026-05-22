export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Ikke konfigurert' });

  const { base64, mime } = req.body || {};
  if (!base64 || !mime) return res.status(400).json({ error: 'Mangler bildedata' });

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 150,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mime, data: base64 } },
            { type: 'text', text: `Du er en streng matfoto-kvalitetssjekker for en eksklusiv restaurant-app. Analyser bildet nøye.

GODKJENNINGSKRAV – ALLE må oppfylles:
1. Mat er tydelig hovedmotivet og godt synlig
2. Bildet er skarpt og ikke uskarp/blurry
3. Ingen fingre, hender eller fremmede objekter dekker maten
4. God nok belysning til å se maten tydelig
5. Bildet ser appetittvekkende og presentabelt ut

Svar KUN med gyldig JSON – ingenting annet:
{"godkjent": true/false, "grunn": "maks 10 ord på norsk"}` }
          ]
        }]
      })
    });

    if (!upstream.ok) {
      const err = await upstream.json().catch(() => ({}));
      if (upstream.status === 429) return res.status(429).json({ error: 'For mange forespørsler' });
      return res.status(502).json({ error: err.error?.message || 'Upstream-feil' });
    }

    const data = await upstream.json();
    const text = (data.content?.[0]?.text || '').trim();
    const match = text.match(/\{[\s\S]*?\}/);
    if (!match) return res.status(502).json({ error: 'Ugyldig svar fra AI' });

    return res.status(200).json(JSON.parse(match[0]));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
