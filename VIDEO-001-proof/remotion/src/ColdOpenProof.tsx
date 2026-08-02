import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Loop,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const CREAM = '#f8eddd';
const GRAPHITE = '#263238';
const ORANGE = '#f28a3a';

const fadeWindow = (
  frame: number,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number,
) =>
  interpolate(
    frame,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

const Notification: React.FC<{frame: number}> = ({frame}) => {
  const opacity = fadeWindow(frame, 115, 130, 190, 214);
  const x = interpolate(frame, [115, 135], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [190, 214], [1, 0.72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 1030,
        top: 380,
        width: 300,
        height: 112,
        border: `7px solid ${ORANGE}`,
        borderRadius: 28,
        background: CREAM,
        opacity,
        transform: `translateX(${x}px) scale(${scale})`,
        transformOrigin: 'left center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 30,
          top: 29,
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: ORANGE,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 32,
          width: 160,
          height: 12,
          borderRadius: 8,
          background: GRAPHITE,
          opacity: 0.75,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 90,
          top: 62,
          width: 115,
          height: 10,
          borderRadius: 8,
          background: GRAPHITE,
          opacity: 0.35,
        }}
      />
    </div>
  );
};

const BrowserTab: React.FC<{frame: number}> = ({frame}) => {
  const opacity = fadeWindow(frame, 220, 236, 286, 312);
  const y = interpolate(frame, [220, 240], [-45, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 1120,
        top: 485,
        width: 350,
        height: 135,
        border: `7px solid ${ORANGE}`,
        borderRadius: '24px 24px 12px 12px',
        background: CREAM,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: -7,
          top: -55,
          width: 155,
          height: 55,
          border: `7px solid ${ORANGE}`,
          borderBottom: 0,
          borderRadius: '20px 20px 0 0',
          background: CREAM,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 38,
          top: 48,
          width: 220,
          height: 12,
          borderRadius: 8,
          background: GRAPHITE,
          opacity: 0.55,
        }}
      />
    </div>
  );
};

const Phone: React.FC<{frame: number}> = ({frame}) => {
  const opacity = fadeWindow(frame, 313, 330, 390, 414);
  const y = interpolate(frame, [313, 340], [160, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rotation = interpolate(frame, [313, 340], [9, -4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 1275,
        top: 365,
        width: 145,
        height: 250,
        border: `8px solid ${ORANGE}`,
        borderRadius: 30,
        background: CREAM,
        opacity,
        transform: `translateY(${y}px) rotate(${rotation}deg)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 45,
          top: 18,
          width: 55,
          height: 8,
          borderRadius: 8,
          background: GRAPHITE,
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 51,
          bottom: 18,
          width: 42,
          height: 42,
          border: `5px solid ${ORANGE}`,
          borderRadius: '50%',
        }}
      />
    </div>
  );
};

const LostThought: React.FC<{frame: number}> = ({frame}) => {
  const opacity = fadeWindow(frame, 430, 448, 545, 600);
  const scale = interpolate(frame, [430, 500, 600], [0.8, 1, 0.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const x = interpolate(frame, [500, 600], [0, 95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [500, 600], [0, -90], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg
      width="350"
      height="250"
      viewBox="0 0 350 250"
      style={{
        position: 'absolute',
        left: 930,
        top: 165,
        opacity,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        transformOrigin: 'center',
      }}
    >
      <path
        d="M72 180C24 160 22 104 57 80C55 36 111 17 145 47C177 9 239 25 247 68C301 64 325 121 292 156C283 199 215 212 181 184C147 216 91 211 72 180Z"
        fill={CREAM}
        stroke={GRAPHITE}
        strokeWidth="7"
      />
      <circle cx="58" cy="207" r="15" fill={CREAM} stroke={GRAPHITE} strokeWidth="6" />
      <circle cx="31" cy="232" r="8" fill={CREAM} stroke={GRAPHITE} strokeWidth="5" />
      <path
        d="M103 123C123 95 144 150 164 117C185 83 203 146 229 111"
        fill="none"
        stroke={ORANGE}
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  );
};

const ExitReveal: React.FC<{frame: number}> = ({frame}) => {
  const opacity = interpolate(frame, [633, 690], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [633, 854], [1.035, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{opacity, backgroundColor: CREAM}}>
      <Img
        src={staticFile('assets/nod/styleframe-multiple-exits-v1.jpg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

const PressureLines: React.FC<{frame: number}> = ({frame}) => {
  const opacity = fadeWindow(frame, 855, 890, 1010, 1030);
  const scale = interpolate(frame, [855, 1010], [1.3, 0.82], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg
      width="900"
      height="820"
      viewBox="0 0 900 820"
      style={{
        position: 'absolute',
        left: 510,
        top: 100,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
      }}
    >
      <path
        d="M190 180C65 270 42 505 175 625"
        fill="none"
        stroke={GRAPHITE}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M710 180C835 270 858 505 725 625"
        fill="none"
        stroke={GRAPHITE}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M270 100C390 35 510 35 630 100"
        fill="none"
        stroke={GRAPHITE}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M270 705C390 770 510 770 630 705"
        fill="none"
        stroke={GRAPHITE}
        strokeWidth="13"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const ColdOpenProof: React.FC = () => {
  const frame = useCurrentFrame();

  const backgroundScale = interpolate(frame, [633, 705], [1, 0.93], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const endFade = interpolate(frame, [1023, 1037], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, overflow: 'hidden'}}>
      <Loop durationInFrames={302}>
        <OffthreadVideo
          src={staticFile('assets/video/coldopen-desk-clean-kling3-pro-v1-pingpong.mp4')}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${backgroundScale})`,
            transformOrigin: '34% 50%',
          }}
        />
      </Loop>

      <Notification frame={frame} />
      <BrowserTab frame={frame} />
      <Phone frame={frame} />
      <LostThought frame={frame} />
      <ExitReveal frame={frame} />
      <PressureLines frame={frame} />

      <Audio src={staticFile('audio/test-d3-gemini-3.1-flash-aoede.wav')} />

      <AbsoluteFill
        style={{
          backgroundColor: CREAM,
          opacity: endFade,
        }}
      />
    </AbsoluteFill>
  );
};
