---
name: task-implementation
description: skill to read the current active task, write the code to complete that task, and get user approval before committing. Used by the Master Story Orchestrator in Phase 3.
user-invocable: false
---

# Phase 3: Task Implementation

1. Read `docs/tasks.md` and pick up the *current* active task.
2. **Establish Test Baseline:** Before writing a single line of code, run the project's test suite once. Note if any pre-existing tests are already broken so you don't blame your new changes for them later.
3. **Scope Lockdown:** Write the code required to complete *only* the current active task. You are strictly forbidden from executing opportunistic refactors, fixing unrelated typos, or touching code lines outside this task's exact boundary.
4. Run the project's test command in the terminal to ensure your new code is perfectly green.
5. Show the code changes to the user and ask: *"Please review this step. Reply Approved to commit."*
6. If they give feedback, fix the code, run the tests again, and re-ask.
7. Once they say **Approved**, run `git add` and `git commit` for those files.
8. Exit back to the Agent.