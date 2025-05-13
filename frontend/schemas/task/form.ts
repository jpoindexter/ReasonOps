import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(3).max(100),
  prompt: z.string().min(10),
  version: z.string().default("1.0.0"),
  metadata: z.record(z.string()).optional(),
});

export type TaskFormInput = z.infer<typeof taskFormSchema>;
