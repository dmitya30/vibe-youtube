import React from 'react';
import {Composition} from 'remotion';
import {TestCNotificationOverlay} from './TestCNotificationOverlay';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="TestCNotificationOverlay"
    component={TestCNotificationOverlay}
    durationInFrames={150}
    fps={30}
    width={1280}
    height={720}
  />
);
