# Skill: notebook.research

## Purpose
Perform heavy reasoning, research, or data generation tasks
that are too complex or expensive for chat-based reasoning.

## What this skill is for
- Large content generation
- Research-backed answers
- Structured data synthesis
- Comparative analysis
- Bulk demo data creation

## What this skill is NOT for
- Writing application code
- Modifying files
- Making architectural decisions
- Executing workflows
- Calling databases

## Input
- task (string, explicit)
- constraints (optional)
- output_format (required)

## Output
- Structured result (JSON or Markdown)
- Must match output_format exactly

## Rules
- No file access
- No network access unless explicitly allowed
- No assumptions outside provided task
- No opinions unless asked

## Failure Handling
- If task is vague → return error
- If output format is unclear → return error
