import React from 'react';
import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

const CREAM = '#f8eddd';
const ORANGE = '#ff861c';
const WHITE = '#fff8ec';
const GRAPHITE = '#17191b';

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const edgeShade: React.CSSProperties = {
  boxShadow:
    'inset 0 0 0 2px rgba(255,248,236,0.16), inset 0 0 70px rgba(0,0,0,0.12)',
};

const headlineShadow =
  '0 5px 0 rgba(0,0,0,0.62), 0 10px 28px rgba(0,0,0,0.55)';

export const Video001ThumbnailA: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: CREAM}}>
    <Img
      src={staticFile(
        'assets/nod/thumbnail-a-phone-portal-v2.jpg'
      )}
      style={imageStyle}
    />

    <AbsoluteFill style={edgeShade} />
  </AbsoluteFill>
);

export const Video001ThumbnailB: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: GRAPHITE}}>
    <Img
      src={staticFile(
        'assets/nod/thumbnail-b-not-your-brain-v2.jpg'
      )}
      style={imageStyle}
    />

    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(100deg, rgba(15,16,17,0.45) 0%, rgba(15,16,17,0.13) 34%, transparent 58%)',
      }}
    />

    <div
      style={{
        position: 'absolute',
        left: 45,
        top: 48,
        width: 390,
        color: WHITE,
        fontFamily:
          'Arial Black, Arial, Helvetica, sans-serif',
        fontSize: 67,
        lineHeight: 0.86,
        fontWeight: 900,
        letterSpacing: -3.5,
        textAlign: 'left',
        textTransform: 'uppercase',
        textShadow: headlineShadow,
      }}
    >
      NOT YOUR
      <br />
      <span
        style={{
          color: ORANGE,
          fontSize: 104,
          letterSpacing: -6,
        }}
      >
        BRAIN
      </span>
    </div>

    <AbsoluteFill style={edgeShade} />
  </AbsoluteFill>
);

export const Video001ThumbnailC: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: GRAPHITE}}>
    <Img
      src={staticFile(
        'assets/nod/thumbnail-c-47-seconds-v2.jpg'
      )}
      style={imageStyle}
    />

    <div
      style={{
        position: 'absolute',
        left: 30,
        top: 235,
        width: 605,
        color: WHITE,
        fontFamily:
          'Arial Black, Arial, Helvetica, sans-serif',
        fontSize: 154,
        lineHeight: 1,
        fontWeight: 900,
        letterSpacing: -12,
        textAlign: 'center',
        textShadow:
          '0 5px 0 rgba(0,0,0,0.7), 0 0 28px rgba(255,134,28,0.18)',
      }}
    >
      00
      <span style={{color: ORANGE}}>:</span>
      47
    </div>

    <AbsoluteFill style={edgeShade} />
  </AbsoluteFill>
);
