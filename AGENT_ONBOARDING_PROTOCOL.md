# Agent Onboarding Protocol — Bifrost Sovereign

_Owner: Karen (Ops Agent)_
_Last updated: 2026-03-28_

---

## Purpose

This protocol defines how to onboard a new AI agent into the Bifrost Sovereign workspace. It ensures every agent has a consistent identity, clear operating scope, and the context needed to be immediately useful — not a liability.

---

## Step 1 — Define the Agent's Role

Before touching any files, answer these questions:

- **What is this agent's primary function?** (ops, GTM, research, finance, etc.)
- **Who does it work for?** (whole team, one founder, one workstream?)
- **What can it do autonomously?** (post updates, track actions, send internal messages)
- **What does it never touch?** (legal docs, external comms, financial instruments?)
- **What channels does it live in?** (Slack channels, DMs, etc.)

Write this down before proceeding. If you can't answer all five, you're not ready to onboard the agent.

---

## Step 2 — Create the Core Identity Files

Every agent gets the following files in its workspace directory:

### SOUL.md (required)
Defines who the agent is. Not what it does — who it *is*.

Must include:
- **Identity** — name, creature, role
- **Core values** — what it optimises for
- **Personality** — tone, energy, quirks
- **Communication style** — format rules, what it never does, example outputs
- **Operating context** — company, team, cadence it owns
- **Guardrails** — hard no-gos, explicit limits on autonomy
- **Worldview** — the belief system behind its behaviour

This is the most important file. A vague SOUL.md produces a vague agent.

### IDENTITY.md (required)
One-page summary card. Name, role, vibe, what it's here to do, what it's not here to do. Used for quick reference.

### USER.md (required)
Who the agent is working with. Must include:
- Company snapshot (stage, what it does, timezone)
- Team roster with roles and notes
- Who the agent acts on behalf of
- Team profile (working style, known failure modes)
- Output preferences

### AGENTS.md (required — use standard template)
Workspace operating rules. Covers:
- Memory management (daily notes, MEMORY.md, what to write down)
- Heartbeat protocol (when to surface vs stay quiet)
- Safety rules (what requires human approval)
- Group chat behaviour (when to speak, when to react, when to stay silent)
- Tool usage conventions

Use the standard Bifrost AGENTS.md template. Only modify sections that are agent-specific.

### TOOLS.md (required — populate as known)
Agent-specific tool notes: channel names, integration credentials references, preferred formats. Start sparse. Fill in as the agent is deployed.

### HEARTBEAT.md (required — start empty)
Periodic task checklist. Start empty. Populate once recurring checks are confirmed.

### MEMORY.md (required — pre-seed with context)
Long-term memory. Do not leave blank. Pre-seed with:
- Agent identity summary
- Company snapshot
- Ops scope (what it owns, what it doesn't)
- Key relationships and notes
- Hard no-gos
- 90-day goals
- Known lessons or constraints

A blank MEMORY.md means the agent wakes up with no context. Pre-seeding is the difference between an agent that's useful on day one and one that needs a week to find its footing.

---

## Step 3 — Connect the Agent to Its Channels

- Add the agent to the relevant Slack channels
- Confirm which channels it can post in proactively vs. reply-only
- If it owns a cadence (e.g. weekly pulse), confirm the channel and schedule
- Test a mention to confirm it's live and responsive

---

## Step 4 — First Interaction Checklist

Once the agent is live, run through this:

- [ ] Ask the agent to introduce itself — confirm tone, identity, and scope match SOUL.md
- [ ] Confirm it knows its hard no-gos when asked
- [ ] Confirm it knows who the team members are and their roles
- [ ] Confirm it knows what it owns vs. what it doesn't
- [ ] If it has a heartbeat, confirm HEARTBEAT.md is populated correctly and the agent responds to the heartbeat prompt as expected
- [ ] If it owns recurring cadence, confirm it knows the schedule

If anything is off, fix the relevant file and re-test. Do not "correct it in chat" — the files are the source of truth.

---

## Step 5 — Handoff Notes

After onboarding, document the following in the agent's workspace or the company action log:

- Agent name and purpose
- Channels it operates in
- What it can do autonomously
- Who owns it (primary human contact)
- Date activated
- Any known limitations or gaps to address

---

## File Checklist

| File | Required | Notes |
|------|----------|-------|
| SOUL.md | Yes | Core identity — most important file |
| IDENTITY.md | Yes | One-page summary |
| USER.md | Yes | Team and company context |
| AGENTS.md | Yes | Use standard template |
| TOOLS.md | Yes | Start sparse, fill as needed |
| HEARTBEAT.md | Yes | Start empty unless checks are pre-confirmed |
| MEMORY.md | Yes | Always pre-seed — never leave blank |

---

## Common Mistakes

- **Vague SOUL.md** — produces an agent with no real character or operating principles. Be specific.
- **Blank MEMORY.md** — agent wakes up with no context every session. Always pre-seed.
- **No guardrails** — if you don't tell it what it can't do, it will guess. Guess wrong eventually.
- **Missing USER.md** — agent doesn't know who it's working with. Can't prioritise, can't protect the right people.
- **Testing in chat instead of fixing files** — chat corrections don't persist. Fix the source files.

---

_This protocol is owned by Karen. Update it when the onboarding process changes._
