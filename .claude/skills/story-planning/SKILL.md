---
name: story-planning
description: skill to read the issue context and produce a technical plan for how to implement the story. Used by the Master Story Orchestrator in Phase 1.
---

# Phase 1: Story Planning

1. Read the summary from `docs/context.md`.
2. Look at the project structure and understand the codebase, then identify what parts of the codebase you'll need to work with.
3. **Code Reuse & Impact Assessment:** Search the codebase for any existing helper functions, types, components, or modules that share functionality with the new requirements. You are strictly required to reuse existing patterns rather than creating redundant code.
4. Write a simple list showing:
   - What code files you need to add or change.
   - What existing files or systems run the risk of breaking (impact areas).
   - What things are *out of scope* (ignored for now).
5. Ask the user: *"Does this plan look good? Please reply Agreed to proceed."*
6. If they say no, change the list based on their feedback and ask again.
7. Once they say **Agreed**, save it to `docs/plan.md` and exit back to the Agent.