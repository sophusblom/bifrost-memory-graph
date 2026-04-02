# McKinsey Design System

## Layout Constants

Copy this block verbatim at the top of every script. Never hardcode y-positions inline.

```javascript
// ═══ LAYOUT CONSTANTS — COPY THIS BLOCK INTO EVERY SCRIPT ════════════════════
// These values are fixed. All slides use them without exception.
// They exist to prevent overlapping elements and ensure consistent spacing.
const L = {
  slideW: 10,
  slideH: 5.625,

  // Title zone — sized for worst-case 2-line title at 20pt bold
  TITLE_X:        0.55,
  TITLE_Y:        0.20,
  TITLE_W:        8.9,
  TITLE_H:        0.75,   // Do not reduce. Handles 2 lines of 20pt bold.

  // Context line (optional small text below title, above divider)
  CTX_Y:          0.95,
  CTX_H:          0.16,

  // Divider — ALWAYS full bleed (edge to edge), ALWAYS at this Y
  DIV_X:          0,
  DIV_Y:          1.12,
  DIV_W:          10,

  // Content zone — NOTHING may start above CONTENT_Y. This is the law.
  CONTENT_X:      0.55,
  CONTENT_Y:      1.30,   // absolute floor for all content
  CONTENT_W:      8.9,
  CONTENT_H:      3.65,   // reaches 4.95, just above footer

  // "So What" insight box (when present, replaces bottom of content)
  SOWHAT_Y:       4.40,
  SOWHAT_H:       0.52,

  // Source citation
  SOURCE_Y:       5.04,
  SOURCE_H:       0.18,

  // Footer
  FOOTER_LINE_Y:  5.20,
  FOOTER_Y:       5.25,
  FOOTER_H:       0.22,
};
// ═════════════════════════════════════════════════════════════════════════════
```

---

## Color Palette

```javascript
const COLORS = {
  // Backgrounds
  white:        "FFFFFF",   // Slide background (always)
  offWhite:     "FAFAFA",   // Subtle section backgrounds
  lightGray:    "F5F5F5",   // Table stripes, card backgrounds
  bgBlue:       "F8FAFC",   // Conclusion boxes, column content areas

  // Text
  black:        "1A1A2E",   // Primary text (near-black)
  darkGray:     "333333",   // Secondary text
  midGray:      "666666",   // Captions, annotations
  lightGray:    "999999",   // Footer, source citations, muted labels

  // McKinsey Brand Blue
  navyDark:     "0D2B55",   // Section divider backgrounds, deep accents
  navyPrimary:  "173D73",   // Primary navy — headers, chart bars, key elements
  navyLight:    "2E5FA3",   // Lighter navy — secondary accents

  // Accent Colors (use sparingly — one per slide max)
  accentRed:    "C1121F",   // Negative indicators, decline, warnings
  accentOrange: "F37C21",   // Caution, secondary highlight
  accentGreen:  "2E7D32",   // Positive indicators, growth, increase
  accentTeal:   "00695C",   // Alternative positive accent

  // Chart Color Sequence (use in this order for multi-series)
  chartC1:      "173D73",   // Series 1 — navy
  chartC2:      "F37C21",   // Series 2 — orange
  chartC3:      "2E7D32",   // Series 3 — green
  chartC4:      "C1121F",   // Series 4 — red
  chartC5:      "6A6A6A",   // Series 5 — gray

  // Section divider slide background
  sectionBg:    "0D2B55",
};
```

### Color Application Rules
- **Background**: Always white `FFFFFF` for content slides
- **Section dividers**: Navy `0D2B55` background with white text
- **Title text**: Near-black `1A1A2E` on white slides; white `FFFFFF` on navy slides
- **One accent color per slide** — never mix red + green + orange
- **Charts**: Start with navy `173D73`, use sequence above for additional series
- **Positive/negative encoding**: Green = good/increase, Red = bad/decrease

---

## Typography

McKinsey uses Arial exclusively. Never substitute Calibri, Helvetica, or any other font.

### Type Scale

| Role | Size | Weight | Color | Notes |
|------|------|--------|-------|-------|
| Slide title | 20pt | Bold | `1A1A2E` | Max two lines; shorten if longer |
| Section title (divider slide) | 32pt | Bold | `FFFFFF` | On navy background |
| Context line | 10pt | Regular | `666666` | Optional, below title, above divider |
| Body text | 12pt | Regular | `1A1A2E` | Primary bullet text |
| Sub-bullet | 11pt | Regular | `333333` | Second-level indent |
| Column header | 13pt | Bold | `FFFFFF` | On navy card in 3-col layouts |
| Chart axis labels | 10pt | Regular | `666666` | Muted, not competing |
| Data labels | 10pt | Bold | `1A1A2E` | On/near chart bars |
| Table header | 11pt | Bold | `FFFFFF` | On navy header row |
| Table body | 11pt | Regular | `1A1A2E` | In data rows |
| Footer | 8pt | Regular | `999999` | Left: page num, right: confidential |
| Source citation | 9pt | Italic | `999999` | "Source: X" at bottom of slide |
| Big stat callout | 36pt | Bold | `173D73` | For impact numbers |
| Stat callout label | 11pt | Regular | `666666` | Below the big stat number |

### Punctuation Rule
**No em dashes (—) ever.** Use en dashes (–) for ranges, semicolons to join clauses.

---

## Slide Components

### addSlideTitle()
Every content slide uses this function. It enforces the locked header zone.

```javascript
function addSlideTitle(slide, titleText, contextLine = null) {
  // Title text box — valign top so 1-line or 2-line titles both anchor from top
  slide.addText(titleText, {
    x: L.TITLE_X, y: L.TITLE_Y, w: L.TITLE_W, h: L.TITLE_H,
    fontFace: "Arial", fontSize: 20, bold: true,
    color: "1A1A2E", align: "left", valign: "top",
    margin: 0,
  });

  // Optional context line (small explanatory text below title, above divider)
  if (contextLine) {
    slide.addText(contextLine, {
      x: L.TITLE_X, y: L.CTX_Y, w: L.TITLE_W, h: L.CTX_H,
      fontFace: "Arial", fontSize: 10,
      color: "666666", align: "left", valign: "top",
      margin: 0,
    });
  }

  // Divider — full bleed, always at L.DIV_Y
  slide.addShape(pres.shapes.LINE, {
    x: L.DIV_X, y: L.DIV_Y, w: L.DIV_W, h: 0,
    line: { color: "CCCCCC", width: 0.75 },
  });
}
```

### addSlideFooter()
Apply to every content slide (not title or section divider slides).

```javascript
function addSlideFooter(slide, pageNum, totalPages, label = "Confidential") {
  // Footer separator line
  slide.addShape(pres.shapes.LINE, {
    x: 0, y: L.FOOTER_LINE_Y, w: 10, h: 0,
    line: { color: "DDDDDD", width: 0.5 },
  });

  // Left: page number
  slide.addText(String(pageNum), {
    x: 0.55, y: L.FOOTER_Y, w: 0.5, h: L.FOOTER_H,
    fontFace: "Arial", fontSize: 8, color: "999999",
    align: "left", margin: 0,
  });

  // Center: label
  slide.addText(label, {
    x: 3.5, y: L.FOOTER_Y, w: 3, h: L.FOOTER_H,
    fontFace: "Arial", fontSize: 8, color: "999999",
    align: "center", margin: 0,
  });

  // Right: date
  const today = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });
  slide.addText(today, {
    x: 8.0, y: L.FOOTER_Y, w: 1.45, h: L.FOOTER_H,
    fontFace: "Arial", fontSize: 8, color: "999999",
    align: "right", margin: 0,
  });
}
```

### addSource()
Add to any slide containing data, charts, or statistics.

```javascript
function addSource(slide, sourceText) {
  slide.addText("Source: " + sourceText, {
    x: L.CONTENT_X, y: L.SOURCE_Y, w: L.CONTENT_W, h: L.SOURCE_H,
    fontFace: "Arial", fontSize: 9, italic: true,
    color: "999999", align: "left", margin: 0,
  });
}
```

### addSoWhatBox()
Key takeaway callout at the bottom of a findings slide.

```javascript
function addSoWhatBox(slide, insightText) {
  const x = L.CONTENT_X, y = L.SOWHAT_Y, w = L.CONTENT_W, h = L.SOWHAT_H;

  // Left accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.06, h,
    fill: { color: "173D73" }, line: { color: "173D73", width: 0 },
  });

  // Light background
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x + 0.06, y, w: w - 0.06, h,
    fill: { color: "EEF3FB" }, line: { color: "C5D5EA", width: 0.5 },
  });

  // Insight text
  slide.addText(insightText, {
    x: x + 0.20, y: y + 0.02, w: w - 0.28, h: h - 0.04,
    fontFace: "Arial", fontSize: 11, bold: true,
    color: "0D2B55", valign: "middle", margin: 0,
  });
}
```

### addBulletBlock()
Standard McKinsey bullet treatment.

```javascript
function addBulletBlock(slide, bullets, opts = {}) {
  const {
    x = L.CONTENT_X,
    y = L.CONTENT_Y,
    w = L.CONTENT_W,
    h = L.CONTENT_H,
    fontSize = 12,
  } = opts;

  const items = bullets.map((b, i) => ({
    text: typeof b === "string" ? b : b.text,
    options: {
      bullet: { indent: 15 },
      fontFace: "Arial",
      fontSize,
      color: typeof b === "string" ? "1A1A2E" : (b.color || "1A1A2E"),
      bold: typeof b !== "string" && !!b.bold,
      paraSpaceAfter: 6,
      breakLine: i < bullets.length - 1,
    },
  }));

  slide.addText(items, { x, y, w, h, valign: "top" });
}
```

### addStatCallout()
For featuring a key metric prominently.

```javascript
function addStatCallout(slide, number, label, opts = {}) {
  const { x = L.CONTENT_X, y = L.CONTENT_Y, w = 2.5 } = opts;

  slide.addText(number, {
    x, y, w, h: 0.85,
    fontFace: "Arial", fontSize: 38, bold: true,
    color: "173D73", align: "center", valign: "middle", margin: 0,
  });

  slide.addText(label, {
    x, y: y + 0.82, w, h: 0.35,
    fontFace: "Arial", fontSize: 11,
    color: "666666", align: "center", margin: 0,
  });
}
```

---

## Chart Styling

```javascript
const CHART_BASE = {
  chartArea: { fill: { color: "FFFFFF" }, border: { pt: 0 } },
  plotArea:  { fill: { color: "FFFFFF" } },

  catAxisLabelColor:   "666666",
  catAxisLabelFontFace: "Arial",
  catAxisLabelFontSize: 10,
  catAxisLineShow:     false,

  valAxisLabelColor:   "666666",
  valAxisLabelFontFace: "Arial",
  valAxisLabelFontSize: 10,

  valGridLine: { color: "EEEEEE", size: 0.5 },
  catGridLine: { style: "none" },

  showValue:         true,
  dataLabelFontFace: "Arial",
  dataLabelFontSize: 10,
  dataLabelColor:    "1A1A2E",

  legendFontFace: "Arial",
  legendFontSize: 10,
  legendPos:      "b",
};

// Single-series bar
const CHART_BAR_SINGLE = {
  ...CHART_BASE,
  chartColors: ["173D73"],
  showLegend:  false,
};

// Multi-series bar or line
const CHART_MULTI = {
  ...CHART_BASE,
  chartColors: ["173D73", "F37C21", "2E7D32", "C1121F", "6A6A6A"],
  showLegend:  true,
};
```

---

## Table Styling

```javascript
function buildTable(slide, headers, rows, opts = {}) {
  const {
    x = L.CONTENT_X,
    y = L.CONTENT_Y,
    w = L.CONTENT_W,
    colW = null,
  } = opts;

  const headerRow = headers.map(h => ({
    text: h,
    options: {
      bold: true, fontFace: "Arial", fontSize: 11,
      color: "FFFFFF", fill: { color: "173D73" }, align: "center",
    },
  }));

  const dataRows = rows.map((row, rowIdx) =>
    row.map(cell => ({
      text: String(cell),
      options: {
        fontFace: "Arial", fontSize: 11, color: "1A1A2E",
        fill: { color: rowIdx % 2 === 0 ? "FFFFFF" : "F5F7FA" },
      },
    }))
  );

  slide.addTable([headerRow, ...dataRows], {
    x, y, w,
    colW: colW || headers.map(() => w / headers.length),
    border: { type: "solid", pt: 0.5, color: "DDDDDD" },
    rowH: 0.36,
  });
}
```

---

## Column Configurations

```javascript
// Two-column layout (both start at L.CONTENT_Y)
const TWO_COL = {
  leftX:  L.CONTENT_X,  leftW:  4.15,
  rightX: 4.90,          rightW: 4.60,
  divX:   5.0,
};

// Three-column layout (all start at L.CONTENT_Y)
const THREE_COL = {
  colW:  2.80,
  col1X: 0.55,
  col2X: 3.55,
  col3X: 6.55,
};
```
