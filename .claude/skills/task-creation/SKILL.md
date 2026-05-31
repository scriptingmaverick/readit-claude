---
name: task-creation
description: skill to read the technical plan and break it down into a list of small, testable tasks. Used by the Master Story Orchestrator in Phase 2.
---

# Phase 2: Task Creation

1. Read the plan from `docs/plan.md`.
2. **Mid-Breakdown Gap Detection:** As you map out the tasks, look for any missing configurations, database models, variables, or API specs that the plan took for granted. If you find a structural gap, you must halt and alert the user immediately with options to fix it before saving anything.
3. Split that big plan into a numbered list of small, testable steps (Task 1, Task 2, Task 3).
4. Every single task must have clear "Acceptance Criteria" (how to prove it works).
5. Show the list to the user and ask: *"Does this step-by-step breakdown look complete?"*
6. Once they approve it, save the list to `docs/tasks.md` and exit back to the Agent.