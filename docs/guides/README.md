# 📚 ReasonOps Guides

This folder contains detailed walkthroughs and implementation guides for internal and external ReasonOps contributors. These documents help explain how to extend, customize, or reason about system components beyond what the API or schema references offer.

---

## 🛠 Available Guides

| Guide                       | Description                                                                     |
| --------------------------- | ------------------------------------------------------------------------------- |
| `export-flow.md`            | How tasks, completions, and judgments are compiled into a stable dataset export |
| `scoring-panel.md`          | (Planned) How to use and extend StepScoringPanel UI for rubric scoring          |
| `rubric-integration.md`     | (Planned) How to define, version, and embed new rubric formats                  |
| `adapter-implementation.md` | (Planned) How to integrate a new LLM or service adapter (e.g. Mistral, Gemini)  |
| `dataset-debugging.md`      | (Planned) How to preview, snapshot, and QA export outputs before release        |
| `reasonops-to-clearops.md`  | (Planned) Bridging ReasonOps judgment flow into external annotation tools       |

---

## 🔍 Use These If You...

- Need to onboard a new team member quickly
- Want to build a new judgment interface panel
- Are integrating a new LLM adapter into the backend
- Need to audit a scoring dataset or understand schema changes
- Are building downstream applications that consume ReasonOps exports

---

## 🔗 Related Docs

- [Tasklist execution](../tasklist/)
- [Prompt templates](../prompts/)
- [Schema + dataset structure](../schema/)
- [Deployment config](../deployment/)

---

For questions, suggest a new guide by opening an issue titled `guide: <topic>` or email the platform maintainer.
