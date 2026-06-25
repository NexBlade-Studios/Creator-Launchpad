Deno.serve(async (req) => {
  const { category } = await req.json();

  const apiKey = Deno.env.get("GEMINI_API_KEY");

  const prompt = `Generate 10 viral YouTube video ideas for: ${category}.
  Return only short titles.
  `;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt}],
          },
        ],
      }),
    }
  )

  const data = await res.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  return new Response(
    JSON.stringify({ ideas: text}),
    {
      headers: { "Content-Type": "application/json"},
    }
  )

});

