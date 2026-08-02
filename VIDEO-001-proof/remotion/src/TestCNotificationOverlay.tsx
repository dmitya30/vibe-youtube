import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const ORANGE = '#f28a3a';
const X = 615;
const Y = 319;

export const TestCNotificationOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [105, 120, 138],
    [0.65, 1.15, 1.65],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const opacity = interpolate(
    frame,
    [105, 120, 138],
    [0, 0.95, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile('assets/video/test-b-kling3-v1.mp4')}
        muted
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />

      <svg
        width="84"
        height="84"
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          left: X - 42,
          top: Y - 42,
          opacity,
          transform: `scale(${scale})`,
          transformOrigin: '50% 50%',
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke={ORANGE}
          strokeWidth="5"
        />
      </svg>
    </AbsoluteFill>
  );
};
