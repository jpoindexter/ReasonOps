"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskFormSchema, TaskFormInput } from "@frontend/schemas/taskForm";
import { Input } from "@frontend/components/ui/Input";
import { Button } from "@frontend/components/ui/Button";

export default function TaskFormPage() {
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormInput>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: { title: "", prompt: "", version: "1.0.0" },
  });

  const onSubmit = async (data: TaskFormInput) => {
    const res = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setSubmittedId(result.taskId);
  };

  return (
    <div className="max-w-xl p-8 space-y-4">
      <h1 className="text-xl font-bold">Create Task</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Task Title
          </label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Task title"
            aria-invalid={!!errors.title}
          />
          {errors.title && (
            <p className="text-red-600 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="prompt" className="block text-sm font-medium">
            Prompt to Evaluate
          </label>
          <Input
            id="prompt"
            {...register("prompt")}
            placeholder="Prompt to evaluate"
            aria-invalid={!!errors.prompt}
          />
          {errors.prompt && (
            <p className="text-red-600 text-sm">{errors.prompt.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="version" className="block text-sm font-medium">
            Version
          </label>
          <Input id="version" {...register("version")} />
        </div>

        <Button type="submit" aria-label="Submit Task Form">
          Submit
        </Button>
      </form>

      {submittedId && (
        <p className="text-sm text-green-700">Created task ID: {submittedId}</p>
      )}
    </div>
  );
}
