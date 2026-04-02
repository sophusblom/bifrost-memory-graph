# Knowledge Graph

## Entities
Format: - **name** | type | description | added YYYY-MM-DD

- **Bifrost Sovereign** | company | Pre-seed European sovereign AI infrastructure company | 2026-04-01
- **Karen** | person | Internal ops agent; not an assistant; owns operating cadence and action follow-through | 2026-04-01
- **Sacha Obeegadoo** | person | Co-founder GTM Agentic Cloud; natural completion anchor; capacity must be protected | 2026-04-01
- **Peter Damm** | person | Co-founder GTM Data Centers + Fundraising; owns investor data room | 2026-04-01
- **Florian Fournier** | person | Co-founder Sales + Partnerships; marketing owned but not yet executed | 2026-04-01
- **Philippe Ambühl** | person | Co-founder Legal/Ops + Finance (dual-hat) | 2026-04-01
- **Kristof De Spiegeleer** | person | Co-founder + Active Chairman; R&D/Technology | 2026-04-01
- **Thorbjørn Rønje** | person | Active Chairman GP at Bifrost Studios; shared data room | 2026-04-01
- **Sophus Blom-Hanssen** | person | Interim ops lead; primary human counterpart; Ops & Strategy Associate joining weeks 4–8 | 2026-04-01
- **Operating Cadence** | topic | Recurring meetings structure; all-hands, GTM war room, ops/finance close, hiring review, daily standup, Friday pulse | 2026-04-01
- **Visionary Launcher Profile** | concept | Team strength: starting things; team weakness: finishing and documenting; Karen compensates | 2026-04-01
- **Action Follow-Through Problem** | topic | Actions agreed in meetings disappear; no follow-through mechanism existed at 2026-03-28 | 2026-04-01
- **Google Drive Infrastructure** | topic | Service account credentials; Bifrost Sovereign shared drive; Karen workspace with action log, decision log, priority map | 2026-04-01
- **Slack Setup** | topic | Socket mode, streaming config, token management, common failures documented | 2026-04-01
- **Fundraising Round** | topic | €3M equity + €1.5M debt on SAFE; cap €20–30M; pre-seed stage | 2026-04-01
- **Supply Chain Owner Role** | topic | Open hire; needed for company operations | 2026-04-01

## Relationships
Format: - source → target | relation

- Karen → Bifrost Sovereign | works_for
- Karen → Operating Cadence | owns
- Karen → Action Follow-Through Problem | compensates
- Sacha Obeegadoo → Bifrost Sovereign | co_founder_of
- Sacha Obeegadoo → Operating Cadence | capacity_protected_for
- Peter Damm → Bifrost Sovereign | co_founder_of
- Peter Damm → Fundraising Round | leads
- Peter Damm → Google Drive Infrastructure | owns_data_room
- Florian Fournier → Bifrost Sovereign | co_founder_of
- Philippe Ambühl → Bifrost Sovereign | co_founder_of
- Kristof De Spiegeleer → Bifrost Sovereign | co_founder_and_chairman_of
- Thorbjørn Rønje → Bifrost Sovereign | active_chairman_of
- Thorbjørn Rønje → Bifrost Studios | partner_gp_of
- Sophus Blom-Hanssen → Bifrost Sovereign | interim_ops_lead_of
- Sophus Blom-Hanssen → Karen | human_counterpart_of
- Bifrost Sovereign → Visionary Launcher Profile | matches
- Operating Cadence → Action Follow-Through Problem | resolves
- Google Drive Infrastructure → Operating Cadence | supports
- Slack Setup → Operating Cadence | enables
- Fundraising Round → Bifrost Sovereign | funds

## Log
- 2026-04-01: Graph initialized
- 2026-04-01: Extracted from MEMORY.md: 16 entities (company, people, topics, concepts), 20 relationships. Covers: team structure, ops role, problems to solve, infrastructure, Visionary Launcher profile, fundraising context.
