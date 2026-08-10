# Video Pipeline Compiler

Updated: 2026-08-10
Status: DESIGN BASELINE FOR VIDEO-003
Owner: human editorial review plus deterministic validation

## 1. Purpose

VIDEO-002 is the manual benchmark used to discover production failure modes.

VIDEO-003 must emulate the future automated pipeline in shadow mode. The goal is not unattended publication. The goal is to replace model-written composition code with validated declarative inputs, reusable production components and mechanical release gates.

The system must assume that every model can make plausible but structurally incorrect decisions.

## 2. Core principle

Models propose structured intent. Deterministic software validates and compiles it.

A model must not be trusted to remember scene ownership, timing boundaries, repository structure, shell semantics, asset paths or layout safety.

The locked timing manifest is the source of truth for scene ownership and duration.

## 3. Failure catalog

| ID | Failure | Root cause | Required permanent control |
|---|---|---|---|
| F-001 | S19 was assigned to C05 although the manifest assigns it to C06 | Scene ownership was inferred instead of read | Compiler must derive scene lists from the timing manifest and reject foreign scene IDs before TypeScript |
| F-002 | Variables and the Door component remained after removal of S19 | Patch removed visual output without dependency cleanup | Static dependency and unused-symbol validation must run before render |
| F-003 | A failed patch printed a false PASS and continued to lint | Unsafe shell branching with combined AND and OR operators | Status must come from one validator process; later stages run only after an actual zero-result validation |
| F-004 | A JSX block parser treated a self-closing element as unbalanced | Source text was parsed with an incomplete tag counter | Never parse TSX structure with ad hoc text balancing; use exact replacements or an AST |
| F-005 | Debug progress bars reached accepted production compositions | Debug UI was not separated from production UI | Production component allowlist and explicit debug-element prohibition |
| F-006 | Title, metric bars and FOMO label collided with other elements | No mechanical layout safety check | Still-frame rendering plus bounding-box, safe-zone and minimum-font checks |
| F-007 | Runtime images returned 404 because dynamic staticFile arguments were not synchronized | Asset discovery expected literal paths | Asset manifest and literal runtime-path validation before browser launch |
| F-008 | A TTS generation omitted a middle passage | Generative completeness was assumed | Text-to-audio completeness alignment and authoritative caption validation |
| F-009 | A subtitle anchor contained an unintended line break | Model-input serialization changed semantic matching | Single-line anchor serialization and exact anchor validation |
| F-010 | Dialogue compression caused repeated reconstruction errors | Operational state depended on conversation memory | Repository-owned contracts, manifests, checkpoints and mandatory restoration order |

Every new repeated defect must add or update a row in this table and define a regression check.

## 4. Compiler inputs

The future compiler consumes versioned files rather than conversational instructions:

1. locked narration and audio metadata;
2. authoritative captions;
3. timing manifest with compositions and scene ownership;
4. declarative scene specification;
5. asset manifest with lifecycle state and hashes;
6. reusable component registry;
7. typography, palette and layout tokens;
8. transition policy;
9. production and debug feature flags.

A scene specification may select components and provide content. It may not redefine global timing or invent asset paths.

## 5. Declarative scene contract

Each scene record must contain:

- scene ID;
- composition ID;
- start and end frames inherited from the timing manifest;
- semantic purpose;
- visual state;
- component type;
- text content;
- asset references;
- animation parameters;
- safe-zone class;
- transition class;
- human-review flags.

Unknown fields, missing required fields and scene ownership conflicts are compilation failures.

## 6. Reusable component registry

VIDEO-003 should prefer tested components:

- title and section label;
- evidence card;
- metric comparison;
- study card;
- phone state;
- door state;
- notification toggle;
- objective log;
- uncertainty card;
- character keyframe;
- deterministic crossfade or masked transition.

Each component needs a typed contract, supported aspect ratio, minimum font size, safe zones and sample tests.

Models select and parameterize components. Models do not rewrite their implementation for every composition.

## 7. Compilation gates

The required order is:

1. repository and schema preflight;
2. timing-manifest validation;
3. scene ownership validation;
4. asset existence and hash validation;
5. declarative schema validation;
6. component allowlist validation;
7. generated TypeScript formatting and type checking;
8. lint and unused-symbol checks;
9. sampled still render at scene boundaries and transition midpoints;
10. safe-zone, overflow, overlap and minimum-font checks;
11. runtime asset request validation;
12. low-resolution proof render;
13. technical media validation;
14. contact-sheet generation;
15. human last-mile visual and editorial review;
16. production render and commit.

A failed gate blocks every later gate and emits one machine-readable FAIL result. A validator must never print PASS after an exception.

## 8. Agent-role emulation

A single advanced model may emulate these roles sequentially:

- Schema Reader: extracts actual repository facts.
- Planner: produces a structured change plan.
- Implementer: generates declarative inputs or a narrow patch.
- Static Reviewer: checks ownership, dependencies, paths and shell control flow.
- Adversarial Reviewer: searches for reasons the patch must fail.
- Visual Reviewer: evaluates sampled stills and contact sheets.
- Release Gate: compares evidence with acceptance criteria.

Role outputs must be explicit artifacts. A later role cannot silently modify facts produced by the Schema Reader.

This improves reliability but does not create true independence. Correlated model errors remain possible, so deterministic tests retain authority.

## 9. VIDEO-003 shadow-compilation strategy

VIDEO-003 remains human-controlled but must imitate the target system:

1. create the declarative scene manifest first;
2. compile at least one composition through reusable components;
3. record every manual intervention;
4. compare model-generated plans with deterministic validation;
5. render boundary stills before full video;
6. keep human visual approval as the final mile;
7. measure manual minutes, failed attempts and preventable defects;
8. convert every repeated failure into a test before VIDEO-004.

No unattended publishing is permitted.

## 10. Success criteria

The compiler baseline is useful when:

- no composition references a foreign scene;
- no full render starts before static validation passes;
- missing runtime assets are detected before Chromium;
- debug UI cannot enter a production build;
- obvious text collisions are detected before human review;
- conversation compression does not change repository facts;
- a cheaper model can produce the same valid declarative inputs;
- the human reviewer spends time on meaning and taste rather than preventable code defects.

## 11. Human authority

Human approval remains mandatory for narrative meaning, visual taste, character identity, generated anatomy, misleading charts, emotional tone and final publication.

Automation reduces preventable production errors. It does not receive editorial authority.
