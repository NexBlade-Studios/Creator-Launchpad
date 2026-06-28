Deno.serve(async (req) => {
  const { prompt } = await req.json();

  const apiKey = Deno.env.get("GEMINI_API_KEY");

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Missing GEMINI_API_KEY" }),
      { status: 500 }
    );
  }

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-image:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parts = data?.candidates?.[0]?.content?.parts ?? [];

  const imagePart = parts.find((p: any) => p.inlineData);

  if (!imagePart?.inlineData) {
    return new Response(
      JSON.stringify({
        error: "No image returned",
        debug: data,
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      imageBase64: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
});