# VIDEO-001 Analytics record

Updated: 2026-08-15
Status: BASELINE RECORDED / THUMBNAIL-ONLY INTERVENTION ACTIVE
Video ID: `ow_eUmvptuM`
Public URL: `https://youtu.be/ow_eUmvptuM`
Snapshot range shown by YouTube Studio: 2026-08-05 through 2026-08-13
Capture date: 2026-08-14

Record ID:

`VIDEO001_ANALYTICS_RECOVERY_2026_08_14`

## 1. Evidence boundary

The planned 72-hour checkpoint on 2026-08-08 was missed while VIDEO-002 was in production. The available evidence is therefore a delayed snapshot covering approximately the first eight to nine days after publication.

Evidence received:

- two short YouTube Studio CSV exports;
- eight YouTube Studio screenshots;
- Overview, Reach, Engagement and Audience views;
- the audience-retention curve, including the point at 0:31.

Known limitations:

- the sample is extremely small;
- owner-associated and personally seeded traffic is present but not quantifiable;
- source-level retention is only available for impressions-derived viewing through the Reach funnel;
- geography, detailed search terms and a clean reconstructed 72-hour export are unavailable;
- percentages must not be interpreted as stable channel benchmarks.

## 2. Snapshot metrics

| Metric | Value |
|---|---:|
| Views | 26 |
| Unique viewers | 19 |
| Impressions | 581 |
| Impressions click-through rate | 2.6% |
| Watch time | 1.0 hours |
| Average view duration | 2:14 |
| Average percentage viewed | 21.3% |
| Retention at 0:31 | 38% |
| Subscribers gained | +1 |
| Likes ratio | 100%, sample too small |
| End-screen element CTR | 0.0% |

Video duration is 10:32.

The displayed watch-time total is rounded. The CSV value previously captured was approximately 0.9704 hours, which is consistent with an average view duration of approximately 2:14 across 26 views.

## 3. Reach funnel

| Funnel metric | Value |
|---|---:|
| Impressions | 581 |
| Share of impressions shown in YouTube recommendations | 98.1% |
| Impressions CTR | 2.6% |
| Views generated from thumbnail impressions | 15 |
| Average view duration from impressions | 1:35 |
| Watch time generated from impressions | 0.4 hours |

The funnel values are internally consistent: approximately 0.4 hours across 15 impressions-derived views is approximately 1:36 per view.

The impressions-derived average view duration of 1:35 is materially lower than the overall 2:14. This suggests that direct, seeded or otherwise non-impression viewers may have watched longer than viewers reached through recommendation surfaces. Because the sample is very small, this is a diagnostic signal rather than a stable conclusion.

## 4. Traffic sources

| Traffic source | Share |
|---|---:|
| Suggested videos | 50.0% |
| Direct or unknown | 23.1% |
| Browse features | 15.4% |
| Channel pages | 3.9% |
| YouTube Search | 3.9% |
| Other | 3.8% |

YouTube did provide an initial recommendation test. The problem is not zero platform exposure: 98.1% of counted thumbnail impressions appeared in recommendation surfaces. However, the test remained small and impressions fell to approximately zero after the first several days.

## 5. Retention diagnosis

The retention curve shows:

- a very steep initial decline;
- only 38% of viewers remaining at 0:31;
- approximately 62% lost before or around the end of the cold open;
- retention generally remaining at a low level through most of the video;
- no large sustained recovery later in the video;
- average percentage viewed of 21.3%.

The strongest negative signal in the snapshot is the opening retention. The provisional project planning reference was 65% at approximately 30 seconds; the observed 38% is far below that reference. The sample is too small for precise optimization, but the size and direction of the drop are sufficient to classify the opening as a failed first benchmark.

Possible contributing factors that remain hypotheses:

1. The opening takes too long to deliver the concrete payoff.
2. The visual pacing is too calm for viewers arriving from recommendation surfaces.
3. The title and `00:47` thumbnail create curiosity that the first 30 seconds do not satisfy quickly enough.
4. The narration begins conceptually before establishing enough immediate tension or consequence.
5. Seeded and direct viewers may tolerate the pacing better than cold recommendation viewers.

## 6. Packaging diagnosis

CTR of 2.6% on 581 impressions is a weak initial signal, but the sample is too small to estimate a stable channel CTR.

Operational classification:

- distribution volume: `FAIL_LOW_IMPRESSIONS`;
- packaging: `WEAK_SIGNAL`;
- recommendation response: `WEAK`;
- first-31-second retention: `FAIL`;
- overall engagement: `WEAK_SIGNAL`;
- organic product-market fit: `NOT_ESTABLISHED`.

Thumbnail C, `00:47`, did not produce a strong enough combined click-and-watch result in the initial test. This does not prove that candidate A or B would win. Any packaging intervention must change one variable at a time and record its start time.

No title or thumbnail change is included in this documentation commit. The baseline is recorded first.

## 7. Production and strategy decision

The project must optimize for faster validated hypothesis throughput, not blind content volume and not maximum production complexity.

For VIDEO-003 and later benchmarks:

1. Validate demand, topic, promise, title and thumbnail direction before full production.
2. Target a shorter 6–8 minute runtime unless the topic demonstrably requires more.
3. Deliver the central tension and concrete promise in the first 10–15 seconds.
4. Treat the first 30 seconds as a separate editorial and visual QA gate.
5. Use deterministic Remotion components for repeatable graphics, typography and controlled motion.
6. Use generated hero frames or short generative clips where they add emotional, spatial or narrative information.
7. Do not add generative footage merely to increase the asset count.
8. Automate mechanical validation, asset synchronization, rendering, contact sheets, captions, manifests and analytics capture.
9. Keep topic choice, claims, script meaning, visual watchability, packaging and publication human-approved.
10. Prevent another nine-day production loop before the next analytics checkpoint.

## 8. VIDEO-002 visual-watchability concern

VIDEO-002 contains 53 timed semantic scenes implemented through 20 Remotion production compositions. It did not literally consist of only two total visual frames. However, only a small number of bespoke generated cinematic assets were used, while much of the runtime relies on deterministic layouts, diagrams, typography and controlled animation.

That production decision is not automatically a defect. Deterministic Remotion work can be highly watchable when visual states change meaningfully with the narration. The unresolved risk is repetition and insufficient emotional or spatial variation, especially in the cold open and longer explanatory passages.

Operational classification:

`VIDEO002_VISUAL_WATCHABILITY_RISK=REAL_BUT_UNPROVEN`

VIDEO-002 retention data must determine whether the deterministic-heavy approach harmed watchability. It must not be judged from asset count alone.

## 9. Day-30 position

Project start: 2026-07-29.
Day-30 checkpoint: 2026-08-27.
Public videos as of this snapshot: 2.

Current feasibility:

- minimum 4 total videos: still feasible but at risk;
- target 6 total videos: high risk;
- stretch 8 total videos: no longer realistic with the current production cycle;
- monetization threshold by Day 30: not supported by current evidence and never guaranteed.

The immediate goal is to complete at least two additional high-quality, faster benchmark videos while learning from their packaging and retention data.

## 10. Next actions

1. Preserve this snapshot as the VIDEO-001 baseline.
2. Decide separately whether to run one VIDEO-001 thumbnail intervention.
3. Add relevant end-screen paths between VIDEO-001 and VIDEO-002.
4. Capture VIDEO-002 analytics on schedule.
5. Begin VIDEO-003 with demand-first packaging and a first-30-second gate.
6. Complete the VIDEO-002 Shadow Automation summary.
7. Build only the automation that directly shortens the next production cycle.

## 11. Machine-readable summary

```text
VIDEO001_72H_CHECKPOINT=MISSED
VIDEO001_DELAYED_SNAPSHOT=RECORDED
VIDEO001_SNAPSHOT_RANGE=2026-08-05_TO_2026-08-13
VIDEO001_VIEWS=26
VIDEO001_UNIQUE_VIEWERS=19
VIDEO001_IMPRESSIONS=581
VIDEO001_CTR=2.6_PERCENT
VIDEO001_WATCH_TIME_HOURS=1.0_ROUNDED
VIDEO001_AVD=00:02:14
VIDEO001_AVP=21.3_PERCENT
VIDEO001_RETENTION_AT_00_31=38_PERCENT
VIDEO001_SUBSCRIBERS_GAINED=1
VIDEO001_RECOMMENDATION_IMPRESSION_SHARE=98.1_PERCENT
VIDEO001_IMPRESSION_VIEWS=15
VIDEO001_IMPRESSION_AVD=00:01:35
VIDEO001_IMPRESSION_WATCH_HOURS=0.4
VIDEO001_DISTRIBUTION=FAIL_LOW_IMPRESSIONS
VIDEO001_PACKAGING=WEAK_SIGNAL
VIDEO001_FIRST_31_SECONDS=FAIL
VIDEO001_ORGANIC_DEMAND=NOT_ESTABLISHED
VIDEO001_BASELINE=LOCKED_BEFORE_INTERVENTION
VIDEO002_VISUAL_WATCHABILITY_RISK=REAL_BUT_UNPROVEN
PRODUCTION_CADENCE=BEHIND_PLAN
PIPELINE_PRIORITY=FASTER_VALIDATED_HYPOTHESIS_THROUGHPUT
DAY30_MINIMUM_4=FEASIBLE_BUT_AT_RISK
DAY30_TARGET_6=HIGH_RISK
DAY30_STRETCH_8=NOT_REALISTIC_WITH_CURRENT_CYCLE
```


## 12. Thumbnail-only intervention

Record ID:

`VIDEO001_THUMBNAIL_INTERVENTION_2026_08_15`

The baseline was preserved before the intervention.

Intervention start:

- local date: 2026-08-15;
- local time: 08:30;
- local timezone: UTC+7;
- UTC time: 2026-08-15 01:30Z;
- previous thumbnail: C / `00:47`;
- intervention thumbnail: B / `NOT YOUR BRAIN`;
- title: unchanged;
- description: unchanged;
- visibility: unchanged;
- incognito thumbnail QA: PASS.

The intervention changes only the thumbnail. It does not establish that B is a winner. The purpose is to observe whether a clearer diagnostic reframe produces a different click response from any additional impressions.

Planned checkpoints:

- approximately 72 hours: 2026-08-18 at 08:30 UTC+7;
- approximately 7 days: 2026-08-22 at 08:30 UTC+7.

At each checkpoint record cumulative views, impressions, CTR, traffic sources, watch time and average view duration. Calculate incremental impressions and views relative to the baseline where the interface permits it.

Interpretation:

- if additional impressions are too low, record `INSUFFICIENT_SAMPLE`;
- do not infer a winner from a small CTR movement;
- do not change the title during this intervention;
- VIDEO-003 production continues while this observation runs.

```text
VIDEO001_THUMBNAIL_B_APPLIED=YES
VIDEO001_INTERVENTION_LOCAL_TIME=08:30_UTC_PLUS_7
VIDEO001_INTERVENTION_DATE=2026-08-15
VIDEO001_INTERVENTION_UTC=2026-08-15T01:30:00Z
VIDEO001_INTERVENTION_VARIABLE=THUMBNAIL_ONLY
VIDEO001_INTERVENTION_FROM=C_00_47
VIDEO001_INTERVENTION_TO=B_NOT_YOUR_BRAIN
VIDEO001_TITLE_DURING_INTERVENTION=UNCHANGED
VIDEO001_INCOGNITO_THUMBNAIL_QA=PASS
VIDEO001_72H_INTERVENTION_CHECKPOINT=2026-08-18T08:30:00_PLUS_07
VIDEO001_7D_INTERVENTION_CHECKPOINT=2026-08-22T08:30:00_PLUS_07
```

## 9. Thumbnail-B 72-hour checkpoint and platform reconciliation — 2026-08-18

Evidence: six owner-supplied YouTube Studio screenshots covering Overview, Reach, Engagement, retention and Audience.

Current platform values:

| Metric | Value |
|---|---:|
| Views | 24 |
| Impressions | 582 |
| Impressions CTR | 2.6% |
| Unique viewers | 19 |
| Watch time | 0.8 hours |
| Average view duration shown on Engagement | 2:01 |
| Average view duration shown on retention card | 2:16 |
| Average percentage viewed | 21.7% |
| Subscribers | +1 |
| Views from registered impressions | 15 |
| Average view duration from registered impressions | 1:35 |
| Watch time from registered impressions | 0.4 hours |

YouTube reconciled the earlier displayed total from 26 views to 24 and the rounded watch-time total from 1.0 hours to 0.8 hours. The historical snapshot remains unchanged because it accurately records what the platform displayed at capture time. The current record documents the later platform reconciliation.

Only one additional impression appeared after thumbnail B, `NOT YOUR BRAIN`, replaced thumbnail C on 2026-08-15 at 08:30 UTC+7. CTR remained 2.6%, and views from registered impressions remained 15. Thumbnail B therefore received no measurable retest.

Decision:

- keep thumbnail B through the seven-day checkpoint on 2026-08-22 at 08:30 UTC+7;
- keep title, description and visibility unchanged;
- do not declare B a winner or loser;
- classify the 72-hour intervention result as insufficient sample;
- retain the opening-retention diagnosis: steep initial loss, approximately 38% at 0:31 and weak overall retention.

```text
VIDEO001_PLATFORM_RECONCILIATION=RECORDED
VIDEO001_CURRENT_VIEWS=24
VIDEO001_CURRENT_IMPRESSIONS=582
VIDEO001_THUMBNAIL_B_ADDITIONAL_IMPRESSIONS=1
VIDEO001_THUMBNAIL_B_72H_RESULT=INSUFFICIENT_SAMPLE
VIDEO001_OPENING_RETENTION=FAIL
VIDEO001_7D_INTERVENTION_CHECKPOINT=2026-08-22T08:30:00+07:00
```
