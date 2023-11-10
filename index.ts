import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: Bun.env.OPENAI_API_KEY,
});

const server = Bun.serve({
  port: 3000,
  async fetch(request) {
    const completions = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are AppSec Joke AI, upon given any message you will respond with a funny joke. \
        The joke should have a high chance of being tech related. Although any funny joke will do. \
        Remove any prose and keep the response short and simple." },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.9,
    });
    return new Response(completions.choices[0].message.content);
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
