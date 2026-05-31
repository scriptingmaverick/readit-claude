---
name: issue-context
description: Internal skill to fetch GitHub issue details. Used by the Master Story Orchestrator at the start of Phase 0.
---

# Phase 0: Issue Context

1. Run `gh issue view <NUMBER>` in the terminal to read the issue text.
2. **Visual Asset Extraction (Critical):** Scan the issue text for any markdown image links or attachments. If found:
   - Download the image files locally using `curl` or `wget`.
   - Use the native `view_file` tool to inspect the images so you understand the visual design, mockups, or screenshots.
   - Include descriptions of these images in your final summary notes.
3. Look through the project folders to see what files already exist.
4. Write a simple text summary explaining what the issue is asking for.
5. Show this summary to the user and ask: *"Does this summary look right?"*
6. Once they say yes, save it to `docs/context.md` and exit back to the Agent.