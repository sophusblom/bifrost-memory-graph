const fs = require('fs');

// Load all extracted data
const entities = JSON.parse(fs.readFileSync('/data/.openclaw/workspace/.scan/extracted-entities.json', 'utf8'));
const sheets = JSON.parse(fs.readFileSync('/data/.openclaw/workspace/.scan/extracted-sheets.json', 'utf8'));
const relationships = JSON.parse(fs.readFileSync('/data/.openclaw/workspace/.scan/relationship-graph.json', 'utf8'));
const driveFiles = JSON.parse(fs.readFileSync('/data/.openclaw/workspace/.scan/drive-files-index.json', 'utf8'));
const slackChannels = JSON.parse(fs.readFileSync('/data/.openclaw/workspace/.scan/slack-channels.json', 'utf8'));

// Initialize graph
const graph = {
  metadata: {
    name: "Bifrost Sovereign - Karen Enhanced Memory Graph",
    description: "Comprehensive knowledge graph with people, meetings, decisions, actions, blockers, business functions, and files",
    lastUpdated: new Date().toISOString(),
    version: "2.0",
    source: "Slack + Google Drive comprehensive scan (2026-04-02)",
    nodeCount: 0,
    edgeCount: 0
  },
  nodes: [],
  edges: []
};

const nodeMap = new Map(); // Track node IDs to avoid duplicates
const edgeSet = new Set(); // Track edges to avoid duplicates

function addNode(id, label, type, description, metadata = {}) {
  if (nodeMap.has(id)) return id;
  
  const colors = {
    person: "#2ECC71",
    company: "#4A90E2",
    meeting: "#9B59B6",
    decision: "#E74C3C",
    action_item: "#F39C12",
    business_function: "#1ABC9C",
    file: "#3498DB",
    blocker: "#C0392B",
    topic: "#E67E22",
    concept: "#95A5A6"
  };
  
  const sizes = {
    person: 32,
    company: 40,
    meeting: 28,
    decision: 26,
    action_item: 24,
    business_function: 30,
    file: 22,
    blocker: 24,
    topic: 26,
    concept: 22
  };

  const node = {
    id,
    label,
    type,
    description,
    color: colors[type] || "#95A5A6",
    size: sizes[type] || 24,
    ...metadata
  };

  graph.nodes.push(node);
  nodeMap.set(id, node);
  return id;
}

function addEdge(source, target, relation, weight = 1, metadata = {}) {
  const edgeKey = `${source}→${target}|${relation}`;
  if (edgeSet.has(edgeKey)) return;
  
  graph.edges.push({
    source,
    target,
    relation,
    weight,
    ...metadata
  });
  edgeSet.add(edgeKey);
}

// === ADD PEOPLE NODES ===
const peopleMap = {};
[
  { id: "sacha", name: "Sacha Obeegadoo", role: "Co-founder GTM Agentic Cloud" },
  { id: "peter", name: "Peter Damm", role: "Co-founder GTM Data Centers + Fundraising" },
  { id: "florian", name: "Florian Fournier", role: "Co-founder Sales + Partnerships" },
  { id: "philippe", name: "Philippe Ambühl", role: "Co-founder Legal/Ops + Finance" },
  { id: "kristof", name: "Kristof De Spiegeleer", role: "Co-founder + Active Chairman R&D" },
  { id: "thorbjorn", name: "Thorbjørn Rønje", role: "Active Chairman GP at Bifrost Studios" },
  { id: "sophus", name: "Sophus Blom-Hanssen", role: "Interim Operations Lead" }
].forEach(p => {
  addNode(p.id, p.name, "person", p.role, {
    actionsOwned: sheets.actions.filter(a => a.owner === p.name.split(' ')[0] || a.owner === p.name).length,
    lastActive: entities.people.find(ep => ep.name === p.name.split(' ')[0])?.lastActive || "2026-03-28"
  });
  peopleMap[p.name] = p.id;
  peopleMap[p.name.split(' ')[0]] = p.id;
});

// === ADD COMPANY NODE ===
addNode("bifrost", "Bifrost Sovereign", "company", "Pre-seed European sovereign AI infrastructure", {
  stage: "Pre-seed",
  funding: "€3M equity + €1.5M debt"
});

// === ADD BUSINESS FUNCTION NODES ===
const functionMap = {};
[
  { id: "operations", name: "Operations", owner: "sophus" },
  { id: "gtm", name: "GTM", owner: "sacha" },
  { id: "fundraising", name: "Fundraising", owner: "peter" },
  { id: "product-rd", name: "Product & R&D", owner: "kristof" },
  { id: "marketing", name: "Marketing", owner: "florian" },
  { id: "legal-finance", name: "Legal & Finance", owner: "philippe" }
].forEach(f => {
  addNode(f.id, f.name, "business_function", `${f.name} workstream`, {
    owner: f.owner,
    slackChannel: slackChannels.channels?.find(c => c.name.includes(f.id.replace("-", "")))?.name
  });
  functionMap[f.name] = f.id;
  addEdge(f.owner, f.id, "owns");
  addEdge(f.id, "bifrost", "part_of");
});

// === ADD ACTION ITEM NODES ===
sheets.actions.slice(0, 35).forEach((action, idx) => {
  const actionId = `action-${idx}`;
  const owner = Object.keys(peopleMap).find(p => action.owner?.includes(p)) || "sophus";
  const deadline = new Date(action.deadline);
  const isOverdue = deadline < new Date();
  
  addNode(actionId, action.item, "action_item", action.item, {
    owner: action.owner,
    deadline: action.deadline,
    status: action.status,
    isOverdue,
    daysUntilDue: Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24))
  });
  
  addEdge(owner, actionId, "owns");
  addEdge(actionId, "bifrost", "part_of");
});

// === ADD DECISION NODES ===
(sheets.decisions || []).forEach((decision, idx) => {
  const decisionId = `decision-${idx}`;
  const owner = decision.madeBy ? Object.keys(peopleMap).find(p => decision.madeBy.includes(p)) : "sophus";
  
  addNode(decisionId, decision.decision, "decision", decision.decision, {
    madeBy: decision.madeBy,
    date: decision.date,
    rationale: decision.rationale
  });
  
  addEdge(owner, decisionId, "makes");
});

// === ADD BLOCKER NODES ===
(sheets.blockers || []).forEach((blocker, idx) => {
  const blockerId = `blocker-${idx}`;
  
  addNode(blockerId, blocker.blocker, "blocker", blocker.blocker, {
    severity: blocker.severity || "high",
    ageInDays: Math.ceil((new Date() - new Date(blocker.dateAdded)) / (1000 * 60 * 60 * 24))
  });
});

// === ADD FILE NODES ===
(driveFiles.files || []).slice(0, 15).forEach(file => {
  const fileId = `file-${file.id}`;
  
  addNode(fileId, file.name, "file", file.name, {
    path: file.path,
    mimeType: file.mimeType,
    owner: file.owner,
    createdTime: file.createdTime,
    modifiedTime: file.modifiedTime
  });
});

// === ADD MEETING NODES ===
const meetings = [
  { id: "all-hands", name: "Monday All Hands", attendees: ["sacha", "peter", "florian", "philippe", "kristof", "thorbjorn", "sophus"] },
  { id: "gtm-war-room", name: "GTM War Room", attendees: ["sacha", "peter", "sophus"] },
  { id: "ops-close", name: "Ops & Finance Close", attendees: ["sophus", "philippe", "peter"] },
  { id: "hiring-review", name: "Hiring Review", attendees: ["sophus", "florian", "kristof"] },
  { id: "daily-standup", name: "Daily Standup", attendees: ["sacha", "peter", "sophus"] },
  { id: "fri-pulse", name: "Friday Ops Pulse", attendees: ["sophus", "karen"] }
];

meetings.forEach(m => {
  addNode(m.id, m.name, "meeting", m.name, {
    attendees: m.attendees,
    frequency: "recurring"
  });
  m.attendees.forEach(attendeeId => {
    addEdge(attendeeId, m.id, "attends");
  });
});

// === ADD TOPIC NODES (from original graph) ===
const topics = [
  { id: "visionary-launcher", name: "Visionary Launcher Profile", desc: "Team strength: starting; weakness: finishing" },
  { id: "follow-through-problem", name: "Action Follow-Through Problem", desc: "Actions disappear without follow-through" },
  { id: "google-drive-infra", name: "Google Drive Infrastructure", desc: "Service account + shared drive setup" },
  { id: "slack-setup", name: "Slack Setup", desc: "Socket mode, streaming, token management" },
  { id: "fundraising-round", name: "Fundraising Round", desc: "€3M equity + €1.5M debt on SAFE" }
];

topics.forEach(t => {
  addNode(t.id, t.name, "topic", t.desc);
  addEdge("bifrost", t.id, "has_challenge");
});

// === BUILD RELATIONSHIPS ===

// People → Company
["sacha", "peter", "florian", "philippe", "kristof", "thorbjorn"].forEach(p => {
  addEdge(p, "bifrost", "co_founder_of");
});
addEdge("sophus", "bifrost", "works_for");

// People → People (collaboration from activity)
addEdge("peter", "thorbjorn", "collaborates_with", 3);
addEdge("sacha", "peter", "collaborates_with", 2);
addEdge("philippe", "peter", "collaborates_with", 2);

// Business Functions → Topics
addEdge("gtm", "fundraising-round", "dependent_on");
addEdge("operations", "follow-through-problem", "solves");
addEdge("bifrost", "visionary-launcher", "exhibits");

// Update metadata
graph.metadata.nodeCount = graph.nodes.length;
graph.metadata.edgeCount = graph.edges.length;

// Write output
fs.writeFileSync('/data/.openclaw/workspace/graph-data-enhanced.json', JSON.stringify(graph, null, 2));
console.log(`✅ Enhanced graph created: ${graph.nodes.length} nodes, ${graph.edges.length} edges`);
