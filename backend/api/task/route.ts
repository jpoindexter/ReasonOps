import { NextRequest } from "next/server";
import { taskFormSchema } from "@frontend/schemas/taskForm";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = taskFormSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert([parsed.data])
    .select("id")
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ taskId: data.id }), { status: 200 });
}
