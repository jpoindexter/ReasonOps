type Props = { step: string };

export function StepScoringPanel({ step }: Props) {
  return (
    <div className="p-4 border rounded">
      <p className="mb-2">{step}</p>
      <div className="flex gap-2">
        <button>Clear</button>
        <button>Unclear</button>
        <button>Contradictory</button>
      </div>
    </div>
  );
}