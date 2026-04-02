---
name: mckinsey-pptx
description: >
  Creates polished McKinsey-style PowerPoint presentations (.pptx) for any use case — strategy decks, board updates, client proposals, market analysis, operational reviews, and more. Produces authentic consulting-grade slides with the hallmark McKinsey aesthetic: clean white backgrounds, Arial typography, structured frameworks, and precise information hierarchy. Use this skill whenever the user wants a presentation that looks like it came out of a top-tier management consulting firm — even if they don't say "McKinsey" explicitly. Trigger on requests like "make a professional deck," "create a strategy presentation," "build a consultant-style slideshow," "put together slides for our board," "make a pitch deck that looks polished," or any request for a high-quality, business-quality presentation. Prefer this over the generic PPTX skill when the user wants executive, consulting, or boardroom-quality output.
---

# McKinsey-Style PPTX Skill

## Before Starting

1. **Read the PPTX skill**: `/sessions/festive-vibrant-newton/mnt/.skills/skills/pptx/SKILL.md` — for technical execution guidance (pptxgenjs, QA, image conversion)
2. **Read the design system**: `references/design-system.md` — for exact colors, fonts, spacing specs, and component library
3. **Read the slide playbook**: `references/slide-playbook.md` — for slide type patterns and PptxGenJS code examples

---

## The Three Hard Rules

These are non-negotiable. Every slide must pass all three before the file is written.

### Rule 1: Locked Header Zone

The header zone is fixed. Every content slide uses these exact constants — no adjustments per slide type:

| Constant | Value | Purpose |
|----------|-------|---------|
| `TITLE_Y` | `0.20"` | Title text box top |
| `TITLE_H` | `0.75"` | Tall enough for 2-line titles at 20pt |
| `DIV_Y` | `1.12"` | Divider line — always here, never moves |
| `DIV_X / DIV_W` | `0" / 10"` | Full bleed edge to edge, not inset |
| `CONTENT_Y` | `1.30"` | Where all content begins |

The divider being full-bleed (edge to edge, not inset to the margin) is intentional — it anchors the whole slide structurally.

### Rule 2: Nothing Above CONTENT_Y

`CONTENT_Y = 1.30"` is an absolute floor. No element — bullets, column headers, chart top, table top, shape top — may begin above this line. This is what prevents overlapping when titles wrap to two lines.

The title box is sized for a worst-case two-line title. Content always starts below the divider with breathing room. These positions never change regardless of slide type.

If a title is unusually long (3+ lines), shorten it. Titles must fit within two lines.

### Rule 3: No Em Dashes

Em dashes (—) are never used anywhere on any slide. Not in titles, bullets, callouts, footers, or source citations. Use instead:
- **En dash (–)** for ranges: "Year 1–5", "2010–2023", "$40–50B"
- **Semicolon (;)** to join two clauses in a title: "Costs rising; margins at risk"
- **Comma or hyphen** for sentence-level breaks

---

## McKinsey Design Philosophy

McKinsey slides communicate one thing above all else: rigorous, structured thinking. Every design choice serves that goal.

The aesthetic is intentionally restrained — white space is generous, decoration is absent, and the data carries the weight. What makes these slides look authoritative is not visual complexity but discipline: consistent spacing, clean hierarchy, precise alignment.

Five principles guide every decision:

1. **One message per slide** — the title states the conclusion, not just the topic ("Revenue declined 12% due to churn" not "Revenue Analysis")
2. **Vertical scannability** — a reader skimming down the left side should grasp the story
3. **Show, don't decorate** — every visual element must earn its place by communicating data or structure
4. **Hierarchy through size and weight** — never through color or decoration alone
5. **White space is content** — crowded slides signal unclear thinking

---

## Workflow

### Step 1: Understand the Story Arc

Before touching any slide, establish:
- What is the central message? (one sentence)
- Who is the audience? (board, client, internal team)
- What is the desired action? (approve, understand, decide)
- How many slides? (typical: 8–15 for a focused deck; up to 40 for a full report)

McKinsey decks are typically structured as:
1. **Title slide** — engagement, date, confidentiality
2. **Executive summary** — 3–5 bullet conclusions (the "so what")
3. **Agenda / table of contents**
4. **Section dividers** (one per major chapter)
5. **Content slides** (data, analysis, findings)
6. **Appendix** (optional detailed backup)

### Step 2: Plan the Slide Types

For each slide, choose the right layout from the playbook (see `references/slide-playbook.md`):

**Structure**
- **Title slide** (#1): Company/engagement context
- **Section divider** (#2): Full navy background with white title
- **Executive summary** (#3): Numbered conclusions in a shaded box
- **Findings slide** (#4): Conclusion title + evidence bullets

**Data & charts**
- **Chart slide** (#5): One chart with context and source
- **Waterfall / bridge chart** (#11): Sequential cost or value bridge (P&L, market-share shift)
- **KPI Dashboard** (#13): 4–8 headline metrics with trend and vs-target status

**Comparisons & frameworks**
- **Two-column** (#6): Side-by-side comparison or text + data
- **Three-column** (#7): Three parallel pillars, options, or phases
- **Four-column** (#17): Quad-framework (4 pillars, capabilities, priorities)
- **Options comparison table** (#14): Harvey-ball style matrix with full/partial/none scoring
- **2×2 matrix** (#8): Portfolio, risk, or positioning analysis
- **Table slide** (#10): Structured data comparison

**Process & logic**
- **Process / timeline** (#9): Sequence of steps with arrows
- **Gantt / roadmap** (#12): Horizontal bar roadmap with phase groups
- **Issue tree** (#15): MECE problem decomposition, left-to-right hierarchy

**Impact**
- **Billboard** (#16): Single powerful statement or pivotal insight
- **Recommendation** (#18): Crisp recommendation + rationale, alternatives, risks

### Step 3: Write Titles as Conclusions

Every content slide title is the so-what insight, not a label.

| Topic title (wrong) | Conclusion title (right) |
|---------------------|--------------------------|
| Market Share Analysis | Competitor X gained 8 pts of share in 3 years |
| Cost Structure | Manufacturing costs 40% above industry benchmark |
| Customer Feedback | NPS fell 22 pts, driven by onboarding failures |

Keep titles to two lines maximum. If a title requires three lines, it is trying to say two things; split the slide.

### Step 4: Build the Slides (PptxGenJS)

Use the PptxGenJS approach from the PPTX skill. The design system file has exact coordinates, colors, and font specs. The playbook has code templates for each slide type.

Key implementation notes:
- **Copy the `L` layout constants block verbatim** into every script — never hardcode y-positions inline
- **Use `addSlideTitle()` for every content slide** — it enforces Rule 1 automatically
- **Pass `L.CONTENT_Y` as the `y` for all content** — bullets, charts, column headers, tables, shapes
- **Always use the McKinsey color palette** — never default to generic blue or red
- **Set `fontFace: "Arial"`** on every text element
- **Left-align all body text** — centered body text looks amateur
- **Apply the standard footer** on every content slide
- **Source citations** belong at the bottom of any slide with data
- **No em dashes anywhere** — see Rule 3

### Step 5: QA

Follow the QA process from the PPTX skill: convert to images, inspect visually, fix, re-verify. McKinsey-specific issues to catch:
- Any element starting above `CONTENT_Y = 1.30"` — fix immediately
- Title wrapping to 3 lines — shorten the title
- Em dash (—) appearing anywhere — replace with en dash, semicolon, or comma
- Divider line not going edge to edge — fix x to 0, w to 10
- Footer missing on any content slide
- Chart colors not matching the palette
- Source citation missing on data slides

---

## Quick Design Cheat Sheet

| Element | Value |
|---------|-------|
| Slide size | 10" x 5.625" (LAYOUT_16x9) |
| Background | White `FFFFFF` |
| Title Y | `0.20"` |
| Title H | `0.75"` (2-line safe) |
| Title font | Arial Bold 20pt, `1A1A2E` |
| Divider Y | `1.12"` (fixed, always) |
| Divider | Full bleed: x=0, w=10 |
| Content Y | `1.30"` (nothing above this) |
| Content H | `3.65"` |
| Footer line Y | `5.20"` |
| Footer font | Arial 8pt, gray `999999` |
| Body font | Arial Regular 12pt, `1A1A2E` |
| Primary navy | `173D73` |
| Accent red | `C1121F` |
| Accent orange | `F37C21` |
| Accent green | `2E7D32` |
| Light gray bg | `F5F5F5` |

See `references/design-system.md` for the full component library.
See `references/slide-playbook.md` for slide-type code patterns.
