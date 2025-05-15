import type { schema } from './schema';

export type FormValues = z.infer<typeof schema>;

export const defaultValues: Partial<FormValues> = {
  // TODO: fill in defaults
};
