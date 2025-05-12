import { runLLM } from '@/lib/llmAdapter';

export async function POST(req: Request) {
  const { prompt, model } = await req.json();
  const response = await runLLM(model, prompt);
  return new Response(JSON.stringify({ response }));
}