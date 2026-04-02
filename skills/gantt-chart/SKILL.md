---
name: gantt-chart
description: Generate SVG Gantt charts from a JSON task list. Use when asked to create a project timeline, Gantt chart, milestone plan, or visual task schedule. Accepts tasks with owner, start date, end date, and status; outputs a dark-themed SVG file ready to share or embed. Triggers on phrases like "create a Gantt chart", "generate a project timeline", "visualise our milestones", "make a schedule chart".
---

# Gantt Chart Generator

Generates a dark-themed SVG Gantt chart from a JSON task list using `scripts/generate_gantt.py`. No external dependencies — pure Python standard library.

## Input format

Create a JSON file with an array of task objects:

```json
[
  {
    "task": "Task name",
    "owner": "Person",
    "start": "2026-04-01",
    "end": "2026-04-15",
    "status": "in_progress"
  }
]
```

Valid `status` values: `not_started` | `in_progress` | `done` | `blocked`

## Generate the chart

```bash
python3 scripts/generate_gantt.py \
  --input tasks.json \
  --output gantt.svg \
  --title "Project Title"
```

Output is a self-contained SVG file.

## Features

- Dark theme (`#1a1a2e` background), readable in Slack/browser previews
- Colour-coded bars by status: green (done), blue (in_progress), grey (not_started), red (blocked)
- Today marker (gold dashed line)
- Week separators with date labels
- Owner shown next to task name
- Duration (days) labelled inside bars when space allows
- Status legend at the bottom

## Workflow

1. Collect task data from the team (or extract from the action log)
2. Write tasks to a `.json` file (ask the user or create from context)
3. Run the script
4. Share the `.svg` file — opens in any browser, embeds in Notion/Google Docs

## Notes

- Dates must be ISO 8601: `YYYY-MM-DD`
- Tasks with missing `owner` or `status` render gracefully (grey bar, no owner label)
- SVG scales with content; no fixed canvas size
