# Creator tactics ledger

Updated: 2026-08-22
Status: first verified pass complete / deeper verification pending
Method: RESEARCH_PROTOCOL.md
Note: apostrophes in quoted titles are normalized in this file. Verify exact strings at the primary URL.

## 1. Identifier scheme

Entries use CTL-NNNN in creation order. An entry is never rewritten silently; corrections are appended with the correction date.

## 2. Entry template

id; mechanic in one sentence; classification label; primary URL; author or channel; capture date; claimed result; observable confirmation; recurrence; alternative explanations; paid traffic risk; conflict of interest; applicability to our resources; confidence; next verification step.

## 3. Entries

### CTL-0001 Broad search returns a vendor layer instead of author disclosure

- mechanic: broad English queries about creator growth mechanics return tool and course material rather than first hand author disclosure;
- classification: OBSERVED FACT for the search behavior, INFERENCE for the consequence;
- primary URLs: https://outlierkit.com/blog/youtube-automation-niches and https://1of10.com/blog/the-2026-atlas-of-youtube-niches-50-blue-oceans-with-low-competition/ and https://www.overseeros.com/blog/best-youtube-niche-finder-tools ;
- author: tool and course vendors;
- capture date: 2026-08-22;
- claimed result: low competition niche selection and outlier imitation produce growth;
- observable confirmation: none; no channel identity, sample or method disclosed;
- recurrence: pattern recurred across independent broad queries in the same session;
- alternative explanations: search ranking favors commercial SEO pages, which does not prove author disclosure is rare;
- paid traffic risk: not applicable;
- conflict of interest: high, each source sells a subscription or training;
- applicability: Tier 3 only;
- confidence: high for the observation, medium for the consequence;
- next verification step: named venue harvesting only, which is now confirmed effective by CTL-0002 and CTL-0005.

### CTL-0002 Retroactive repackaging of an existing video

- mechanic: rewrite the title of an already published video into a first person discovery frame and let distribution restart, without producing new content;
- classification: CREATOR CLAIM for the result, OBSERVED FACT for the surviving title pattern, INFERENCE for the causal link;
- primary URL: https://www.reddit.com/r/PartneredYoutube/comments/1gyju7v/whats_a_small_change_you_made_to_your_channel/ ;
- author: reddit user FloatHeadPhysics, comment dated 2024-11-24; channel https://www.youtube.com/channel/UCGfFUc6eWxfbtjYeun6r9xg ;
- capture date: 2026-08-22;
- claimed result: a video at about 2M views gained about 1.5M more views in a few days after the retitle, and monthly channel statistics tripled;
- observable confirmation: partial. The channel currently shows a video of about 8.3M views using the frame I finally understood why you cannot go faster than light (My mind is blown). The claimed intermediate title is not the currently observed title, so further iterations occurred and the exact string at claim time is UNVERIFIED;
- recurrence: the retitle mechanic recurs in independent r/NewTubers threads, including https://www.reddit.com/r/NewTubers/comments/1qd3g6p/did_any_of_you_ever_have_a_relatively_old_video/ and https://www.reddit.com/r/NewTubers/comments/1lxaqp4/changing_video_titles_my_experience_after_finding/ ;
- counter evidence: independent reports of views collapsing after a retitle applied to a currently performing video, including https://www.reddit.com/r/NewTubers/comments/1ehc5e5/changed_title_then_changed_back_instantly/ . Boundary condition: repackage dormant inventory, not an active distribution run;
- alternative explanations: seasonal or news driven demand; an unrelated recommendation shift; the channel was already large enough to be re-tested by the system;
- paid traffic risk: low, no promotion disclosed;
- conflict of interest: none apparent, no product sold in the comment;
- applicability: very high. Four published Fewer Exits videos are dormant inventory and repackaging costs no production time;
- confidence: medium;
- next verification step: capture current titles, publication dates and view counts of the channel, and check archived title history where available.

### CTL-0003 Serial first person discovery frame

- mechanic: reuse one packaging construction across the catalog so each video is a recognizable episode of the same promise;
- classification: OBSERVED FACT;
- primary URLs: https://www.youtube.com/watch?v=Vitf8YaVXhc and https://www.youtube.com/watch?v=TcOLyqfA5k8 and https://www.youtube.com/watch?v=i88ipC8GebA ;
- author: FloatHeadPhysics;
- capture date: 2026-08-22;
- claimed result: none claimed; the repetition itself is the observation;
- observable confirmation: the same construction appears on multiple videos of the same channel, including the largest one;
- recurrence: an independent creator in the same r/PartneredYoutube thread argues that keeping pacing, format and flow identical across videos exploits episodic familiarity and returning views;
- alternative explanations: the frame may be a consequence of success rather than a cause, since a creator naturally repeats what already worked;
- paid traffic risk: not applicable;
- conflict of interest: none apparent;
- applicability: high, and it matches the rejected model of one channel per video by arguing for serial construction instead;
- confidence: high that the pattern exists, low that it is causal;
- next verification step: find a channel where the frame was adopted before the growth, not after.

### CTL-0004 Search intent format instead of browse dependence

- mechanic: switch from a browse dependent format to a format that answers an explicit query, because search demand is easier to enter than recommendation;
- classification: CREATOR CLAIM;
- primary URL: https://www.reddit.com/r/PartneredYoutube/comments/1gyju7v/whats_a_small_change_you_made_to_your_channel/ ;
- author: reddit users TiedsHD and Quicktips254;
- capture date: 2026-08-22;
- claimed result: tutorial videos took off where gameplay videos did not; it is easier to compete in search than in browse;
- observable confirmation: none yet, channels not identified in the thread;
- recurrence: two commenters in one thread, which is not independence;
- alternative explanations: niche specific; tutorial demand in gaming may not generalize;
- paid traffic risk: low;
- conflict of interest: none apparent;
- applicability: high relevance to our funnel data, where recommendation share was 97.1 percent on VIDEO-001 with a 2.7 percent CTR;
- confidence: low;
- next verification step: find identifiable channels that changed traffic source composition and can be observed.

### CTL-0005 Personalized calculator surface as the acquisition asset, not video

- mechanic: publish many small personalized calculators on a searchable site, hand the computed result to a Telegram bot, gate the free interpretation behind a channel subscription, then sell a tripwire and an automatically generated personalized document;
- classification: MARKETING CLAIM for the financial result, CREATOR CLAIM for the channel mechanics, OBSERVED FACT for the described architecture, INFERENCE for the strategic consequence;
- primary URL: https://bothelp.io/ru/blog/keys-bot-numerologa ;
- author: Tatyana Geyner, published on the bothelp.io vendor blog; the client is described as a purpose psychologist named Vladimir;
- capture date: 2026-08-22;
- claimed result: Telegram channel from 100 to more than 1600 subscribers in 9 months and 1219120 RUB revenue with zero advertising spend;
- observable confirmation: none. No channel identity, no traffic data, no methodology and no independent confirmation. The revenue figure is stated twice with different values in the same article, 1219120 and 1210000;
- key disclosure against the interest of the author: video sources were reported ineffective. The text states that all sources except the site turned out to be weakly effective, naming VKontakte, Reels, Shorts and VK clips, because they required large regular effort, while the site with calculators delivered subscribers automatically;
- supporting mechanics disclosed: subscription verification before releasing the free interpretation; a tripwire paid interpretation; a daily forecast bot introduced specifically to suppress unsubscribes; automatic generation of a personalized PDF replacing manual work; expansion of the number of calculators to widen the keyword surface;
- disclosed weakness: conversion of 5 to 7 percent was described as insufficient to reach the income target;
- recurrence: not yet established. A second vendor case is referenced by the same platform and is not independent;
- alternative explanations: vendor marketing selection of the single best outcome; an existing consulting practice and personal brand behind the offer; unreported organic authority of the site;
- paid traffic risk: claimed zero, unverifiable;
- conflict of interest: high, the publisher sells the bot platform and the author sells bot development;
- applicability: high but reframing. It challenges the assumption that YouTube is the entry point of our chain and points at the site and bot assets the owner already operates;
- confidence: low for the numbers, medium for the architecture, medium for the negative finding about video;
- next verification step: find an identifiable Russian esoteric channel where YouTube itself is demonstrably the acquisition source, in order to test whether the negative finding generalizes.

## 4. Pending harvest queue

1. Identifiable channels that adopted a serial packaging frame before growth rather than after.
2. Cases where YouTube is the proven entry point of an external monetization funnel.
3. Russian esoteric authors disclosing acquisition sources in public Telegram channels.
4. Cross platform demand transfer cases with observable timing.
5. Independent, non vendor sources for personalized result funnels.
