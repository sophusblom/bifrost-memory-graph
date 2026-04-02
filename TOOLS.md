---
summary: "Karen's tool config — Bifrost Sovereign"
read_when:
  - Any task involving files, documents, Google Drive, Sheets, Gmail, or Calendar
---

# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

---

## Google Drive — SERVICE ACCOUNT (DEFAULT for all file/document work)

**Always use the service account for anything involving Google Drive, Sheets, or Docs.**

- Credentials: `/data/.openclaw/workspace/credentials/google-service-account.json`
- Service account email: `bifrost-portfolio-dashboard@claude-mcp-sheets-479811.iam.gserviceaccount.com`
- Package: `googleapis` (installed at `/data/.openclaw/workspace/node_modules`)
- Auth scope: `https://www.googleapis.com/auth/drive` (full read/write)

**Bifrost Sovereign shared drive:**
- Drive ID: `0AC1RyrcI22J8Uk9PVA`
- Top-level folders:
  - `00 - Agents` → `1DKdpldPlAA1kYDNx-ofSQOUQfXdZq0r0` (Karen's workspace: `1DKdpldPlAA1kYDNx-ofSQOUQfXdZq0r0`)
  - `01 - Operations` → `1aO7b-Ozib2Fa7lCEI5qi9qJZ4pal1t76`
  - `02 - Fundraising & Investors` → `1aLJ9sFmR9jAIROJIa_ojYwIVSQ9SPL3j`
  - `03 - GTM` → `1AItD6z9eHuSaOB5gbPPR3SL1Y2JT-rn2`
  - `04 - Product & R&D` → `1FU43nh1uI6rFcNqVNIuS7uBv9dF-vi_5`
  - `05 - Marketing` → `1w3tvuQIeLn_ZrrELLmFHdFXb56V95XZD`
  - `06 - Finance` → `1zvtyIBuJeFm4o4BpGbQyTnXObHidoq1h`
  - `07 - Legal` → `1FYjc1_MB0uuUoq7njVzVAq5wFXQdcjlE`
  - `08 - Hiring` → `1yt0K0BgauVPHgzNtS4pWy4PbmcyJ2EGM`
  - `Karen` → `1DKdpldPlAA1kYDNx-ofSQOUQfXdZq0r0`
  - `Data Dump` → `1Nb7foUbK-zJcn2xgsZ2B83N5KgiEbp1Y`

**Also visible:**
- Bifrost Studios shared drive: `0ALgLvwTUpgSNUk9PVA` (read access only unless instructed)

**Standard node.js pattern:**
```js
const { google } = require('/data/.openclaw/workspace/node_modules/googleapis');
const key = require('/data/.openclaw/workspace/credentials/google-service-account.json');
const auth = new google.auth.GoogleAuth({
  credentials: key,
  scopes: ['https://www.googleapis.com/auth/drive']
});
const drive = google.drive({ version: 'v3', auth });
// Always pass supportsAllDrives: true and includeItemsFromAllDrives: true
```

**Do NOT use Zapier MCP for Google Drive or Sheets.** Service account is more capable and reliable.

---

## Zapier MCP — Gmail and Google Calendar ONLY

Use Zapier MCP only for Gmail and Google Calendar (not Drive/Sheets).

- MCP server URL: `https://mcp.zapier.com/api/v1/connect?token=MzMxYjM5YTItYzRhYS00OTkxLThjYmMtMTUyNzRhYTdhMmJiOmFQZHczMjF4ZVo2anZHVXdVcUJkYnVtb0lPZEFKK3grU2M1dC9WQjBnSG89`
- mcporter config: `/tmp/mcporter-zapier.json` (ephemeral — recreate if missing, see below)
- Configured account: `karen@bifrostsovereign.io`
- Tool management: https://mcp.zapier.com

**Calling tools:**
```bash
mcporter call zapier.<tool_name> --config /tmp/mcporter-zapier.json --args '{...}'
```

**If `/tmp/mcporter-zapier.json` is missing** (e.g. after reboot), recreate it:
```bash
cat > /tmp/mcporter-zapier.json << 'EOF'
{
  "mcpServers": {
    "zapier": {
      "url": "https://mcp.zapier.com/api/v1/connect?token=MzMxYjM5YTItYzRhYS00OTkxLThjYmMtMTUyNzRhYTdhMmJiOmFQZHczMjF4ZVo2anZHVXdVcUJkYnVtb0lPZEFKK3grU2M1dC9WQjBnSG89"
    }
  }
}
EOF
```

**Available tools (as of 2026-03-30):**
- Gmail: find, send, reply, draft, archive, delete, label
- Google Calendar: find events, find busy periods, find calendars, retrieve event by ID, add attendees

**Do NOT use** `himalaya`, browser automation, or Zapier for Google Drive/Sheets tasks. Service account is the path.

---

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.