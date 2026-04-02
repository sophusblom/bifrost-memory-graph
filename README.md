# Bifrost Sovereign - Karen Memory Graph

Interactive knowledge graph visualization for Bifrost Sovereign operations.

## Live View

Visit the graph at: **[https://username.github.io/bifrost-memory-graph](https://username.github.io/bifrost-memory-graph)**

(Replace `username` with your actual GitHub username once deployed)

## What's Here

- `docs/index.html` — Interactive D3.js graph viewer
- `docs/graph-data.json` — Knowledge graph data (nodes + edges)
- `graph-data.json` — Source graph data (root level for reference)
- `graph-viewer.html` — Source HTML (root level for reference)
- `memory/graph.md` — Authoritative source of truth (Markdown format)
- `memory/graph-rules.md` — Rules for maintaining the graph

## How to Deploy to GitHub Pages

1. Create a new repo on GitHub: `bifrost-memory-graph`
2. Add this workspace as a remote:
   ```bash
   git remote add origin https://github.com/USERNAME/bifrost-memory-graph.git
   git branch -M main
   git push -u origin main
   ```
3. In GitHub repo settings:
   - Go to **Settings → Pages**
   - Source: `Deploy from a branch`
   - Branch: `main` / `docs` folder
   - Save

4. Your graph will be live at: `https://USERNAME.github.io/bifrost-memory-graph`

## Updating the Graph

The graph is maintained in `memory/graph.md` (authoritative source). After updates:

1. Regenerate `graph-data.json` from `memory/graph.md`
2. Copy to `docs/graph-data.json`
3. Commit and push to GitHub
4. Changes live within seconds

## Graph Structure

**Nodes:**
- 17 entities (people, company, topics, concepts)
- Color-coded by type
- Size reflects importance

**Edges:**
- 20 relationships
- Weighted by strength
- Labeled with relation type

## Interact

- **Click** a node to see details in sidebar
- **Drag** to rearrange
- **Scroll** to zoom
- **Slider** to adjust force strength
- **ESC** to close sidebar

---

Last updated: 2026-04-02
Maintained by: Karen (Operations Agent, Bifrost Sovereign)
