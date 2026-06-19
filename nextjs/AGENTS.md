# AGENTS.md

Operating protocol for AI coding agents (Claude Code, Codex, and others) working in this repository.

## What this project is

- This is a **high-fidelity concept / prototype**, not the official thefutureworks website.
- It is a design and engineering exploration. Treat all content, data, and flows as illustrative.

## Branch model

- `main` is the **protected v1 baseline**. Do not touch it directly.
- All work happens on `advanced-platform-v2` or dedicated **phase branches** cut from it.
- Never push visual work before it has been **approved in a local browser** by the user.

## Phase gate (every implementation phase must pass)

Before any commit/push for an implementation phase, all of the following must pass:

- `npm run typecheck`
- `npm run build`
- `git diff --check` (no whitespace / conflict-marker errors)
- **route smoke** (`scripts/route-smoke.ps1`)

For **visual phases**, also run **screenshot QA** and obtain local browser approval.

## Hard rules

- **Preserve existing routes** unless the task explicitly says otherwise.
- **No backend / auth / CMS / production claims** unless that work is explicitly scoped in the task.
- **No real candidate personal data.**
- **No real CV storage.**
- Use **synthetic concept data only**.

## Agent-specific guidance

- See `CLAUDE.md` for Claude Code rules (UI / visual / motion).
- See `CODEX.md` for Codex rules (TypeScript / data / scaffolds / build fixes).
- See `docs/ai-workflow.md` for the standard phase loop and revert strategy.
- See `docs/phase-gates.md` for the phase definitions and gates.
