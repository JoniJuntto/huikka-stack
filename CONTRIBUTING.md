# Contributing

## Expectations

- Keep the starter opinionated, but keep product-specific logic out of `packages/*`.
- Prefer small reference examples that demonstrate the intended pattern and are easy to delete.
- Keep CI green with `bun run ci` before opening a pull request.

## Local workflow

```bash
bun install
bun run db:start
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
bun run db:push
bun run dev
```

## Pull requests

- Describe the user-facing change and the reason for it.
- Update `README.md` when the starter contract or setup flow changes.
- Add or adjust tests when behavior changes.
