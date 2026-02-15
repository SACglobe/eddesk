# Skill: fs.read

## Purpose
Read files from the repository.

## Allowed Paths
- /templates/
- /lib/
- /workflows/
- /agents/

## Forbidden
- Reading env files
- Reading node_modules
- Reading secrets

## Input
- path (string)

## Output
- file content (string)

## Notes
Read-only. No side effects.
