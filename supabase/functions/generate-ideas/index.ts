Deno.serve(async (req) => {
  const { category } = await req.json();

  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Missing GEMINI_API_KEY" }),
      { status: 500 }
    );
  }

  const prompt = `Generate 5 viral YouTube video ideas for: ${category}.
  Return only short titles.
  `;

  const model = "gemini-2.5-flash-lite";

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
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
    JSON.stringify({ ideas: text }),
    {
      headers: { "Content-Type": "application/json"}
    }
  );
});

