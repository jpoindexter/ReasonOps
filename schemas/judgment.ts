import { z } from 'zod';

export const JudgmentSchema = z.object({
  step: z.string(),
  score: z.enum(['clear', 'unclear', 'contradictory']),
  comment: z.string().optional(),
});

export type Judgment = z.infer<typeof JudgmentSchema>;
