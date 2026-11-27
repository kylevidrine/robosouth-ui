# robosouth-ui rules for the AI

This is a shared component library (@robosouth/ui), not an app. Several apps import it. Follow every rule below when adding a piece.

## Where pieces go
- Sign-in pieces live in src and are exported from src/index.ts.
- App frame, pages, tables, forms and admin pieces live in src/frame and are exported from src/frame/index.ts.
- Export every new piece (and its exported types) from the matching index.ts.
- Write TypeScript only: one .tsx file per piece, named after the exported component. Hooks may be .ts.
- Start each file with a header comment in the existing style: what the piece is, how it behaves on phone and desktop, and which shadcn components it uses.
- Do not change any existing piece unless asked.

## Components
- Import UI components through the apps' alias, for example `import { Button } from '@/components/ui/button'`. Each app supplies its own stock copy.
- Use only stock shadcn components (Button, Input, Separator, Card, Sheet, Select, Badge, Avatar, Tooltip, Table, Pagination, and so on).
- If a component is missing, install it only with `npx shadcn@latest add <name>`. Second choice only: `npx shadcn@latest add @reui/<name>`.
- Never hand-write a component, edit an installed one, or build a substitute to imitate one.
- If neither shadcn nor ReUI has it, stop and say so.
- Name any new shadcn component a piece needs in its header comment so the apps know to install it.

## Colors
- Use only shadcn theme variables through semantic classes: bg-background, bg-card, text-muted-foreground, bg-primary, border, text-destructive, bg-sidebar, and so on.
- Never hard-code colors: no hex, no rgb, no palette classes such as bg-green-600, no inline color styles.
- Never add CSS files or custom variables.
- The only exception is the official Apple and Google brand buttons in src/SignInButtons.tsx.

## Props only
- A piece takes props and callbacks. No data fetching, no storage, no app-specific logic.
- Do not import a routing library. Navigation is a callback prop, like onNavigate in AppSidebar.
- Wording comes from props.

## Phone and desktop
- Every piece must work on a phone and on desktop.
- If a piece changes layout by screen width, keep both layouts inside one exported component, as AppSidebar does with MobileIconStrip.

## Visible text
- Text the customer sees is plain language for the customer.
- Never put file names, paths, code terms, TODO or developer notes in rendered text. Put notes in code comments, never inside JSX text.
- Never invent statistics, claims or marketing copy.

## Long lists
- Any list that can grow long gets a search box above it (stock Input, outside the list) and the shared TablePager footer, 25 per page by default. See DataTable.tsx and CardList.tsx.

## Pushing
- Never push to main.
- Push each batch of work to a new branch in this same repo (origin) with a short name that describes the work.
- Never reuse a branch name that already exists on the remote. Check with `git ls-remote --heads origin <name>` first.
- Tell the person the branch name after pushing.

## Before you finish
- This repo has no type-check script, tsconfig or installed dependencies. Re-read your code carefully for type errors instead, and say in your report that no type check was run.
- Never put a key, token or password in any file.
