import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";
const RED = "#c85b4a";

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
  const fadeIn = value(frame, [startFrame, startFrame + 10], [0, 1]);
  const fadeOut = value(frame, [endFrame - 10, endFrame], [1, 0]);
  return Math.min(fadeIn, fadeOut);
};

const composition = timing.compositions.find((item) => item.id === "C20");
if (!composition) throw new Error("C20 timing missing");

const scenes = timing.scenes.filter((scene) => scene.composition === "C20");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S51,S52,S53") {
  throw new Error(`C20 scene map mismatch: ${sceneIds}`);
}
if (
  composition.startFrame !== 18018 ||
  composition.endFrame !== 18513 ||
  composition.durationFrames !== 495
) {
  throw new Error("C20 timing boundary mismatch");
}
if (
  scenes[0].startFrame !== 18018 ||
  scenes[0].endFrame !== 18120 ||
  scenes[1].startFrame !== 18120 ||
  scenes[1].endFrame !== 18292 ||
  scenes[2].startFrame !== 18292 ||
  scenes[2].endFrame !== 18513
) {
  throw new Error("C20 internal scene boundary mismatch");
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
      THE SILENT DOOR TEST · FINAL STEP
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

const Phone: React.FC = () => (
  <div
    style={{
      position: "relative",
      width: 210,
      height: 365,
      borderRadius: 38,
      border: `8px solid ${GRAPHITE}`,
      backgroundColor: GRAPHITE,
      padding: 13,
      boxSizing: "border-box",
      boxShadow: "0 25px 60px rgba(38,50,56,0.17)",
    }}
  >
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 22,
        backgroundColor: CREAM,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 52,
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
          top: 115,
          textAlign: "center",
          color: GREEN,
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: 2,
        }}
      >
        SILENT
      </div>
      <div
        style={{
          position: "absolute",
          left: 30,
          right: 30,
          top: 185,
          height: 4,
          backgroundColor: `${GRAPHITE}25`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 30,
          right: 30,
          top: 220,
          height: 4,
          backgroundColor: `${GRAPHITE}25`,
        }}
      />
    </div>
  </div>
);

export const CompositionC20: React.FC = () => {
  const frame = useCurrentFrame();

  const s51 = sceneOpacity(frame, 0, 102);
  const s52 = sceneOpacity(frame, 102, 274);
  const s53 = sceneOpacity(frame, 274, 495);
  const doorFade = value(frame, [145, 240], [1, 0]);

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

      <AbsoluteFill style={{opacity: s51}}>
        <Header>
          NOTICE THE REACH.
          <br />
          <span style={{color: GREEN}}>THEN RETURN TO THE TASK.</span>
        </Header>

        <div
          style={{
            position: "absolute",
            left: 125,
            top: 465,
            width: 520,
            height: 350,
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
              fontSize: 45,
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            DOCUMENT
          </div>
          <div
            style={{
              marginTop: 40,
              width: 330,
              height: 10,
              backgroundColor: `${GRAPHITE}35`,
            }}
          />
          <div
            style={{
              marginTop: 28,
              width: 330,
              height: 10,
              backgroundColor: `${GRAPHITE}35`,
            }}
          />
          <div
            style={{
              marginTop: 28,
              width: 250,
              height: 10,
              backgroundColor: `${GRAPHITE}35`,
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: 750,
            top: 555,
            width: 330,
            height: 170,
            borderRadius: 28,
            border: `5px solid ${RED}`,
            backgroundColor: `${RED}0b`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: RED,
              fontSize: 43,
              fontWeight: 900,
              letterSpacing: 4,
            }}
          >
            REACH
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            STOP · NOTICE
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 150,
            top: 455,
          }}
        >
          <Phone />
        </div>

        <div
          style={{
            position: "absolute",
            left: 660,
            top: 630,
            width: 75,
            height: 14,
            backgroundColor: GREEN,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 1095,
            top: 630,
            width: 275,
            height: 14,
            backgroundColor: RED,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: s52}}>
        <Header>
          SOMETIMES THE NOTIFICATION
          <br />
          <span style={{color: ORANGE}}>NEVER ARRIVED.</span>
        </Header>

        <div
          style={{
            position: "absolute",
            left: 270,
            top: 445,
          }}
        >
          <Phone />
        </div>

        <div
          style={{
            position: "absolute",
            left: 610,
            top: 500,
            width: 650,
            height: 260,
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
              fontSize: 62,
              fontWeight: 900,
              letterSpacing: 5,
            }}
          >
            NO SIGNAL
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 25,
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            THE PHONE REMAINED SILENT
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 180,
            top: 455,
            width: 330,
            height: 350,
            opacity: doorFade,
            borderRadius: 28,
            border: `5px solid ${ORANGE}`,
            backgroundColor: `${ORANGE}0b`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 55,
              top: 38,
              width: 165,
              height: 240,
              borderRadius: 15,
              border: `6px solid ${GRAPHITE}`,
              backgroundColor: CREAM,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -10,
                top: 45,
                width: 14,
                height: 42,
                borderRadius: 7,
                backgroundColor: GRAPHITE,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: -10,
                bottom: 45,
                width: 14,
                height: 42,
                borderRadius: 7,
                backgroundColor: GRAPHITE,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 20,
                top: 110,
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: ORANGE,
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              right: 18,
              top: 110,
              width: 90,
              color: ORANGE,
              fontSize: 20,
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            FINAL
            <br />
            DOOR
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: s53}}>
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
          TRY IT ONCE
        </div>

        <div
          style={{
            position: "absolute",
            left: 150,
            right: 150,
            top: 185,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 88,
              lineHeight: 0.95,
              fontWeight: 900,
            }}
          >
            NOTICE THE REACH.
            <br />
            <span style={{color: GREEN}}>THEN CHOOSE.</span>
          </div>

          <div
            style={{
              margin: "65px auto 0",
              width: 1000,
              height: 6,
              borderRadius: 3,
              backgroundColor: ORANGE,
            }}
          />

          <div
            style={{
              marginTop: 55,
              color: GRAPHITE,
              fontSize: 39,
              lineHeight: 1.18,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            TRY THE SILENT DOOR TEST ONCE.
            <br />
            <span style={{color: ORANGE}}>
              COUNT THE REACHES YOU NOTICE
            </span>
            <br />
            BEFORE YOU COUNT THE MINUTES YOU SAVE.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
