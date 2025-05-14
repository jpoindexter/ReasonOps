import type { NextMiddleware } from 'next/server';
export const middleware: NextMiddleware = () => {
  return new Response(null, { status: 204 });
};
