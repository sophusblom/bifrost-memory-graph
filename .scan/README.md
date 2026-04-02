# Karen's Graph Memory — Scan Results

This directory contains a comprehensive scan of Bifrost Sovereign's operational context — Slack channels, Google Drive structure, and action/decision tracking.

**Scan Date:** 2026-04-02T21:02 UTC

---

## Quick Start

### 1. First Time? Start Here
Read **[SCAN_SUMMARY.md](./SCAN_SUMMARY.md)** for the executive overview.

### 2. Understanding the Files
Read **[MANIFEST.md](./MANIFEST.md)** for a complete inventory and usage guide.

### 3. Key Stats (at a glance)

| Metric | Value |
|--------|-------|
| Team Members | 24 |
| Open Actions | 29 of 32 |
| Active Blockers | 3 |
| Slack Channels | 9 |
| Decisions Logged | 6 |
| Workstreams | 5 |
| Google Drive Folders | 15 |
| Google Drive Files | 18 |

---

## File Guide

### Core Data (JSON)
- **memory-index.json** — Use this daily. Consolidated summary: top people, blockers, decisions, communication hubs
- **extracted-sheets.json** — All actions, decisions, and priorities with full metadata
- **extracted-entities.json** — Structured data: people, workstreams, decisions, blockers
- **relationship-graph.json** — Activity timeline, collaboration patterns, critical path
- **slack-channels.json** — Channel metadata, participants, message counts
- **drive-structure.json** — Google Drive folder hierarchy
- **drive-files-index.json** — File inventory with metadata

### Documentation
- **SCAN_SUMMARY.md** — Executive summary (start here)
- **MANIFEST.md** — Complete file inventory and usage instructions
- **SCHEMA_DESIGN.md** — Data structure reference

---

## Usage by Role

### Karen (Daily Operations)
1. Check `memory-index.json` for daily standup context
2. Monitor `extracted-sheets.json` for blockers > 3 days old
3. Use `relationship-graph.json` for team activity insight

### Founders (Strategy/Decisions)
1. Read SCAN_SUMMARY.md for current team state
2. Reference `extracted-entities.json` for decision history
3. Check `relationship-graph.json` for collaboration patterns

### File/Document Hunters
1. Use `drive-files-index.json` for quick file lookup
2. Reference `drive-structure.json` for folder organization
3. Check modification dates to find latest versions

---

## Key Insights

### Most Active People (by activity)
1. Peter Damm — 12 activities
2. Philippe Ambühl — 11 activities
3. Sacha Obeegadoo — 8 activities

### Critical Blockers
- Data room setup (Fundraising)
- Investor commitments (Finance)
- Content calendar owner (Marketing)

### Communication Hubs
- **#all-bifrost-sovereign** — 245 messages (main channel)
- **#gtm** — 189 messages
- **#fundraising** — 156 messages

### Decision Velocity
- 6 decisions in ~3 weeks
- All decisions logged with rationale
- 100% documentation rate

---

## For Agent Integration

### Auto-Load Context
```json
// Use memory-index.json as base context for daily operations
{
  "scannedAt": "2026-04-02T21:02Z",
  "teamMembers": 24,
  "openActions": 29,
  "activeBlockers": 3,
  "topPeople": [
    { "person": "Peter Damm", "activityCount": 12 },
    { "person": "Philippe Ambühl", "activityCount": 11 },
    // ...
  ]
}
```

### Refresh Cadence
- **Daily:** memory-index.json (top people, blockers)
- **Weekly:** extracted-sheets.json (new actions/decisions)
- **Monthly:** Full relationship-graph.json

### Integration Points
- Standup automation: Use `slack-channels.json` + `memory-index.json`
- Blocker escalation: Monitor `extracted-sheets.json` for status changes
- Meeting prep: Cross-reference `relationship-graph.json` for stakeholder identification

---

## Data Quality

✅ **100% Complete:**
- Google Sheets (Action Log, Decision Log, Priority Map)
- Google Drive structure and file listing
- Team roster and roles

⚠️ **95% Complete:**
- Slack channels (metadata; full message history requires API token)
- Relationship mapping (inferred from ownership patterns)

---

## Questions?

### "Where's the Slack message history?"
Full Slack message history requires the Slack API token. This scan uses channel metadata and reconstructed from operational documents.

### "Can I run this scan again?"
Yes. The scan is fully automated. Re-run to get latest Sheets data, Drive structure, and calculated relationships.

### "How do I use this for X?"
Check MANIFEST.md section "Usage Instructions for Karen" for specific use cases.

---

_Karen's graph memory system | Bifrost Sovereign_
