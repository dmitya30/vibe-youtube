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
const GREEN = '#557568';

const f = (seconds: number) => Math.round(seconds * FPS);

const sceneOpacity = (
  frame: number,
  start: number,
  end: number,
) =>
  interpolate(
    frame,
    [
      f(start - 0.2),
      f(start),
      f(end),
      f(end + 0.2),
    ],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

const fadeIn = (
  frame: number,
  start: number,
  duration = 0.25,
) =>
  interpolate(
    frame,
    [f(start), f(start + duration)],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

const panel: React.CSSProperties = {
  backgroundColor: 'rgba(248,237,221,0.97)',
  border: `3px solid ${GRAPHITE}`,
  borderRadius: 22,
  color: GRAPHITE,
  fontFamily: 'Arial, Helvetica, sans-serif',
  boxShadow: '0 8px 0 rgba(38,50,56,0.08)',
};

const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  accent?: boolean;
  muted?: boolean;
}> = ({
  children,
  style,
  accent = false,
  muted = false,
}) => (
  <div
    style={{
      ...panel,
      borderColor: accent ? ORANGE : GRAPHITE,
      color: accent ? ORANGE : GRAPHITE,
      opacity: muted ? 0.34 : 1,
      ...style,
    }}
  >
    {children}
  </div>
);

const Door: React.FC = () => (
  <svg
    width="260"
    height="350"
    viewBox="0 0 260 350"
  >
    <path
      d="M25 320 H235 M70 320 V35 H195 V320"
      fill="none"
      stroke={GRAPHITE}
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <polygon
      points="78,45 165,70 165,288 78,310"
      fill={CREAM}
      stroke={ORANGE}
      strokeWidth="8"
      strokeLinejoin="round"
    />

    <circle
      cx="148"
      cy="180"
      r="9"
      fill={ORANGE}
    />
  </svg>
);

export const Section07Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const time = frame / FPS;

  const purity = sceneOpacity(frame, 0, 3.832);
  const detox = sceneOpacity(frame, 3.832, 12.743);
  const distraction = sceneOpacity(frame, 12.743, 17.134);
  const returnScene = sceneOpacity(frame, 17.134, 25.166);
  const oneDoor = sceneOpacity(frame, 25.166, 29.97);
  const question = sceneOpacity(frame, 29.97, 39.52);

  const exits = [
    {
      label: 'MESSAGES',
      start: 33.878,
    },
    {
      label: 'TABS',
      start: 35.223,
    },
    {
      label: 'YOUR PHONE',
      start: 36.24,
    },
    {
      label: 'SOMETHING ELSE?',
      start: 38.026,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: CREAM,
        overflow: 'hidden',
      }}
    >
      <Img
        src={staticFile('assets/nod/coldopen-desk-clean-v1.jpg')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <Audio
        src={staticFile('audio/segments/07-ending.wav')}
      />

      {/* Attention is not a purity test */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: purity,
        }}
      >
        <Card
          style={{
            position: 'absolute',
            left: 930,
            top: 260,
            width: 820,
            padding: '62px 35px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 66,
              fontWeight: 900,
            }}
          >
            ATTENTION
          </div>

          <div
            style={{
              margin: '24px 0',
              color: ORANGE,
              fontSize: 64,
              fontWeight: 900,
            }}
          >
            ≠
          </div>

          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
            }}
          >
            A PURITY TEST
          </div>
        </Card>
      </div>

      {/* False fixes */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: detox,
        }}
      >
        <Card
          style={{
            position: 'absolute',
            left: 940,
            top: 90,
            width: 800,
            padding: '25px',
            textAlign: 'center',
            fontSize: 38,
            fontWeight: 900,
          }}
        >
          YOU PROBABLY DO NOT NEED TO...
        </Card>

        <div
          style={{
            position: 'absolute',
            left: 970,
            top: 270,
            width: 740,
            display: 'grid',
            gap: 28,
          }}
        >
          {[
            ['DELETE EVERY APP', 3.832],
            ['SIT IN AN EMPTY ROOM', 7.525],
            ['DO A LITERAL DOPAMINE DETOX', 9.329],
          ].map(([label, start]) => (
            <Card
              key={String(label)}
              muted
              style={{
                padding: '36px',
                textAlign: 'center',
                fontSize: 34,
                fontWeight: 900,
                textDecoration: 'line-through',
                opacity: fadeIn(frame, Number(start)),
              }}
            >
              {label}
            </Card>
          ))}
        </div>
      </div>

      {/* Never distracted */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: distraction,
        }}
      >
        <Card
          muted
          style={{
            position: 'absolute',
            left: 970,
            top: 300,
            width: 740,
            padding: '55px',
            textAlign: 'center',
            textDecoration: 'line-through',
          }}
        >
          <div
            style={{
              fontSize: 37,
              fontWeight: 800,
            }}
          >
            BECOME A PERSON WHO
          </div>

          <div
            style={{
              marginTop: 20,
              fontSize: 53,
              fontWeight: 900,
            }}
          >
            NEVER GETS DISTRACTED
          </div>
        </Card>

        <div
          style={{
            position: 'absolute',
            left: 1050,
            top: 700,
            width: 580,
            textAlign: 'center',
            color: GREEN,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 31,
            fontWeight: 900,
          }}
        >
          THAT IS NOT THE GOAL
        </div>
      </div>

      {/* Easier return / conscious exit */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: returnScene,
        }}
      >
        <Card
          accent
          style={{
            position: 'absolute',
            left: 960,
            top: 220,
            width: 760,
            padding: '55px 35px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: GRAPHITE,
              fontSize: 29,
              fontWeight: 800,
            }}
          >
            BUILD A TASK THAT IS
          </div>

          <div
            style={{
              marginTop: 20,
              fontSize: 52,
              lineHeight: 1.05,
              fontWeight: 900,
            }}
          >
            EASIER TO
            <br />
            RETURN TO
          </div>
        </Card>

        <Card
          style={{
            position: 'absolute',
            left: 990,
            top: 630,
            width: 700,
            padding: '42px',
            textAlign: 'center',
            opacity: fadeIn(frame, 20.515),
          }}
        >
          <div
            style={{
              fontSize: 27,
              fontWeight: 800,
            }}
          >
            LEAVING REQUIRES
          </div>

          <div
            style={{
              marginTop: 18,
              color: ORANGE,
              fontSize: 42,
              fontWeight: 900,
            }}
          >
            A CONSCIOUS CHOICE
          </div>
        </Card>
      </div>

      {/* One task, one outcome, one door */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: oneDoor,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 910,
            top: 70,
            width: 850,
            textAlign: 'center',
            color: GRAPHITE,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 43,
            fontWeight: 900,
          }}
        >
          TRY IT ONCE
        </div>

        <div
          style={{
            position: 'absolute',
            left: 940,
            top: 230,
            width: 800,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 24,
            alignItems: 'center',
          }}
        >
          <Card
            accent
            style={{
              padding: '43px 18px',
              textAlign: 'center',
              fontSize: 34,
              fontWeight: 900,
              opacity: fadeIn(frame, 25.166),
            }}
          >
            ONE
            <br />
            TASK
          </Card>

          <Card
            accent
            style={{
              padding: '43px 18px',
              textAlign: 'center',
              fontSize: 34,
              fontWeight: 900,
              opacity: fadeIn(frame, 25.598),
            }}
          >
            ONE
            <br />
            OUTCOME
          </Card>

          <Card
            accent
            style={{
              padding: '43px 18px',
              textAlign: 'center',
              fontSize: 34,
              fontWeight: 900,
              opacity: fadeIn(frame, 26.776),
            }}
          >
            ONE
            <br />
            DOOR
          </Card>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 1205,
            top: 560,
            opacity: fadeIn(frame, 27.989),
          }}
        >
          <Door />
        </div>
      </div>

      {/* Final question */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: question,
        }}
      >
        <Card
          accent
          style={{
            position: 'absolute',
            left: 920,
            top: 80,
            width: 840,
            padding: '34px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: GRAPHITE,
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            WHICH EXIT DO YOU
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 48,
              fontWeight: 900,
            }}
          >
            STILL TRY TO TAKE?
          </div>
        </Card>

        <div
          style={{
            position: 'absolute',
            left: 970,
            top: 390,
            width: 740,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}
        >
          {exits.map(({label, start}, index) => {
            const active =
              time >= start &&
              (
                index === exits.length - 1 ||
                time < exits[index + 1].start
              );

            return (
              <Card
                key={label}
                accent={active}
                muted={time < start}
                style={{
                  padding: '34px 20px',
                  textAlign: 'center',
                  fontSize: 29,
                  fontWeight: 900,
                  opacity:
                    time < start
                      ? 0.16
                      : fadeIn(frame, start),
                  transform:
                    active
                      ? 'scale(1.04)'
                      : 'scale(1)',
                }}
              >
                {label}
              </Card>
            );
          })}
        </div>

        <div
          style={{
            transform: 'translateX(55px)',
            position: 'absolute',
            left: 1020,
            top: 850,
            width: 640,
            textAlign: 'center',
            color: GREEN,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 30,
            fontWeight: 900,
            opacity: fadeIn(frame, 38.026),
          }}
        >
          NOTICE IT · NAME IT · CHOOSE
        </div>
      </div>
    </AbsoluteFill>
  );
};
