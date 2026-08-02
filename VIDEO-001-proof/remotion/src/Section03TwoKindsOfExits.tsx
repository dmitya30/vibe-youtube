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

const windowOpacity = (
  frame: number,
  start: number,
  end: number,
  fade = 8,
) =>
  interpolate(
    frame,
    [f(start), f(start) + fade, f(end) - fade, f(end)],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

const box: React.CSSProperties = {
  backgroundColor: 'rgba(248,237,221,0.95)',
  border: `3px solid ${GRAPHITE}`,
  borderRadius: 22,
  color: GRAPHITE,
  fontFamily: 'Arial, Helvetica, sans-serif',
};

const Label: React.FC<{
  children: React.ReactNode;
  opacity: number;
  top?: number;
}> = ({children, opacity, top = 90}) => (
  <div
    style={{
      ...box,
      position: 'absolute',
      left: 980,
      top,
      width: 760,
      padding: '30px 38px',
      textAlign: 'center',
      fontSize: 43,
      lineHeight: 1.15,
      fontWeight: 800,
      opacity,
    }}
  >
    {children}
  </div>
);

export const Section03TwoKindsOfExits: React.FC = () => {
  const frame = useCurrentFrame();
  const time = frame / FPS;

  const selfFrameOpacity = interpolate(
    frame,
    [f(11.65), f(12.46)],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const externalIndex =
    time < 3.32 ? -1 :
    time < 5.36 ? 0 :
    time < 7.35 ? 1 :
    time < 9.90 ? 2 : 3;

  const selfExample =
    time < 29.45 ? 0 :
    time < 35.98 ? 1 :
    time < 40.90 ? 2 : 3;

  const checkCount = Math.max(
    1,
    Math.min(7, Math.floor((time - 40.9) / 2.4) + 1),
  );

  return (
    <AbsoluteFill style={{backgroundColor: CREAM}}>
      <Img
        src={staticFile('assets/nod/external-exits-clean-v1.jpg')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <Img
        src={staticFile('assets/nod/self-interruption-phone-v1.jpg')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: selfFrameOpacity,
        }}
      />

      <Audio src={staticFile('audio/segments/03-two-kinds-of-exits.wav')} />

      {/* Внешние exits */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: windowOpacity(frame, 0, 12.46),
        }}
      >
        <Label opacity={1}>EXTERNAL EXITS</Label>

        {['NOTIFICATION', 'MESSAGE', 'BADGE', 'QUESTION'].map(
          (item, index) => (
            <div
              key={item}
              style={{
                ...box,
                position: 'absolute',
                left: 985 + (index % 2) * 390,
                top: 280 + Math.floor(index / 2) * 175,
                width: 330,
                padding: '28px 20px',
                textAlign: 'center',
                fontSize: 28,
                fontWeight: 800,
                color: externalIndex === index ? ORANGE : GRAPHITE,
                borderColor: externalIndex === index ? ORANGE : GRAPHITE,
                opacity: index <= externalIndex ? 1 : 0.25,
                transform:
                  externalIndex === index ? 'scale(1.06)' : 'scale(1)',
              }}
            >
              {item}
            </div>
          ),
        )}
      </div>

      {/* Самостоятельный exit */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: windowOpacity(frame, 12.46, 24.70),
        }}
      >
        <Label opacity={1}>
          SOME EXITS ARE
          <br />
          <span style={{color: ORANGE}}>SELF-CREATED</span>
        </Label>

        <div
          style={{
            position: 'absolute',
            left: 68,
            top: 337,
            width: 100,
            height: 58,
            border: `5px solid ${ORANGE}`,
            borderRadius: 18,
            backgroundColor: `${ORANGE}18`,
            boxShadow: `0 0 25px ${ORANGE}66`,
          }}
        >
          <div
            style={{
              ...box,
              position: 'absolute',
              left: -16,
              top: -52,
              width: 132,
              padding: '8px 6px',
              textAlign: 'center',
              color: ORANGE,
              borderColor: ORANGE,
              borderRadius: 12,
              fontSize: 17,
              fontWeight: 800,
              whiteSpace: 'nowrap',
            }}
          >
            ...
          </div>
        </div>

        <div
          style={{
            ...box,
            position: 'absolute',
            left: 975,
            top: 360,
            width: 760,
            padding: '28px 35px',
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          NO SOUND · NO BADGE · NO MESSAGE
        </div>
      </div>

      {/* Примеры self-interruption */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: windowOpacity(frame, 24.70, 40.90),
        }}
      >
        <Label opacity={1}>
          {selfExample === 0 && '“DID SOMEONE REPLY?”'}
          {selfExample === 1 && 'THE PARAGRAPH GETS DIFFICULT'}
          {selfExample === 2 && '“I SHOULD DO THIS NOW”'}
          {selfExample === 3 && (
            <span style={{color: ORANGE}}>YOU INTERRUPTED YOURSELF</span>
          )}
        </Label>
      </div>

      {/* Notifications off */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: windowOpacity(frame, 40.90, 59.58),
        }}
      >
        <Label opacity={1}>
          NOTIFICATIONS:{' '}
          <span style={{color: ORANGE}}>OFF</span>
        </Label>

        <div
          style={{
            ...box,
            position: 'absolute',
            left: 1090,
            top: 345,
            width: 540,
            padding: '35px',
            textAlign: 'center',
          }}
        >
          <div style={{fontSize: 28, fontWeight: 700}}>
            PHONE CHECKS
          </div>
          <div
            style={{
              marginTop: 10,
              color: ORANGE,
              fontSize: 92,
              fontWeight: 800,
            }}
          >
            {checkCount}
          </div>
          <div style={{fontSize: 28, fontWeight: 800}}>
            STILL INCREASING
          </div>
        </div>
      </div>

      {/* Habit remains */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: windowOpacity(frame, 59.58, 70.83),
        }}
      >
        <Label opacity={1}>
          REMOVE THE ALERT
          <br />
          <span style={{color: ORANGE}}>≠ REMOVE THE HABIT</span>
        </Label>

        <div
          style={{
            position: 'absolute',
            left: 68,
            top: 337,
            width: 100,
            height: 58,
            border: `5px solid ${ORANGE}`,
            borderRadius: 18,
            backgroundColor: `${ORANGE}18`,
          }}
        >
          <div
            style={{
              ...box,
              position: 'absolute',
              left: -16,
              top: -52,
              width: 132,
              padding: '8px 6px',
              textAlign: 'center',
              color: ORANGE,
              borderColor: ORANGE,
              borderRadius: 12,
              fontSize: 17,
              fontWeight: 800,
              whiteSpace: 'nowrap',
            }}
          >
            ...
          </div>
        </div>
      </div>

      {/* Маленький эффект notification sound */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: windowOpacity(frame, 70.83, 84.83),
        }}
      >
        <Label opacity={1}>
          NOTIFICATION SOUND
          <br />
          <span style={{color: ORANGE}}>MEASURED EFFECT: SMALL</span>
        </Label>

        <div
          style={{
            ...box,
            position: 'absolute',
            left: 1020,
            top: 370,
            width: 670,
            height: 170,
            padding: '25px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 50,
              right: 50,
              top: 83,
              height: 4,
              backgroundColor: GRAPHITE,
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 300,
              top: 58,
              width: 6,
              height: 54,
              backgroundColor: ORANGE,
              borderRadius: 5,
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 325,
              top: 67,
              fontSize: 27,
              fontWeight: 800,
              color: ORANGE,
            }}
          >
            A FEW MILLISECONDS
          </div>
        </div>
      </div>

      {/* Не meteor strike */}
      <Label opacity={windowOpacity(frame, 84.83, 90.35)}>
        NOT A COGNITIVE
        <br />
        <span style={{color: ORANGE}}>METEOR STRIKE</span>
      </Label>

      {/* Система exits */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: windowOpacity(frame, 90.35, 103.28),
        }}
      >
        {[
          [1110, 300, 'TABS'],
          [1420, 270, 'MESSAGES'],
          [1070, 500, 'SEARCH'],
          [1440, 510, 'PHONE'],
        ].map(([left, top, text]) => (
          <div
            key={String(text)}
            style={{
              ...box,
              position: 'absolute',
              left: Number(left),
              top: Number(top),
              width: 260,
              padding: '22px',
              textAlign: 'center',
              color: ORANGE,
              borderColor: ORANGE,
              fontSize: 27,
              fontWeight: 800,
            }}
          >
            {String(text)}
          </div>
        ))}

        <div
          style={{
            ...box,
            position: 'absolute',
            left: 960,
            top: 730,
            width: 800,
            padding: '28px 40px',
            textAlign: 'center',
            fontSize: 38,
            fontWeight: 800,
          }}
        >
          LEAVING BECOMES EASIER
          <br />
          <span style={{color: ORANGE}}>THAN CONTINUING</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
