# Creator tactics ledger v2

Updated: 2026-08-23
Status: open, numbering continues from CTL-0065
Frozen predecessor: archive/CREATOR_TACTICS_LEDGER_V1.md, complete at CTL-0064

## 1. Why v2 exists

Version one reached 101 kilobytes and 64 append only entries. It could no longer be read in a single pass, so after every context compression the standing state was reconstructed from the tail of the map rather than from the evidence, and questions that version one had already answered were reopened. Version one is sound as evidence and unusable as working memory. Version two keeps the evidence discipline and adds the state that was missing.

## 2. Rules

- numbering continues from CTL-0065 and an identifier is never reused, including across the archive boundary;
- one entry states one mechanic and occupies at most twelve lines;
- every entry names the question it answers by its OQ identifier from OPEN_QUESTIONS.md, or states NO_OPEN_QUESTION and explains why it was recorded anyway;
- an entry that overturns or narrows an earlier entry carries a SUPERSEDES line naming the identifier, and the same fact is written into the corrections register in OPPORTUNITY_MAP.md in the same patch;
- required fields remain those of RESEARCH_PROTOCOL.md section 4, and unknown values are written as UNKNOWN;
- the archived version one is cited by identifier and remains valid evidence unless a v2 entry supersedes it;
- when this file passes roughly 40 kilobytes it is archived in turn and v3 opens, so that the working ledger always fits one read.

## 3. Entries

None yet. The first entry of the next research pass is CTL-0065.
