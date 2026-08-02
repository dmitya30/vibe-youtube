import {Section03TwoKindsOfExits} from './Section03TwoKindsOfExits';
import {Section02FortySevenSeconds} from './Section02FortySevenSeconds';
import React from 'react';
import {Composition} from 'remotion';
import {ColdOpenProof} from './ColdOpenProof';
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
</>
);
