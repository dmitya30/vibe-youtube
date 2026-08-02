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
      f(start - 0.25),
      f(start),
      f(end),
      f(end + 0.25),
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
  duration = 0.3,
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

const Header: React.FC<{
  label: string;
  title: string;
}> = ({label, title}) => (
  <div
    style={{
      ...panel,
      position: 'absolute',
      left: 930,
      top: 70,
      width: 820,
      padding: '20px 34px',
      display: 'flex',
      alignItems: 'center',
      gap: 22,
    }}
  >
    <div
      style={{
        minWidth: 64,
        height: 64,
        padding: '0 16px',
        borderRadius: 32,
        backgroundColor: ORANGE,
        color: CREAM,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        fontWeight: 800,
      }}
    >
      {label}
    </div>

    <div
      style={{
        fontSize: 38,
        lineHeight: 1.05,
        fontWeight: 800,
      }}
    >
      {title}
    </div>
  </div>
);

const Chip: React.FC<{
  children: React.ReactNode;
  accent?: boolean;
  muted?: boolean;
}> = ({children, accent = false, muted = false}) => (
  <Card
    accent={accent}
    muted={muted}
    style={{
      padding: '17px 22px',
      textAlign: 'center',
      fontSize: 22,
      fontWeight: 800,
    }}
  >
    {children}
  </Card>
);

export const Section06TwentyFiveMinuteExperiment: React.FC = () => {
  const frame = useCurrentFrame();
  const time = frame / FPS;

  const intro = sceneOpacity(frame, 0, 6.674);
  const outcome = sceneOpacity(frame, 6.674, 12.481);
  const timer = sceneOpacity(frame, 12.481, 25.739);
  const setup = sceneOpacity(frame, 25.739, 29.778);
  const marks = sceneOpacity(frame, 29.778, 37.915);
  const review = sceneOpacity(frame, 37.915, 49.019);
  const visible = sceneOpacity(frame, 49.019, 59.791);
  const ending = sceneOpacity(frame, 59.791, 64.68);

  const markTimes = [
    30.925,
    31.45,
    31.98,
    32.52,
    33.05,
    34.6,
    36.109,
  ];

  const timerProgress = interpolate(
    frame,
    [f(12.481), f(24.639)],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

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
        src={staticFile(
          'audio/segments/06-25-minute-experiment.wav',
        )}
      />

      {/* 1 — Test it once */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: intro,
        }}
      >
        <Header
          label="TEST"
          title="DO NOT REBUILD YOUR ENTIRE LIFE"
        />

        <Card
          accent
          style={{
            position: 'absolute',
            left: 1030,
            top: 300,
            width: 620,
            padding: '60px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 74,
              fontWeight: 900,
            }}
          >
            TEST IT
          </div>

          <div
            style={{
              marginTop: 18,
              fontSize: 58,
              fontWeight: 900,
              opacity: fadeIn(frame, 5.08),
            }}
          >
            ONCE
          </div>
        </Card>

        <div
          style={{
            position: 'absolute',
            left: 1050,
            top: 750,
            width: 580,
            textAlign: 'center',
            color: GREEN,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 30,
            fontWeight: 800,
          }}
        >
          ONE SESSION · ONE EXPERIMENT
        </div>
      </div>

      {/* 2 — Observable outcome */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: outcome,
        }}
      >
        <Header
          label="1"
          title="CHOOSE ONE AVOIDED TASK"
        />

        <Card
          muted
          style={{
            position: 'absolute',
            left: 990,
            top: 285,
            width: 700,
            padding: '34px',
            textAlign: 'center',
            fontSize: 34,
            fontWeight: 800,
            textDecoration: 'line-through',
          }}
        >
          WORK ON THE PROJECT
        </Card>

        <div
          style={{
            position: 'absolute',
            left: 1260,
            top: 440,
            color: ORANGE,
            fontSize: 56,
            fontWeight: 900,
          }}
        >
          ↓
        </div>

        <Card
          accent
          style={{
            position: 'absolute',
            left: 960,
            top: 550,
            width: 760,
            padding: '44px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 29,
              fontWeight: 800,
              color: GRAPHITE,
            }}
          >
            OBSERVABLE OUTCOME
          </div>

          <div
            style={{
              marginTop: 25,
              fontSize: 41,
              lineHeight: 1.15,
              fontWeight: 900,
            }}
          >
            FINISH THE FIRST
            <br />
            THREE SLIDES
          </div>
        </Card>
      </div>

      {/* 3 — Timer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: timer,
        }}
      >
        <Header
          label="2"
          title="SET A TIMER FOR 25 MINUTES"
        />

        <div
          style={{
            position: 'absolute',
            left: 1060,
            top: 245,
            width: 550,
            height: 350,
            border: `14px solid ${ORANGE}`,
            borderRadius: 60,
            backgroundColor: CREAM,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: GRAPHITE,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 104,
            fontWeight: 900,
            letterSpacing: 5,
          }}
        >
          25:00
        </div>

        <div
          style={{
            position: 'absolute',
            left: 1060,
            top: 625,
            width: 550,
            height: 18,
            borderRadius: 12,
            backgroundColor: `${GRAPHITE}22`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${timerProgress * 100}%`,
              height: '100%',
              borderRadius: 12,
              backgroundColor: GREEN,
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 940,
            top: 700,
            width: 800,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 22,
          }}
        >
          <Card
            muted={time >= 19.236}
            style={{
              padding: '25px',
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 800,
              textDecoration:
                time >= 15.364 ? 'line-through' : undefined,
              opacity: fadeIn(frame, 15.364),
            }}
          >
            MAGIC NEUROLOGICAL NUMBER
          </Card>

          <Card
            accent
            style={{
              padding: '25px',
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 800,
              opacity: fadeIn(frame, 19.236),
            }}
          >
            LONG ENOUGH TO OBSERVE
          </Card>

          <Card
            accent
            style={{
              gridColumn: '1 / 3',
              padding: '25px',
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 800,
              opacity: fadeIn(frame, 22.904),
            }}
          >
            SHORT ENOUGH TO ATTEMPT TODAY
          </Card>
        </div>
      </div>

      {/* 4 — Setup */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: setup,
        }}
      >
        <Header
          label="3"
          title="PREPARE THE SESSION"
        />

        <div
          style={{
            position: 'absolute',
            left: 980,
            top: 300,
            width: 740,
            display: 'grid',
            gap: 30,
          }}
        >
          <Card
            accent
            style={{
              padding: '42px',
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              fontSize: 39,
              fontWeight: 900,
            }}
          >
            <span style={{fontSize: 50}}>✓</span>
            CLOSE VISIBLE EXITS
          </Card>

          <Card
            accent
            style={{
              padding: '42px',
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              fontSize: 39,
              fontWeight: 900,
              opacity: fadeIn(frame, 28.123),
            }}
          >
            <span style={{fontSize: 50}}>✓</span>
            KEEP A PARKING LIST
          </Card>
        </div>
      </div>

      {/* 5 — Mark impulses */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: marks,
        }}
      >
        <Header
          label="4"
          title="MARK EVERY IMPULSE TO LEAVE"
        />

        <Card
          style={{
            position: 'absolute',
            left: 970,
            top: 260,
            width: 760,
            height: 400,
            padding: '45px',
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            IMPULSE MARKS
          </div>

          <div
            style={{
              marginTop: 55,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 30,
              alignItems: 'center',
            }}
          >
            {markTimes.map((start, index) => (
              <div
                key={start}
                style={{
                  width: 55,
                  height: 90,
                  color: index >= 5 ? GREEN : ORANGE,
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: 78,
                  lineHeight: 1,
                  fontWeight: 900,
                  transform:
                    index % 2 === 0
                      ? 'rotate(-7deg)'
                      : 'rotate(6deg)',
                  opacity: fadeIn(frame, start, 0.12),
                }}
              >
                /
              </div>
            ))}
          </div>
        </Card>

        <Card
          accent
          style={{
            position: 'absolute',
            left: 1020,
            top: 760,
            width: 660,
            padding: '30px',
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 900,
            opacity: fadeIn(frame, 33.895),
          }}
        >
          NO JUDGMENT
          <span
            style={{
              color: GRAPHITE,
              margin: '0 18px',
            }}
          >
            ·
          </span>
          JUST RECORD IT
        </Card>
      </div>

      {/* 6 — Review exits */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: review,
        }}
      >
        <Header
          label="5"
          title="LOOK AT THE LIST"
        />

        <div
          style={{
            position: 'absolute',
            left: 930,
            top: 250,
            width: 830,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}
        >
          <Card
            accent
            style={{
              padding: '30px',
              minHeight: 260,
            }}
          >
            <div
              style={{
                fontSize: 29,
                fontWeight: 900,
                marginBottom: 28,
              }}
            >
              EXTERNAL
            </div>

            <div
              style={{
                display: 'grid',
                gap: 14,
                opacity: fadeIn(frame, 38.998),
              }}
            >
              <Chip>MESSAGE</Chip>
              <Chip>NOISE</Chip>
            </div>
          </Card>

          <Card
            style={{
              padding: '30px',
              minHeight: 260,
            }}
          >
            <div
              style={{
                fontSize: 29,
                fontWeight: 900,
                marginBottom: 28,
              }}
            >
              SELF-CREATED
            </div>

            <div
              style={{
                display: 'grid',
                gap: 14,
                opacity: fadeIn(frame, 40.733),
              }}
            >
              <Chip accent>NEW TAB</Chip>
              <Chip accent>PHONE CHECK</Chip>
            </div>
          </Card>
        </div>

        <Card
          style={{
            position: 'absolute',
            left: 950,
            top: 650,
            width: 790,
            padding: '30px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 800,
              marginBottom: 24,
            }}
          >
            WHEN THE WORK BECAME...
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 18,
            }}
          >
            <Chip accent>CONFUSING</Chip>
            <Chip accent>UNCOMFORTABLE</Chip>
            <Chip accent>BORING</Chip>
          </div>
        </Card>
      </div>

      {/* 7 — Make exits visible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: visible,
        }}
      >
        <Header
          label="GOAL"
          title="NOT EXTRAORDINARY DISCIPLINE"
        />

        <Card
          muted
          style={{
            position: 'absolute',
            left: 1000,
            top: 275,
            width: 700,
            padding: '34px',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 900,
            textDecoration: 'line-through',
          }}
        >
          PROVE THAT YOU HAVE
          <br />
          PERFECT SELF-CONTROL
        </Card>

        <Card
          accent
          style={{
            position: 'absolute',
            left: 960,
            top: 510,
            width: 780,
            padding: '60px 35px',
            textAlign: 'center',
            opacity: fadeIn(frame, 56.689),
          }}
        >
          <div
            style={{
              fontSize: 54,
              lineHeight: 1.1,
              fontWeight: 900,
            }}
          >
            MAKE THE EXITS
            <br />
            VISIBLE
          </div>
        </Card>
      </div>

      {/* 8 — Architecture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: ending,
        }}
      >
        <Header
          label="SEE"
          title="THE ARCHITECTURE OF YOUR ATTENTION"
        />

        <div
          style={{
            position: 'absolute',
            left: 930,
            top: 275,
            width: 820,
            height: 360,
          }}
        >
          <Card
            accent
            style={{
              position: 'absolute',
              left: 280,
              top: 120,
              width: 260,
              padding: '38px',
              textAlign: 'center',
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            ONE TASK
          </Card>

          {[
            ['MESSAGE', 0, 0],
            ['PHONE', 570, 0],
            ['NEW TAB', 0, 265],
            ['BOREDOM', 570, 265],
          ].map(([text, left, top]) => (
            <Card
              key={String(text)}
              muted
              style={{
                position: 'absolute',
                left: Number(left),
                top: Number(top),
                width: 210,
                padding: '22px',
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              {text}
            </Card>
          ))}

          <svg
            width="820"
            height="360"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: -1,
            }}
          >
            <path
              d="M280 145 L210 55 M540 145 L610 55 M280 230 L210 305 M540 230 L610 305"
              fill="none"
              stroke={ORANGE}
              strokeWidth="7"
              strokeDasharray="16 12"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <Card
          accent
          style={{
            position: 'absolute',
            left: 1030,
            top: 790,
            width: 620,
            padding: '35px',
            textAlign: 'center',
            fontSize: 42,
            fontWeight: 900,
            opacity: fadeIn(frame, 63.284),
          }}
        >
          START CHANGING IT
        </Card>
      </div>
    </AbsoluteFill>
  );
};
