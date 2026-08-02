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

const fadeIn = (
  frame: number,
  start: number,
  duration = 0.35,
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

const panel: React.CSSProperties = {
  backgroundColor: 'rgba(248,237,221,0.96)',
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
      opacity: muted ? 0.35 : 1,
      ...style,
    }}
  >
    {children}
  </div>
);

const StepHeader: React.FC<{
  number: number;
  title: string;
}> = ({number, title}) => (
  <div
    style={{
      ...panel,
      position: 'absolute',
      left: 930,
      top: 75,
      width: 820,
      padding: '22px 35px',
      display: 'flex',
      alignItems: 'center',
      gap: 24,
    }}
  >
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        backgroundColor: ORANGE,
        color: CREAM,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 38,
        fontWeight: 800,
      }}
    >
      {number}
    </div>

    <div
      style={{
        fontSize: 40,
        fontWeight: 800,
      }}
    >
      {title}
    </div>
  </div>
);

const DoorHero: React.FC<{
  frame: number;
}> = ({frame}) => {
  const open = interpolate(
    frame,
    [f(7.0), f(10.5)],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const freeEdgeX = interpolate(open, [0, 1], [506, 300]);
  const freeEdgeTopY = interpolate(open, [0, 1], [145, 188]);
  const freeEdgeBottomY = interpolate(open, [0, 1], [575, 532]);
  const handleX = interpolate(open, [0, 1], [455, 283]);

  return (
    <div
      style={{
        position: 'absolute',
        left: 1020,
        top: 170,
        width: 700,
        height: 700,
      }}
    >
      <svg width="700" height="700" viewBox="0 0 700 700">
        <rect
          x="194"
          y="145"
          width="312"
          height="430"
          rx="8"
          fill="rgba(38,50,56,0.09)"
        />

        <polygon
          points={`
            194,145
            ${freeEdgeX},${freeEdgeTopY}
            ${freeEdgeX},${freeEdgeBottomY}
            194,575
          `}
          fill={CREAM}
          stroke={ORANGE}
          strokeWidth="10"
          strokeLinejoin="round"
        />

        <path
          d="M194 145 V575"
          fill="none"
          stroke={GRAPHITE}
          strokeWidth="8"
          strokeLinecap="round"
        />

        <circle
          cx={handleX}
          cy="365"
          r="14"
          fill={ORANGE}
        />

        <path
          d="M80 590 H620 M180 590 V130 H520 V590"
          fill="none"
          stroke={GRAPHITE}
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M80 590 H620"
          fill="none"
          stroke={GRAPHITE}
          strokeWidth="14"
          strokeLinecap="round"
        />
      </svg>

      <div
        style={{
          position: 'absolute',
          left: 200,
          top: 305,
          width: 300,
          textAlign: 'center',
          color: ORANGE,
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 34,
          fontWeight: 800,
          opacity: fadeIn(frame, 8.27),
        }}
      >
        ONE TASK
      </div>
    </div>
  );
};

const PhoneIcon: React.FC<{
  left: number;
  top: number;
  opacity?: number;
}> = ({left, top, opacity = 1}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width: 105,
      height: 180,
      border: `7px solid ${ORANGE}`,
      borderRadius: 24,
      backgroundColor: CREAM,
      opacity,
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: 31,
        top: 14,
        width: 42,
        height: 7,
        borderRadius: 6,
        backgroundColor: GRAPHITE,
      }}
    />

    <div
      style={{
        position: 'absolute',
        left: 41,
        bottom: 12,
        width: 22,
        height: 22,
        border: `4px solid ${GRAPHITE}`,
        borderRadius: '50%',
      }}
    />
  </div>
);

export const Section05OneDoorProtocol: React.FC = () => {
  const frame = useCurrentFrame();
  const time = frame / FPS;

  const introOpacity = windowOpacity(frame, 0, 16.02);
  const disclaimerOpacity = windowOpacity(frame, 16.02, 29.80);
  const step1Opacity = windowOpacity(frame, 29.80, 63.50);
  const step2Opacity = windowOpacity(frame, 63.50, 99.24);
  const step3Opacity = windowOpacity(frame, 99.24, 139.87);
  const step4Opacity = windowOpacity(frame, 139.87, 181.825);
  const step5Opacity = windowOpacity(frame, 181.2915, 203.650958, 6);

  const step1Phase =
    time < 37.84 ? 0 :
    time < 42.72 ? 1 :
    time < 56.07 ? 2 :
    time < 59.41 ? 3 : 4;

  const step2Phase =
    time < 69.83 ? 0 :
    time < 77.34 ? 1 :
    time < 86.52 ? 2 :
    time < 96.68 ? 3 : 4;

  const step3Phase =
    time < 104.96 ? 0 :
    time < 110.94 ? 1 :
    time < 117.97 ? 2 :
    time < 126.40 ? 3 :
    time < 135.59 ? 4 : 5;

  const step4Phase =
    time < 147.20 ? 0 :
    time < 152.35 ? 1 :
    time < 159.997 ? 2 :
    time < 174.07 ? 3 :
    time < 180.22 ? 4 : 5;

  const step5Progress = interpolate(
    frame,
    [f(188.788), f(194.379042)],
    [38, 100],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const showStep5ReturnCue = time >= 194.835875;
  const showStep5Handle = time >= 198.076083;
  const showStep5Final = time >= 200.2;

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
        src={staticFile('audio/segments/05-one-door-protocol.wav')}
      />

      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: introOpacity,
        }}
      >
        <DoorHero frame={frame} />

        <Card
          style={{
            position: 'absolute',
            left: 920,
            top: 85,
            width: 850,
            padding: '28px 40px',
            textAlign: 'center',
            fontSize: 45,
            fontWeight: 800,
          }}
        >
          CHANGE THE
          <span style={{color: ORANGE}}> ARCHITECTURE </span>
          OF THE TASK
        </Card>

        <div
          style={{
            position: 'absolute',
            left: 1000,
            top: 880,
            width: 740,
            textAlign: 'center',
            color: GRAPHITE,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 30,
            fontWeight: 800,
            opacity: fadeIn(frame, 12.91),
          }}
        >
          THE ONE DOOR PROTOCOL
        </div>
      </div>

      {/* Disclaimer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: disclaimerOpacity,
        }}
      >
        <Card
          style={{
            position: 'absolute',
            left: 940,
            top: 175,
            width: 820,
            padding: '50px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 46,
              fontWeight: 800,
            }}
          >
            A PRACTICAL EXPERIMENT
          </div>

          <div
            style={{
              marginTop: 42,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 25,
            }}
          >
            <Card
              muted
              style={{
                padding: '28px',
                fontSize: 29,
                fontWeight: 800,
                textDecoration: 'line-through',
              }}
            >
              CLINICAL TREATMENT
            </Card>

            <Card
              muted
              style={{
                padding: '28px',
                fontSize: 29,
                fontWeight: 800,
                textDecoration: 'line-through',
              }}
            >
              MAGIC FORMULA
            </Card>
          </div>

          <div
            style={{
              marginTop: 45,
              color: ORANGE,
              fontSize: 32,
              lineHeight: 1.35,
              fontWeight: 800,
              opacity: fadeIn(frame, 23.36),
            }}
          >
            SWITCHING · CUES · RETURNING
          </div>
        </Card>
      </div>

      {/* Step 1 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: step1Opacity,
        }}
      >
        <StepHeader
          number={1}
          title="NAME ONE OBSERVABLE OUTCOME"
        />

        <div
          style={{
            position: 'absolute',
            left: 950,
            top: 245,
            width: 800,
          }}
        >
          <Card
            muted={step1Phase > 0}
            style={{
              padding: '30px',
              textAlign: 'center',
              fontSize: 38,
              fontWeight: 800,
              textDecoration: step1Phase > 0 ? 'line-through' : undefined,
            }}
          >
            STUDY BIOLOGY
          </Card>

          <div
            style={{
              margin: '25px 0',
              textAlign: 'center',
              color: ORANGE,
              fontSize: 36,
              fontWeight: 800,
              opacity: step1Phase >= 1 ? 1 : 0,
            }}
          >
            ↓
          </div>

          <Card
            muted={step1Phase > 1}
            style={{
              padding: '30px',
              textAlign: 'center',
              fontSize: 35,
              fontWeight: 800,
              opacity: step1Phase >= 1 ? 1 : 0,
              textDecoration: step1Phase > 1 ? 'line-through' : undefined,
            }}
          >
            REVIEW CHAPTER FOUR
          </Card>

          <Card
            accent
            style={{
              marginTop: 28,
              padding: '34px',
              textAlign: 'center',
              fontSize: 39,
              fontWeight: 800,
              opacity: step1Phase >= 2 ? 1 : 0,
            }}
          >
            CREATE TEN FLASHCARDS
            <br />
            FROM CHAPTER FOUR
          </Card>
        </div>

        {step1Phase >= 2 && (
          <div
            style={{
              position: 'absolute',
              left: 960,
              top: 795,
              width: 780,
              display: 'flex',
              gap: 20,
            }}
          >
            <Card
              style={{
                flex: 1,
                padding: '22px',
                textAlign: 'center',
                fontSize: 23,
                fontWeight: 800,
              }}
            >
              150-WORD
              <br />
              OPENING PARAGRAPH
            </Card>

            <Card
              style={{
                flex: 1,
                padding: '22px',
                textAlign: 'center',
                fontSize: 23,
                fontWeight: 800,
              }}
            >
              COMPLETE AND
              <br />
              SEND THE FORM
            </Card>
          </div>
        )}

        {step1Phase >= 3 && (
          <div
            style={{
              position: 'absolute',
              left: 1020,
              top: 945,
              width: 660,
              height: 12,
              borderRadius: 10,
              backgroundColor: GRAPHITE,
              opacity: 0.22,
            }}
          >
            <div
              style={{
                width: step1Phase >= 4 ? '100%' : '72%',
                height: '100%',
                borderRadius: 10,
                backgroundColor: ORANGE,
              }}
            />
          </div>
        )}
      </div>

      {/* Step 2 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: step2Opacity,
        }}
      >
        <StepHeader
          number={2}
          title="CLOSE VISIBLE EXITS"
        />

        <div
          style={{
            position: 'absolute',
            left: 960,
            top: 260,
            width: 770,
            height: 530,
          }}
        >
          {['TASK', 'TAB', 'BADGE', 'MESSAGE'].map((item, index) => {
            const closed =
              step2Phase >= 1 &&
              index > 0;

            return (
              <Card
                key={item}
                accent={index === 0}
                muted={closed}
                style={{
                  position: 'absolute',
                  left: index === 0 ? 245 : 20 + (index - 1) * 245,
                  top: index === 0 ? 190 : 20,
                  width: index === 0 ? 280 : 210,
                  padding: '28px 20px',
                  textAlign: 'center',
                  fontSize: 29,
                  fontWeight: 800,
                  textDecoration: closed ? 'line-through' : undefined,
                  transform: closed ? 'scale(0.88)' : 'scale(1)',
                }}
              >
                {item}
              </Card>
            );
          })}

          <PhoneIcon
            left={step2Phase >= 3 ? 625 : 520}
            top={step2Phase >= 3 ? 340 : 210}
            opacity={step2Phase >= 2 ? 1 : 0}
          />

          {step2Phase >= 3 && (
            <div
              style={{
                position: 'absolute',
                left: 440,
                top: 470,
                width: 285,
                textAlign: 'center',
                color: ORANGE,
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              DELIBERATE MOVEMENT
            </div>
          )}
        </div>

        {step2Phase >= 2 && (
          <Card
            style={{
              position: 'absolute',
              left: 980,
              top: 820,
              width: 730,
              padding: '28px',
              textAlign: 'center',
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            NOT A SILENT MONASTERY
            <br />
            <span style={{color: ORANGE}}>
              JUST A LITTLE MORE FRICTION
            </span>
          </Card>
        )}

        {step2Phase >= 4 && (
          <div
            style={{
              position: 'absolute',
              left: 1140,
              top: 970,
              width: 410,
              textAlign: 'center',
              color: GREEN,
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            PAUSE → CHOICE
          </div>
        )}
      </div>

      {/* Step 3 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: step3Opacity,
        }}
      >
        <StepHeader
          number={3}
          title="PARK UNRELATED IMPULSES"
        />

        <Card
          style={{
            position: 'absolute',
            left: 1070,
            top: 240,
            width: 590,
            minHeight: 480,
            padding: '42px',
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              marginBottom: 35,
            }}
          >
            PARKING LIST
          </div>

          {[
            ['BUY TOOTHPASTE', 104.96],
            ['REPLY TO ALEX', 105.91],
            ['ICELAND VOLCANOES', 107.29],
          ].map(([text, start]) => (
            <div
              key={text}
              style={{
                marginBottom: 28,
                paddingBottom: 16,
                borderBottom: `2px solid ${GRAPHITE}55`,
                color: ORANGE,
                fontSize: 29,
                fontWeight: 800,
                opacity: fadeIn(frame, Number(start)),
              }}
            >
              • {text}
            </div>
          ))}

          {step3Phase >= 3 && (
            <div
              style={{
                marginTop: 30,
                fontSize: 23,
                fontWeight: 700,
                opacity: 0.65,
              }}
            >
              TWO OR THREE WORDS.
              <br />
              THEN CONTINUE.
            </div>
          )}
        </Card>

        {step3Phase >= 2 && (
          <Card
            accent
            style={{
              position: 'absolute',
              left: 930,
              top: 790,
              width: 860,
              padding: '28px',
              textAlign: 'center',
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            TEMPORARY STORAGE — NOT A SECOND PROJECT
          </Card>
        )}

        {step3Phase >= 4 && (
          <div
            style={{
              position: 'absolute',
              left: 960,
              top: 900,
              width: 800,
              display: 'flex',
              justifyContent: 'center',
              gap: 14,
              opacity: step3Phase === 4 ? 1 : 0.25,
            }}
          >
            {['COLOR', 'TAGS', 'PRIORITY', 'SYSTEM', 'DASHBOARD'].map(
              (item) => (
                <Card
                  key={item}
                  muted={step3Phase >= 5}
                  style={{
                    padding: '17px 20px',
                    fontSize: 18,
                    fontWeight: 800,
                    textDecoration:
                      step3Phase >= 5 ? 'line-through' : undefined,
                  }}
                >
                  {item}
                </Card>
              ),
            )}
          </div>
        )}
      </div>

      {/* Step 4 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: step4Opacity,
        }}
      >
        <StepHeader
          number={4}
          title="LEAVE A RETURN CUE"
        />

        <div
          style={{
            position: 'absolute',
            left: 965,
            top: 260,
            width: 780,
          }}
        >
          <Card
            muted={step4Phase >= 2}
            style={{
              padding: '32px',
              textAlign: 'center',
              fontSize: 37,
              fontWeight: 800,
              textDecoration:
                step4Phase >= 2 ? 'line-through' : undefined,
            }}
          >
            CONTINUE REPORT
          </Card>

          <div
            style={{
              margin: '28px 0',
              textAlign: 'center',
              color: ORANGE,
              fontSize: 40,
              fontWeight: 800,
              opacity: step4Phase >= 1 ? 1 : 0,
            }}
          >
            ↓
          </div>

          <Card
            accent
            style={{
              padding: '38px',
              textAlign: 'center',
              fontSize: 37,
              lineHeight: 1.25,
              fontWeight: 800,
              opacity: step4Phase >= 1 ? 1 : 0,
            }}
          >
            COMPARE THE FINAL TWO NUMBERS
            <br />
            IN TABLE THREE
          </Card>

          {step4Phase >= 2 && (
            <Card
              style={{
                marginTop: 28,
                padding: '27px',
                textAlign: 'center',
                fontSize: 29,
                lineHeight: 1.25,
                fontWeight: 800,
              }}
            >
              EXPLAIN WHY EXAMPLE TWO
              <br />
              CONTRADICTS EXAMPLE ONE
            </Card>
          )}
        </div>

        {step4Phase >= 3 && (
          <svg
            width="1920"
            height="1080"
            style={{
              position: 'absolute',
              inset: 0,
            }}
          >
            <path
              d="M760 590 C900 520 920 620 1010 570"
              fill="none"
              stroke={ORANGE}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="20 14"
            />
          </svg>
        )}

        {step4Phase >= 4 && (
          <Card
            style={{
              position: 'absolute',
              left: 1030,
              top: 850,
              width: 650,
              padding: '30px',
              textAlign: 'center',
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            YOU CANNOT PREVENT
            <span style={{color: ORANGE}}> EVERY INTERRUPTION</span>
          </Card>
        )}

        {step4Phase >= 5 && (
          <div
            style={{
              position: 'absolute',
              left: 1120,
              top: 970,
              width: 470,
              textAlign: 'center',
              color: GREEN,
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            RETURNING COSTS LESS
          </div>
        )}
      </div>

      {/* Step 5 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: step5Opacity,
        }}
      >
        <StepHeader
          number={5}
          title="STOP AT A NATURAL BREAKPOINT"
        />

        <Card
          style={{
            position: 'absolute',
            left: 980,
            top: 260,
            width: 760,
            padding: '46px',
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            FOCUS
            <span
              style={{
                color: ORANGE,
                margin: '0 18px',
                fontSize: 42,
              }}
            >
              ≠
            </span>
            REFUSING TO STOP
          </div>

          <div
            style={{
              marginTop: 50,
              height: 30,
              border: `3px solid ${GRAPHITE}`,
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${step5Progress}%`,
                backgroundColor:
                  time >= 194.379042 ? GREEN : ORANGE,
              }}
            />
          </div>

          <div
            style={{
              marginTop: 42,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 23,
              fontWeight: 800,
            }}
          >
            <span>SECTION</span>
            <span>PROBLEM</span>
            <span>OUTCOME</span>
          </div>

          {showStep5ReturnCue && (
            <Card
              accent
              style={{
                marginTop: 55,
                padding: '28px',
                textAlign: 'center',
                fontSize: 29,
                fontWeight: 800,
                opacity: fadeIn(frame, 194.835875),
              }}
            >
              LEAVE THE NEXT RETURN CUE
            </Card>
          )}
        </Card>

        {showStep5Handle && (
          <div
            style={{
              position: 'absolute',
              left: 1040,
              top: 830,
              width: 660,
              textAlign: 'center',
              color: ORANGE,
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 38,
              whiteSpace: 'nowrap',
              fontWeight: 800,
              opacity: fadeIn(frame, 198.076083),
            }}
          >
            THE TASK HAS A HANDLE
          </div>
        )}

        {showStep5Final && (
          <div
            style={{
              position: 'absolute',
              left: 1010,
              top: 925,
              width: 720,
              textAlign: 'center',
              color: GRAPHITE,
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 35,
              lineHeight: 1.2,
              fontWeight: 800,
              opacity: fadeIn(frame, 200.2),
            }}
          >
            YOU KNOW WHERE TO GRAB IT
            <br />
            <span style={{color: ORANGE}}>
              WHEN YOU RETURN
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
