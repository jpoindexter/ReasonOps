"use client";

import { useState } from "react";
import { Button } from "@frontend/components/ui/button";
import { Input } from "@frontend/components/ui/input";
import { Textarea } from "@frontend/components/ui/textarea";
import { Label } from "@frontend/components/ui/label";
import { Slider } from "@frontend/components/ui/slider";

type Step = {
  stepId: string;
  index: number;
  text: string;
};

type Score = "clear" | "unclear" | "contradictory";

type Props = {
  step: Step;
  rubricVersion: string;
  onSubmit: (payload: {
    stepId: string;
    score: Score;
    comment: string;
    confidence: number;
    rubricVersion: string;
  }) => void;
};

export function StepScoringPanel({ step, rubricVersion, onSubmit }: Props) {
  const [score, setScore] = useState<Score | null>(null);
  const [comment, setComment] = useState("");
  const [confidence, setConfidence] = useState(5);

  const handleSubmit = () => {
    if (!score) return;
    onSubmit({
      stepId: step.stepId,
      score,
      comment,
      confidence,
      rubricVersion,
    });
  };

  return (
    <div className="p-4 border rounded space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-gray-700">
          Step {step.index + 1}
        </h2>
        <p className="mt-1 text-gray-900">{step.text}</p>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-gray-800 mb-2">
          Select a score
        </legend>
        <div className="flex gap-2">
          {["clear", "unclear", "contradictory"].map((value) => (
            <Button
              key={value}
              type="button"
              variant={score === value ? "default" : "secondary"}
              onClick={() => setScore(value as Score)}
              aria-pressed={score === value}
            >
              {value}
            </Button>
          ))}
        </div>
      </fieldset>

      <div>
        <Label htmlFor={`comment-${step.stepId}`}>Comment</Label>
        <Textarea
          id={`comment-${step.stepId}`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Optional comment about this step..."
        />
      </div>

      <div>
        <Label htmlFor={`confidence-${step.stepId}`}>
          Confidence: {confidence}
        </Label>
        <Slider
          id={`confidence-${step.stepId}`}
          min={1}
          max={10}
          step={1}
          value={[confidence]}
          onValueChange={([val]) => setConfidence(val)}
        />
      </div>

      <div>
        <Button onClick={handleSubmit} disabled={!score}>
          Submit
        </Button>
      </div>
    </div>
  );
}
