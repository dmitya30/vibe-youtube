import React from 'react';
import {Composition} from 'remotion';
import {ColdOpenProof} from './ColdOpenProof';
import {Section02FortySevenSeconds} from './Section02FortySevenSeconds';
import {Section03TwoKindsOfExits} from './Section03TwoKindsOfExits';
import {Section04SwitchCost} from './Section04SwitchCost';
import {Section05OneDoorProtocol} from './Section05OneDoorProtocol';
import {Section06TwentyFiveMinuteExperiment} from './Section06TwentyFiveMinuteExperiment';
import {Section07Ending} from './Section07Ending';
import {
  Video001Master,
  VIDEO_001_MASTER_FRAMES,
} from './Video001Master';
import {
  Video001ThumbnailA,
  Video001ThumbnailB,
  Video001ThumbnailC,
} from './Video001Thumbnails';
import {TestCNotificationOverlay} from './TestCNotificationOverlay';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="ColdOpenProof"
      component={ColdOpenProof}
      durationInFrames={1038}
      fps={30}
      width={1920}
      height={1080}
    />

    <Composition
      id="TestCNotificationOverlay"
      component={TestCNotificationOverlay}
      durationInFrames={150}
      fps={30}
      width={1280}
      height={720}
    />

    <Composition
      id="Section02FortySevenSeconds"
      component={Section02FortySevenSeconds}
      durationInFrames={2232}
      fps={30}
      width={1920}
      height={1080}
    />

    <Composition
      id="Section03TwoKindsOfExits"
      component={Section03TwoKindsOfExits}
      durationInFrames={3099}
      fps={30}
      width={1920}
      height={1080}
    />

    <Composition
      id="Section04SwitchCost"
      component={Section04SwitchCost}
      durationInFrames={3342}
      fps={30}
      width={1920}
      height={1080}
    />

    <Composition
      id="Section05OneDoorProtocol"
      component={Section05OneDoorProtocol}
      durationInFrames={6110}
      fps={30}
      width={1920}
      height={1080}
    />

    <Composition
      id="Section06TwentyFiveMinuteExperiment"
      component={Section06TwentyFiveMinuteExperiment}
      durationInFrames={1941}
      fps={30}
      width={1920}
      height={1080}
    />

    <Composition
      id="Section07Ending"
      component={Section07Ending}
      durationInFrames={1186}
      fps={30}
      width={1920}
      height={1080}
    />

    <Composition
      id="Video001Master"
      component={Video001Master}
      durationInFrames={VIDEO_001_MASTER_FRAMES}
      fps={30}
      width={1920}
      height={1080}
    />

    <Composition
      id="Video001ThumbnailA"
      component={Video001ThumbnailA}
      durationInFrames={1}
      fps={30}
      width={1280}
      height={720}
    />

    <Composition
      id="Video001ThumbnailB"
      component={Video001ThumbnailB}
      durationInFrames={1}
      fps={30}
      width={1280}
      height={720}
    />

    <Composition
      id="Video001ThumbnailC"
      component={Video001ThumbnailC}
      durationInFrames={1}
      fps={30}
      width={1280}
      height={720}
    />
  </>
);
