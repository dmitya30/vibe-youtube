import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {ColdOpenProof} from './ColdOpenProof';
import {Section02FortySevenSeconds} from './Section02FortySevenSeconds';
import {Section03TwoKindsOfExits} from './Section03TwoKindsOfExits';
import {Section04SwitchCost} from './Section04SwitchCost';
import {Section05OneDoorProtocol} from './Section05OneDoorProtocol';
import {Section06TwentyFiveMinuteExperiment} from './Section06TwentyFiveMinuteExperiment';
import {Section07Ending} from './Section07Ending';

const SECTION_01_FRAMES = 1038;
const SECTION_02_FRAMES = 2232;
const SECTION_03_FRAMES = 3099;
const SECTION_04_FRAMES = 3342;
const SECTION_05_FRAMES = 6110;
const SECTION_06_FRAMES = 1941;
const SECTION_07_FRAMES = 1186;

const SECTION_02_START = SECTION_01_FRAMES;
const SECTION_03_START = SECTION_02_START + SECTION_02_FRAMES;
const SECTION_04_START = SECTION_03_START + SECTION_03_FRAMES;
const SECTION_05_START = SECTION_04_START + SECTION_04_FRAMES;
const SECTION_06_START = SECTION_05_START + SECTION_05_FRAMES;
const SECTION_07_START = SECTION_06_START + SECTION_06_FRAMES;

export const VIDEO_001_MASTER_FRAMES =
  SECTION_07_START + SECTION_07_FRAMES;

export const Video001Master: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence
        durationInFrames={SECTION_01_FRAMES}
        name="01 Cold open"
      >
        <ColdOpenProof />
      </Sequence>

      <Sequence
        from={SECTION_02_START}
        durationInFrames={SECTION_02_FRAMES}
        name="02 47 seconds"
      >
        <Section02FortySevenSeconds />
      </Sequence>

      <Sequence
        from={SECTION_03_START}
        durationInFrames={SECTION_03_FRAMES}
        name="03 Two kinds of exits"
      >
        <Section03TwoKindsOfExits />
      </Sequence>

      <Sequence
        from={SECTION_04_START}
        durationInFrames={SECTION_04_FRAMES}
        name="04 Switch cost"
      >
        <Section04SwitchCost />
      </Sequence>

      <Sequence
        from={SECTION_05_START}
        durationInFrames={SECTION_05_FRAMES}
        name="05 One Door Protocol"
      >
        <Section05OneDoorProtocol />
      </Sequence>

      <Sequence
        from={SECTION_06_START}
        durationInFrames={SECTION_06_FRAMES}
        name="06 25-minute experiment"
      >
        <Section06TwentyFiveMinuteExperiment />
      </Sequence>

      <Sequence
        from={SECTION_07_START}
        durationInFrames={SECTION_07_FRAMES}
        name="07 Ending"
      >
        <Section07Ending />
      </Sequence>
    </AbsoluteFill>
  );
};
