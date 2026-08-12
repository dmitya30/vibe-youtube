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

const composition = timing.compositions.find((item) => item.id === "C16");
if (!composition) throw new Error("C16 timing missing");

const scenes = timing.scenes.filter((scene) => scene.composition === "C16");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S40,S41") {
  throw new Error(`C16 scene map mismatch: ${sceneIds}`);
}
if (
  composition.startFrame !== 14910 ||
  composition.endFrame !== 15654 ||
  composition.durationFrames !== 744
) {
  throw new Error("C16 timing boundary mismatch");
}

const tallies = [0, 1, 2, 3, 4, 5];

export const CompositionC16: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = value(frame, [20, 70], [0, 1]);
  const oldMapOpacity = value(frame, [600, 620], [1, 0]);
  const newMapOpacity = value(frame, [630, 650], [0, 1]);

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
          backgroundImage: `radial-gradient(circle at 25% 58%, rgba(242,138,58,0.13), transparent 36%), radial-gradient(circle at 77% 57%, rgba(85,117,104,0.13), transparent 36%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`,
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
        THE SILENT DOOR TEST · OBSERVE
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
        NOTICE THE IMPULSE.
        <br />
        <span style={{color: GREEN}}>MAKE ONE MARK.</span>
      </div>

      <div
        style={{
          position: "absolute",
          inset: "375px 95px 90px",
          opacity: reveal * oldMapOpacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 30,
            width: 690,
            height: 555,
            borderRadius: 30,
            border: `4px solid ${ORANGE}`,
            backgroundColor: "#fffaf1",
            padding: 42,
            boxSizing: "border-box",
            boxShadow: "0 25px 65px rgba(38,50,56,0.15)",
          }}
        >
          <div
            style={{
              color: ORANGE,
              fontSize: 21,
              fontWeight: 900,
              letterSpacing: 4,
            }}
          >
            CURRENT TASK
          </div>

          <div
            style={{
              marginTop: 38,
              fontSize: 42,
              fontWeight: 900,
              lineHeight: 1.05,
            }}
          >
            ONE DOCUMENT
          </div>

          <div
            style={{
              marginTop: 35,
              height: 290,
              borderRadius: 22,
              border: `3px solid ${GRAPHITE}`,
              backgroundColor: CREAM,
              padding: 30,
              boxSizing: "border-box",
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                style={{
                  marginTop: index === 0 ? 5 : 26,
                  width: index === 5 ? 330 : 520,
                  height: 11,
                  borderRadius: 6,
                  backgroundColor: `${GRAPHITE}35`,
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 755,
            top: 205,
            width: 210,
            textAlign: "center",
          }}
        >
          <div
            style={{
              margin: "0 auto",
              width: 110,
              height: 110,
              borderRadius: 55,
              border: `5px solid ${ORANGE}`,
              color: ORANGE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 900,
            }}
          >
            !
          </div>
          <div
            style={{
              marginTop: 25,
              color: ORANGE,
              fontSize: 19,
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: 3,
            }}
          >
            IMPULSE
            <br />
            NOTICED
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 30,
            width: 690,
            height: 555,
            borderRadius: 30,
            border: `4px solid ${GREEN}`,
            backgroundColor: CREAM,
            padding: 42,
            boxSizing: "border-box",
            boxShadow: "0 25px 65px rgba(38,50,56,0.15)",
          }}
        >
          <div
            style={{
              color: GREEN,
              fontSize: 21,
              fontWeight: 900,
              letterSpacing: 4,
            }}
          >
            TALLY SHEET
          </div>

          <div
            style={{
              marginTop: 45,
              fontSize: 31,
              lineHeight: 1.2,
              fontWeight: 900,
            }}
          >
            ONE MARK FOR EACH
            <br />
            CHECKING IMPULSE
          </div>

          <div
            style={{
              marginTop: 65,
              height: 190,
              borderRadius: 24,
              border: `3px solid ${GREEN}`,
              backgroundColor: `${GREEN}0b`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 23,
            }}
          >
            {tallies.map((index) => {
              const mark = value(frame, [90 + index * 75, 115 + index * 75], [0, 1]);
              return (
                <div
                  key={index}
                  style={{
                    width: 11,
                    height: 105,
                    borderRadius: 6,
                    backgroundColor: index === 5 ? RED : GREEN,
                    opacity: mark,
                    transform: `rotate(${index === 5 ? -35 : 0}deg) scaleY(${mark})`,
                  }}
                />
              );
            })}
          </div>

          <div
            style={{
              marginTop: 33,
              color: GRAPHITE,
              fontSize: 20,
              lineHeight: 1.2,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            MARK IT. RETURN TO THE TASK.
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 95,
          right: 95,
          top: 390,
          bottom: 90,
          opacity: newMapOpacity,
          borderRadius: 32,
          border: `4px solid ${GREEN}`,
          backgroundColor: CREAM,
          boxShadow: "0 25px 65px rgba(38,50,56,0.15)",
          padding: "42px 55px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            color: GREEN,
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 4,
          }}
        >
          VISIBLE EXIT MAP
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 46,
            fontWeight: 900,
          }}
        >
          THE MARKS SHOW WHERE THE EXITS APPEARED.
        </div>

        {[
          ["UNCLEAR NEXT STEP", 3],
          ["WAITING MOMENT", 1],
          ["DISCOMFORT", 2],
        ].map(([label, count], index) => (
          <div
            key={String(label)}
            style={{
              position: "absolute",
              left: 55,
              right: 55,
              top: 180 + index * 125,
              height: 92,
              borderRadius: 20,
              border: `3px solid ${index === 0 ? ORANGE : GREEN}`,
              backgroundColor: `${index === 0 ? ORANGE : GREEN}0b`,
              display: "flex",
              alignItems: "center",
              padding: "0 32px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 570,
                fontSize: 25,
                fontWeight: 900,
                letterSpacing: 2,
              }}
            >
              {label}
            </div>

            <div
              style={{
                display: "flex",
                gap: 16,
              }}
            >
              {Array.from({length: Number(count)}).map((_, markIndex) => (
                <div
                  key={markIndex}
                  style={{
                    width: 9,
                    height: 48,
                    borderRadius: 5,
                    backgroundColor: index === 0 ? ORANGE : GREEN,
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            right: 75,
            bottom: 55,
            color: ORANGE,
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 3,
          }}
        >
          DATA, NOT A SCORE
        </div>
      </div>
    </AbsoluteFill>
  );
};
