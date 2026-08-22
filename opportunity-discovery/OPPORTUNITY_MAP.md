# Opportunity map

Updated: 2026-08-22
Status: second pass / sample corrected to cold start channels
Method: RESEARCH_PROTOCOL.md

## 1. Purpose

Compare directions before any of them consumes production capacity. The map stays broad first and narrows later.

## 2. Hard constraint discovered in the second pass

YPP entry thresholds for new applicants double on 2027-02-01 to 8000 qualified watch hours in 365 days or 20 million qualified Shorts views in 90 days. Until that date the thresholds are 1000 subscribers with 4000 qualified watch hours in 12 months, or 1000 subscribers with 10 million qualified Shorts views in 90 days. See CTL-0006.

Any scale target must state which threshold it means. This is a dated window, not a permanent condition.

## 3. Asymmetry types tracked

underserved demand; weak competitor packaging; new or underrated format; demand transfer between platforms; search or recommendation arbitrage; production cost advantage; serial content construction; unusual funnel; external monetization; regulatory timing.

## 4. Scoring axes

observable demand volume and shape; competition density and incumbent packaging quality; production cost per probe using the existing pipeline; language and cultural fit for the owner; external monetization path strength; policy and reputational risk; measurability of a fast falsification test; durability once the mechanic becomes crowded; applicability at zero channel maturity.

## 5. Comparison table

| cluster | asymmetry type | evidence | cold start valid | probe cost | monetization path | status |
|---|---|---|---|---|---|---|
| C1 dormant catalog repackaging | packaging arbitrage | CTL-0002, CTL-0003 | no | near zero | none | NOT_APPLICABLE_AT_OUR_MATURITY |
| C2 serial construction channel | serial content construction | CTL-0003 | unproven | medium | indirect | NEEDS_PRE_GROWTH_EVIDENCE |
| C3 personalized calculator surface to Telegram | unusual funnel and external monetization | CTL-0005, reinforced by CTL-0009 | yes | low if owner assets exist | direct and measurable | HIGHEST_PRIORITY_VERIFICATION |
| C4 search intent capture | search arbitrage | CTL-0004 | plausible | low | indirect | WEAK_EVIDENCE |
| C5 cross platform demand transfer | demand transfer | CTL-0008 negative finding | weakened | unknown | unknown | EVIDENCE_AGAINST |
| C6 duration arbitrage | production cost and format asymmetry | CTL-0007, CTL-0008 | yes | medium | scale indicator only | READY_FOR_PROBE_DESIGN |
| C7 many cheap distinct swings | production cost advantage | CTL-0008 | yes | low per swing | indirect | READY_FOR_PROBE_DESIGN |
| C8 language and geography revenue mismatch | monetization structure | CTL-0009 | yes | zero, it is a constraint | forces external monetization | ACCEPTED_AS_CONSTRAINT |
| C9 underserved older demographic | underserved demand | CTL-0011, CTL-0005 | yes | low | overlaps C3 | NEEDS_INDEPENDENT_CASES |

## 6. Reading of the second pass

The three clusters that survive both the cold start filter and the cost filter are C3, C6 and C7. C8 is not a cluster to pursue but a constraint that reshapes every other choice: for a Russian language audience, advertising revenue cannot be the model, so external monetization is structural rather than optional.

C6 reframes format selection. Length is not a stylistic choice, it determines which YPP constraint binds. Our current 6 to 10 minute format with very low average view duration is the least efficient combination for accumulating watch hours, and the coming 8000 hour threshold widens that penalty.

C7 reframes discovery cost. If a cold start is carried by one breakout inside the first handful of uploads, then the number of genuinely different cheap attempts matters more than the polish of any single attempt. This is the same conclusion the strategy reset reached independently, now supported by three self reported cases and weakened by obvious survivorship bias.

C5 moved against us. A creator with 30000 Facebook followers reported that external platforms supplied only about 5 percent of YouTube views, which argues that an owned audience elsewhere does not reliably seed a YouTube cold start.

## 7. Selection rule

A cluster qualifies for deeper research when it has at least two independent supporting cases, a plausible funnel to a measurable outcome, a probe producible quickly with existing tooling, and validity at zero channel maturity. C6 and C7 qualify. C3 qualifies on cost and measurability but still fails independence, since its only detailed case is vendor published.

## 8. Data required from the owner later

Requested only when research reaches product fit, conversion path or integration: links to specific files and folders in the separate product repository describing the existing Telegram bots, the website and the product surface, plus any existing traffic, subscriber or conversion data. Nothing about those products is assumed here.
