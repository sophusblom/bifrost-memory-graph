# Karen Memory Graph — Enhanced Schema Design

## Node Types

### Person
- Fields: name, role, email, slack_handle, linkedin, notes
- Examples: Sacha Obeegadoo, Peter Damm, Florian Fournier
- Relationships: works_for, co_founder_of, reports_to, owns, leads

### Meeting
- Fields: title, date, time, duration, attendees, agenda, decisions, blockers, notes, slack_thread_url, recording_url
- Examples: Monday All Hands, GTM War Room, Ops Close
- Relationships: includes (people), discusses (topics), produces (decisions), surfaces (blockers)

### Decision
- Fields: title, date, made_by, rationale, affected_workstreams, status, slack_source_url
- Examples: "Shift GTM focus to enterprise", "Defer hiring until Series A"
- Relationships: made_in (meeting), affects (workstream), supersedes (decision), depends_on (decision)

### BusinessFunction
- Fields: name, owner, priority, status, current_focus, blockers, last_updated, slack_channel_url
- Examples: GTM, Operations, R&D, Fundraising, Product
- Relationships: owned_by (person), includes (topics), has_blockers, depends_on

### ActionItem
- Fields: title, owner, deadline, status, created_date, due_date, completed_date, source_meeting, slack_url
- Examples: "Content calendar", "Investor data room", "Entity structure confirmation"
- Relationships: owned_by (person), due_in (business_function), blocks (business_function), resolves (blocker)

### File
- Fields: name, url, owner, created_date, last_modified_date, description, type, size, folder_path
- Examples: Priority Map (Sheet), Action Log (Sheet), Meeting Notes (Doc)
- Relationships: created_by (person), stored_in (business_function), references (topic/decision)

### Topic
- Fields: name, type (concept, problem, infrastructure, etc.), description, status
- Examples: "Visionary Launcher Profile", "Google Drive Infrastructure", "Action Follow-Through Problem"
- Relationships: discussed_in (meeting), affects (business_function), resolved_by (decision)

### Blocker
- Fields: title, severity (high/medium/low), created_date, created_in_meeting, owner, status, affects
- Examples: "Investor data room not shared", "Hiring delayed pending fundraising"
- Relationships: surfaces_in (meeting), owned_by (person), affects (business_function), blocks (action_item)

## Edge Types (Relationships)

**Person-focused:**
- person → person | works_with, reports_to, paired_with
- person → meeting | attends, owns, facilitates
- person → business_function | owns, leads, contributes_to
- person → action_item | owns, assigned_to
- person → file | created, owns, last_modified_by

**Meeting-focused:**
- meeting → decision | produces
- meeting → blocker | surfaces
- meeting → action_item | generates
- meeting → business_function | reviews, discusses
- meeting → person | attendee, presenter

**Decision-focused:**
- decision → business_function | affects
- decision → decision | supersedes, depends_on
- decision → meeting | made_in
- decision → person | made_by
- decision → action_item | requires

**BusinessFunction-focused:**
- business_function → person | owned_by
- business_function → blocker | has_blocker
- business_function → action_item | includes
- business_function → business_function | depends_on

**File-focused:**
- file → person | created_by, owned_by, last_modified_by
- file → business_function | stored_in, serves
- file → decision | documents
- file → meeting | generated_from, references

**Temporal attributes on all edges:**
- created_date, last_updated, source (slack thread, meeting, etc.)

## What Gets Auto-Extracted from Slack

From message history:
- **Mentions** → person nodes
- **Decisions** (keywords: "decided", "we will", "action item") → decision nodes
- **Blockers** (keywords: "blocker", "blocked by", "stuck", "waiting on") → blocker nodes
- **Action items** (keywords: "action item", "owns", "deadline") → action nodes
- **Meetings** (channel names like #gtm-war-room, or scheduled events) → meeting nodes
- **File references** (links to Drive docs/sheets) → file nodes
- **Business functions** (channel structure: #gtm, #operations, etc.) → business_function nodes

## What Gets Auto-Extracted from Google Drive

From folder/file structure:
- **Folders** → business_function nodes (01 - Operations → Operations function)
- **Sheets** → file nodes (Action Log, Priority Map, Decision Log)
- **Docs** → file nodes (Meeting Notes, Strategy docs)
- **Metadata** (owner, created date, last modified, collaborators) → timestamps + person links

## Example Graph After Population

```
Sacha Obeegadoo (person)
  ├─ owns → GTM (business_function)
  ├─ attends → Monday All Hands (meeting, 2026-04-01)
  ├─ assigned_to → "Pitch deck refinement" (action_item, due 2026-04-05)
  └─ capacity_protected_for → Operating Cadence (topic)

GTM (business_function)
  ├─ owned_by → Sacha Obeegadoo (person)
  ├─ has_blocker → "No warm intros to enterprise prospects" (blocker, severity: high)
  ├─ discussed_in → GTM War Room (meeting, 2026-04-02)
  └─ affects ← Fundraising Round (topic)

GTM War Room (meeting, 2026-04-02)
  ├─ attendees → Sacha, Peter, Karen
  ├─ produces → "Focus pipeline on mid-market" (decision)
  ├─ surfaces → "Pipeline thin below €100k" (blocker)
  ├─ generates → "Run ABM pilot with 5 targets" (action_item, owner: Sacha, due: 2026-04-09)
  └─ documents → GTM Pipeline Dec (file, sheet)

Action Log (file)
  ├─ created_by → Karen (person)
  ├─ stored_in → Operations (business_function)
  ├─ references → Multiple action_items and decisions
  └─ last_modified → 2026-04-02 20:45 UTC
```

## Integration Points

- **Slack** feeds: person mentions, decisions, blockers, action items, meeting discussions
- **Google Drive** feeds: file metadata, ownership, business function structure, decision documents
- **Manual entry** (Karen): meeting summaries, decision rationale, blocker severity/priority
- **Automated links** (graph-rules.md): relationships inferred from context

## Visualization Layers

In the viewer, toggle between:
1. **People network** — who knows who, who works with who
2. **Decision tree** — what was decided, when, what came from it
3. **Blocker dashboard** — what's blocking progress, who owns it, when added
4. **Action tracker** — open items, owners, deadlines, status
5. **Business function overview** — org structure, health, dependencies
6. **Timeline** — chronological view of decisions, meetings, key events

---

**Status:** DESIGN DRAFT  
**Next:** Scan results → populate nodes/edges → test viewer
