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

const composition = timing.compositions.find((item) => item.id === "C18");
if (!composition) throw new Error("C18 timing missing");

const scenes = timing.scenes.filter((scene) => scene.composition === "C18");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S44,S45,S46,S47") {
  throw new Error(`C18 scene map mismatch: ${sceneIds}`);
}
if (
  composition.startFrame !== 16277 ||
  composition.endFrame !== 17300 ||
  composition.durationFrames !== 1023
) {
  throw new Error("C18 timing boundary mismatch");
}

const visible = (
  frame: number,
  startFrame: number,
  endFrame: number,
): number => {
  const fadeIn = value(frame, [startFrame, startFrame + 16], [0, 1]);
  const fadeOut = value(frame, [endFrame - 16, endFrame], [1, 0]);
  return Math.min(fadeIn, fadeOut);
};

const Header: React.FC<{accent: string; children: React.ReactNode}> = ({
  accent,
  children,
}) => (
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
      {children}
      <div
        style={{
          marginTop: 25,
          width: 230,
          height: 10,
          borderRadius: 5,
          backgroundColor: accent,
        }}
      />
    </div>
  </>
);

export const CompositionC18: React.FC = () => {
  const frame = useCurrentFrame();

  const s44 = visible(frame, 0, 268);
  const s45 = visible(frame, 268, 389);
  const s46 = visible(frame, 389, 813);
  const s47 = visible(frame, 813, 1023);

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

      <AbsoluteFill style={{opacity: s44}}>
        <Header accent={GREEN}>
          OPENED AN APP ANYWAY?
        </Header>

        <div
          style={{
            position: "absolute",
            left: 110,
            top: 420,
            width: 570,
            height: 480,
            borderRadius: 32,
            border: `4px solid ${ORANGE}`,
            backgroundColor: "#fffaf1",
            boxShadow: "0 25px 65px rgba(38,50,56,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 32,
              backgroundColor: ORANGE,
              color: CREAM,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 62,
              fontWeight: 900,
            }}
          >
            APP
          </div>
          <div
            style={{
              marginTop: 42,
              color: RED,
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: 4,
            }}
          >
            OPENED
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 760,
            top: 625,
            width: 300,
            height: 15,
            borderRadius: 8,
            backgroundColor: GREEN,
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -27,
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
            right: 110,
            top: 420,
            width: 690,
            height: 480,
            borderRadius: 32,
            border: `5px solid ${GREEN}`,
            backgroundColor: `${GREEN}0b`,
            boxShadow: "0 25px 65px rgba(38,50,56,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: GREEN,
              fontSize: 79,
              fontWeight: 900,
              letterSpacing: 4,
            }}
          >
            DATA
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            NOT A FAILURE STAMP
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: s45}}>
        <Header accent={ORANGE}>
          WHAT HAPPENED JUST BEFORE?
        </Header>

        <div
          style={{
            position: "absolute",
            left: 110,
            right: 110,
            top: 470,
            height: 340,
          }}
        >
          {[
            ["1", "TASK MOMENT", "WORK BECAME HARDER"],
            ["2", "REACH", "HAND MOVED TOWARD PHONE"],
            ["3", "CHECK", "APP OPENED"],
          ].map(([number, label, detail], index) => (
            <div
              key={label}
              style={{
                position: "absolute",
                left: index * 590,
                top: 0,
                width: 470,
                height: 310,
                borderRadius: 28,
                border: `4px solid ${index === 2 ? GREEN : ORANGE}`,
                backgroundColor: CREAM,
                padding: 38,
                boxSizing: "border-box",
                boxShadow: "0 20px 50px rgba(38,50,56,0.13)",
              }}
            >
              <div
                style={{
                  color: index === 2 ? GREEN : ORANGE,
                  fontSize: 52,
                  fontWeight: 900,
                }}
              >
                {number}
              </div>
              <div
                style={{
                  marginTop: 28,
                  fontSize: 30,
                  fontWeight: 900,
                  letterSpacing: 3,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  marginTop: 32,
                  color: GRAPHITE,
                  fontSize: 20,
                  lineHeight: 1.2,
                  fontWeight: 800,
                }}
              >
                {detail}
              </div>
            </div>
          ))}

          <div
            style={{
              position: "absolute",
              left: 485,
              top: 145,
              width: 90,
              height: 12,
              backgroundColor: GREEN,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 1075,
              top: 145,
              width: 90,
              height: 12,
              backgroundColor: GREEN,
            }}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: s46}}>
        <Header accent={GREEN}>
          SORT THE MOMENT NEUTRALLY.
        </Header>

        <div
          style={{
            position: "absolute",
            left: 100,
            right: 100,
            top: 430,
            height: 480,
            display: "flex",
            gap: 55,
          }}
        >
          {[
            ["UNCLEAR", "THE NEXT ACTION WAS NOT VISIBLE", ORANGE],
            ["WAITING", "A PAUSE CREATED AN EASY EXIT", GREEN],
            ["UNCOMFORTABLE", "THE TASK FELT HARD TO CONTINUE", RED],
          ].map(([label, detail, color], index) => (
            <div
              key={String(label)}
              style={{
                position: "relative",
                flex: 1,
                borderRadius: 32,
                border: `5px solid ${color}`,
                backgroundColor: `${color}0b`,
                padding: 45,
                boxSizing: "border-box",
                boxShadow: "0 25px 65px rgba(38,50,56,0.15)",
              }}
            >
              <div
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 39,
                  backgroundColor: String(color),
                  color: CREAM,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 34,
                  fontWeight: 900,
                }}
              >
                {index + 1}
              </div>
              <div
                style={{
                  marginTop: 50,
                  color: String(color),
                  fontSize: 33,
                  fontWeight: 900,
                  letterSpacing: 3,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  marginTop: 45,
                  fontSize: 25,
                  lineHeight: 1.25,
                  fontWeight: 900,
                }}
              >
                {detail}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: s47}}>
        <Header accent={ORANGE}>
          WHAT MADE LEAVING EASIER?
        </Header>

        <div
          style={{
            position: "absolute",
            left: 100,
            right: 100,
            top: 430,
            height: 500,
            borderRadius: 32,
            border: `4px solid ${GRAPHITE}`,
            backgroundColor: CREAM,
            boxShadow: "0 25px 65px rgba(38,50,56,0.15)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 720,
              top: 60,
              width: 280,
              height: 100,
              borderRadius: 24,
              border: `4px solid ${ORANGE}`,
              color: ORANGE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            TASK MOMENT
          </div>

          <div
            style={{
              position: "absolute",
              left: 855,
              top: 165,
              width: 12,
              height: 90,
              backgroundColor: GRAPHITE,
            }}
          />

          <div
            style={{
              position: "absolute",
              left: 300,
              top: 250,
              width: 470,
              height: 170,
              borderRadius: 28,
              border: `5px solid ${GREEN}`,
              backgroundColor: `${GREEN}0b`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: GREEN,
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            CONTINUE TASK
          </div>

          <div
            style={{
              position: "absolute",
              right: 300,
              top: 250,
              width: 470,
              height: 170,
              borderRadius: 28,
              border: `5px solid ${RED}`,
              backgroundColor: `${RED}0b`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: RED,
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            CHECK PHONE
          </div>

          <div
            style={{
              position: "absolute",
              left: 545,
              top: 220,
              width: 320,
              height: 12,
              backgroundColor: GREEN,
              transform: "rotate(18deg)",
              transformOrigin: "right center",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 545,
              top: 220,
              width: 320,
              height: 12,
              backgroundColor: RED,
              transform: "rotate(-18deg)",
              transformOrigin: "left center",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
