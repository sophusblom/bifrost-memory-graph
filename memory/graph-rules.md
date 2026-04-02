# Graph Memory Rules

After every substantive conversation, update memory/graph.md:

## What to capture as entities
- Topics discussed (type: topic)
- Decisions made (type: decision)
- Questions raised (type: question)
- People mentioned (type: person)
- Concepts or frameworks introduced (type: concept)
- Action items (type: action)

## What to capture as relationships
- topic → topic | relates_to
- decision → topic | resolves
- question → topic | about
- action → decision | follows_from
- topic → topic | depends_on
- concept → topic | supports
- decision → decision | supersedes

## Process
1. After a meaningful conversation, identify new entities and relationships
2. memory_search "graph" to find the current graph
3. memory_get the file
4. Append new entries (never delete, mark superseded instead)
5. Add to the Log section what you added and why
6. After updating memory/graph.md, also write the updated data to ~/clawd/canvas/graph-data.json in JSON format. This is a single save operation—update both files as one logical action, like a word processor updating its preview pane when you save.

## When to query the graph
- Start of conversations: search for related topics to bring forward context
- When user references something previously discussed
- When making recommendations that should account for prior decisions

Keep entries concise. The graph should grow naturally from usage.
