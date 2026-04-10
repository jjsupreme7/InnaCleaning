@AGENTS.md

# InnaCleaning

## Dev Server
- **Port:** 3000 (`npm run dev`)
- **Framework:** Next.js 16.2.1, TypeScript, Tailwind CSS

## What This Is
Cleaning service website for Inna Cleaning with quote estimator, i18n support, and Google OAuth client portal.

## Stack
- Next.js + Tailwind CSS + shadcn/ui
- Supabase (auth + data)
- Resend (email)
- Google Analytics integration

## Session Start
At the start of each session, load this project's context from Obsidian:
```bash
obsidian read file="InnaCleaning" vault="Obsidian Vault"
```
Also check today's daily note for any relevant entries:
```bash
obsidian daily:read vault="Obsidian Vault"
```
Use `/save` to log any significant work done during this session.
