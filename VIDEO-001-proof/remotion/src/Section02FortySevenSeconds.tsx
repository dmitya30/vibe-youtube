import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

const FPS = 30;
const ORANGE = '#f28a3a';
const GRAPHITE = '#263238';
const CREAM = '#f8eddd';

const f = (seconds: number) => Math.round(seconds * FPS);

const opacityWindow = (
  frame: number,
  start: number,
  end: number,
  fadeFrames = 8,
) =>
  interpolate(
    frame,
    [f(start), f(start) + fadeFrames, f(end) - fadeFrames, f(end)],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

const panel: React.CSSProperties = {
  backgroundColor: 'rgba(248,237,221,0.94)',
  border: `3px solid ${GRAPHITE}`,
  borderRadius: 22,
  color: GRAPHITE,
  fontFamily: 'Arial, Helvetica, sans-serif',
  boxShadow: '0 8px 0 rgba(38,50,56,0.08)',
};

const CardHighlight: React.FC<{
  x: number;
  active: boolean;
}> = ({x, active}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 4) * 0.025;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - 92,
        top: 432,
        width: 184,
        height: 190,
        border: `6px solid ${ORANGE}`,
        borderRadius: 20,
        opacity: active ? 1 : 0,
        transform: `scale(${pulse})`,
        boxShadow: `0 0 28px ${ORANGE}55`,
      }}
    />
  );
};

export const Section02FortySevenSeconds: React.FC = () => {
  const frame = useCurrentFrame();
  const time = frame / FPS;

  const activeCard =
    time < 13.65 ? 0 :
    time < 16.25 ? 1 :
    time < 18.95 ? 2 : 3;

  const cardCenters = [994, 1241, 1476, 1699];

  const dotX = interpolate(
    frame,
    [f(10.94), f(21.78)],
    [994, 1699],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const ideaIndex =
    time < 23.85 ? 0 :
    time < 25.64 ? 1 : 2;

  const exampleIndex =
    time < 33.56 ? 0 :
    time < 36.43 ? 1 :
    time < 41.60 ? 2 : 3;

  return (
    <AbsoluteFill style={{backgroundColor: CREAM}}>
      <Img
        src={staticFile('assets/nod/screen-switching-observation-v1.jpg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <Audio src={staticFile('audio/segments/02-47-seconds.wav')} />

      {/* 47 SEC */}
      <div
        style={{
          ...panel,
          position: 'absolute',
          left: 1210,
          top: 75,
          width: 390,
          padding: '24px 34px',
          textAlign: 'center',
          opacity: opacityWindow(frame, 0.0, 6.46),
          transform: `scale(${interpolate(
            frame,
            [f(0.32), f(1.0)],
            [0.82, 1],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
          )})`,
        }}
      >
        <div style={{fontSize: 96, fontWeight: 800, color: ORANGE}}>
          47 SEC
        </div>
        <div style={{fontSize: 25, fontWeight: 700, letterSpacing: 3}}>
          AVERAGE ON ONE SCREEN
        </div>
      </div>

      {/* Ошибочная интерпретация */}
      <div
        style={{
          ...panel,
          position: 'absolute',
          left: 1115,
          top: 80,
          width: 560,
          padding: '30px 40px',
          textAlign: 'center',
          opacity: opacityWindow(frame, 6.46, 10.94),
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            fontSize: 53,
            fontWeight: 800,
          }}
        >
          ATTENTION LIMIT
          <div
            style={{
              position: 'absolute',
              left: -20,
              top: '49%',
              width: `${interpolate(
                frame,
                [f(7.2), f(8.2)],
                [0, 110],
                {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
              )}%`,
              height: 8,
              backgroundColor: ORANGE,
              transform: 'rotate(-5deg)',
              borderRadius: 8,
            }}
          />
        </div>
        <div
          style={{
            marginTop: 18,
            color: ORANGE,
            fontSize: 31,
            fontWeight: 800,
          }}
        >
          THAT IS NOT WHAT WAS MEASURED
        </div>
      </div>

      {/* Последовательное выделение карточек */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: opacityWindow(frame, 10.94, 21.78),
        }}
      >
        {cardCenters.map((x, index) => (
          <CardHighlight key={x} x={x} active={index === activeCard} />
        ))}

        <div
          style={{
            position: 'absolute',
            left: dotX - 11,
            top: 514,
            width: 22,
            height: 22,
            borderRadius: '50%',
            backgroundColor: ORANGE,
            boxShadow: `0 0 18px ${ORANGE}`,
          }}
        />

        <div
          style={{
            ...panel,
            position: 'absolute',
            left: 690,
            bottom: 75,
            width: 950,
            padding: '18px 30px',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          OBSERVED SCREEN SWITCHING
        </div>
      </div>

      {/* Not one idea / project / one screen */}
      <div
        style={{
          ...panel,
          position: 'absolute',
          left: 920,
          bottom: 90,
          width: 780,
          padding: '30px 40px',
          textAlign: 'center',
          opacity: opacityWindow(frame, 21.78, 27.34),
        }}
      >
        <div
          style={{
            fontSize: ideaIndex === 2 ? 58 : 49,
            fontWeight: 800,
            color: ideaIndex === 2 ? ORANGE : GRAPHITE,
            letterSpacing: 2,
          }}
        >
          {['NOT ONE IDEA', 'NOT ONE PROJECT', 'ONE SCREEN'][ideaIndex]}
        </div>
      </div>

      {/* Примеры переключений */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: opacityWindow(frame, 27.34, 41.60),
        }}
      >
        {cardCenters.map((x, index) => (
          <CardHighlight
            key={x}
            x={x}
            active={Math.min(exampleIndex, 3) === index}
          />
        ))}

        <div
          style={{
            ...panel,
            position: 'absolute',
            left: 980,
            top: 700,
            width: 760,
            padding: '20px 30px',
            textAlign: 'center',
            fontSize: 34,
            fontWeight: 800,
          }}
        >
          {exampleIndex === 0 && 'OPEN A REFERENCE'}
          {exampleIndex === 1 && 'CHECK A MESSAGE'}
          {exampleIndex === 2 && 'LOOK AT THE CLOCK'}
          {exampleIndex === 3 && 'ICELAND VOLCANOES?'}
        </div>
      </div>

      {/* Biological countdown correction */}
      <div
        style={{
          ...panel,
          position: 'absolute',
          left: 980,
          top: 105,
          width: 760,
          padding: '30px 42px',
          textAlign: 'center',
          opacity: opacityWindow(frame, 42.42, 54.89),
        }}
      >
        <div
          style={{
            fontSize: 43,
            fontWeight: 800,
            textDecoration: 'line-through',
            textDecorationColor: ORANGE,
            textDecorationThickness: 8,
          }}
        >
          BIOLOGICAL COUNTDOWN
        </div>
        <div
          style={{
            marginTop: 25,
            fontSize: 37,
            fontWeight: 800,
            color: ORANGE,
          }}
        >
          OBSERVED DIGITAL BEHAVIOR
        </div>
      </div>

      {/* Variation timelines */}
      <div
        style={{
          ...panel,
          position: 'absolute',
          left: 960,
          top: 90,
          width: 790,
          padding: '30px 45px 40px',
          opacity: opacityWindow(frame, 54.89, 63.67),
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 800,
            marginBottom: 24,
            textAlign: 'center',
          }}
        >
          AN AVERAGE HIDES VARIATION
        </div>

        {[0.32, 0.68, 0.93].map((length, index) => (
          <div
            key={length}
            style={{
              marginTop: 20,
              height: 18,
              width: `${length * 100}%`,
              backgroundColor: index === 1 ? ORANGE : GRAPHITE,
              borderRadius: 20,
            }}
          />
        ))}
      </div>

      {/* Финальный вопрос */}
      <div
        style={{
          ...panel,
          position: 'absolute',
          left: 835,
          top: 120,
          width: 900,
          minHeight: 230,
          padding: '42px 50px',
          textAlign: 'center',
          opacity: opacityWindow(frame, 63.67, 74.40, 10),
        }}
      >
        <div
          style={{
            fontSize: 35,
            fontWeight: 700,
            opacity: interpolate(
              frame,
              [f(63.67), f(64.22), f(66.18), f(66.61)],
              [0, 1, 1, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              },
            ),
          }}
        >
          NOT “HOW DO I FOCUS FOREVER?”
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 48,
            lineHeight: 1.15,
            fontWeight: 800,
            color: ORANGE,
            opacity: interpolate(
              frame,
              [f(66.18), f(66.61), f(67.20)],
              [0, 0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              },
            ),
            transform: `translateY(${interpolate(
              frame,
              [f(66.61), f(67.20)],
              [18, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              },
            )}px)`,
          }}
        >
          WHAT MAKES THIS TASK
          <br />
          SO EASY TO LEAVE?

          <div
            style={{
              margin: '22px auto 0',
              height: 8,
              width: `${interpolate(
                frame,
                [f(69.80), f(70.67)],
                [0, 82],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                },
              )}%`,
              borderRadius: 8,
              backgroundColor: ORANGE,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
