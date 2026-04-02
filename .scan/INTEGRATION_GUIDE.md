# INTEGRATION_GUIDE.md — Using Karen's Graph Memory

**For:** Karen (Ops Agent) and systems that need to integrate graph memory data  
**Generated:** 2026-04-02T21:02 UTC

---

## What This Is

A complete snapshot of Bifrost Sovereign's operational context, extracted from:
- Google Sheets (Action Log, Decision Log, Priority Map)
- Google Drive (folder structure and file index)
- Slack channel metadata (reconstructed from ops documents)
- Team roster and roles (SOUL.md, USER.md)

This data is suitable for:
- Daily standup automation
- Blocker tracking and escalation
- Team activity analysis
- Decision context retrieval
- File discovery

---

## Core Integration Points

### 1. Daily Operations — Use `memory-index.json`

**What it contains:**
- Top 5 most active people + activity counts
- Current active blockers with owners
- Recent decisions (last 3)
- Communication hub status
- Team member count and metric summaries

**When to use:**
- Every morning for standup context
- Before meetings to understand recent activity
- When identifying who's overloaded

**Example integration:**
```python
import json

with open('/data/.openclaw/workspace/.scan/memory-index.json') as f:
    memory = json.load(f)

# Get top 5 most active people
top_people = memory['topPeople']  # List with person name and activityCount

# Get current blockers
blockers = memory['activeBlockers']  # List with workstream, blocker description, owner

# Check key metrics
open_actions = memory['keyMetrics']['openActions']
active_blockers = memory['keyMetrics']['activeBlockers']
```

---

### 2. Action & Blocker Tracking — Use `extracted-sheets.json`

**What it contains:**
- All 31 action items with: item, owner, deadline, status, source, notes
- All 5 decisions with: date, decision, madeBy, rationale, linkedActions
- All 13 workstream priorities with: owner, status, currentFocus, blockers

**When to use:**
- Daily: Monitor for actions > 3 days overdue without update
- Weekly: Update status from source of truth
- When escalating: Cross-reference blocker chain

**Example integration:**
```python
import json
from datetime import datetime, timedelta

with open('/data/.openclaw/workspace/.scan/extracted-sheets.json') as f:
    sheets = json.load(f)

# Find overdue actions
today = datetime.now().date()
overdue = []
for action in sheets['actions']:
    if action['deadline']:
        deadline = datetime.strptime(action['deadline'], '%Y-%m-%d').date()
        if deadline < today and action['status'] != 'Closed':
            overdue.append(action)

# Get all blockers from priorities
all_blockers = []
for priority in sheets['priorities']:
    if priority['blockers']:
        all_blockers.extend(priority['blockers'])
```

---

### 3. Relationship & Collaboration Analysis — Use `relationship-graph.json`

**What it contains:**
- 39 activities logged chronologically with type, date, person, description
- 17 unique people with activity counts
- Collaboration matrix (people pairs with interaction frequencies)
- Critical path (overdue/blocked items with days overdue)
- Patterns: most active people, communication hubs, strongest teams

**When to use:**
- Weekly: Check who's most active (may be overloaded)
- When staffing: Understand existing collaboration patterns
- In crisis: Identify strongest teams for rapid response

**Example integration:**
```python
import json

with open('/data/.openclaw/workspace/.scan/relationship-graph.json') as f:
    graph = json.load(f)

# Find people who are overloaded (high activity)
people_by_activity = sorted(
    graph['relationships'],
    key=lambda p: p['activityCount'],
    reverse=True
)

# Get collaboration matrix (who works well together)
collaborations = graph['collaborationMatrix']
# Each entry: { people: [name1, name2], interactionCount: N }

# Critical path (what might be blocking progress)
critical = graph['criticalPath']
# Each entry: { item, owner, deadline, status, daysOverdue }
```

---

### 4. Slack Context — Use `slack-channels.json`

**What it contains:**
- 9 channels with: name, members, messageCount, keyParticipants, lastActivity
- Decisions mentioned in each channel
- Blockers mentioned in each channel
- Related channels (cross-links)
- Summary: total messages, most active channel, average messages/channel

**When to use:**
- Before posting important decisions (confirm right channel)
- When onboarding new people (explain channel ecosystem)
- Identifying which channels have stale conversations

**Example integration:**
```python
import json

with open('/data/.openclaw/workspace/.scan/slack-channels.json') as f:
    slack = json.load(f)

# Get channel for a given topic
topic_to_channels = {
    'fundraising': ['fundraising', 'financing-and-debt'],
    'operations': ['operations', 'all-bifrost-sovereign'],
    'gtm': ['gtm', 'all-bifrost-sovereign'],
}

# Find key participants for a channel
channel = next(c for c in slack['channels'] if c['name'] == 'operations')
key_people = channel['keyParticipants']  # Top 3

# Message volume for trending
for ch in sorted(slack['channels'], key=lambda c: c['messageCount'], reverse=True):
    print(f"{ch['name']}: {ch['messageCount']} messages")
```

---

### 5. Google Drive Navigation — Use `drive-structure.json` + `drive-files-index.json`

**Use `drive-structure.json` for:**
- Understanding folder hierarchy
- Finding which folders contain files
- Understanding ownership structure

**Use `drive-files-index.json` for:**
- Quick file lookup by name
- Finding files by folder
- Checking last modification dates

**Example integration:**
```python
import json

with open('/data/.openclaw/workspace/.scan/drive-structure.json') as f:
    structure = json.load(f)

# List all folders
for folder in structure['root']['folders']:
    print(f"{folder['name']}: {len(folder['files'])} files")

# Find files by folder
with open('/data/.openclaw/workspace/.scan/drive-files-index.json') as f:
    index = json.load(f)

# Find most recently modified files
recent_files = sorted(
    index['files'],
    key=lambda f: f.get('modifiedTime', ''),
    reverse=True
)[:10]

# Find files in a specific folder
karen_files = [f for f in index['files'] if f.get('parentFolder') == 'Karen']
```

---

### 6. People & Entity Lookup — Use `extracted-entities.json`

**What it contains:**
- 24 people with: name, role, focus areas, actionsOwned, decisionsOwned
- 5 workstreams with: name, owner, status, focus areas
- 5 decisions with: date, decision, madeBy, rationale
- Workstream blockers with severity

**When to use:**
- Identifying right person for a task
- Understanding past decisions
- Workstream status checks

**Example integration:**
```python
import json

with open('/data/.openclaw/workspace/.scan/extracted-entities.json') as f:
    entities = json.load(f)

# Find person responsible for a focus area
def find_owner(focus_area):
    for person in entities['people']:
        if focus_area in [f.lower() for f in person.get('focus', [])]:
            return person['name']
    return None

# Get workstream status
def get_workstream(name):
    return next((w for w in entities['workstreams'] if w['name'] == name), None)

# Find critical blockers
critical_blockers = [b for b in entities['blockers'] if b['severity'] == 'critical']
```

---

## Refresh & Maintenance

### Weekly Refresh
```bash
# Re-run the extraction to get latest data from Sheets
cd /data/.openclaw/workspace
node /tmp/scan-sheets.js
node /tmp/extract-entities.js
```

### When to Re-Scan
- **Daily:** Use cached `memory-index.json`
- **Weekly:** Re-run Sheets extraction (Actions, Decisions updated frequently)
- **Monthly:** Full scan (includes Drive structure + relationship analysis)

---

## Query Examples

### "Who's overloaded?"
```python
# Use relationship-graph.json
for person in graph['relationships']:
    if person['activityCount'] > 10:
        print(f"{person['name']}: {person['activityCount']} activities")
```

### "What's blocking us?"
```python
# Use extracted-sheets.json or memory-index.json
for blocker in sheets['blockers']:
    if not blocker.get('resolved'):
        print(f"{blocker['description']} ({blocker['owner']})")
```

### "Who should be in this meeting?"
```python
# Use slack-channels.json or relationship-graph.json
# Find people who've recently collaborated on similar topics
topic_people = set()
for channel in slack['channels']:
    if relevant_channel(channel['name']):
        topic_people.update(channel['keyParticipants'])
```

### "What decisions have we made about X?"
```python
# Use extracted-entities.json
for decision in entities['decisions']:
    if 'relevant_keyword' in decision['decision'].lower():
        print(f"Decision: {decision['decision']}")
        print(f"By: {decision['madeBy']} on {decision['date']}")
        print(f"Rationale: {decision['rationale']}")
```

---

## Common Integration Patterns

### Pattern 1: Daily Standup Automation
```
1. Load memory-index.json
2. Extract top 3 most active people
3. Extract active blockers < 3 days old
4. Get recent decisions (past 5 days)
5. Report in Slack with @mentions for owners
```

### Pattern 2: Action Item Tracking Bot
```
1. Load extracted-sheets.json
2. Filter actions where deadline < today AND status != 'Closed'
3. Group by owner
4. Post reminder in Slack per person
5. Update status weekly from source of truth
```

### Pattern 3: Meeting Context Injection
```
1. Parse meeting title for keywords
2. Load slack-channels.json, find related channels
3. Extract keyParticipants from those channels
4. Load relationship-graph.json, add strong collaborators
5. Create attendance recommendation + recent context
```

### Pattern 4: File Discovery
```
1. User asks "where's the X document?"
2. Load drive-files-index.json
3. Fuzzy match on filename
4. Return folder + modification date
5. If not found, suggest related documents
```

---

## Data Refresh Cadence

| Source | Refresh Interval | Update Trigger | Responsibility |
|--------|------------------|-----------------|-----------------|
| memory-index.json | Daily | Manual or weekly scan | Karen/Automation |
| extracted-sheets.json | Weekly | New actions/decisions | Karen/Automation |
| relationship-graph.json | Weekly | Activity log updates | Karen/Automation |
| slack-channels.json | Monthly | New channels created | Karen/Manual |
| drive-structure.json | Monthly | New folders created | Karen/Manual |
| extracted-entities.json | Monthly | Workstream changes | Karen/Manual |

---

## Troubleshooting

### "My query returned nothing"
1. Check the file exists: `ls -la /data/.openclaw/workspace/.scan/`
2. Verify JSON structure: `python -m json.tool < filename.json`
3. Check date filters (dates are ISO 8601: `YYYY-MM-DD`)
4. Confirm key names match the schema

### "Data feels stale"
1. Check scan timestamp in each file
2. Re-run weekly extraction if > 7 days old
3. Verify source of truth (Google Sheets) was updated recently
4. Check last `modifiedTime` in drive-files-index.json

### "Person X isn't showing up in relationships"
1. They may have no recent activities (check extracted-sheets.json)
2. They may be new and not yet in action items
3. Check spelling against SOUL.md and USER.md rosters

---

## Questions?

- **For data interpretation:** See SCAN_SUMMARY.md
- **For complete file inventory:** See MANIFEST.md
- **For quick start:** See README.md
- **For schema details:** See SCHEMA_DESIGN.md

---

_Karen's graph memory system | Bifrost Sovereign_
