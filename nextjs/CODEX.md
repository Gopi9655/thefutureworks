# CODEX.md

Codex-specific rules for this repository. Read `AGENTS.md` first for the shared protocol.

## Where Codex is best used

- TypeScript, data modelling, route scaffolds, forms, build fixes, and QA scripts.

## Workflow rules

- Keep implementation **small and typed**.
- **Avoid full visual redesign** unless explicitly asked.
- Run `npm run typecheck`, `npm run build`, and the **route smoke** (`scripts/route-smoke.ps1`).
- **Do not push** until the user approves if visual output changed.

## Reminder

- Preserve existing routes unless the task explicitly says otherwise.
- No backend / auth / CMS / production claims unless explicitly scoped.
- Use synthetic concept data only — no real candidate data, no real CV storage.
