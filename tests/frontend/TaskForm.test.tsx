import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskFormPage from "@frontend/app/task/page";

describe("TaskFormPage", () => {
  it("renders all form fields", () => {
    render(<TaskFormPage />);
    expect(screen.getByPlaceholderText("Task title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Prompt to evaluate")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("1.0.0")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("validates form input and submits successfully", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ taskId: "abc123" }),
      })
    ) as unknown as typeof fetch;

    render(<TaskFormPage />);

    fireEvent.change(screen.getByPlaceholderText("Task title"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Prompt to evaluate"), {
      target: { value: "What is the capital of France?" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/created task id:/i)).toBeInTheDocument();
    });
  });
});
