import { z } from 'zod';

export const CompletionSchema = z.object({
  taskId: z.string(),
  content: z.string(),
  steps: z.array(z.string()),
});

export type Completion = z.infer<typeof CompletionSchema>;
