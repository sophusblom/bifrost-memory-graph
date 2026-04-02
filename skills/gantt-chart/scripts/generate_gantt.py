#!/usr/bin/env python3
"""
generate_gantt.py — Gantt chart generator for Bifrost Sovereign ops.

Inputs a JSON task file and outputs an SVG Gantt chart.

Usage:
    python3 generate_gantt.py --input tasks.json --output gantt.svg [--title "Project Title"]

Input JSON format:
    [
        {
            "task": "Task name",
            "owner": "Person",
            "start": "2026-04-01",
            "end": "2026-04-15",
            "status": "in_progress"   // "not_started" | "in_progress" | "done" | "blocked"
        },
        ...
    ]
"""

import json
import argparse
import sys
from datetime import date, timedelta


STATUS_COLORS = {
    "done":        "#4CAF50",   # green
    "in_progress": "#2196F3",   # blue
    "not_started": "#9E9E9E",   # grey
    "blocked":     "#F44336",   # red
}
DEFAULT_COLOR = "#9E9E9E"

ROW_HEIGHT = 40
HEADER_HEIGHT = 70
LABEL_WIDTH = 320
DAY_WIDTH = 22
FONT = "Arial, sans-serif"


def parse_date(s):
    return date.fromisoformat(s)


def load_tasks(path):
    with open(path) as f:
        tasks = json.load(f)
    for t in tasks:
        t["start_date"] = parse_date(t["start"])
        t["end_date"] = parse_date(t["end"])
    return tasks


def build_svg(tasks, title):
    if not tasks:
        print("No tasks found.", file=sys.stderr)
        sys.exit(1)

    proj_start = min(t["start_date"] for t in tasks)
    proj_end   = max(t["end_date"]   for t in tasks)
    total_days = (proj_end - proj_start).days + 1

    chart_width  = LABEL_WIDTH + total_days * DAY_WIDTH
    chart_height = HEADER_HEIGHT + len(tasks) * ROW_HEIGHT + 20

    lines = []
    lines.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{chart_width}" height="{chart_height}" font-family="{FONT}">')

    # Background
    lines.append(f'<rect width="{chart_width}" height="{chart_height}" fill="#1a1a2e"/>')

    # Title
    lines.append(f'<text x="{chart_width//2}" y="24" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold">{_esc(title)}</text>')

    # Week separators + day headers
    cur = proj_start
    while cur <= proj_end:
        x = LABEL_WIDTH + (cur - proj_start).days * DAY_WIDTH
        if cur.weekday() == 0:  # Monday
            lines.append(f'<line x1="{x}" y1="{HEADER_HEIGHT}" x2="{x}" y2="{chart_height}" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>')
            label = cur.strftime("%b %d")
            lines.append(f'<text x="{x+2}" y="50" fill="#aaaaaa" font-size="10">{label}</text>')
        cur += timedelta(days=1)

    # Today line
    today = date.today()
    if proj_start <= today <= proj_end:
        tx = LABEL_WIDTH + (today - proj_start).days * DAY_WIDTH
        lines.append(f'<line x1="{tx}" y1="{HEADER_HEIGHT}" x2="{tx}" y2="{chart_height}" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="4,3"/>')
        lines.append(f'<text x="{tx+2}" y="{HEADER_HEIGHT+10}" fill="#FFD700" font-size="9">today</text>')

    # Task rows
    for i, task in enumerate(tasks):
        y = HEADER_HEIGHT + i * ROW_HEIGHT

        # Alternating row background
        if i % 2 == 0:
            lines.append(f'<rect x="0" y="{y}" width="{chart_width}" height="{ROW_HEIGHT}" fill="#ffffff" fill-opacity="0.03"/>')

        # Task label
        owner = task.get("owner", "")
        label = _esc(task["task"])
        owner_str = f" ({_esc(owner)})" if owner else ""
        lines.append(f'<text x="8" y="{y + ROW_HEIGHT//2 + 4}" fill="#dddddd" font-size="12">{label}<tspan fill="#888888" font-size="10">{owner_str}</tspan></text>')

        # Bar
        bar_x = LABEL_WIDTH + (task["start_date"] - proj_start).days * DAY_WIDTH
        bar_w = max(((task["end_date"] - task["start_date"]).days + 1) * DAY_WIDTH, DAY_WIDTH)
        bar_y = y + 6
        bar_h = ROW_HEIGHT - 12
        color = STATUS_COLORS.get(task.get("status", ""), DEFAULT_COLOR)

        lines.append(f'<rect x="{bar_x}" y="{bar_y}" width="{bar_w}" height="{bar_h}" rx="4" fill="{color}" fill-opacity="0.85"/>')

        # Duration label inside bar if wide enough
        days_dur = (task["end_date"] - task["start_date"]).days + 1
        if bar_w > 40:
            mid_x = bar_x + bar_w // 2
            lines.append(f'<text x="{mid_x}" y="{bar_y + bar_h//2 + 4}" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="bold">{days_dur}d</text>')

    # Legend
    legend_y = chart_height - 14
    lx = LABEL_WIDTH
    for status, color in STATUS_COLORS.items():
        lines.append(f'<rect x="{lx}" y="{legend_y - 8}" width="10" height="10" fill="{color}"/>')
        lines.append(f'<text x="{lx + 13}" y="{legend_y}" fill="#aaaaaa" font-size="10">{status.replace("_"," ")}</text>')
        lx += 100

    lines.append('</svg>')
    return "\n".join(lines)


def _esc(s):
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def main():
    parser = argparse.ArgumentParser(description="Generate an SVG Gantt chart from a JSON task list.")
    parser.add_argument("--input",  required=True, help="Path to input JSON file")
    parser.add_argument("--output", required=True, help="Path to output SVG file")
    parser.add_argument("--title",  default="Project Plan", help="Chart title")
    args = parser.parse_args()

    tasks = load_tasks(args.input)
    svg   = build_svg(tasks, args.title)

    with open(args.output, "w") as f:
        f.write(svg)

    print(f"[OK] Gantt chart written to: {args.output} ({len(tasks)} tasks)")


if __name__ == "__main__":
    main()
