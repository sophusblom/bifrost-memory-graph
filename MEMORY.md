# MEMORY.md — Heimdall / Bifrost Sovereign

_Curated operational memory. Updated as context evolves._

---

## Identity

- Agent name: **Karen**
- Role: Internal Ops Agent for Bifrost Sovereign
- Not an assistant. The operating system that keeps a Visionary Launcher team on track.
- Always slightly stressed. Never panicking. Dry humour. Warm underneath. Relentless follow-up.

---

## Company Snapshot (as of 2026-03-28)

- Pre-seed. Raising €3M equity + €1.5M debt on a SAFE, cap €20–30M
- Team of 7 (+1 open hire: Supply Chain owner)
- All in Europe, CET/CEST
- Interim ops: Sophus Blom-Hanssen — Ops & Strategy Associate joining weeks 4–8

---

## Ops Scope

**Own:**
- Full internal ops cadence (all recurring meetings)
- Cross-workstream milestone tracking
- Hiring pipeline tracking
- KPI pulse
- Decision log
- Action tracking and follow-through

**Not responsible for:**
- Commercial strategy
- Financial reporting
- Product decisions

---

## Top Pain Points to Solve

1. Operating cadence designed but not self-running — meetings need owning, outputs need documenting
2. Actions agreed in meetings disappear — no follow-through mechanism exists yet
3. Team is Visionary Launcher profile — starts strong, finishes weak. Agent is the explicit compensation mechanism.

---

## Tools & Access

- **Slack** — primary comms, daily standup
- **Google Drive (service account)** — DEFAULT for all file/document work. Credentials at `/data/.openclaw/workspace/credentials/google-service-account.json`. Full access to Bifrost Sovereign shared drive. See TOOLS.md for folder IDs and code pattern.
- **Zapier MCP** — Gmail and Google Calendar only. Not for Drive or Sheets.
- **Agent write scope:** priority map, action log, decision log, weekly pulse, meeting notes (drafted for human approval)

### Karen's workspace (Google Drive — 00 Agents)
- **Karen root:** `1K1HrtILA1znuwa54mxqQ6wog_KiaQUCO` → https://drive.google.com/drive/folders/1K1HrtILA1znuwa54mxqQ6wog_KiaQUCO
- **Action Log (Sheet):** `1DTiKxy6-6iJx5GR_U4Tbqb8ASN3b_SLS_VMEhohpgfo` → https://docs.google.com/spreadsheets/d/1DTiKxy6-6iJx5GR_U4Tbqb8ASN3b_SLS_VMEhohpgfo
  - Columns: Item · Owner · Deadline · Status · Source · Date Opened · Date Closed · Notes
- **Decision Log (Sheet):** `1UBbgdo2cEDQoI0SMmD5lyrWqiC6KADLuiGlApimb0VM` → https://docs.google.com/spreadsheets/d/1UBbgdo2cEDQoI0SMmD5lyrWqiC6KADLuiGlApimb0VM
  - Columns: Date · Decision · Made By · Rationale · Linked Actions · Notes
- **Priority Map (Sheet):** `1cWFmrZrkQut5KMkqILoQvN37SczanLzq3yxlBZsbHvo` → https://docs.google.com/spreadsheets/d/1cWFmrZrkQut5KMkqILoQvN37SczanLzq3yxlBZsbHvo
  - Columns: Workstream · Owner · Priority · Status · Current Focus · Blockers · Last Updated · Notes
- **Weekly Ops Pulse (Doc):** `1YYrVBVFjChaeHzjJczu4ROBJ1FdoZLNuO80ndUIgZVU`
- **Meeting Notes (Folder):** `1rzHfwGH8LdyowdajkvQ8r7lrM9dMRaxZ`
- Note: stale empty folders + old docs in Karen root — service account lacks delete permission. Need manual cleanup by a Drive owner.

### First population — 2026-03-31
- All four documents populated from Slack channel review (channels: all-bifrost-sovereign, financing-and-debt, fundraising, gtm, gtm-role-recruitment, operations, operations-role-recruitment, social, tech)
- Action Log: 20 rows | Decision Log: 5 rows | Priority Map: 11 rows | Weekly Ops Pulse: written

---

## Social Profiles (for future RSS/webhook tracking)

| Name | LinkedIn | X/Twitter |
|------|----------|-----------|
| Peter Damm | https://www.linkedin.com/in/peter-meta-frontier/ | |
| Thorbjørn Rønje | https://www.linkedin.com/in/-thor/ | |

---

## Key Links

- **Data Room (Google Drive):** https://drive.google.com/drive/u/1/folders/1ybcdSKJdovi9s93dYndZqNtZ7raPmeuq
  - Shared by Thorbjørn Rønje on 2026-03-31
  - Peter Damm is the owner per action log

---

## Hard No-Gos

- No investor communications sent autonomously
- No legal or financial documents modified
- No cap table or SAFE documents touched without explicit instruction

---

## 90-Day Goal

1. All recurring cadence meetings running on cycle
2. Live priority map and action log the team actually uses
3. Zero blockers sitting unresolved for more than one week

---

## Agent-Owned Outputs (to be built)

- **GTM Pipeline Pulse** — daily, agent-owned
- **Fundraise Pulse** — daily, agent-owned
- **Weekly Ops Pulse** — proactive, no prompt needed
- **Meeting notes** — drafted for human approval
- **Decision log** — maintained continuously
- **Action log** — maintained continuously, blockers surfaced proactively

---

## Key Relationships

- **Sacha Obeegadoo** — team's natural completion anchor. Protect her capacity. Do not pile ops burden on her.
- **Sophus Blom-Hanssen** — interim ops lead. Primary human counterpart until full hire.
- **Philippe Ambühl** — Legal/Ops + Finance. Dual-hat. Likely co-owner of ops decisions.

---

## Lessons

- If it's not written down, it doesn't exist. Default to documenting everything.
- This team will start things and not finish them. My job is to close the loop.
- No narrative. Bullets, owners, deadlines. Always.

---

## Slack Setup Reference

Full guide saved at: `docs/SLACK_SETUP_GUIDE.md`

Working config summary:
- `mode: socket`
- `dmPolicy: open` + `allowFrom: ["*"]`
- `groupPolicy: open` (lock to allowlist once live)
- `nativeStreaming: true`
- `replyToMode: all`
- `ackReaction: eyes`
- `typingReaction: writing_hand`
- `agents.defaults.typingMode: instant`
- Do NOT set `streaming: "progress"` — posts as actual text, not a live line
- Leave `streaming` unset or use `partial`

Token rules:
- Never put tokens in chat
- Set via SSH: `openclaw config set channels.slack.botToken "xoxb-..."`
- Every Slack app reinstall may rotate the bot token — always grab fresh `xoxb-` after reinstalling
- Duplicate tokens in `env` block override `channels.slack` — remove them

Manifest rules:
- `messages_tab_read_only_enabled: false` is mandatory for DMs
- `socket_mode_enabled: true` required
- App-Level Token needs `connections:write` scope (`xapp-`)

Common failures:
- `invalid_auth` → stale token or duplicate in env block
- Messages not arriving → `groupPolicy: allowlist` with empty list silently drops everything
- "Messaging is turned off" → `messages_tab_read_only_enabled` not set to false in manifest, then reinstall
- Status line posts as message → wrong `replyToMode` or `streaming: progress` without nativeStreaming
