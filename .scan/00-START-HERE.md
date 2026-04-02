# 🚀 START HERE — Karen's Graph Memory

**Scan completed:** 2026-04-02T21:02 UTC  
**Location:** `/data/.openclaw/workspace/.scan/`  
**Total files:** 14 | **Total data:** 148 KB

---

## What Is This?

A complete snapshot of **Bifrost Sovereign's operational context** extracted from:
- ✅ Google Sheets (Action Log, Decision Log, Priority Map)
- ✅ Google Drive (15 folders, 18 files)
- ✅ Slack channels (9 channels, 1,067 messages enumerated)
- ✅ Team roster (24 people identified)

This gives you everything you need to understand the company's current state, who's doing what, what's blocking progress, and how teams communicate.

---

## In 60 Seconds

| What | Value | File |
|------|-------|------|
| **Team size** | 24 people | memory-index.json |
| **Open actions** | 29 of 31 | extracted-sheets.json |
| **Active blockers** | 9 (all < 1 week old) | extracted-sheets.json |
| **Decisions made** | 5 with full rationale | extracted-sheets.json |
| **Slack channels** | 9 (1,067 messages) | slack-channels.json |
| **Workstreams** | 5 (Fundraising, GTM, Ops, Legal, Finance) | extracted-entities.json |
| **Most active person** | Sophus (12 activities) | memory-index.json |

---

## How to Use This

### Option A: "Just Give Me the Daily Context"
👉 Open **`memory-index.json`**
- Top 5 most active people
- Current blockers + owners
- Recent decisions
- Team metrics

### Option B: "I Need the Full Picture"
👉 Read **`SCAN_SUMMARY.md`** (7 min read)
- Executive overview
- Team breakdown
- Open actions by status
- Slack landscape
- Key insights

### Option C: "Show Me How to Integrate This"
👉 Read **`INTEGRATION_GUIDE.md`** (technical)
- Code examples (Python/JavaScript)
- Query patterns
- API documentation
- Automation examples

### Option D: "I Want to Understand the Files"
👉 Read **`MANIFEST.md`**
- Complete file inventory
- What's in each file
- Data quality notes
- Usage instructions

---

## Files Quick Reference

### Core Data (JSON) — Use These Daily

| File | Purpose | When to Use |
|------|---------|------------|
| **memory-index.json** | Consolidated daily summary | Morning standup, quick checks |
| **extracted-sheets.json** | All actions, decisions, priorities | Blocker tracking, action status |
| **relationship-graph.json** | People activity & collaboration | Team analysis, workload checks |
| **slack-channels.json** | Channel structure & participants | Meeting prep, channel selection |
| **extracted-entities.json** | People, workstreams, decisions | Context lookup, decision history |

### Infrastructure Data (JSON) — Use as Reference

| File | Purpose | When to Use |
|------|---------|------------|
| **drive-structure.json** | Google Drive folder hierarchy | Understanding file organization |
| **drive-files-index.json** | Complete file listing | Finding documents |

### Documentation (Markdown) — Read These First

| File | Purpose | Length |
|------|---------|--------|
| **README.md** | Quick start guide | 5 min |
| **SCAN_SUMMARY.md** | Executive summary | 7 min |
| **MANIFEST.md** | File inventory & guide | 10 min |
| **INTEGRATION_GUIDE.md** | Technical integration | 15 min |
| **SCHEMA_DESIGN.md** | Data structure reference | Reference |

---

## Key Insights (TL;DR)

### 🏃 Most Active
1. **Sophus Blom-Hanssen** — 12 activities (Interim Operations)
2. **Peter Damm** — 5 activities (Fundraising & GTM-DC)
3. **Philippe Ambühl** — 4 activities (Legal & Finance)

### 🚨 Top Blockers
1. Unit economics slide needs update (Fundraising)
2. All three legal docs must close this week (Legal & Entity)
3. Content calendar owner needs assignment (Marketing)

### 💬 Communication Hubs
- **#all-bifrost-sovereign** — 245 messages (main)
- **#gtm** — 189 messages
- **#fundraising** — 156 messages

### 📊 By The Numbers
- **Actions:** 31 total (29 open, 2 closed)
- **Completion rate:** 6% (good for week 1!)
- **Decisions:** 5 documented with rationale
- **Decision velocity:** ~1.7/week
- **Overdue items:** 0 (all deadlines met so far)

---

## Recommended Reading Order

1. **First:** This document (you're reading it!)
2. **Then:** `README.md` — 5 minute overview
3. **Then:** `SCAN_SUMMARY.md` — Executive summary
4. **Then:** Pick based on your role:
   - **Karen/Ops:** `memory-index.json` + `INTEGRATION_GUIDE.md`
   - **Founders:** `SCAN_SUMMARY.md` + `extracted-entities.json`
   - **Builders:** `relationship-graph.json` for team dynamics
   - **Fundraisers:** Check blockers in `extracted-sheets.json`

---

## How to Stay Updated

The scan captures a point-in-time snapshot. To keep it fresh:

### Daily
- Use cached `memory-index.json` data
- It's fast and doesn't require updates

### Weekly
- Check `extracted-sheets.json` for new/updated actions
- Verify blockers are still current
- Compare `memory-index.json` top people against reality

### Monthly
- Full re-scan to capture Drive changes
- Update relationship patterns
- Refresh collaborative insights

---

## Want to Re-Run the Scan?

The scan is fully automated. To refresh:

```bash
# Full scan (includes all sources)
cd /data/.openclaw/workspace
node /tmp/scan-sheets.js      # Get latest from Google Sheets
node /tmp/scan-drive-v2.js    # Get latest from Google Drive
node /tmp/extract-entities.js # Recalculate entities & relationships
```

You'll get the latest data from Sheets (which is the source of truth for actions/decisions).

---

## Still Have Questions?

- **"Where's [data]?"** → Check MANIFEST.md (file inventory)
- **"How do I [task]?"** → Check INTEGRATION_GUIDE.md (how-tos)
- **"What does [field] mean?"** → Check SCHEMA_DESIGN.md (definitions)
- **"Is [data] current?"** → Check timestamp in each JSON file

---

## One More Thing

This scan represents the **authoritative source of truth** for:
- Who's doing what (Action Log)
- What's been decided (Decision Log)
- What's blocking us (Blockers from Priority Map)
- Team structure (SOUL.md)
- Communication topology (Slack channels)

**Google Sheets is always the source of truth.** These JSON files are derived from it. Update the Sheets, then re-run the scan to propagate changes.

---

## Ready?

✅ All files are in `/data/.openclaw/workspace/.scan/`

Next step: Open `SCAN_SUMMARY.md` for a 7-minute executive overview.

---

_Karen's graph memory system | Bifrost Sovereign | 2026-04-02_
