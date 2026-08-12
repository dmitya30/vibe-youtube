import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";

const value = (frame: number, input: number[], output: number[]) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const sceneOpacity = (
  frame: number,
  startFrame: number,
  endFrame: number,
): number => {
  const fadeIn = value(frame, [startFrame, startFrame + 12], [0, 1]);
  const fadeOut = value(frame, [endFrame - 12, endFrame], [1, 0]);
  return Math.min(fadeIn, fadeOut);
};

const composition = timing.compositions.find((item) => item.id === "C19");
if (!composition) throw new Error("C19 timing missing");

const scenes = timing.scenes.filter((scene) => scene.composition === "C19");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S48,S49,S50") {
  throw new Error(`C19 scene map mismatch: ${sceneIds}`);
}
if (
  composition.startFrame !== 17300 ||
  composition.endFrame !== 18018 ||
  composition.durationFrames !== 718
) {
  throw new Error("C19 timing boundary mismatch");
}
if (
  scenes[0].startFrame !== 17300 ||
  scenes[0].endFrame !== 17559 ||
  scenes[1].startFrame !== 17559 ||
  scenes[1].endFrame !== 17920 ||
  scenes[2].startFrame !== 17920 ||
  scenes[2].endFrame !== 18018
) {
  throw new Error("C19 internal scene boundary mismatch");
}

const Header: React.FC<{children: React.ReactNode}> = ({children}) => (
  <>
    <div
      style={{
        position: "absolute",
        left: 85,
        top: 54,
        color: ORANGE,
        fontSize: 24,
        fontWeight: 900,
        letterSpacing: 4,
      }}
    >
      THE TWO DOORS
    </div>
    <div
      style={{
        position: "absolute",
        left: 95,
        top: 145,
        width: 1700,
        fontSize: 66,
        lineHeight: 0.98,
        fontWeight: 900,
      }}
    >
      {children}
    </div>
  </>
);

const ClosedDoor: React.FC<{color: string; label: string}> = ({
  color,
  label,
}) => (
  <div
    style={{
      position: "relative",
      width: 410,
      height: 440,
      borderRadius: 28,
      border: `5px solid ${color}`,
      backgroundColor: `${color}0b`,
      boxShadow: "0 25px 60px rgba(38,50,56,0.14)",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 65,
        top: 45,
        width: 210,
        height: 300,
        borderRadius: 15,
        border: `7px solid ${GRAPHITE}`,
        backgroundColor: CREAM,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -11,
          top: 58,
          width: 15,
          height: 48,
          borderRadius: 7,
          backgroundColor: GRAPHITE,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -11,
          bottom: 58,
          width: 15,
          height: 48,
          borderRadius: 7,
          backgroundColor: GRAPHITE,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 24,
          top: 140,
          width: 25,
          height: 25,
          borderRadius: 13,
          backgroundColor: color,
        }}
      />
    </div>

    <div
      style={{
        position: "absolute",
        right: 20,
        top: 105,
        width: 100,
        color,
        fontSize: 22,
        lineHeight: 1.1,
        fontWeight: 900,
        letterSpacing: 2,
      }}
    >
      {label}
    </div>

    <div
      style={{
        position: "absolute",
        left: 55,
        bottom: 28,
        color,
        fontSize: 21,
        fontWeight: 900,
        letterSpacing: 3,
      }}
    >
      CLOSED
    </div>
  </div>
);

const Phone: React.FC = () => (
  <div
    style={{
      position: "relative",
      width: 215,
      height: 370,
      borderRadius: 39,
      border: `8px solid ${GRAPHITE}`,
      backgroundColor: GRAPHITE,
      padding: 13,
      boxSizing: "border-box",
      boxShadow: "0 25px 60px rgba(38,50,56,0.18)",
    }}
  >
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 23,
        backgroundColor: CREAM,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 55,
          top: 12,
          width: 72,
          height: 11,
          borderRadius: 6,
          backgroundColor: GRAPHITE,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 25,
          right: 25,
          top: 90,
          textAlign: "center",
          color: GREEN,
          fontSize: 21,
          fontWeight: 900,
          letterSpacing: 2,
        }}
      >
        AVAILABLE
      </div>
      <div
        style={{
          position: "absolute",
          left: 25,
          right: 25,
          top: 155,
          textAlign: "center",
          color: ORANGE,
          fontSize: 17,
          lineHeight: 1.2,
          fontWeight: 900,
        }}
      >
        REQUIRES
        <br />
        A DECISION
      </div>
    </div>
  </div>
);

export const CompositionC19: React.FC = () => {
  const frame = useCurrentFrame();

  const s48 = sceneOpacity(frame, 0, 259);
  const s49 = sceneOpacity(frame, 259, 620);
  const s50 = sceneOpacity(frame, 620, 718);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: CREAM,
        color: GRAPHITE,
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle at 25% 58%, rgba(242,138,58,0.13), transparent 36%), radial-gradient(circle at 76% 57%, rgba(85,117,104,0.13), transparent 36%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`,
          backgroundSize: "auto, auto, 48px 48px, 48px 48px",
        }}
      />

      <AbsoluteFill style={{opacity: s48}}>
        <Header>
          THE FIRST DOOR
          <br />
          <span style={{color: ORANGE}}>OPENS FROM OUTSIDE.</span>
        </Header>

        <div
          style={{
            position: "absolute",
            left: 140,
            top: 430,
          }}
        >
          <ClosedDoor color={ORANGE} label="DOOR 1" />
        </div>

        <div
          style={{
            position: "absolute",
            left: 680,
            top: 625,
            width: 280,
            height: 14,
            borderRadius: 7,
            backgroundColor: GREEN,
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -26,
              top: -21,
              width: 0,
              height: 0,
              borderTop: "28px solid transparent",
              borderBottom: "28px solid transparent",
              borderLeft: `52px solid ${GREEN}`,
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            right: 140,
            top: 430,
            width: 700,
            height: 440,
            borderRadius: 30,
            border: `5px solid ${GREEN}`,
            backgroundColor: `${GREEN}0b`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 25px 60px rgba(38,50,56,0.14)",
          }}
        >
          <div
            style={{
              color: GREEN,
              fontSize: 70,
              fontWeight: 900,
              letterSpacing: 4,
            }}
          >
            NO PROMPT
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 27,
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            THE PROMPTED DOOR STAYS CLOSED
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: s49}}>
        <Header>
          THE SECOND DOOR
          <br />
          <span style={{color: GREEN}}>IS THE ONE YOU OPEN YOURSELF.</span>
        </Header>

        <div
          style={{
            position: "absolute",
            left: 180,
            top: 430,
          }}
        >
          <ClosedDoor color={GREEN} label="DOOR 2" />
        </div>

        <div
          style={{
            position: "absolute",
            right: 135,
            top: 440,
            width: 900,
            height: 420,
            borderRadius: 30,
            border: `5px solid ${ORANGE}`,
            backgroundColor: CREAM,
            boxShadow: "0 25px 60px rgba(38,50,56,0.14)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 55,
              top: 55,
              color: ORANGE,
              fontSize: 25,
              fontWeight: 900,
              letterSpacing: 4,
            }}
          >
            NOTICE
          </div>

          <div
            style={{
              position: "absolute",
              left: 55,
              top: 120,
              width: 365,
              height: 200,
              borderRadius: 26,
              border: `4px solid ${ORANGE}`,
              backgroundColor: `${ORANGE}0b`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                color: ORANGE,
                fontSize: 42,
                fontWeight: 900,
                letterSpacing: 3,
              }}
            >
              YOUR HAND
            </div>
            <div
              style={{
                marginTop: 25,
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 2,
              }}
            >
              ON THE HANDLE
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: 465,
              top: 210,
              width: 180,
              height: 14,
              borderRadius: 7,
              backgroundColor: ORANGE,
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -26,
                top: -21,
                width: 0,
                height: 0,
                borderTop: "28px solid transparent",
                borderBottom: "28px solid transparent",
                borderLeft: `52px solid ${ORANGE}`,
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              right: 55,
              top: 120,
              width: 170,
              height: 200,
              borderRadius: 24,
              border: `5px solid ${GREEN}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: GREEN,
              fontSize: 31,
              fontWeight: 900,
              letterSpacing: 2,
              textAlign: "center",
            }}
          >
            DOOR
            <br />
            HANDLE
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: s50}}>
        <Header>
          PUT ONE DELIBERATE STEP
          <br />
          <span style={{color: ORANGE}}>BEFORE THE PHONE.</span>
        </Header>

        <div
          style={{
            position: "absolute",
            left: 160,
            top: 535,
            width: 430,
            height: 230,
            borderRadius: 28,
            border: `5px solid ${GREEN}`,
            backgroundColor: `${GREEN}0b`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: GREEN,
            fontSize: 39,
            fontWeight: 900,
            letterSpacing: 3,
          }}
        >
          CURRENT TASK
        </div>

        <div
          style={{
            position: "absolute",
            left: 680,
            top: 565,
            width: 400,
            height: 170,
            borderRadius: 85,
            border: `6px solid ${ORANGE}`,
            backgroundColor: CREAM,
            color: ORANGE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 45,
            fontWeight: 900,
            letterSpacing: 5,
            boxShadow: "0 20px 50px rgba(38,50,56,0.14)",
          }}
        >
          DECIDE
        </div>

        <div
          style={{
            position: "absolute",
            right: 190,
            top: 470,
          }}
        >
          <Phone />
        </div>

        <div
          style={{
            position: "absolute",
            left: 600,
            top: 643,
            width: 70,
            height: 14,
            backgroundColor: GREEN,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 1090,
            top: 643,
            width: 260,
            height: 14,
            backgroundColor: GREEN,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
