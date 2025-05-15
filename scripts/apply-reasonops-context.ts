// scripts/apply-reasonops-context.ts
import { promises as fs } from 'fs';
import path from 'path';

const baseDir = 'docs';
const targets: Record<string, string> = {
  'features/dashboard/index.md': `> 🧠 ReasonOps Context  \nThis dashboard is the central interface for evaluating AI reasoning quality in ReasonOps. It supports visibility, tagging, scoring, and decision workflows for step-by-step trace evaluation.\n\n`,
  'features/reviewer/index.md': `> 🧠 ReasonOps Context  \nReviewer tools in ReasonOps support the mission of judgment-first evaluation. These modules help users calibrate reasoning assessments, track consistency, and surface disagreements in logical interpretation.\n\n`,
  'features/scoring/index.md': `> 🧠 ReasonOps Context  \nScoring tools in ReasonOps enforce structured, transparent judgment of AI reasoning — not just correctness. Rubrics and scoring dimensions help capture logic quality, justification, and alignment.\n\n`,
  'features/rubric/index.md': `> 🧠 ReasonOps Context  \nReasonOps uses rubrics to standardize reasoning judgments across tasks and reviewers. This ensures each evaluation reflects clarity, coherence, and multi-step reasoning quality.\n\n`,
  'features/onboarding/index.md': `> 🧠 ReasonOps Context  \nOnboarding in ReasonOps is optimized for researchers and evaluators tasked with judging reasoning — helping them learn how to inspect AI traces, spot logic failures, and tag issues meaningfully.\n\n`,
  'schema/judgment/index.md': `> 🧠 ReasonOps Context  \nJudgments in ReasonOps are structured evaluations of reasoning quality, not just output correctness. They include tags, scores, and commentary about where logic succeeded or broke down.\n\n`,
  'schema/step/index.md': `> 🧠 ReasonOps Context  \nEach reasoning step in ReasonOps captures a discrete unit of logic in an AI trace. Steps are judged on their contribution to overall coherence, truth alignment, and justification.\n\n`,
  'schema/task/index.md': `> 🧠 ReasonOps Context  \nTasks in ReasonOps define reasoning objectives and expected logical boundaries. Evaluators assess how AI output aligns to these task definitions — step by step.\n\n`,
  'api/judgments/index.md': `> 🧠 ReasonOps Context  \nThis API exposes structured judgments tied to reasoning traces. Each judgment reflects clarity, validity, or failure of multi-step thought processes — not binary correctness.\n\n`,
  'api/steps/index.md': `> 🧠 ReasonOps Context  \nSteps represent AI reasoning units within a task trace. This API supports tagging, retrieval, and scoring of individual logical actions, enabling audit and debugging.\n\n`,
  'api/export/index.md': `> 🧠 ReasonOps Context  \nExporting in ReasonOps allows users to extract structured evaluations of reasoning — including logic tags, trace-level scores, and annotated metadata for retraining or analysis.\n\n`,
  'strategy/index.md': `> 🧠 ReasonOps Context  \nReasonOps is a judgment-first evaluation platform built to answer one question: did this AI reason well? Strategy here aligns all tooling to that mission.\n\n`,
  'architecture/index.md': `> 🧠 ReasonOps Context  \nEvery architectural choice in ReasonOps is shaped by a single goal: supporting reliable, traceable, step-wise judgment of AI reasoning. The platform is purpose-built for this task.\n\n`,
  'README.md': `> 🧠 ReasonOps Context  \nReasonOps is a platform for evaluating reasoning quality in AI — step-by-step. It helps users inspect, score, tag, and export logical traces to improve reliability.\n\n`,
};

async function applyContext(): Promise<void> {
  for (const [relativePath, context] of Object.entries(targets)) {
    const filePath = path.join(baseDir, relativePath);
    try {
      const content = await fs.readFile(filePath, 'utf8');
      if (content.includes('> 🧠 ReasonOps Context')) {
        console.log(`🔒 Already tagged: ${relativePath}`);
        continue;
      }
      await fs.writeFile(filePath, context + content, 'utf8');
      console.log(`✅ Tagged: ${relativePath}`);
    } catch (err) {
      console.error(`❌ Error processing ${relativePath}:`, err);
    }
  }
}

void applyContext();
