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
  fadeFrames = 8,
) =>
  interpolate(
    frame,
    [f(start), f(start) + fadeFrames, f(end) - fadeFrames, f(end)],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

const fadeIn = (
  frame: number,
  start: number,
  duration = 0.4,
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
  backgroundColor: 'rgba(248,237,221,0.95)',
  border: `3px solid ${GRAPHITE}`,
  borderRadius: 22,
  color: GRAPHITE,
  fontFamily: 'Arial, Helvetica, sans-serif',
  boxShadow: '0 8px 0 rgba(38,50,56,0.08)',
};

const Node: React.FC<{
  left: number;
  top: number;
  width?: number;
  height?: number;
  active?: boolean;
  opacity?: number;
  scale?: number;
  label?: string;
}> = ({
  left,
  top,
  width = 150,
  height = 78,
  active = false,
  opacity = 1,
  scale = 1,
  label,
}) => (
  <div
    style={{
      ...panel,
      position: 'absolute',
      left,
      top,
      width,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      borderColor: active ? ORANGE : GRAPHITE,
      color: active ? ORANGE : GRAPHITE,
      fontSize: 22,
      fontWeight: 800,
      textAlign: 'center',
      opacity,
      transform: `scale(${scale})`,
    }}
  >
    {label}
  </div>
);

const MentalModel: React.FC<{
  frame: number;
  dimmed?: boolean;
  scattered?: boolean;
  showMessage?: boolean;
}> = ({
  frame,
  dimmed = false,
  scattered = false,
  showMessage = false,
}) => {
  const build = fadeIn(frame, 0.3, 1.1);
  const dim = dimmed ? 0.24 : 1;

  const nodes = [
    {left: 1020, top: 185, width: 150, height: 76},
    {left: 1230, top: 135, width: 160, height: 78},
    {left: 1460, top: 190, width: 160, height: 78},
    {left: 970, top: 350, width: 150, height: 82},
    {left: 1215, top: 315, width: 185, height: 100, active: true},
    {left: 1480, top: 355, width: 160, height: 82},
    {left: 1080, top: 520, width: 165, height: 78},
    {left: 1370, top: 525, width: 175, height: 78},
  ];

  const offsets = scattered
    ? [
        [-20, -35],
        [15, -60],
        [70, -15],
        [-45, 40],
        [0, 0],
        [80, 45],
        [-30, 70],
        [65, 65],
      ]
    : nodes.map(() => [0, 0]);

  const lines = [
    [1095, 261, 1305, 315],
    [1310, 213, 1305, 315],
    [1540, 268, 1400, 340],
    [1120, 390, 1215, 365],
    [1400, 365, 1480, 395],
    [1160, 520, 1260, 415],
    [1455, 525, 1360, 415],
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: build * dim,
      }}
    >
      <svg
        width="1920"
        height="1080"
        style={{position: 'absolute', inset: 0}}
      >
        {lines.map(([x1, y1, x2, y2], index) => (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={index === 4 && showMessage ? ORANGE : GRAPHITE}
            strokeWidth={5}
            strokeLinecap="round"
            opacity={0.75}
            strokeDasharray={index === 4 && showMessage ? '14 12' : undefined}
          />
        ))}
      </svg>

      {nodes.map((node, index) => (
        <Node
          key={index}
          {...node}
          left={node.left + offsets[index][0]}
          top={node.top + offsets[index][1]}
          opacity={1}
          scale={node.active ? 1.04 : 1}
        />
      ))}

      {showMessage && (
        <div
          style={{
            ...panel,
            position: 'absolute',
            left: 1660,
            top: 340,
            width: 190,
            height: 100,
            borderColor: ORANGE,
            color: ORANGE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            fontWeight: 800,
          }}
        >
          MESSAGE
        </div>
      )}
    </div>
  );
};

const QuestionPanel: React.FC<{
  frame: number;
}> = ({frame}) => {
  const questions = [
    {text: 'WHAT WAS I DOING?', start: 14.16},
    {text: 'WHAT HAD I DECIDED?', start: 16.44},
    {text: 'WHAT WAS THE NEXT MOVE?', start: 18.93},
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: 1010,
        top: 180,
        width: 720,
      }}
    >
      {questions.map((item, index) => (
        <div
          key={item.text}
          style={{
            ...panel,
            marginBottom: 28,
            padding: '25px 32px',
            textAlign: 'center',
            fontSize: 38,
            fontWeight: 800,
            opacity: fadeIn(frame, item.start),
            transform: `translateX(${interpolate(
              frame,
              [f(item.start), f(item.start + 0.45)],
              [55, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              },
            )}px)`,
            color: index === 2 ? ORANGE : GRAPHITE,
            borderColor: index === 2 ? ORANGE : GRAPHITE,
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

const Chain: React.FC<{
  frame: number;
}> = ({frame}) => {
  const items = [
    ['MESSAGE', 68.37],
    ['EMAIL', 74.55],
    ['CALENDAR', 77.58],
    ['SEARCH', 80.70],
    ['ANOTHER MESSAGE', 83.42],
    ['DOCUMENT', 85.47],
  ] as const;

  return (
    <div
      style={{
        position: 'absolute',
        left: 760,
        top: 310,
        width: 1080,
      }}
    >
      <div
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 38,
          fontWeight: 800,
          color: GRAPHITE,
          textAlign: 'center',
          marginBottom: 60,
        }}
      >
        ONE SWITCH CAN BECOME A CHAIN
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 18,
        }}
      >
        {items.map(([label, start], index) => (
          <React.Fragment key={label}>
            <div
              style={{
                ...panel,
                minWidth: label === 'ANOTHER MESSAGE' ? 225 : 145,
                padding: '22px 24px',
                textAlign: 'center',
                fontSize: 23,
                fontWeight: 800,
                color: index === items.length - 1 ? GRAPHITE : ORANGE,
                borderColor:
                  index === items.length - 1 ? GRAPHITE : ORANGE,
                opacity: fadeIn(frame, start, 0.25),
                transform: `scale(${fadeIn(frame, start, 0.25)})`,
              }}
            >
              {label}
            </div>

            {index < items.length - 1 && (
              <div
                style={{
                  fontSize: 38,
                  color: GRAPHITE,
                  opacity: fadeIn(frame, start, 0.25),
                }}
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const Section04SwitchCost: React.FC = () => {
  const frame = useCurrentFrame();

  const introOpacity = windowOpacity(frame, 0, 11.60);
  const reconstructionOpacity = windowOpacity(frame, 11.60, 22.95);
  const lagOpacity = windowOpacity(frame, 22.95, 35.49);
  const cueOpacity = windowOpacity(frame, 35.49, 46.12);
  const mythOpacity = windowOpacity(frame, 46.12, 61.03);
  const measurementOpacity = windowOpacity(frame, 61.03, 68.37);
  const chainOpacity = windowOpacity(frame, 68.37, 88.08);
  const pressureOpacity = windowOpacity(frame, 88.08, 105.15);
  const endingOpacity = windowOpacity(frame, 105.15, 111.44, 4);

  const strikeWidth = interpolate(
    frame,
    [f(53.56), f(54.65)],
    [0, 100],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const progress = interpolate(
    frame,
    [f(88.08), f(99.64)],
    [12, 100],
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

      <Audio src={staticFile('audio/segments/04-switch-cost.wav')} />

      {/* Mental model assembles, then becomes difficult to access */}
      <div style={{position: 'absolute', inset: 0, opacity: introOpacity}}>
        <MentalModel
          frame={frame}
          dimmed={frame >= f(11.60)}
          scattered={frame >= f(9.40)}
          showMessage={frame >= f(7.46)}
        />

        <div
          style={{
            ...panel,
            position: 'absolute',
            left: 1070,
            top: 720,
            width: 680,
            padding: '25px 34px',
            textAlign: 'center',
            fontSize: 36,
            fontWeight: 800,
            opacity: frame >= f(9.40) ? 1 : 0,
          }}
        >
          THE MODEL IS STILL THERE
          <br />
          <span style={{color: ORANGE}}>BUT HARDER TO ACCESS</span>
        </div>
      </div>

      {/* Reconstruction questions */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: reconstructionOpacity,
        }}
      >
        <MentalModel
          frame={frame}
          dimmed
          scattered
        />
        <QuestionPanel frame={frame} />
      </div>

      {/* Resumption lag */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: lagOpacity,
        }}
      >
        <div
          style={{
            ...panel,
            position: 'absolute',
            left: 1000,
            top: 220,
            width: 740,
            padding: '45px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              color: ORANGE,
            }}
          >
            RESUMPTION LAG
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.3,
              fontWeight: 700,
            }}
          >
            THE DELAY BEFORE CONTINUING
            <br />
            AN INTERRUPTED TASK
          </div>

          <div
            style={{
              margin: '45px auto 0',
              width: 580,
              height: 24,
              border: `3px solid ${GRAPHITE}`,
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${interpolate(
                  frame,
                  [f(22.95), f(29.43)],
                  [8, 100],
                  {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  },
                )}%`,
                backgroundColor: ORANGE,
              }}
            />
          </div>
        </div>
      </div>

      {/* Preparation and return cues */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: cueOpacity,
        }}
      >
        <div
          style={{
            ...panel,
            position: 'absolute',
            left: 980,
            top: 160,
            width: 760,
            padding: '35px 42px',
            textAlign: 'center',
            fontSize: 42,
            fontWeight: 800,
          }}
        >
          USEFUL CUES MAKE RETURNING
          <br />
          <span style={{color: ORANGE}}>EASIER</span>
        </div>

        <div
          style={{
            ...panel,
            position: 'absolute',
            left: 1110,
            top: 440,
            width: 540,
            padding: '32px',
            fontSize: 32,
            fontWeight: 800,
            lineHeight: 1.35,
          }}
        >
          RETURN CUE:
          <div
            style={{
              marginTop: 18,
              color: ORANGE,
            }}
          >
            “FIX THE SECOND SENTENCE”
          </div>
        </div>

        <svg
          width="1920"
          height="1080"
          style={{position: 'absolute', inset: 0}}
        >
          <path
            d="M820 515 C960 430 1010 520 1110 510"
            fill="none"
            stroke={ORANGE}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="18 14"
          />
        </svg>
      </div>

      {/* Misleading 25-minute wording */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: mythOpacity,
        }}
      >
        <div
          style={{
            ...panel,
            position: 'absolute',
            left: 960,
            top: 245,
            width: 790,
            padding: '55px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              fontSize: 66,
              fontWeight: 800,
            }}
          >
            25 MIN TO RECOVER

            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '48%',
                width: `${strikeWidth}%`,
                height: 10,
                borderRadius: 10,
                backgroundColor: ORANGE,
                transform: 'rotate(-4deg)',
              }}
            />
          </div>

          <div
            style={{
              marginTop: 42,
              color: ORANGE,
              fontSize: 34,
              fontWeight: 800,
              opacity: fadeIn(frame, 53.56),
            }}
          >
            MISLEADING WORDING
          </div>

          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              lineHeight: 1.35,
              fontWeight: 700,
              opacity: fadeIn(frame, 58.71),
            }}
          >
            NOT A UNIVERSAL
            <br />
            COGNITIVE RECOVERY TIMER
          </div>
        </div>
      </div>

      {/* What the field observation measured */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: measurementOpacity,
        }}
      >
        <div
          style={{
            ...panel,
            position: 'absolute',
            left: 940,
            top: 230,
            width: 830,
            padding: '48px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            WHAT WAS MEASURED:
          </div>

          <div
            style={{
              marginTop: 25,
              fontSize: 56,
              lineHeight: 1.1,
              fontWeight: 800,
              color: ORANGE,
            }}
          >
            RETURN TO THE
            <br />
            ORIGINAL PROJECT
          </div>

          <div
            style={{
              marginTop: 35,
              fontSize: 27,
              lineHeight: 1.35,
              fontWeight: 700,
            }}
          >
            AFTER MOVING THROUGH
            <br />
            OTHER ACTIVITIES
          </div>
        </div>
      </div>

      {/* Switch chain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: chainOpacity,
        }}
      >
        <Chain frame={frame} />
      </div>

      {/* Faster work, higher pressure */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: pressureOpacity,
        }}
      >
        <div
          style={{
            ...panel,
            position: 'absolute',
            left: 940,
            top: 160,
            width: 830,
            padding: '38px 44px',
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            THE WORK CAN LOOK
            <span style={{color: ORANGE}}> FASTER</span>
          </div>

          <div
            style={{
              marginTop: 42,
              height: 32,
              border: `3px solid ${GRAPHITE}`,
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: ORANGE,
              }}
            />
          </div>

          <div
            style={{
              marginTop: 46,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 22,
            }}
          >
            {[
              ['QUALITY', 'NO MEASURED DROP'],
              ['STRESS', 'HIGHER'],
              ['FRUSTRATION', 'HIGHER'],
              ['TIME PRESSURE', 'HIGHER'],
            ].map(([label, value], index) => (
              <div
                key={label}
                style={{
                  ...panel,
                  padding: '24px',
                  textAlign: 'center',
                  opacity: fadeIn(frame, 93.70 + index * 1.8),
                  borderColor: index === 0 ? GRAPHITE : ORANGE,
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 28,
                    fontWeight: 800,
                    color: index === 0 ? GRAPHITE : ORANGE,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final thesis */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: endingOpacity,
        }}
      >
        <div
          style={{
            ...panel,
            position: 'absolute',
            left: 900,
            top: 260,
            width: 890,
            padding: '62px 55px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 46,
              fontWeight: 800,
            }}
          >
            THE COST IS NOT ALWAYS VISIBLE
            <br />
            IN THE FINISHED DOCUMENT
          </div>

          <div
            style={{
              marginTop: 44,
              fontSize: 52,
              lineHeight: 1.15,
              fontWeight: 800,
              color: ORANGE,
            }}
          >
            SOMETIMES IT APPEARS
            <br />
            IN THE PERSON FINISHING IT
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
