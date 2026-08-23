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

Entries are appended below in identifier order.
### CTL-0065 A verified sub two month cold start, financial commentary, breakout driven

- answers: OQ-001;
- mechanic: monetization reached from one breakout long form video rather than from accumulation, on an operator identified channel;
- classification: OBSERVED FACT, self report matched to third party measurement;
- primary URLs: https://www.reddit.com/r/PartneredYoutube/comments/1syvxf8/did_anyone_here_manage_to_get_monetized_in_less/ and https://socialblade.com/youtube/handle/peeponomics ;
- capture date: 2026-08-23;
- self report: monetized within about one month from a single video at 60000 views, animated commentary in the economics and finance niche, own voice;
- measured: 3710 subscribers, 143383 lifetime views, 11 videos; the breakout video holds 66000 views, which is 46 percent of the entire channel history;
- measured revenue: tracker estimate 0 to 17 USD per day at current traffic, nine months after the breakout;
- inference: the threshold is crossed by one outlier, and crossing it does not produce income; the two events are separated by a large gap and must be planned as separate milestones;
- applicability: high, this is the first cold start case in the ledger with both a named channel and machine measurement;
- confidence: high;
- next verification step: none, case closed.

### CTL-0066 The monetization threshold is crossed by a breakout, not by accumulation

- answers: OQ-001 and OQ-002;
- mechanic: across a large operator sample the reported path to the threshold is a single video that outperforms the channel, not a steady climb;
- classification: OBSERVED PATTERN across roughly four hundred operator replies in three threads;
- primary URLs: https://www.reddit.com/r/NewTubers/comments/1vfmq7o/how_many_videos_until_you_were_monetized/ and https://www.reddit.com/r/NewTubers/comments/1ovzidv/did_anyone_here_start_in_2025_and_get_monetized/ ;
- capture date: 2026-08-23, threads dated 2026-08-04 and 2025-11-13, subreddit of 719279 members;
- distribution of reported video counts at monetization: 1, 2, 3, 3, 5, 5, 6, 7, 8, 9, 9, 11, 12, 15 to 20, 18, 25, 30, 32, and a long tail at 190, 200, 350 and 400 that had not monetized;
- reported elapsed time clusters at two weeks to four months for the fast group and one to two years or never for the tail;
- qualifier stated by many fast reporters: the successful channel was their third, fifth or ninth attempt, so the fast cases carry unmeasured prior skill;
- inference: this contradicts the volume model and matches the outlier finding already recorded; planning should assume the threshold arrives with a breakout whose timing cannot be scheduled, and cadence exists to buy attempts;
- applicability: very high;
- confidence: medium high, testimony at scale rather than measurement;
- next verification step: none, treat as the standing shape of the first milestone.

### CTL-0067 The tail that fails is concentrated in Shorts, which qualifies the Shorts plus long form pairing

- answers: OQ-004;
- mechanic: high video counts without monetization are reported almost exclusively by operators whose output is mainly short form or very short long form;
- classification: OBSERVED PATTERN, same sample as CTL-0066;
- capture date: 2026-08-23;
- observations: 400 videos and 200 subscribers on mixed Shorts and long form; 98 long form of one to two minutes plus 263 Shorts giving 873 subscribers and 689 watch hours; a long form at 35000 views yielding only about 500 watch hours because it ran two minutes; 62 daily videos yielding 38 subscribers;
- contrasting observation: one operator reports 10 million Shorts views and 5300 subscribers in three months, reaching the Shorts threshold but not the subscriber based one;
- inference: runtime is the binding variable for the watch hour threshold, not video count; a two minute long form is functionally a Short for threshold purposes; the pairing works only when the long form is long enough to bank hours;
- design consequence: any format we adopt must sustain roughly ten minutes of substance, which is a harder constraint on the esoteric grid format than cadence is;
- applicability: very high;
- confidence: medium high;
- next verification step: measure runtime distribution on the next verified cold start case.

### CTL-0068 First monetization and first income are separated by roughly two orders of magnitude

- answers: OQ-002;
- mechanic: operators who crossed the threshold report income far below the level implied by the milestone;
- classification: OBSERVED PATTERN with one measured case;
- capture date: 2026-08-23;
- reported figures: 406700 views and 51900 watch hours over eleven months yielding 1648 USD total, about 150 USD per month; 8000 watch hours per month in the travel niche yielding a first month above 1000 USD after ten months; 300 USD per month at 1000 subscribers reached in ten weeks; 60 to 120 GBP per month on 28 long form videos; a kids channel at 16 million views and 28000 subscribers yielding about 600 GBP per month;
- measured case: the channel in CTL-0065 at 143383 lifetime views is estimated at 0 to 17 USD per day;
- inference: this confirms the arithmetic in COLD_START_ECONOMICS.md from operator data rather than from assumption, and it means the advertising layer cannot be the objective; the milestone that matters is the one after monetization;
- applicability: very high, it justifies C13 on measured grounds;
- confidence: medium high;
- next verification step: none, fold into the economics file at the next revision.

### CTL-0069 Contrast case, a non English language reported as the decisive advantage, held outside the main sample

- answers: NO_OPEN_QUESTION, recorded because it contradicts a standing decision;
- mechanic: an operator attributes monetization within one month to publishing in Spanish rather than English, citing lower competition;
- classification: CLAIM, single operator, unverifiable;
- primary URL: https://www.reddit.com/r/NewTubers/comments/1ovzidv/did_anyone_here_start_in_2025_and_get_monetized/ ;
- capture date: 2026-08-23;
- tension with CTL-0053: English was adopted as the source language because automatic dubbing carries English outward but not inward; this operator argues the opposite trade, that entry competition matters more than reach;
- inference: the two positions are not contradictory but describe different stages, since dubbing raises the ceiling while a less contested language lowers the entry barrier; the decision should be revisited only when a probe format is chosen;
- applicability: medium;
- confidence: low, single claim;
- next verification step: if a second independent operator reports the same, reopen the production language decision as a formal question.

### CTL-0070 Contrast cases outside pipeline reach, recorded and excluded from the sample

- answers: NO_OPEN_QUESTION, recorded under the sampling rule agreed with the owner on 2026-08-23;
- rule: cases whose format our pipeline cannot physically produce are recorded as contrast and excluded from the main sample so that it does not fill with the unreachable;
- classification: OBSERVED, sampling hygiene;
- capture date: 2026-08-23;
- excluded cases: travel vlogging monetized in nine videos and separately in ten months at 8000 watch hours per month; knife and everyday carry reviews near threshold in six months; ASMR car repair at 25 videos over a year; a kids channel at 16 million views in three months; live streaming for four months; microphone reviews; gaming playthroughs and game tutorials;
- observation worth keeping from the excluded set: the travel case reached the threshold on nine videos over four months of regular posting, which is close to our cadence, so cadence is not what excludes these cases, physical capture is;
- inference: the reachable set for us is animation, commentary, instruction and any format built from assets rather than from filming, which is the same set implied by the Remotion pipeline;
- applicability: medium, this constrains future sampling rather than design;
- confidence: high;
- next verification step: apply the same exclusion in every subsequent pass.
