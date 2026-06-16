# AI Workflow

The standard phase loop and revert strategy for AI-assisted work on this repository.
Read `AGENTS.md` for the shared protocol and `docs/phase-gates.md` for phase definitions.

## Standard phase loop

1. **Checkpoint** — confirm clean working tree and correct branch; create a backup branch before risky visual work.
2. **Inspect** — read the relevant files and current behaviour before changing anything.
3. **Plan** — write down the smallest change that satisfies the phase.
4. **Implement** — make the change, keeping it small and typed.
5. **Verify** — run `npm run typecheck`, `npm run build`, `git diff --check`, and `scripts/route-smoke.ps1`.
6. **Local browser review** — run `scripts/preview-local.ps1`, inspect on `localhost`, and get user approval (required for visual phases).
7. **Commit** — only after verification (and local approval for visual work).
8. **Push** — only after the user approves.
9. **Vercel preview** — capture the preview deployment as evidence (see Phase 8 in `docs/phase-gates.md`).

## Revert strategy

- **Before risky visual work:** create a backup branch.

  ```powershell
  git branch backup/<short-description>
  ```

- **If a local-only commit is bad** (not yet pushed): keep the backup branch, then reset to the last good commit.

  ```powershell
  git branch backup/<short-description>   # if not already created
  git reset --hard <previous-good-commit>
  ```

- **If a pushed commit is bad:** do not rewrite shared history — revert it.

  ```powershell
  git revert <commit>
  ```
