# VIDEO-003 — Publishing package

Updated: 2026-08-17
Status: PUBLIC / LIVE / PLATFORM QA PASS
Repository base commit: ffe2e13c91e28cdf734fff1e6052b7c73f400e07

## Platform publication record

- YouTube channel: `Fewer Exits`;
- handle: `@fewerexits`;
- Video ID: `st3uCBzCXNw`;
- public URL: `https://youtu.be/st3uCBzCXNw`;
- visibility: Public;
- public launch: 2026-08-17 22:09 UTC+7 / 2026-08-17 15:09 UTC;
- 1080p processing: PASS;
- YouTube Checks: PASS;
- public incognito playback: PASS;
- channel-page visibility: PASS;
- launch thumbnail: B — `thumbnail-b-still-awake-v1.jpg` / `STILL AWAKE?`;
- reviewed English captions: published and playback verified;
- description timestamps: present and clickable;
- visual chapter segmentation: unavailable at launch and accepted;
- first comment: published;
- title, description and thumbnail remain locked for the initial observation window.

Publication-time note: the exact launch time is retained for comparison, but YouTube states that publish time is not known to affect long-term performance. It may affect immediate viewership when an established audience is online. This channel does not yet have enough audience history to infer an optimal hour.

## 1. Locked title

`Why You Keep Scrolling Even When You’re Tired`

## 2. Accepted launch thumbnail

- direction: B — `STILL AWAKE?`;
- hero art: accepted GPT Image 2.0 S01 bedroom frame;
- text and export: deterministic Remotion composition `Video003ThumbnailB`;
- upload file: `thumbnail-b-still-awake-v1.jpg`;
- full-size, mobile, grayscale and blur QA: PASS;
- human visual QA: PASS;
- title-promise match: PASS.

## 3. YouTube description — locked

Your eyes hurt. The videos stopped being fun twenty minutes ago. But your thumb is still moving.

This video explains why late-night scrolling can continue after it stops feeling restorative, why delaying bedtime is not always the same as delaying sleep while already in bed, and how an endless feed can reach the part of the day when making another decision feels hardest.

You will also learn a bounded three-evening experiment: name where the delay begins, create a visible ending, and decide the phone’s next physical location before you are exhausted.

The goal is not to make every evening efficient. It is to stop asking your most tired self to invent an ending inside something designed to continue.

CHAPTERS
0:00 Still awake?
0:30 Two kinds of delay
1:37 Why the feed keeps going
3:02 What the evidence can — and cannot — say
3:49 Step 1: Name the delay
4:13 Step 2: Create an ending
4:59 Step 3: Write one if–then sentence
5:38 Review the design

RESEARCH
Foundational bedtime-procrastination study:
https://pmc.ncbi.nlm.nih.gov/articles/PMC4062817/

Bedtime vs. while-in-bed procrastination:
https://pmc.ncbi.nlm.nih.gov/articles/PMC7460337/

Electronic media use and sleep — systematic review and meta-analysis:
https://pmc.ncbi.nlm.nih.gov/articles/PMC11077410/

Behavioral intervention trial:
https://pubmed.ncbi.nlm.nih.gov/37354745/

The three-evening exercise is an editorial self-experiment, not a diagnosis or medical treatment. Persistent sleep problems may require professional attention.

#BedtimeProcrastination #PhoneHabits #Sleep

## 4. Launch comment — locked

Where does your delay usually begin: before bed, or after you are already in bed?

If you try the three-evening experiment, what visible boundary did you choose — and where did the phone land afterward?

## 5. Publication packet

- master: `local/video-003-master-v1.mp4`;
- captions: `local/video003-en-v1.srt` and `local/video003-en-v1.vtt`;
- thumbnail: `local/thumbnails/thumbnail-b-still-awake-v1.jpg`;
- metadata copy: `local/video003-metadata-v1.txt`;
- checksum list: `local/SHA256SUMS.txt`;
- tracked manifest: `VIDEO-003-proof/publish/video-003/manifest.txt`;
- external backup: `~/vibe-youtube-publish-staging/VIDEO-003`.

## 6. Current gate

```text
VIDEO003_THUMBNAIL_VISUAL_QA=PASS
VIDEO003_THUMBNAIL_B=ACCEPTED
VIDEO003_PUBLICATION_PACKET=VERIFIED
VIDEO003_EXTERNAL_BACKUP=VERIFIED
VIDEO003_METADATA=LOCKED
VIDEO003_PUBLIC_PLATFORM_QA=PASS
VIDEO003_STATUS=PUBLIC
NEXT_REQUIRED_GATE=VIDEO003_POST_LAUNCH_ANALYTICS_BASELINE
```
