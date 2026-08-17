export type VisualKind =
  | "character"
  | "title"
  | "split"
  | "study"
  | "feed"
  | "diagram"
  | "step"
  | "log"
  | "caution";

export type SceneSpec = {
  kind: VisualKind;
  eyebrow: string;
  title: string;
  detail: string;
  items: readonly string[];
};

export const sceneSpecs: Record<string, SceneSpec> = {
  S01: {kind: "character", eyebrow: "LATE NIGHT", title: "YOUR EYES HURT", detail: "The feed keeps moving.", items: ["TIRED", "STILL SCROLLING"]},
  S02: {kind: "title", eyebrow: "TONIGHT", title: "THE SCROLL NEEDS AN END", detail: "Stopping gets harder when the decision reaches your most tired self.", items: []},
  S03: {kind: "split", eyebrow: "TWO DIFFERENT DELAYS", title: "WHERE DOES THE DELAY BEGIN?", detail: "Similar outcome. Different decision point.", items: ["NOT IN BED", "IN BED / NOT ASLEEP"]},
  S04: {kind: "split", eyebrow: "THE DISTINCTION MATTERS", title: "SOFA OR BED?", detail: "The phone is not always keeping you from bed.", items: ["POSTPONING THE END OF THE DAY", "BRINGING THE FEED UNDER THE BLANKET"]},
  S05: {kind: "study", eyebrow: "EARLY STUDY", title: "177 ADULTS", detail: "More bedtime procrastination was associated with less self-regulation and insufficient sleep.", items: ["CORRELATION", "NOT SIMPLE CAUSATION"]},
  S06: {kind: "study", eyebrow: "EXPLORATORY STUDY", title: "ABOUT 400 TEENAGERS", detail: "The two forms of delay separated. Their link was weak.", items: ["RELATED", "NOT IDENTICAL"]},
  S07: {kind: "feed", eyebrow: "LOOK AT THE FEED", title: "NO NATURAL STOPPING POINT", detail: "A chapter ends. A movie ends. The feed continues.", items: ["NEXT", "NEXT", "NEXT", "NEXT"]},
  S08: {kind: "character", eyebrow: "END OF DAY", title: "NOT EVEN FUN ANYMORE", detail: "Scrolling can continue while tomorrow gets closer.", items: ["UNFINISHED DAY", "TIRED DECISION"]},
  S09: {kind: "diagram", eyebrow: "A POSSIBLE MOTIVE", title: "REVENGE BEDTIME PROCRASTINATION", detail: "A small block of night can feel like the only time that belongs to you.", items: ["OBLIGATIONS", "CONTROL", "OWNED TIME"]},
  S10: {kind: "caution", eyebrow: "IMPORTANT WORD", title: "POSSIBLE", detail: "A useful explanation helps you observe behavior. It does not diagnose you.", items: ["NO THUMBNAIL DIAGNOSIS", "NO SINGLE-CAUSE STORY"]},
  S11: {kind: "study", eyebrow: "SYSTEMATIC REVIEW", title: "55 PAPERS", detail: "More than 41,000 participants showed a consistent association between electronic media use and poorer sleep.", items: ["ASSOCIATION", "MANY STUDY DESIGNS"]},
  S12: {kind: "diagram", eyebrow: "THE HONEST CONCLUSION", title: "THE PHONE CAN AFFECT SLEEP IN SEVERAL WAYS", detail: "Reducing the whole problem to blue light misses most of the behavior.", items: ["TIME DISPLACEMENT", "AROUSAL", "CONTENT", "HABIT"]},
  S13: {kind: "title", eyebrow: "BOUNDED TEST", title: "THREE EVENINGS", detail: "Not a perfect routine. One finite experiment.", items: []},
  S14: {kind: "step", eyebrow: "STEP 1", title: "NAME THE DELAY", detail: "Locate the decision before trying to fix it.", items: ["NOT IN BED?", "IN BED / NOT ASLEEP?"]},
  S15: {kind: "log", eyebrow: "ONE SENTENCE EACH NIGHT", title: "RECORD THE DECISION POINT", detail: "Observe without turning the log into a judgment.", items: ["WHERE WAS I?", "WHAT WAS I DELAYING?", "WHAT HAPPENED NEXT?"]},
  S16: {kind: "step", eyebrow: "STEP 2", title: "CREATE AN ENDING", detail: "Give personal time a visible boundary before fatigue takes over.", items: ["FINITE", "VISIBLE", "CHOSEN EARLIER"]},
  S17: {kind: "diagram", eyebrow: "CHOOSE A BOUNDARY", title: "MAKE THE ACTIVITY FINITE", detail: "The boundary should be visible before the activity begins.", items: ["ONE SAVED VIDEO", "TEN PAGES", "ONE EPISODE", "ONE ROUND"]},
  S18: {kind: "character", eyebrow: "PHYSICAL NEXT ACTION", title: "GIVE THE PHONE A LANDING PLACE", detail: "Move it out of automatic reach.", items: ["BED", "HAND", "LANDING PLACE"]},
  S19: {kind: "step", eyebrow: "STEP 3", title: "WRITE ONE IF–THEN SENTENCE", detail: "Pre-decide the ending while the decision is still easy.", items: ["IF THE BOUNDARY ENDS…", "THEN THE PHONE GOES…"]},
  S20: {kind: "diagram", eyebrow: "MOVE THE DECISION", title: "EARLIER, NOT STRONGER", detail: "Do not ask the most tired version of you to invent an ending.", items: ["EARLIER PLAN", "VISIBLE END", "PHYSICAL ACTION"]},
  S21: {kind: "caution", eyebrow: "EVIDENCE BOUNDARY", title: "EXPERIMENT, NOT TREATMENT", detail: "A small trial can reveal friction. It is not a guarantee.", items: ["OBSERVE", "ADJUST", "DO NOT OVERCLAIM"]},
  S22: {kind: "log", eyebrow: "THE NEXT MORNING", title: "ASK THREE NARROWER QUESTIONS", detail: "Review the design instead of grading your character.", items: ["WHEN DID THE DELAY START?", "DID THE END FEEL VISIBLE?", "WAS THE PHONE WITHIN REACH?"]},
  S23: {kind: "diagram", eyebrow: "IF THE ANSWER IS NO", title: "CHANGE THE DESIGN", detail: "Change the timing, ownership or distance—not the insult.", items: ["EARLIER OWNED TIME", "A BETTER ACTIVITY", "MORE DISTANCE"]},
  S24: {kind: "feed", eyebrow: "THE POINT", title: "NOT EVERY EVENING MUST BE EFFICIENT", detail: "Stop asking your tired self to invent an ending inside something designed to continue.", items: ["CONTINUE", "CONTINUE", "CONTINUE"]},
  S25: {kind: "title", eyebrow: "BEFORE THE NEXT SCROLL", title: "DECIDE WHERE IT ENDS", detail: "Give the feed an ending before it begins.", items: []},
};
