import { z } from 'zod';

export const EvaluationStartedEvent = z.object({
  name: z.literal('evaluation_started'),
  properties: z.object({
    evaluation_id: z.string(),
    source: z.enum(['dashboard', 'deep_link']),
    user_id: z.string(),
  }),
});
