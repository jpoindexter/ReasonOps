"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { taskFormSchema } from "@frontend/schemas/task/form";
import type { TaskFormInput } from "@frontend/schemas/task/form";

export default function TaskFormPage(): JSX.Element {
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
  } = useForm<TaskFormInput>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: { title: "", prompt: "", version: "1.0.0", metadata: {} },
  });

  const onSubmit: SubmitHandler<TaskFormInput> = async (data) => {
    const res = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = (await res.json()) as { taskId: string };
    setSubmittedId(result.taskId);
  };

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <input placeholder="Title" {...register("title")} />
      <input placeholder="Prompt" {...register("prompt")} />
      <input placeholder="Version" {...register("version")} />
      <button type="submit">Submit</button>
      {submittedId && <p>Task created: {submittedId}</p>}
    </form>
  );
}
