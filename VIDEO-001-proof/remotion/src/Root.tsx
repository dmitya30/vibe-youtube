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
  </>
);
