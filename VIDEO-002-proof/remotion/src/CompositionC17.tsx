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

const composition = timing.compositions.find((item) => item.id === "C17");
if (!composition) throw new Error("C17 timing missing");

const scenes = timing.scenes.filter((scene) => scene.composition === "C17");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S42,S43") {
  throw new Error(`C17 scene map mismatch: ${sceneIds}`);
}
if (
  composition.startFrame !== 15654 ||
  composition.endFrame !== 16277 ||
  composition.durationFrames !== 623
) {
  throw new Error("C17 timing boundary mismatch");
}

const ReasonCard: React.FC<{
  label: string;
  detail: string;
  top: number;
  color: string;
}> = ({label, detail, top, color}) => (
  <div
    style={{
      position: "absolute",
      left: 55,
      right: 55,
      top,
      height: 105,
      borderRadius: 20,
      border: `3px solid ${color}`,
      backgroundColor: `${color}0b`,
      padding: "20px 28px",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        fontSize: 22,
        fontWeight: 900,
        letterSpacing: 2,
      }}
    >
      {label}
    </div>
    <div
      style={{
        marginTop: 8,
        color,
        fontSize: 18,
        fontWeight: 800,
      }}
    >
      {detail}
    </div>
  </div>
);

export const CompositionC17: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = value(frame, [20, 65], [0, 1]);
  const zeroMarksOpacity = value(frame, [360, 378], [1, 0]);
  const severalMarksOpacity = value(frame, [390, 408], [0, 1]);

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
          backgroundImage: `radial-gradient(circle at 25% 58%, rgba(85,117,104,0.13), transparent 36%), radial-gradient(circle at 76% 57%, rgba(242,138,58,0.13), transparent 36%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`,
          backgroundSize: "auto, auto, 48px 48px, 48px 48px",
        }}
      />

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
        INTERPRET THE RESULT
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
        THE MARKS ARE DATA.
        <br />
        <span style={{color: GREEN}}>NOT A DISCIPLINE SCORE.</span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 95,
          right: 95,
          top: 390,
          bottom: 90,
          opacity: reveal * zeroMarksOpacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 20,
            width: 545,
            height: 550,
            borderRadius: 32,
            border: `5px solid ${GREEN}`,
            backgroundColor: CREAM,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 25px 65px rgba(38,50,56,0.15)",
          }}
        >
          <div
            style={{
              color: GREEN,
              fontSize: 170,
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            0
          </div>
          <div
            style={{
              marginTop: 25,
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: 4,
            }}
          >
            MARKS
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 20,
            width: 1050,
            height: 550,
            borderRadius: 32,
            border: `4px solid ${ORANGE}`,
            backgroundColor: "#fffaf1",
            boxShadow: "0 25px 65px rgba(38,50,56,0.15)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 55,
              top: 40,
              color: RED,
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            NOT A UNIVERSAL CONCLUSION
          </div>

          <ReasonCard
            label="THIS BLOCK MAY HAVE BEEN EASIER"
            detail="ONE SESSION DOES NOT DEFINE THE HABIT"
            top={100}
            color={GREEN}
          />
          <ReasonCard
            label="THE SETUP MAY HAVE HELPED"
            detail="FRICTION CHANGED THE AVAILABLE PATH"
            top={225}
            color={ORANGE}
          />
          <ReasonCard
            label="AN IMPULSE MAY HAVE GONE UNNOTICED"
            detail="OBSERVATION IS STILL A SKILL"
            top={350}
            color={GRAPHITE}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 95,
          right: 95,
          top: 390,
          bottom: 90,
          opacity: severalMarksOpacity,
          borderRadius: 32,
          border: `4px solid ${ORANGE}`,
          backgroundColor: CREAM,
          boxShadow: "0 25px 65px rgba(38,50,56,0.15)",
          padding: 48,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            color: ORANGE,
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 4,
          }}
        >
          SEVERAL MARKS
        </div>

        <div
          style={{
            position: "absolute",
            left: 55,
            top: 135,
            width: 360,
            height: 310,
            borderRadius: 26,
            border: `4px solid ${ORANGE}`,
            backgroundColor: `${ORANGE}0b`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
          }}
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              style={{
                width: 11,
                height: 125,
                borderRadius: 6,
                backgroundColor: ORANGE,
                transform: `rotate(${index === 4 ? -35 : 0}deg)`,
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            left: 485,
            top: 270,
            width: 390,
            height: 15,
            borderRadius: 8,
            backgroundColor: GREEN,
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -28,
              top: -22,
              width: 0,
              height: 0,
              borderTop: "30px solid transparent",
              borderBottom: "30px solid transparent",
              borderLeft: `55px solid ${GREEN}`,
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            right: 55,
            top: 125,
            width: 650,
            height: 340,
            borderRadius: 28,
            border: `5px solid ${GREEN}`,
            backgroundColor: `${GREEN}0b`,
            padding: 45,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              color: GREEN,
              fontSize: 23,
              fontWeight: 900,
              letterSpacing: 4,
            }}
          >
            CHECKING PATH VISIBLE
          </div>
          <div
            style={{
              marginTop: 45,
              fontSize: 45,
              lineHeight: 1.04,
              fontWeight: 900,
            }}
          >
            NOW YOU CAN SEE
            <br />
            WHERE THE EXIT APPEARED.
          </div>
          <div
            style={{
              marginTop: 42,
              color: ORANGE,
              fontSize: 21,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            OBSERVE BEFORE YOU CHANGE IT
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
