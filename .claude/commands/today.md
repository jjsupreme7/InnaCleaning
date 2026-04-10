Help me plan my day for InnaCleaning.

1. Read this project's Obsidian note:
```bash
/opt/homebrew/bin/obsidian read file="InnaCleaning" vault="Obsidian Vault"
```

2. Read today's daily note:
```bash
/opt/homebrew/bin/obsidian daily:read vault="Obsidian Vault"
```

3. Get open tasks from the vault filtered to this project:
```bash
/opt/homebrew/bin/obsidian tasks vault="Obsidian Vault" todo
```
Only show tasks that mention InnaCleaning or are linked from the [[InnaCleaning]] note.

Based on what you find, suggest a daily plan scoped to this project:

**Today's Focus (InnaCleaning):**
- Top 3 priorities for this project
- Any deadlines or time-sensitive items
- Blockers or dependencies to resolve

If the daily note doesn't mention InnaCleaning yet, offer to append the plan:
```bash
/opt/homebrew/bin/obsidian daily:append content="- [[InnaCleaning]]: [plan summary]" vault="Obsidian Vault"
```

Wait for my confirmation before writing anything to the vault.
