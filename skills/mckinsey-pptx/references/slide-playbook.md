# McKinsey Slide Playbook

Each template below uses the `L` layout constants from `design-system.md`. Copy the `L` block into your script before using any of these functions.

**Key rule**: all content starts at `L.CONTENT_Y` (1.30"). No element — header, bullet, chart top, table top — may appear above this line.

**Punctuation rule**: no em dashes (—) anywhere. Use en dashes (–) for ranges, semicolons for clause breaks.

---

## 1. Title Slide

**When to use**: Always the first slide.

**Design rules**:
- Deep navy background (`0D2B55`)
- Title + subtitle on a dark field, large and bold
- No standard header/divider — this slide is its own zone
- No footer

```javascript
function makeTitleSlide(pres, { title, subtitle, date, client }) {
  const slide = pres.addSlide();
  slide.background = { color: "0D2B55" };

  slide.addText(title, {
    x: 0.9, y: 1.0, w: 8.2, h: 1.5,
    fontFace: "Arial", fontSize: 32, bold: true,
    color: "FFFFFF", align: "left", valign: "top", margin: 0,
  });

  // Rule between title and metadata
  slide.addShape(pres.shapes.LINE, {
    x: 0.9, y: 2.65, w: 8.2, h: 0,
    line: { color: "2E5FA3", width: 1.5 },
  });

  const meta = [client, subtitle, date].filter(Boolean).join("   |   ");
  slide.addText(meta, {
    x: 0.9, y: 2.80, w: 8.2, h: 0.40,
    fontFace: "Arial", fontSize: 13,
    color: "B0C4DE", align: "left", margin: 0,
  });

  slide.addText("Confidential – For internal use only", {
    x: 0.9, y: 5.20, w: 8.2, h: 0.25,
    fontFace: "Arial", fontSize: 9,
    color: "4A6FA5", align: "left", margin: 0,
  });

  return slide;
}
```

---

## 2. Section Divider Slide

**When to use**: At the start of each major section.

```javascript
function makeSectionDivider(pres, { sectionNum, title, description = "" }) {
  const slide = pres.addSlide();
  slide.background = { color: "0D2B55" };

  if (sectionNum) {
    slide.addText(String(sectionNum).padStart(2, "0"), {
      x: 0.8, y: 0.8, w: 1.5, h: 1.1,
      fontFace: "Arial", fontSize: 60, bold: true,
      color: "1E3D6E", align: "left", valign: "top", margin: 0,
    });
  }

  slide.addText(title, {
    x: 0.8, y: sectionNum ? 1.7 : 1.5, w: 8.4, h: 1.4,
    fontFace: "Arial", fontSize: 34, bold: true,
    color: "FFFFFF", align: "left", valign: "top", margin: 0,
  });

  if (description) {
    slide.addText(description, {
      x: 0.8, y: 3.3, w: 7.0, h: 0.8,
      fontFace: "Arial", fontSize: 14,
      color: "B0C4DE", align: "left", margin: 0,
    });
  }

  return slide;
}
```

---

## 3. Executive Summary Slide

**When to use**: Second slide in any deck. Each point is a conclusion, not a topic.

```javascript
function makeExecSummary(pres, { title = "Executive Summary", conclusions, pageNum, total }) {
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  addSlideTitle(slide, title);

  // Shaded conclusions box — starts at L.CONTENT_Y
  const boxH = L.CONTENT_H;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: L.CONTENT_X, y: L.CONTENT_Y, w: L.CONTENT_W, h: boxH,
    fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 0.5 },
  });
  // Left navy accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: L.CONTENT_X, y: L.CONTENT_Y, w: 0.06, h: boxH,
    fill: { color: "173D73" }, line: { color: "173D73", width: 0 },
  });

  const rowH = boxH / conclusions.length;
  conclusions.forEach((text, i) => {
    const y = L.CONTENT_Y + 0.04 + i * rowH;

    slide.addText(String(i + 1), {
      x: L.CONTENT_X + 0.12, y: y + rowH * 0.08, w: 0.30, h: rowH * 0.75,
      fontFace: "Arial", fontSize: 13, bold: true,
      color: "173D73", align: "center", valign: "middle", margin: 0,
    });

    slide.addText(text, {
      x: L.CONTENT_X + 0.52, y: y + rowH * 0.05, w: 8.8, h: rowH * 0.82,
      fontFace: "Arial", fontSize: 12,
      color: "1A1A2E", valign: "middle", margin: 0,
    });

    if (i < conclusions.length - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: L.CONTENT_X + 0.12, y: y + rowH - 0.01, w: L.CONTENT_W - 0.12, h: 0,
        line: { color: "E2E8F0", width: 0.5 },
      });
    }
  });

  addSlideFooter(slide, pageNum, total);
  return slide;
}
```

---

## 4. Findings / Bullet Slide

**When to use**: Conclusion title + structured evidence bullets. The workhorse of McKinsey decks.

```javascript
function makeFindings(pres, { title, contextLine, bullets, soWhat, source, pageNum, total }) {
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  addSlideTitle(slide, title, contextLine);

  const hasSoWhat = Boolean(soWhat);
  const bulletsH = hasSoWhat
    ? L.SOWHAT_Y - L.CONTENT_Y - 0.10
    : L.CONTENT_H;

  const items = bullets.map((b, i) => ({
    text: typeof b === "string" ? b : b.text,
    options: {
      bullet: { indent: 15 },
      fontFace: "Arial", fontSize: 12,
      color: typeof b === "string" ? "1A1A2E" : (b.color || "1A1A2E"),
      bold: typeof b !== "string" && !!b.bold,
      paraSpaceAfter: 6,
      breakLine: i < bullets.length - 1,
    },
  }));

  slide.addText(items, {
    x: L.CONTENT_X, y: L.CONTENT_Y, w: L.CONTENT_W, h: bulletsH,
    valign: "top",
  });

  if (hasSoWhat) addSoWhatBox(slide, soWhat);
  if (source) addSource(slide, source);
  addSlideFooter(slide, pageNum, total);
  return slide;
}
```

---

## 5. Chart Slide (Single Chart)

**When to use**: One chart per slide. Title states the insight the chart proves.

```javascript
function makeChartSlide(pres, { title, contextLine, chartType, chartData, chartOpts = {}, source, pageNum, total }) {
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  addSlideTitle(slide, title, contextLine);

  const chartH = source ? L.SOURCE_Y - L.CONTENT_Y - 0.08 : L.CONTENT_H;

  const defaultOpts = {
    x: L.CONTENT_X, y: L.CONTENT_Y, w: L.CONTENT_W, h: chartH,
    chartColors: ["173D73", "F37C21", "2E7D32", "C1121F"],
    chartArea: { fill: { color: "FFFFFF" }, border: { pt: 0 } },
    plotArea:  { fill: { color: "FFFFFF" } },
    catAxisLabelColor:    "666666", catAxisLabelFontFace: "Arial", catAxisLabelFontSize: 10,
    valAxisLabelColor:    "666666", valAxisLabelFontFace: "Arial", valAxisLabelFontSize: 10,
    catAxisLineShow: false,
    valGridLine: { color: "EEEEEE", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelFontFace: "Arial", dataLabelFontSize: 10, dataLabelColor: "1A1A2E",
    showLegend: chartData.length > 1,
    legendFontFace: "Arial", legendFontSize: 10, legendPos: "b",
  };

  slide.addChart(pres.charts[chartType] || pres.charts.BAR, chartData, {
    ...defaultOpts,
    ...chartOpts,
  });

  if (source) addSource(slide, source);
  addSlideFooter(slide, pageNum, total);
  return slide;
}
```

---

## 6. Two-Column Slide

**When to use**: Side-by-side comparison, pros/cons, text + supporting data.

```javascript
function makeTwoColumn(pres, { title, contextLine, left, right, divider = true, source, pageNum, total }) {
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  addSlideTitle(slide, title, contextLine);

  // Vertical column divider — starts at L.CONTENT_Y
  if (divider) {
    slide.addShape(pres.shapes.LINE, {
      x: 5.05, y: L.CONTENT_Y, w: 0, h: L.CONTENT_H,
      line: { color: "DDDDDD", width: 0.75 },
    });
  }

  const headerH = 0.32;
  const bodyY_withHeader = L.CONTENT_Y + headerH + 0.08;
  const bodyH_withHeader = L.CONTENT_H - headerH - 0.08;

  // Left column
  if (left.header) {
    slide.addText(left.header, {
      x: L.CONTENT_X, y: L.CONTENT_Y, w: 4.20, h: headerH,
      fontFace: "Arial", fontSize: 13, bold: true,
      color: "173D73", align: "left", margin: 0,
    });
  }
  const leftY = left.header ? bodyY_withHeader : L.CONTENT_Y;
  const leftH = left.header ? bodyH_withHeader : L.CONTENT_H;

  if (left.bullets) {
    const items = left.bullets.map((b, i) => ({
      text: b,
      options: {
        bullet: { indent: 12 }, fontFace: "Arial", fontSize: 12,
        color: "1A1A2E", paraSpaceAfter: 5,
        breakLine: i < left.bullets.length - 1,
      },
    }));
    slide.addText(items, { x: L.CONTENT_X, y: leftY, w: 4.20, h: leftH, valign: "top" });
  } else if (left.text) {
    slide.addText(left.text, {
      x: L.CONTENT_X, y: leftY, w: 4.20, h: leftH,
      fontFace: "Arial", fontSize: 12, color: "1A1A2E", valign: "top", margin: 0,
    });
  }

  // Right column
  if (right.header) {
    slide.addText(right.header, {
      x: 5.25, y: L.CONTENT_Y, w: 4.30, h: headerH,
      fontFace: "Arial", fontSize: 13, bold: true,
      color: "173D73", align: "left", margin: 0,
    });
  }
  const rightY = right.header ? bodyY_withHeader : L.CONTENT_Y;
  const rightH = right.header ? bodyH_withHeader : L.CONTENT_H;

  if (right.bullets) {
    const items = right.bullets.map((b, i) => ({
      text: b,
      options: {
        bullet: { indent: 12 }, fontFace: "Arial", fontSize: 12,
        color: "1A1A2E", paraSpaceAfter: 5,
        breakLine: i < right.bullets.length - 1,
      },
    }));
    slide.addText(items, { x: 5.25, y: rightY, w: 4.30, h: rightH, valign: "top" });
  } else if (right.text) {
    slide.addText(right.text, {
      x: 5.25, y: rightY, w: 4.30, h: rightH,
      fontFace: "Arial", fontSize: 12, color: "1A1A2E", valign: "top", margin: 0,
    });
  }

  if (source) addSource(slide, source);
  addSlideFooter(slide, pageNum, total);
  return slide;
}
```

---

## 7. Three-Column Framework Slide

**When to use**: Three parallel streams, options, pillars, or phases.

```javascript
function makeThreeColumn(pres, { title, contextLine, columns, source, pageNum, total }) {
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  addSlideTitle(slide, title, contextLine);

  const colW    = 2.80;
  const colX    = [0.55, 3.55, 6.55];
  const headerH = 0.52;
  const contentY = L.CONTENT_Y + headerH;
  const contentH = L.CONTENT_H - headerH;

  columns.forEach((col, i) => {
    const x = colX[i];

    // Navy header card — starts at L.CONTENT_Y
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: L.CONTENT_Y, w: colW, h: headerH,
      fill: { color: "173D73" }, line: { color: "173D73", width: 0 },
    });
    slide.addText(col.header, {
      x: x + 0.08, y: L.CONTENT_Y, w: colW - 0.16, h: headerH,
      fontFace: "Arial", fontSize: 13, bold: true,
      color: "FFFFFF", align: "center", valign: "middle", margin: 0,
    });

    // Content area
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: contentY, w: colW, h: contentH,
      fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 0.5 },
    });

    if (col.bullets && col.bullets.length > 0) {
      const items = col.bullets.map((b, bi) => ({
        text: b,
        options: {
          bullet: { indent: 10 }, fontFace: "Arial", fontSize: 11,
          color: "1A1A2E", paraSpaceAfter: 4,
          breakLine: bi < col.bullets.length - 1,
        },
      }));
      slide.addText(items, {
        x: x + 0.14, y: contentY + 0.10, w: colW - 0.24, h: contentH - 0.15,
        valign: "top",
      });
    }
  });

  if (source) addSource(slide, source);
  addSlideFooter(slide, pageNum, total);
  return slide;
}
```

---

## 8. 2x2 Matrix

**When to use**: Portfolio prioritization, risk assessment, positioning analysis.

```javascript
function make2x2Matrix(pres, { title, contextLine, xLabel, yLabel, quadrants, source, pageNum, total }) {
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  addSlideTitle(slide, title, contextLine);

  // Matrix fits within content zone
  const mX = 1.0, mY = L.CONTENT_Y;
  const mW = 7.9, mH = L.CONTENT_H - 0.30;
  const midX = mX + mW / 2;
  const midY = mY + mH / 2;

  const qColors = {
    topLeft: "F8FAFC", topRight: "EBF5EB",
    bottomLeft: "FFF8F0", bottomRight: "FEF0F0",
  };
  const qPos = {
    topLeft:     { x: mX,         y: mY,         w: mW/2 - 0.01, h: mH/2 - 0.01 },
    topRight:    { x: midX + 0.01, y: mY,         w: mW/2 - 0.01, h: mH/2 - 0.01 },
    bottomLeft:  { x: mX,         y: midY + 0.01, w: mW/2 - 0.01, h: mH/2 - 0.01 },
    bottomRight: { x: midX + 0.01, y: midY + 0.01, w: mW/2 - 0.01, h: mH/2 - 0.01 },
  };

  Object.entries(qPos).forEach(([quad, pos]) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      ...pos, fill: { color: qColors[quad] }, line: { color: "CCCCCC", width: 0.5 },
    });
    slide.addText(quadrants[quad] || "", {
      x: pos.x + 0.10, y: pos.y + 0.08, w: pos.w - 0.20, h: 0.28,
      fontFace: "Arial", fontSize: 11, bold: true,
      color: "666666", align: "left", margin: 0,
    });
  });

  // Axis lines
  slide.addShape(pres.shapes.LINE, { x: midX, y: mY,   w: 0,  h: mH, line: { color: "999999", width: 1 } });
  slide.addShape(pres.shapes.LINE, { x: mX,   y: midY, w: mW, h: 0,  line: { color: "999999", width: 1 } });

  // Axis labels
  if (xLabel) {
    slide.addText(xLabel, {
      x: mX, y: mY + mH + 0.08, w: mW, h: 0.25,
      fontFace: "Arial", fontSize: 11, bold: true, color: "333333",
      align: "center", margin: 0,
    });
  }
  if (yLabel) {
    slide.addText(yLabel, {
      x: 0.10, y: mY, w: 0.85, h: mH,
      fontFace: "Arial", fontSize: 11, bold: true, color: "333333",
      align: "center", valign: "middle", rotate: 270, margin: 0,
    });
  }

  if (source) addSource(slide, source);
  addSlideFooter(slide, pageNum, total);
  return slide;
}
```

---

## 9. Process / Timeline Slide

**When to use**: Sequence of steps, phases, or project roadmap.

```javascript
function makeProcessSlide(pres, { title, contextLine, steps, source, pageNum, total }) {
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  addSlideTitle(slide, title, contextLine);

  const n      = steps.length;
  const arrowW = 0.30;
  const gap    = arrowW;
  const boxW   = Math.min(1.65, (L.CONTENT_W - gap * (n - 1)) / n);
  const totalW = n * boxW + (n - 1) * gap;
  const startX = (10 - totalW) / 2;
  // Boxes start at L.CONTENT_Y
  const boxY   = L.CONTENT_Y;
  const boxH   = L.CONTENT_H;

  steps.forEach((step, i) => {
    const x = startX + i * (boxW + gap);
    const hi = !!step.highlight;

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: boxY, w: boxW, h: boxH,
      fill: { color: hi ? "173D73" : "F5F7FA" },
      line: { color: hi ? "173D73" : "CCCCCC", width: 1 },
    });

    slide.addText(String(step.num || i + 1), {
      x, y: boxY + 0.12, w: boxW, h: 0.38,
      fontFace: "Arial", fontSize: 18, bold: true,
      color: hi ? "B0C4DE" : "CCCCCC",
      align: "center", margin: 0,
    });

    slide.addText(step.label, {
      x: x + 0.05, y: boxY + 0.55, w: boxW - 0.10, h: 0.52,
      fontFace: "Arial", fontSize: 12, bold: true,
      color: hi ? "FFFFFF" : "1A1A2E",
      align: "center", margin: 0,
    });

    if (step.description) {
      slide.addText(step.description, {
        x: x + 0.10, y: boxY + 1.12, w: boxW - 0.20, h: boxH - 1.20,
        fontFace: "Arial", fontSize: 10,
        color: hi ? "B0C4DE" : "666666",
        align: "left", valign: "top", margin: 0,
      });
    }

    if (i < n - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: x + boxW + 0.04, y: boxY + boxH / 2, w: gap - 0.08, h: 0,
        line: { color: "999999", width: 1.5, endArrowType: "arrow" },
      });
    }
  });

  if (source) addSource(slide, source);
  addSlideFooter(slide, pageNum, total);
  return slide;
}
```

---

## 10. Table Slide

**When to use**: Structured data comparison, scoring matrix.

See `design-system.md` for the `buildTable()` function. Pass `y: L.CONTENT_Y` always.

---

## 11. Waterfall / Bridge Chart Slide

**When to use**: Show how an initial value is built up or broken down through sequential positive and negative contributions. Classic McKinsey tool for P&L bridges, cost decomposition, market-share shifts.

**Implementation note**: PptxGenJS does not have a native waterfall chart type. Build it from a stacked bar chart where the invisible "base" series is transparent and colored bars sit on top. The pattern is: `[base, positive, negative]` stacked — base is invisible, positive is navy, negative is red.

```javascript
function makeWaterfallSlide(pres, { title, contextLine, bars, source, pageNum, total }) {
  // bars: [{ label, base, pos, neg, value, isTotal }]
  // For total bars (start & end), base = 0, pos = total value, no neg
  // For intermediate bars: base = running subtotal, pos OR neg set (not both)
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  addSlideTitle(slide, title, contextLine);

  const labels  = bars.map(b => b.label);
  const bases   = bars.map(b => b.base);
  const positives = bars.map(b => b.pos  || 0);
  const negatives = bars.map(b => b.neg  || 0);

  const chartData = [
    { name: "Base",     labels, values: bases     },
    { name: "Increase", labels, values: positives },
    { name: "Decrease", labels, values: negatives },
  ];

  const chartH = source ? L.SOURCE_Y - L.CONTENT_Y - 0.08 : L.CONTENT_H;

  slide.addChart(pres.charts.BAR, chartData, {
    x: L.CONTENT_X, y: L.CONTENT_Y, w: L.CONTENT_W, h: chartH,
    barDir: "col",
    barGrouping: "stacked",
    chartColors: ["FFFFFF00", "173D73", "C1121F"],  // transparent base, navy pos, red neg
    // Note: pptxgenjs stacks bars; "Base" series fills silently from x-axis
    chartArea: { fill: { color: "FFFFFF" }, border: { pt: 0 } },
    plotArea:  { fill: { color: "FFFFFF" } },
    catAxisLabelColor: "666666", catAxisLabelFontFace: "Arial", catAxisLabelFontSize: 10,
    valAxisLabelColor: "666666", valAxisLabelFontFace: "Arial", valAxisLabelFontSize: 10,
    catAxisLineShow: false,
    valGridLine: { color: "EEEEEE", size: 0.5 },
    showValue: true,
    dataLabelFontFace: "Arial", dataLabelFontSize: 10, dataLabelColor: "1A1A2E",
    showLegend: false,
  });

  // Label connector lines between bars (drawn as thin LINE shapes)
  // Omitted here for simplicity — add manually if needed

  if (source) addSource(slide, source);
  addSlideFooter(slide, pageNum, total);
  return slide;
}

// EXAMPLE CALL
// makeWaterfallSlide(pres, {
//   title: "Cost base increased $42M; procurement savings offset by headcount and inflation",
//   contextLine: "Year-on-year cost bridge, $M",
//   bars: [
//     { label: "FY22 Base",       base: 0,   pos: 320, neg: 0,  isTotal: true },
//     { label: "Headcount",       base: 320, pos: 0,   neg: 28              },
//     { label: "Inflation",       base: 292, pos: 0,   neg: 18              },
//     { label: "Procurement",     base: 274, pos: 12,  neg: 0               },
//     { label: "Other",           base: 286, pos: 0,   neg: 8               },
//     { label: "FY23 Base",       base: 0,   pos: 362, neg: 0,  isTotal: true },
//   ],
//   source: "Company management accounts",
//   pageNum: pg++, total: TOTAL,
// });
```

---

## 12. Gantt / Roadmap Slide

**When to use**: Project timelines, initiative roadmaps, transformation programmes. Horizontal bars spanning time periods. McKinsey standard: phases as row groups, milestones as diamonds (simulated with triangles or rotated rectangles).

```javascript
function makeGanttSlide(pres, { title, contextLine, periods, rows, source, pageNum, total }) {
  // periods: string[] — e.g. ["Q1 2025","Q2 2025","Q3 2025","Q4 2025","Q1 2026"]
  // rows: [{ phase, label, start, end, color?, milestone? }]
  //   start/end: 0-based index into periods array
  //   milestone: true draws a point marker instead of a bar
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  addSlideTitle(slide, title, contextLine);

  const nPeriods = periods.length;
  const gridX    = 2.40;   // left edge of timeline grid
  const gridW    = 7.10;   // total width of grid
  const colW     = gridW / nPeriods;
  const rowH     = Math.min(0.38, (L.CONTENT_H - 0.35) / rows.length);
  const headerH  = 0.30;
  const gridY    = L.CONTENT_Y + headerH;

  // Period header row
  periods.forEach((p, i) => {
    const x = gridX + i * colW;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: L.CONTENT_Y, w: colW, h: headerH,
      fill: { color: i % 2 === 0 ? "173D73" : "1E4A8A" },
      line: { color: "FFFFFF", width: 0.5 },
    });
    slide.addText(p, {
      x: x + 0.04, y: L.CONTENT_Y, w: colW - 0.08, h: headerH,
      fontFace: "Arial", fontSize: 9, bold: true,
      color: "FFFFFF", align: "center", valign: "middle", margin: 0,
    });
  });

  // Alternating column shading
  for (let i = 0; i < nPeriods; i++) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: gridX + i * colW, y: gridY, w: colW, h: rowH * rows.length,
      fill: { color: i % 2 === 0 ? "FAFAFA" : "F2F2F2" },
      line: { color: "DDDDDD", width: 0.3 },
    });
  }

  // Row labels + bars
  let currentPhase = null;
  rows.forEach((row, i) => {
    const y = gridY + i * rowH;

    // Phase group label (left margin)
    if (row.phase && row.phase !== currentPhase) {
      currentPhase = row.phase;
      slide.addText(row.phase, {
        x: 0.05, y, w: 1.10, h: rowH,
        fontFace: "Arial", fontSize: 9, bold: true,
        color: "173D73", valign: "middle", margin: 0,
      });
    }

    // Row label
    slide.addText(row.label, {
      x: 1.20, y, w: 1.15, h: rowH,
      fontFace: "Arial", fontSize: 9,
      color: "333333", valign: "middle", margin: 0,
    });

    const barColor = row.color || "173D73";
    if (row.milestone) {
      // Diamond marker at start period
      const mx = gridX + (row.start + 0.5) * colW - 0.10;
      slide.addShape(pres.shapes.RECTANGLE, {
        x: mx, y: y + rowH * 0.25, w: 0.20, h: 0.20,
        fill: { color: barColor }, line: { color: barColor },
        rotate: 45,
      });
    } else {
      const barX = gridX + row.start * colW + 0.04;
      const barW = (row.end - row.start) * colW - 0.08;
      slide.addShape(pres.shapes.RECTANGLE, {
        x: barX, y: y + rowH * 0.18, w: barW, h: rowH * 0.60,
        fill: { color: barColor }, line: { color: barColor, width: 0 },
      });
    }
  });

  if (source) addSource(slide, source);
  addSlideFooter(slide, pageNum, total);
  return slide;
}

// EXAMPLE CALL
// makeGanttSlide(pres, {
//   title: "Three-phase transformation completes by Q4 2026; quick wins land in 90 days",
//   contextLine: "Programme roadmap",
//   periods: ["Q1 25","Q2 25","Q3 25","Q4 25","Q1 26","Q2 26","Q3 26","Q4 26"],
//   rows: [
//     { phase: "Diagnose", label: "Baseline assessment",    start: 0, end: 1 },
//     { phase: "Diagnose", label: "Opportunity sizing",     start: 0, end: 2 },
//     { phase: "Design",   label: "Operating model design", start: 2, end: 4 },
//     { phase: "Design",   label: "Pilot launch",           start: 3, end: 5, color: "F37C21" },
//     { phase: "Scale",    label: "Full rollout",           start: 5, end: 8 },
//     { phase: "Scale",    label: "Benefits capture",       start: 6, end: 8, color: "2E7D32" },
//   ],
//   source: "Programme Management Office",
//   pageNum: pg++, total: TOTAL,
// });
```

---

## 13. KPI / Scorecard Dashboard Slide

**When to use**: At-a-glance performance summary; 4–8 headline metrics with trend and vs-target status. Common in board packs and weekly performance reviews.

```javascript
function makeKPIDashboard(pres, { title, contextLine, kpis, note, pageNum, total }) {
  // kpis: [{ label, value, unit, vs, trend, status }]
  //   value: the primary number (string, e.g. "94%", "$2.4B")
  //   vs:    comparison string, e.g. "+3pp vs target" or "-$12M vs budget"
  //   trend: "up" | "down" | "flat"
  //   status: "green" | "amber" | "red"
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  addSlideTitle(slide, title, contextLine);

  const n     = kpis.length;
  const cols  = n <= 4 ? n : Math.ceil(n / 2);
  const rows  = Math.ceil(n / cols);
  const cardW = (L.CONTENT_W - (cols - 1) * 0.18) / cols;
  const cardH = (L.CONTENT_H - (rows  - 1) * 0.14) / rows;

  const statusColor = { green: "2E7D32", amber: "E65100", red: "C1121F" };
  const trendArrow  = { up: "▲", down: "▼", flat: "–" };
  const trendColor  = { up: "2E7D32", down: "C1121F", flat: "666666" };

  kpis.forEach((kpi, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x   = L.CONTENT_X + col * (cardW + 0.18);
    const y   = L.CONTENT_Y + row * (cardH + 0.14);
    const sc  = statusColor[kpi.status] || "173D73";

    // Card background
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 0.75 },
    });
    // Top status stripe
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: 0.06,
      fill: { color: sc }, line: { color: sc, width: 0 },
    });

    // KPI label
    slide.addText(kpi.label, {
      x: x + 0.12, y: y + 0.10, w: cardW - 0.24, h: 0.24,
      fontFace: "Arial", fontSize: 10, bold: true,
      color: "555555", align: "left", valign: "top", margin: 0,
    });

    // Primary value — large and prominent
    slide.addText(kpi.value, {
      x: x + 0.12, y: y + 0.36, w: cardW - 0.24, h: cardH * 0.42,
      fontFace: "Arial", fontSize: 22, bold: true,
      color: "1A1A2E", align: "left", valign: "top", margin: 0,
    });

    // Trend arrow
    if (kpi.trend) {
      slide.addText(trendArrow[kpi.trend], {
        x: x + cardW - 0.36, y: y + 0.36, w: 0.28, h: 0.36,
        fontFace: "Arial", fontSize: 16, bold: true,
        color: trendColor[kpi.trend], align: "center", valign: "top", margin: 0,
      });
    }

    // vs target / budget comparison
    if (kpi.vs) {
      slide.addText(kpi.vs, {
        x: x + 0.12, y: y + cardH - 0.32, w: cardW - 0.24, h: 0.25,
        fontFace: "Arial", fontSize: 9,
        color: sc, align: "left", valign: "bottom", margin: 0,
      });
    }
  });

  if (note) {
    slide.addText(note, {
      x: L.CONTENT_X, y: L.SOURCE_Y, w: L.CONTENT_W, h: L.SOURCE_H,
      fontFace: "Arial", fontSize: 9, italic: true,
      color: "999999", align: "left", margin: 0,
    });
  }
  addSlideFooter(slide, pageNum, total);
  return slide;
}

// EXAMPLE CALL
// makeKPIDashboard(pres, {
//   title: "Performance is on track overall; customer satisfaction is the primary watch item",
//   contextLine: "Q3 2025 scorecard vs annual targets",
//   kpis: [
//     { label: "Revenue",           value: "$1.8B",  vs: "+4% vs target",    trend: "up",   status: "green" },
//     { label: "EBITDA Margin",     value: "22%",    vs: "+1pp vs target",   trend: "up",   status: "green" },
//     { label: "Customer Sat (NPS)", value: "34",    vs: "-6 pts vs target", trend: "down", status: "amber" },
//     { label: "Employees (FTE)",   value: "4,820",  vs: "On plan",          trend: "flat", status: "green" },
//     { label: "Incident Rate",     value: "0.8",    vs: "-0.2 vs target",   trend: "down", status: "green" },
//     { label: "Capex Spend",       value: "$142M",  vs: "+$18M over budget",trend: "up",   status: "red"   },
//   ],
//   pageNum: pg++, total: TOTAL,
// });
```

---

## 14. Options Comparison Table Slide

**When to use**: Evaluate 3–5 strategic options against a set of criteria using a structured scoring matrix. Uses colored fills to show full/partial/no support (Harvey ball equivalent via background color).

```javascript
function makeOptionsTable(pres, { title, contextLine, options, criteria, scores, recommendation, source, pageNum, total }) {
  // options:  string[] — column headers (the strategic choices)
  // criteria: string[] — row headers (evaluation dimensions)
  // scores:   2D array [criterionIndex][optionIndex] = "full"|"partial"|"none"
  // recommendation: string — option name to highlight as recommended

  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  addSlideTitle(slide, title, contextLine);

  const nOpts  = options.length;
  const nCrit  = criteria.length;
  const critW  = 2.40;
  const optW   = (L.CONTENT_W - critW) / nOpts;
  const rowH   = Math.min(0.45, L.CONTENT_H / (nCrit + 1));
  const headerH = rowH;

  const scoreColor = { full: "D4EDDA", partial: "FFF3CD", none: "F8D7DA" };
  const scoreLabel = { full: "●", partial: "◑", none: "○" };
  const scoreLabelColor = { full: "2E7D32", partial: "B8860B", none: "C1121F" };

  // Header row — option names
  options.forEach((opt, oi) => {
    const x = L.CONTENT_X + critW + oi * optW;
    const isRec = opt === recommendation;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: L.CONTENT_Y, w: optW, h: headerH,
      fill: { color: isRec ? "173D73" : "2C5282" },
      line: { color: "FFFFFF", width: 0.5 },
    });
    slide.addText((isRec ? "★ " : "") + opt, {
      x: x + 0.04, y: L.CONTENT_Y, w: optW - 0.08, h: headerH,
      fontFace: "Arial", fontSize: 10, bold: true,
      color: "FFFFFF", align: "center", valign: "middle", margin: 0,
    });
  });

  // Criteria label column header
  slide.addShape(pres.shapes.RECTANGLE, {
    x: L.CONTENT_X, y: L.CONTENT_Y, w: critW, h: headerH,
    fill: { color: "1A1A2E" }, line: { color: "FFFFFF", width: 0.5 },
  });
  slide.addText("Criteria", {
    x: L.CONTENT_X + 0.10, y: L.CONTENT_Y, w: critW - 0.10, h: headerH,
    fontFace: "Arial", fontSize: 10, bold: true,
    color: "FFFFFF", valign: "middle", margin: 0,
  });

  // Data rows
  criteria.forEach((crit, ci) => {
    const y = L.CONTENT_Y + headerH + ci * rowH;
    const rowBg = ci % 2 === 0 ? "FAFAFA" : "FFFFFF";

    // Criterion label
    slide.addShape(pres.shapes.RECTANGLE, {
      x: L.CONTENT_X, y, w: critW, h: rowH,
      fill: { color: rowBg }, line: { color: "E2E8F0", width: 0.5 },
    });
    slide.addText(crit, {
      x: L.CONTENT_X + 0.12, y, w: critW - 0.20, h: rowH,
      fontFace: "Arial", fontSize: 10,
      color: "1A1A2E", valign: "middle", margin: 0,
    });

    // Score cells
    options.forEach((opt, oi) => {
      const x   = L.CONTENT_X + critW + oi * optW;
      const s   = (scores[ci] && scores[ci][oi]) || "none";
      const isRec = opt === recommendation;
      slide.addShape(pres.shapes.RECTANGLE, {
        x, y, w: optW, h: rowH,
        fill: { color: isRec ? scoreColor[s].replace("DA","EE").replace("CD","CC") : scoreColor[s] },
        line: { color: "E2E8F0", width: 0.5 },
      });
      slide.addText(scoreLabel[s], {
        x, y, w: optW, h: rowH,
        fontFace: "Arial", fontSize: 14, bold: true,
        color: scoreLabelColor[s], align: "center", valign: "middle", margin: 0,
      });
    });
  });

  if (source) addSource(slide, source);
  addSlideFooter(slide, pageNum, total);
  return slide;
}

// EXAMPLE CALL
// makeOptionsTable(pres, {
//   title: "Build via acquisition is the preferred entry mode; greenfield fails on speed and risk",
//   contextLine: "Option evaluation against strategic criteria",
//   options:  ["Organic Build", "Acquisition", "JV / Partnership"],
//   criteria: ["Speed to market", "Cost", "Control", "Risk level", "Talent access"],
//   scores: [
//     ["none",    "full",    "partial"],
//     ["full",    "none",    "partial"],
//     ["full",    "partial", "none"   ],
//     ["partial", "none",    "full"   ],
//     ["none",    "full",    "partial"],
//   ],
//   recommendation: "Acquisition",
//   pageNum: pg++, total: TOTAL,
// });
```

---

## 15. Issue Tree / Logic Tree Slide

**When to use**: Structure a problem or hypothesis into an exhaustive, mutually exclusive hierarchy. Classic McKinsey MECE problem-structuring tool. Rendered as horizontal tree flowing left to right.

```javascript
function makeIssueTree(pres, { title, contextLine, root, children, source, pageNum, total }) {
  // root: string — the central question or issue
  // children: [{ label, sub?: string[] }] — level-2 branches, each with optional level-3 sub-items
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  addSlideTitle(slide, title, contextLine);

  const nBranches = children.length;
  const branchH   = L.CONTENT_H / nBranches;
  const rootW     = 2.10;
  const rootX     = L.CONTENT_X;
  const rootY     = L.CONTENT_Y + (L.CONTENT_H - Math.min(1.0, branchH * 0.9)) / 2;
  const rootH     = Math.min(1.0, branchH * 0.9);
  const branch2X  = rootX + rootW + 0.50;
  const branch2W  = 2.50;
  const sub3X     = branch2X + branch2W + 0.45;
  const sub3W     = L.CONTENT_X + L.CONTENT_W - sub3X - 0.05;

  // Root box
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rootX, y: rootY, w: rootW, h: rootH,
    fill: { color: "173D73" }, line: { color: "173D73", width: 0 },
  });
  slide.addText(root, {
    x: rootX + 0.10, y: rootY, w: rootW - 0.20, h: rootH,
    fontFace: "Arial", fontSize: 11, bold: true,
    color: "FFFFFF", align: "center", valign: "middle", margin: 0,
  });

  children.forEach((branch, bi) => {
    const bY        = L.CONTENT_Y + bi * branchH + branchH * 0.05;
    const bH        = branchH * 0.80;
    const bMidY     = bY + bH / 2;
    const rootMidY  = rootY + rootH / 2;

    // Connector line: root right-edge to branch left-edge
    // Vertical segment from root midpoint to branch midpoint, then horizontal
    const vFromY    = Math.min(rootMidY, bMidY);
    const vToY      = Math.max(rootMidY, bMidY);
    const junctionX = rootX + rootW + 0.25;

    if (Math.abs(rootMidY - bMidY) > 0.01) {
      // Vertical spine
      slide.addShape(pres.shapes.LINE, {
        x: junctionX, y: vFromY, w: 0, h: vToY - vFromY,
        line: { color: "AAAAAA", width: 0.75 },
      });
    }
    // Horizontal to branch
    slide.addShape(pres.shapes.LINE, {
      x: junctionX, y: bMidY, w: branch2X - junctionX, h: 0,
      line: { color: "AAAAAA", width: 0.75 },
    });

    // Branch box (level 2)
    slide.addShape(pres.shapes.RECTANGLE, {
      x: branch2X, y: bY, w: branch2W, h: bH,
      fill: { color: "EBF1FF" }, line: { color: "B0C4DE", width: 0.75 },
    });
    slide.addText(branch.label, {
      x: branch2X + 0.10, y: bY, w: branch2W - 0.20, h: bH,
      fontFace: "Arial", fontSize: 10, bold: true,
      color: "173D73", align: "left", valign: "middle", margin: 0,
    });

    // Level 3 sub-items
    if (branch.sub && branch.sub.length > 0) {
      const nSub  = branch.sub.length;
      const subH  = bH / nSub;
      branch.sub.forEach((subText, si) => {
        const sY    = bY + si * subH;
        const sMidY = sY + subH / 2;

        slide.addShape(pres.shapes.LINE, {
          x: branch2X + branch2W, y: sMidY, w: sub3X - (branch2X + branch2W), h: 0,
          line: { color: "CCCCCC", width: 0.5 },
        });
        slide.addShape(pres.shapes.RECTANGLE, {
          x: sub3X, y: sY + subH * 0.05, w: sub3W, h: subH * 0.82,
          fill: { color: "FAFAFA" }, line: { color: "DDDDDD", width: 0.5 },
        });
        slide.addText(subText, {
          x: sub3X + 0.10, y: sY + subH * 0.05, w: sub3W - 0.20, h: subH * 0.82,
          fontFace: "Arial", fontSize: 9,
          color: "333333", valign: "middle", margin: 0,
        });
      });
    }
  });

  if (source) addSource(slide, source);
  addSlideFooter(slide, pageNum, total);
  return slide;
}

// EXAMPLE CALL
// makeIssueTree(pres, {
//   title: "Three root causes explain 80% of the margin gap; pricing is the primary lever",
//   contextLine: "Problem decomposition",
//   root: "Why is gross margin 8pp below peers?",
//   children: [
//     { label: "Pricing below market",  sub: ["List prices not updated since 2021", "Discounting >15% on 40% of revenue"] },
//     { label: "Mix skewed to low-margin SKUs", sub: ["Legacy product lines underpriced", "Enterprise deals suppress blended margin"] },
//     { label: "COGS above benchmark", sub: ["Procurement not centralized", "Manufacturing yield 6pp below best practice"] },
//   ],
//   pageNum: pg++, total: TOTAL,
// });
```

---

## 16. Big Statement / Billboard Slide

**When to use**: A single powerful conclusion that deserves its own slide — pivotal insight, key recommendation, or dramatic data point. No charts, minimal text. Forces the audience to absorb one idea.

```javascript
function makeBillboard(pres, { title, statement, statementSize = 28, subtext, accent = "173D73", pageNum, total }) {
  // statement: the big single insight — short, punchy, max 2 lines
  // subtext: optional supporting sentence below the statement
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };

  // Thin top navy band instead of full header
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.35,
    fill: { color: accent }, line: { color: accent, width: 0 },
  });
  if (title) {
    slide.addText(title, {
      x: 0.55, y: 0, w: 9.0, h: 0.35,
      fontFace: "Arial", fontSize: 11,
      color: "FFFFFF", align: "left", valign: "middle", margin: 0,
    });
  }

  // Statement — centered on slide
  slide.addText(statement, {
    x: 1.0, y: 1.40, w: 8.0, h: 2.20,
    fontFace: "Arial", fontSize: statementSize, bold: true,
    color: accent, align: "center", valign: "middle", margin: 0,
  });

  // Left navy accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 1.60, w: 0.07, h: 1.80,
    fill: { color: accent }, line: { color: accent, width: 0 },
  });

  if (subtext) {
    slide.addText(subtext, {
      x: 1.0, y: 3.72, w: 8.0, h: 0.50,
      fontFace: "Arial", fontSize: 14,
      color: "555555", align: "center", valign: "top", margin: 0,
    });
  }

  addSlideFooter(slide, pageNum, total);
  return slide;
}

// EXAMPLE CALL
// makeBillboard(pres, {
//   title: "The opportunity",
//   statement: "Capturing this opportunity requires moving\nin the next 6 months — or not at all.",
//   subtext: "Three competitors have already entered binding LOIs with the two remaining acquisition targets.",
//   pageNum: pg++, total: TOTAL,
// });
```

---

## 17. Four-Column Framework Slide

**When to use**: Four parallel pillars, workstreams, capabilities, or strategic priorities. An extension of the three-column format for quad-framework models (e.g., 4Ps, four levers, four horizons).

```javascript
function makeFourColumn(pres, { title, contextLine, columns, source, pageNum, total }) {
  // columns: [{ header, icon?, bullets: string[] }]  — exactly 4 items
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  addSlideTitle(slide, title, contextLine);

  const colW    = 2.00;
  const gapW    = 0.16;
  const colX    = [L.CONTENT_X, L.CONTENT_X + colW + gapW, L.CONTENT_X + 2*(colW+gapW), L.CONTENT_X + 3*(colW+gapW)];
  const headerH = 0.48;
  const contentY = L.CONTENT_Y + headerH;
  const contentH = L.CONTENT_H - headerH;
  const colColors = ["173D73", "1E4A8A", "2558A3", "2C67BC"];

  columns.forEach((col, i) => {
    const x = colX[i];

    // Navy header
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: L.CONTENT_Y, w: colW, h: headerH,
      fill: { color: colColors[i] }, line: { color: colColors[i], width: 0 },
    });
    slide.addText(col.header, {
      x: x + 0.08, y: L.CONTENT_Y, w: colW - 0.16, h: headerH,
      fontFace: "Arial", fontSize: 12, bold: true,
      color: "FFFFFF", align: "center", valign: "middle", margin: 0,
    });

    // Content area
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: contentY, w: colW, h: contentH,
      fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 0.5 },
    });

    if (col.bullets && col.bullets.length > 0) {
      const items = col.bullets.map((b, bi) => ({
        text: b,
        options: {
          bullet: { indent: 10 }, fontFace: "Arial", fontSize: 10,
          color: "1A1A2E", paraSpaceAfter: 4,
          breakLine: bi < col.bullets.length - 1,
        },
      }));
      slide.addText(items, {
        x: x + 0.12, y: contentY + 0.10, w: colW - 0.22, h: contentH - 0.15,
        valign: "top",
      });
    }
  });

  if (source) addSource(slide, source);
  addSlideFooter(slide, pageNum, total);
  return slide;
}

// EXAMPLE CALL
// makeFourColumn(pres, {
//   title: "Four capability shifts are required to compete in the next decade",
//   contextLine: "Strategic capability agenda",
//   columns: [
//     { header: "Data & AI",         bullets: ["Unified data platform", "ML ops capability", "AI talent at scale"] },
//     { header: "Customer",          bullets: ["360-degree view", "Personalisation engine", "Omnichannel CX"] },
//     { header: "Operations",        bullets: ["End-to-end digitisation", "Agile delivery model", "Zero-based cost"] },
//     { header: "Talent & Culture",  bullets: ["Skills-based workforce", "Performance culture", "Future leaders pipeline"] },
//   ],
//   pageNum: pg++, total: TOTAL,
// });
```

---

## 18. Recommendation / Decision Slide

**When to use**: Make a crisp, unambiguous recommendation — the most important slide type in a McKinsey deck. Title IS the recommendation. Body structures the "why": rationale, alternatives considered, risks and mitigants.

```javascript
function makeRecommendationSlide(pres, { title, contextLine, recommendation, rationale, alternatives, risks, pageNum, total }) {
  // recommendation: string — the one-sentence action recommended
  // rationale:      string[] — 2-4 bullet points supporting the recommendation
  // alternatives:   [{ label, why }] — 2-3 options considered and rejected
  // risks:          [{ risk, mitigant }] — 2-3 key risks and how they are managed
  const slide = pres.addSlide();
  slide.background = { color: "FFFFFF" };
  addSlideTitle(slide, title, contextLine);

  // Large recommendation box — spans full width
  const recH = 0.70;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: L.CONTENT_X, y: L.CONTENT_Y, w: L.CONTENT_W, h: recH,
    fill: { color: "EBF1FF" }, line: { color: "173D73", width: 1.5 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: L.CONTENT_X, y: L.CONTENT_Y, w: 0.08, h: recH,
    fill: { color: "173D73" }, line: { color: "173D73", width: 0 },
  });
  slide.addText(recommendation, {
    x: L.CONTENT_X + 0.20, y: L.CONTENT_Y, w: L.CONTENT_W - 0.30, h: recH,
    fontFace: "Arial", fontSize: 13, bold: true,
    color: "173D73", align: "left", valign: "middle", margin: 0,
  });

  const below   = L.CONTENT_Y + recH + 0.14;
  const leftW   = 3.20;
  const midX    = L.CONTENT_X + leftW + 0.20;
  const midW    = 2.70;
  const rightX  = midX + midW + 0.20;
  const rightW  = L.CONTENT_W - leftW - midW - 0.40;
  const sectH   = L.CONTENT_H - recH - 0.20;

  // Section headers
  const sectionHeader = (x, w, label) => {
    slide.addText(label, {
      x, y: below, w, h: 0.26,
      fontFace: "Arial", fontSize: 10, bold: true,
      color: "173D73", align: "left", margin: 0,
    });
    slide.addShape(pres.shapes.LINE, {
      x, y: below + 0.28, w, h: 0,
      line: { color: "173D73", width: 0.75 },
    });
  };

  sectionHeader(L.CONTENT_X, leftW, "Rationale");
  sectionHeader(midX,         midW,  "Alternatives considered");
  sectionHeader(rightX,       rightW,"Key risks and mitigants");

  const bodyY = below + 0.36;
  const bodyH = sectH - 0.36;

  // Rationale bullets
  if (rationale && rationale.length) {
    const items = rationale.map((b, i) => ({
      text: b,
      options: {
        bullet: { indent: 12 }, fontFace: "Arial", fontSize: 11,
        color: "1A1A2E", paraSpaceAfter: 5,
        breakLine: i < rationale.length - 1,
      },
    }));
    slide.addText(items, { x: L.CONTENT_X, y: bodyY, w: leftW, h: bodyH, valign: "top" });
  }

  // Alternatives
  if (alternatives && alternatives.length) {
    alternatives.forEach((alt, i) => {
      const ay = bodyY + i * (bodyH / alternatives.length);
      const ah = bodyH / alternatives.length - 0.05;
      slide.addText("✗  " + alt.label, {
        x: midX, y: ay, w: midW, h: 0.22,
        fontFace: "Arial", fontSize: 10, bold: true,
        color: "C1121F", margin: 0,
      });
      slide.addText(alt.why, {
        x: midX, y: ay + 0.22, w: midW, h: ah - 0.22,
        fontFace: "Arial", fontSize: 10,
        color: "555555", valign: "top", margin: 0,
      });
    });
  }

  // Risks
  if (risks && risks.length) {
    risks.forEach((r, i) => {
      const ry = bodyY + i * (bodyH / risks.length);
      const rh = bodyH / risks.length - 0.05;
      slide.addText("⚠  " + r.risk, {
        x: rightX, y: ry, w: rightW, h: 0.22,
        fontFace: "Arial", fontSize: 10, bold: true,
        color: "E65100", margin: 0,
      });
      slide.addText(r.mitigant, {
        x: rightX, y: ry + 0.22, w: rightW, h: rh - 0.22,
        fontFace: "Arial", fontSize: 10,
        color: "555555", valign: "top", margin: 0,
      });
    });
  }

  addSlideFooter(slide, pageNum, total);
  return slide;
}

// EXAMPLE CALL
// makeRecommendationSlide(pres, {
//   title: "We recommend acquiring NovaTech; it accelerates entry by 18 months at acceptable risk",
//   recommendation: "Acquire NovaTech at an indicative valuation of $380-420M; move to exclusivity within 30 days",
//   rationale: [
//     "Provides instant access to 120-person engineering team and proprietary ML stack",
//     "NovaTech's customer base adds $85M ARR with 92% gross retention",
//     "Accelerates product roadmap by ~18 months vs organic build",
//   ],
//   alternatives: [
//     { label: "Organic build",     why: "Too slow; 3-year lag cedes market to competitors" },
//     { label: "JV with TechCorp",  why: "IP ownership and control concerns unresolvable" },
//   ],
//   risks: [
//     { risk: "Integration complexity", mitigant: "Dedicated 6-person integration team; 90-day plan in place" },
//     { risk: "Key person departure",   mitigant: "Retention packages for top 15 agreed in term sheet" },
//   ],
//   pageNum: pg++, total: TOTAL,
// });
```

---

## Boilerplate: Full Script Structure

```javascript
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "McKinsey Analysis";

// ═══ LAYOUT CONSTANTS (copy from design-system.md) ════════════════════════════
const L = {
  slideW: 10, slideH: 5.625,
  TITLE_X: 0.55, TITLE_Y: 0.20, TITLE_W: 8.9, TITLE_H: 0.75,
  CTX_Y: 0.95, CTX_H: 0.16,
  DIV_X: 0, DIV_Y: 1.12, DIV_W: 10,
  CONTENT_X: 0.55, CONTENT_Y: 1.30, CONTENT_W: 8.9, CONTENT_H: 3.65,
  SOWHAT_Y: 4.40, SOWHAT_H: 0.52,
  SOURCE_Y: 5.04, SOURCE_H: 0.18,
  FOOTER_LINE_Y: 5.20, FOOTER_Y: 5.25, FOOTER_H: 0.22,
};

// ═══ HELPER FUNCTIONS (paste addSlideTitle, addSlideFooter, addSource, addSoWhatBox) ═

// ═══ SLIDES ══════════════════════════════════════════════════════════════════
const TOTAL = 8;
let pg = 1;

makeTitleSlide(pres, {
  title: "Strategic Assessment: Market Entry Options",
  client: "Acme Corp",
  subtitle: "Board Presentation",
  date: "March 2026",
});

makeExecSummary(pres, {
  conclusions: [
    "Southeast Asia offers the strongest near-term opportunity; TAM of $2B growing at 18% annually",
    "Three viable entry modes identified; JV with LocalCo recommended on speed and risk profile",
    "Full-speed entry requires $45M capex over 18 months; NPV positive at base case assumptions",
    "Key risk is regulatory uncertainty in Indonesia; mitigation plan is defined in Section 4",
  ],
  pageNum: pg++, total: TOTAL,
});

// ... additional slides ...

pres.writeFile({ fileName: "output.pptx" });
```
