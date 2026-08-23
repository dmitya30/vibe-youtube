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
### CTL-0071 Breakout dispersion inside one format measured on three same format channels

- answers: OQ-010;
- mechanic: three channels running the identical long form sleep history format diverge by four orders of magnitude in outcome, and output volume does not explain the divergence;
- classification: OBSERVED FACT, machine measured;
- primary URLs: https://socialblade.com/youtube/handle/historiansleeplessyt and https://socialblade.com/youtube/handle/boringhistory25 ;
- capture date: 2026-08-23;
- measured: original at 711000 subscribers, 340 videos, 43627095 views, about 45000 views per day; imitator at 48900 subscribers, 421 videos, 3503591 views, about 1000 views per day; second imitator at 220000 subscribers, 14 videos, 1998 lifetime views and zero daily motion;
- inference: the imitator with more videos than the original holds 12.5 times fewer views, so breakout is a property of the channel inside the format and not of the format itself; cadence and format copying both fail to transfer it;
- applicability: very high, this is the direct answer to the format selection question;
- confidence: high;
- next verification step: none, the format level question is closed.

### CTL-0072 Breakout dispersion narrows as a channel matures

- answers: OQ-010;
- mechanic: on a mature animated essay channel adjacent uploads differ by a factor of about two, while on a cold start channel one upload carries almost the whole history;
- classification: OBSERVED FACT, feed measured;
- primary URL: https://www.youtube.com/feeds/videos.xml?channel_id=UC-tLyAaPbRZiYrOJxAGB7dQ ;
- capture date: 2026-08-23;
- measured: Pursuit of Wonder created 2017-02-13, 3400000 subscribers, 313 videos, 240000000 views; adjacent uploads at 97811 and 212262 views, a spread of 2.2 times;
- contrast: the cold start case at CTL-0065 holds 46 percent of channel history in a single video;
- inference: breakout is not a prize but an entry into a regime where later uploads no longer require an outlier; planning should treat the first breakout as a state change rather than as a revenue event;
- applicability: high;
- confidence: medium high, two points on a dispersion curve;
- next verification step: none.

### CTL-0073 Runtime is the cheapest available lever on the watch hour threshold

- answers: OQ-009;
- mechanic: watch hours banked per video rise faster with runtime than percentage retention falls, so the views required to reach 4000 hours drop sharply as runtime grows;
- classification: DERIVED from two measured sources;
- primary URLs: https://www.jasonscottmontoya.com/business/youtube/840-ideal-length-video and https://humbleandbrag.com/blog/youtube-audience-retention-benchmarks ;
- capture date: 2026-08-23;
- measured watch hours per video on a 353 video library: under 5 minutes 2.29, 5 to 10 minutes 6.76, 35 to 40 minutes 21.0, dominant band 30 to 40 minutes;
- measured retention bands for 2026: under 5 minutes 50 to 70 percent, 5 to 15 minutes 40 to 55 percent, 15 to 30 minutes 30 to 45 percent, over 30 minutes 25 to 35 percent;
- derived views needed for 4000 hours: about 64000 at 8 minutes, about 18000 at 45 minutes, about 11000 at 90 minutes, a six fold spread produced by runtime alone;
- applicability: very high, runtime is nearly free in a Remotion and generation pipeline;
- confidence: medium high, one operator library plus published benchmarks;
- next verification step: confirm the retention band for asset built narration specifically.

### CTL-0074 Very long form buys hours but not audience, which caps its use

- answers: OQ-009;
- mechanic: the sleep and background format reaches the hour threshold cheaply while showing very weak engagement per subscriber;
- classification: OBSERVED FACT, machine measured;
- primary URL: https://socialblade.com/youtube/handle/sleeplesshistorian ;
- capture date: 2026-08-23;
- measured: 711000 subscribers producing about 45000 views per day, which is roughly 0.06 percent of the base per day; tracker estimate 11 to 172 USD per day against 43600000 lifetime views;
- inference: runtime lowers the threshold cost but background consumption suppresses click through, subscriber activation and revenue per view, so very long form suits threshold crossing and not audience building;
- design consequence: consider very long form as a threshold instrument on a separate surface, not as the main format of a channel intended to carry a product;
- applicability: high;
- confidence: medium high;
- next verification step: none.

### CTL-0075 Format copying is directly observable and directly fails

- answers: NO_OPEN_QUESTION, recorded because it settles a standing owner concern about imitation;
- mechanic: two channels copied a successful format including its wording and one of them copied the channel name, and both failed while the original continued;
- classification: OBSERVED FACT;
- capture date: 2026-08-23;
- observation: a third same named channel created 2017-09-23 carries uploads at 2 lifetime views each; the 220000 subscriber imitator carries 1998 lifetime views across 14 videos;
- inference: imitation is cheap and visible but does not transfer outcome, which lowers the practical weight of the copying risk recorded earlier; the defensible asset is not the visual template;
- applicability: medium;
- confidence: high;
- next verification step: none.
### CTL-0076 Optimal runtime band for faceless long form is twenty to forty minutes

- answers: OQ-009 refinement;
- SUPERSEDES: the thirty to forty minute read inside CTL-0073, which came from one operator library of camera facing talks and podcasts and was wrongly generalised to asset built video;
- classification: OBSERVED FACT from a public API sample;
- primary URL: https://echoetch.com/blog/how-long-should-faceless-youtube-videos-be ;
- sample: 1092 public long form videos published since 2026-02-01 across 32 query families in eight faceless friendly lanes, pulled 2026-05-04;
- measured median views per day: 4 to 8 minutes 1.5, 8 to 12 minutes 38.4, 12 to 20 minutes 2105.3, 20 to 40 minutes 3194.6, 40 plus minutes 2111.4;
- measured on channels under 100000 subscribers only: 1.1, 7.0, 46.3, 356.9, 265.6, so the band holds and widens on small channels;
- niche variation: history and psychology and mythology peak at 20 to 40, mystery at 12 to 20, business and AI and geopolitics at 40 plus;
- limits: this measures views per day and not retention, revenue or impressions, and channel size is a confounder because larger channels publish longer;
- confidence: medium high.

### CTL-0077 The best reach band is also nearly the cheapest threshold band

- answers: OQ-009;
- mechanic: the runtime that maximises median reach and the runtime that minimises views needed for 4000 watch hours nearly coincide, so there is no trade off to manage in the middle of the range;
- classification: DERIVED from CTL-0073 retention bands and CTL-0076 reach bands;
- derived views needed for 4000 hours: about 32400 at 20 minutes, about 24200 at 30 minutes, about 20000 at 40 minutes, against about 64000 at 8 minutes;
- the extremes lose on both axes at once: 4 to 8 minutes is the weakest reach bucket and the most expensive threshold, and 90 plus minutes is the cheapest threshold but suppresses click through and subscriber activation per CTL-0074;
- planning rule: target 20 to 40 minutes as the default production band, use 12 to 20 when the idea is narrow, and treat 40 plus as a rare deep dive after audience trust exists;
- sequencing rule: assign runtime after the script has an arc, never before, because a stretched thin idea underperforms an honest shorter one;
- Shorts note: Shorts do not advance the 4000 hour threshold, which has a separate 10 million view counter, so a Shorts bundle is a discovery surface and not a threshold instrument; see OQ-004;
- applicability: very high, this sets the production default;
- confidence: medium high.

### CTL-0078 Entry timing into a lane, not execution, separated the winner from its imitators

- answers: OQ-011;
- mechanic: six channels ran the same long form sleep history format and one succeeded, and the surviving explanation is arrival before the lane saturated rather than any difference in execution;
- classification: OBSERVED FACT, feed and tracker measured;
- capture date: 2026-08-23;
- measured cohort: original 711000 subscribers and 43.6 million views; imitators at 48900 subscribers with 421 videos and 3.5 million views, 220000 subscribers with 1998 lifetime views, 29 subscribers with 2331 lifetime views;
- per video feed measurement of two late entrants: a channel created 2025-04-24 uploading in November and December 2025 shows 13, 58 and 26 views per video; a channel created 2017-04-02 that pivoted into the format on 2025-06-16 shows 871, 10 and 14;
- inference: channel age does not help, cadence does not help and copying the wording does not help, so what transfers between operators is lane timing and not format;
- corroboration: the lane was already saturating the recommendation surface by 2025-09-03 per https://www.404media.co/ai-generated-boring-history-videos-are-flooding-youtube-and-drowning-out-real-history/ ;
- limit: one winner only, and off platform seeding or paid promotion by the original cannot be excluded from public data;
- confidence: medium.

### CTL-0079 In background formats execution quality is not the selection filter

- answers: OQ-011;
- mechanic: an audible synthesis defect did not prevent mass distribution, because the format is consumed by sleeping viewers who never register it;
- classification: OBSERVED FACT, reported by a named outlet with the artefact described;
- primary URL: https://www.404media.co/ai-generated-boring-history-videos-are-flooding-youtube-and-drowning-out-real-history/ ;
- publication date: 2025-09-03;
- observed: a two hour video with 2.3 million views in which the narration voice breaks into a loud tone artefact at about one hour fifteen minutes;
- inference: outproducing an incumbent on quality is not a viable entry strategy in background formats, which removes the main lever this pipeline would otherwise rely on;
- consequence: the pipeline advantage of clean production converts into value only in formats where the viewer is awake and attentive, which argues for the attentive mid length band over background very long form;
- applicability: high, it constrains where the production asset is actually worth anything;
- confidence: medium high;
- next verification step: none.

### CTL-0080 The reachable sleep history lane is closed by saturation and by policy exposure

- answers: OQ-011 as a negative conclusion;
- mechanic: the lane this pipeline could execute best is simultaneously saturated and under active platform enforcement pressure, so entering it inherits the imitator outcome rather than the incumbent one;
- classification: DERIVED from CTL-0078, CTL-0079 and the policy record at CTL-0061;
- saturation evidence: five measured late entrants sit between 10 and 900 views per video against an incumbent at about 45000 views per day;
- policy evidence: the mass produced content tightening announced 2025-07-09 targets exactly this phenomenon, and creators interviewed two months later reported no observable enforcement yet, so the risk is pending rather than resolved;
- reputational and accuracy exposure: working historians publicly identify this lane as inaccurate automated output that displaces researched work, which is a demonetisation and brand risk on top of the ethical objection;
- decision: this lane is recorded as measured and rejected for entry, and is retained only as the reference example of a closed lane;
- applicability: high;
- confidence: high;
- next verification step: none, the lane is closed.
### CTL-0081 Correction, the July 2025 policy update was a clarification and not a tightening

- answers: NO_OPEN_QUESTION, this entry corrects a drift introduced by the assistant on 2026-08-23;
- SUPERSEDES: the policy risk clause inside CTL-0080, which is withdrawn;
- classification: OBSERVED FACT, primary source read directly;
- primary URL: https://support.google.com/youtube/answer/1311392 ;
- what the source says: a minor update to the repetitious content policy to clarify that it includes content that is repetitive or mass produced, with the reused content policy unchanged;
- corroboration: the platform creator liaison stated publicly that the update is not a crackdown on AI or on reaction content but a clarification of existing wording;
- the error: CTL-0080 restated the same single source as a tightening explicitly targeting the sleep history lane and as active enforcement pressure, which the source does not support, and attached an unsupported demonetisation risk to it;
- what survives from CTL-0080: the saturation measurement only, five late entrants between 10 and 900 views per video against an incumbent at about 45000 views per day; the lane is closed on saturation grounds alone;
- standing rule reaffirmed: policy statements are recorded verbatim from the primary source and any consequence drawn from them is labelled DERIVED and never merged into the same sentence as the fact;
- confidence: high.

### CTL-0082 Research closure criterion agreed with the owner

- answers: NO_OPEN_QUESTION, this entry fixes the stopping rule for the workstream;
- classification: OWNER DECISION, 2026-08-23;
- decision: discovery stops when OQ-003, OQ-005, OQ-006 and the OQ-013 procedure are closed, and the cold start decision is then taken on the evidence held at that moment regardless of what remains unmeasured;
- rationale for each survivor: OQ-003 is go or no go for the recurring frame the pipeline is built on; OQ-006 is the only missing measurement under the load bearing route C13; OQ-005 converts niche choice from taste into arithmetic; OQ-013 is reduced from a question to a reusable feed procedure because any lane answer decays faster than a production cycle;
- deadline that bounds the whole workstream: YPP entry thresholds for new applicants double on 2027-02-01 per CTL-0006, so a channel started in 2026 can qualify under the current threshold and one started in spring 2027 cannot;
- applicability: governs every subsequent pass;
- confidence: high.
### CTL-0081 Correction, the July 2025 policy update was a clarification and not a tightening

- answers: NO_OPEN_QUESTION, this entry corrects a drift introduced by the assistant on 2026-08-23;
- SUPERSEDES: the policy risk clause inside CTL-0080, which is withdrawn;
- classification: OBSERVED FACT, primary source read directly;
- primary URL: https://support.google.com/youtube/answer/1311392 ;
- what the source says: a minor update to the repetitious content policy to clarify that it includes content that is repetitive or mass produced, with the reused content policy unchanged;
- corroboration: the platform creator liaison stated publicly that the update is not a crackdown on AI or on reaction content but a clarification of existing wording;
- the error: CTL-0080 restated the same single source as a tightening explicitly targeting the sleep history lane and as active enforcement pressure, which the source does not support, and attached an unsupported demonetisation risk to it;
- what survives from CTL-0080: the saturation measurement only, five late entrants between 10 and 900 views per video against an incumbent at about 45000 views per day; the lane is closed on saturation grounds alone;
- standing rule reaffirmed: policy statements are recorded verbatim from the primary source and any consequence drawn from them is labelled DERIVED and never merged into the same sentence as the fact;
- confidence: high.

### CTL-0082 Research closure criterion agreed with the owner

- answers: NO_OPEN_QUESTION, this entry fixes the stopping rule for the workstream;
- classification: OWNER DECISION, 2026-08-23;
- decision: discovery stops when OQ-003, OQ-005, OQ-006 and the OQ-013 procedure are closed, and the cold start decision is then taken on the evidence held at that moment regardless of what remains unmeasured;
- rationale for each survivor: OQ-003 is go or no go for the recurring frame the pipeline is built on; OQ-006 is the only missing measurement under the load bearing route C13; OQ-005 converts niche choice from taste into arithmetic; OQ-013 is reduced from a question to a reusable feed procedure because any lane answer decays faster than a production cycle;
- deadline that bounds the whole workstream: YPP entry thresholds for new applicants double on 2027-02-01 per CTL-0006, so a channel started in 2026 can qualify under the current threshold and one started in spring 2027 cannot;
- applicability: governs every subsequent pass;
- confidence: high.
### CTL-0083 Frame correction, the ad programme is unavailable and was never the target

- answers: NO_OPEN_QUESTION, this corrects an assistant drift across the last three passes;
- SUPERSEDES: the deadline clause in CTL-0082 and the threshold cost framing in CTL-0077;
- classification: OWNER CONSTRAINT, restated from README section 10 where it was already recorded as YPP_AS_TARGET=WITHDRAWN_USED_ONLY_AS_SCALE_CALIBRATION;
- the constraint: the operator resides in Russia where the platform ad programme has been unavailable since 2022-03-03, so ad monetization, ad policy, review outcomes and demonetization risk are all outside this workstream;
- what watch hour and subscriber thresholds are for: they are a calibration scale only, a public yardstick for whether an audience is large and attentive enough to buy a product or to justify a direct advertising placement;
- the error: three passes treated the 4000 hour threshold as a planning target, promoted 2027-02-01 to a binding deadline, and derived a demonetization risk that cannot apply, which also produced the false policy claim corrected in CTL-0081;
- consequence: the 2027-02-01 date is demoted to a calibration footnote and carries no deadline force; revenue arithmetic is rebuilt on views per sale rather than on revenue per thousand views;
- confidence: high, owner stated and already present in the workspace record.

### CTL-0084 Smallest observed channel reaching first revenue without ads

- answers: OQ-006;
- mechanic: the operator sells an artefact that falls out of the free content itself, keeps the content free, and asks directly for the purchase from the first videos;
- classification: OPERATOR SELF REPORT, unverified numbers, mechanism plausible;
- primary URL: https://www.reddit.com/r/NewTubers/comments/1j784r1/i_made_my_first_income_from_youtube_at_300/ ;
- capture date: 2026-08-23, post dated 2025-03-09, 308 score and 177 comments in a 719000 member subreddit;
- measured scale: first revenue at 318 subscribers, which is the smallest first revenue case observed in any niche across all passes;
- the product: written notes for tutorials that remain free to watch, so the paid item is a by product of production and costs almost nothing extra to make;
- secondary mechanic: email capture runs alongside the offer, which detaches the audience from the platform;
- limit: revenue amount was asked for repeatedly in the thread and never disclosed, so this establishes that first revenue is possible at this scale and not how much;
- applicability: very high, it is the load bearing route C13 observed at the smallest scale;
- confidence: medium.

### CTL-0085 Views per sale, the arithmetic that replaces revenue per thousand views

- answers: OQ-005 reframed;
- mechanic: the funnel is view to description click to purchase, and the binding variable is how tightly the product is bound to the video subject;
- classification: OPERATOR SELF REPORTS, several independent operators in one thread;
- primary URL: https://www.reddit.com/r/PartneredYoutube/comments/141mmao/can_anyone_provide_an_estimate_for_the_conversion/ ;
- measured view to click: 0.1 to 1 percent, with one operator reporting 600 clicks against 100000 views which is 0.6 percent;
- measured click to purchase: 0.5 to 2 percent when the product is incidental to the video, 6 to 15 percent when the product is central to it;
- derived views per sale: about 2000 views per sale at a tight binding of 0.5 percent click and 10 percent purchase, against about 50000 views per sale at a loose binding of 0.2 percent click and 1 percent purchase, a spread of twenty five times;
- inference: binding tightness dominates niche choice and dominates volume, and it is the same mechanism as the notes artefact in CTL-0084;
- planning consequence: a topic is only viable if the product is the natural continuation of the video rather than an attachment to it;
- limit: self reported, mostly affiliate rather than own product, and one outlier claim of 20 percent click to purchase in the automotive niche is not treated as typical;
- confidence: medium.

### CTL-0086 Open question set rewritten into the no ads frame

- answers: NO_OPEN_QUESTION, bookkeeping entry;
- classification: WORKSPACE DECISION, 2026-08-23;
- OQ-003 is rewritten, the monetization review wording is dropped as inapplicable and the live remainder is whether the recommendation surface keeps allocating impressions to a channel whose videos all look alike, which is a distribution question; the rejection case at CTL-0063 loses evidential force here because it concerns review and not distribution;
- OQ-005 is rewritten from revenue per thousand views to views per sale against production cost per video, per CTL-0085;
- OQ-006 is answered by CTL-0084 and its successor question becomes what binds a product tightly to a video subject;
- closure set is now OQ-003 rewritten, OQ-013 procedure, and OQ-014 binding tightness, with the 2027-02-01 date carrying no force;
- confidence: high.
### CTL-0087 Contrast pair, topical match does not sell and artefact match does

- answers: OQ-014;
- mechanic: two operators sold a product on the topic of their own channel and the outcomes differ by orders of magnitude, and what separates them is whether the product is the artefact shown in the video;
- classification: OPERATOR SELF REPORTS, one failure with full detail and one benchmark with disputed figures;
- failure URL: https://www.reddit.com/r/digital_marketing/comments/1oh89a5/i_launched_my_first_digital_as_a_youtuber_and/ ;
- failure measured: 140000 subscribers, an audiobook at 17 dollars on a topic the operator confirms is the channel topic, months of warm up through videos, freebies, a promo video, a pinned comment and a weekly newsletter, and 4 sales;
- benchmark URL: https://www.reddit.com/r/PartneredYoutube/comments/1hvva6g/how_does_thomas_frank_make_100k_with_a_notion/ ;
- benchmark measured: about 400000 views per month against about 1000 sales per month of two templates priced 64.5 and 139 dollars, which is 0.25 percent view to purchase or about 400 views per sale;
- inference: topical alignment is not the binding variable, since the failure case had it in full; the benchmark product is the object demonstrated on screen while the failure product required the viewer to switch from watching to listening;
- limits: benchmark figures are self reported and contested in the same thread, the operator had a prior channel of about 2 million subscribers, and part of his traffic comes from search and a mailing list rather than from the channel;
- confidence: medium.

### CTL-0088 Substitute availability sets views per sale within a factor of twelve

- answers: OQ-014;
- mechanic: the same funnel shape produces very different yields depending on whether the viewer already has a free or prepaid alternative to the product;
- classification: OPERATOR SELF REPORT with the operator naming the cause himself;
- primary URL: https://www.reddit.com/r/PartneredYoutube/comments/1hvva6g/how_does_thomas_frank_make_100k_with_a_notion/ ;
- measured middle case: a fitness operator at 170000 subscribers and 2.5 million views selling a 20 dollar book reports 10000 dollars of revenue, which is about 500 sales, 0.02 percent view to purchase, about 5000 views per sale;
- the operator states the cause directly, that fitness material exists everywhere as video, books, podcasts and apps so viewers have little reason to buy, while the benchmark audience is already inside the tool and the product needs no introduction;
- derived ladder of views per sale: about 400 with no substitute, about 5000 with abundant free substitutes, and effectively unbounded when the product also changes the consumption mode;
- secondary constraint recorded by the same operator: about 30 percent of his audience sits in countries he cannot sell to, so geography reduces the sellable share of views independently of conversion;
- confidence: medium.

### CTL-0089 The three conditions of tight product to video binding

- answers: OQ-014, closing it;
- classification: DERIVED from CTL-0084, CTL-0085, CTL-0087 and CTL-0088;
- condition one, same artefact: the product is the object the video demonstrates rather than a work about the same subject; the template on screen and the notes taken during the tutorial satisfy this and an audiobook about the topic does not;
- condition two, no substitute: the product has no free or already prepaid alternative one search away, which is where the audiobook lost to existing audio subscriptions and the fitness book lost to the open internet;
- condition three, friction the video created: the video makes visible an amount of work the product removes, so the purchase resolves a problem the viewer did not have before watching;
- consequence for niche selection: a candidate niche is tested by asking what the viewer will want to carry away immediately after watching that cannot be downloaded free in a minute, and a niche with no such artefact is rejected regardless of its reach;
- consequence for the esoteric candidate: a reading or an interpretation is a service performed by a person rather than an artefact, which is why every monetized case in that niche sold access to a person; an artefact form must be identified there before the niche can be reconsidered;
- applicability: very high, this is now the first filter applied to any candidate niche;
- confidence: medium high.
