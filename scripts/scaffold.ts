// scripts/scaffold-user-stories.ts
import { promises as fs } from 'fs';
import path from 'path';

const stories = [
  { name: 'Dashboard Evaluation View', path: 'user-story/dashboard-evaluation-view.md' },
  { name: 'Reviewer Calibration Workflow', path: 'user-story/reviewer-calibration-workflow.md' },
  { name: 'Scoring Rubric Implementation', path: 'user-story/scoring-rubric-implementation.md' },
  { name: 'Rubric Versioning Management', path: 'user-story/rubric-versioning-management.md' },
  { name: 'Evaluator Onboarding Process', path: 'user-story/evaluator-onboarding-process.md' },
  // Add all other required stories...
];

const userStoryTemplate = (featureName: string, reasonOpsContext: string): string => `
# User Story: ${featureName}

## 🧠 ReasonOps Context
${reasonOpsContext}

## 🎯 Objective
- Clearly state what this story achieves.

## 🧑‍💻 User Role(s)
- Primary evaluators, QA, engineers, researchers.

## ✅ Acceptance Criteria
- [ ] Clear description of expected behavior.
- [ ] Step-by-step logic checkpoints.
- [ ] Error conditions (e.g., logic breaks, hallucinations).
- [ ] Rubric dimensions explicitly outlined.
- [ ] Audit trail requirements.

## 📍 Steps to Implement
1. Define interfaces, APIs, and schemas required.
2. Implement UI/UX elements.
3. Integrate scoring/tagging logic.
4. Ensure audit logging.
5. Implement data export functionality.

## 🔗 Dependencies & Integration Points
- Clearly document API and schema integrations.

## 🚩 Edge Cases & Error Handling
- Document potential logical errors explicitly.

## 🧪 Testing & Validation
- Manual and automated testing guidelines.

## 📊 Metrics & Observability
- Define critical metrics and dashboard requirements.

## 🔄 Feedback Loop
- Clearly state how outcomes integrate into training improvements.
`;

async function scaffoldStories(): Promise<void> {
  const baseDir = 'docs';
  for (const story of stories) {
    const reasonOpsContextPath = path.join(
      baseDir,
      'features',
      story.path.replace('user-story/', '').replace('.md', ''),
      'index.md'
    );
    let reasonOpsContext = '';
    try {
      reasonOpsContext = await fs.readFile(reasonOpsContextPath, 'utf8');
    } catch (e) {
      console.error(`Could not load context for ${story.name}:`, e);
    }

    const content = userStoryTemplate(story.name, reasonOpsContext);
    const fullPath = path.join(baseDir, story.path);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content, 'utf8');
    console.log(`✅ Scaffolded story: ${story.name}`);
  }
}

void scaffoldStories();
