import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  model: z.enum(['claude', 'gpt', 'ollama']),
  createdAt: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;