import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const composition = timing.compositions.find((item) => item.id === "C15");
if (!composition) throw new Error("C15 timing missing");
const scenes = timing.scenes.filter((scene) => scene.composition === "C15");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S39") throw new Error(`C15 scene map mismatch: ${sceneIds}`);
if (composition.startFrame !== 13983 || composition.endFrame !== 14910 || composition.durationFrames !== 927) throw new Error("C15 timing boundary mismatch");

export const CompositionC15: React.FC = () => {
  const frame = useCurrentFrame();
  const appear = value(frame, [35, 150], [0, 1]);
  const schedule = value(frame, [130, 300], [0, 1]);
  const lock = value(frame, [285, 365], [0, 1]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 24% 56%, rgba(242,138,58,0.13), transparent 36%), radial-gradient(circle at 76% 55%, rgba(85,117,104,0.13), transparent 36%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />
      <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>THE SILENT DOOR TEST · LAYER FOUR</div>
      <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 66, lineHeight: 0.98, fontWeight: 900}}>DECIDE EXACTLY<br /><span style={{color: GREEN}}>WHEN TO CHECK NEXT.</span></div>

      <div style={{position: "absolute", left: 100, top: 405, width: 1720, height: 545, boxSizing: "border-box", borderRadius: 30, border: `4px solid ${ORANGE}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)"}}>
        <div style={{position: "absolute", left: 70, top: 60, width: 430, height: 370, opacity: appear, borderRadius: 28, border: `4px solid ${GRAPHITE}`, backgroundColor: "#fffaf1", padding: 38, boxSizing: "border-box"}}>
          <div style={{color: ORANGE, fontSize: 21, fontWeight: 900, letterSpacing: 4}}>CURRENT MOMENT</div>
          <div style={{marginTop: 58, fontSize: 78, lineHeight: 1, fontWeight: 900}}>10:05</div>
          <div style={{marginTop: 55, color: GRAPHITE, fontSize: 24, fontWeight: 900}}>FOCUS BLOCK ACTIVE</div>
          <div style={{marginTop: 35, height: 15, borderRadius: 8, backgroundColor: `${GRAPHITE}16`}}>
            <div style={{width: `${schedule * 72}%`, height: "100%", borderRadius: 8, backgroundColor: ORANGE}} />
          </div>
        </div>

        <div style={{position: "absolute", left: 545, top: 230, width: 390, height: 16, borderRadius: 8, backgroundColor: `${GRAPHITE}16`}}>
          <div style={{width: `${schedule * 100}%`, height: "100%", borderRadius: 8, backgroundColor: GREEN}} />
          <div style={{position: "absolute", right: -20, top: -19, width: 0, height: 0, borderTop: "28px solid transparent", borderBottom: "28px solid transparent", borderLeft: `48px solid ${GREEN}`}} />
          <div style={{position: "absolute", left: 95, top: 40, color: GREEN, fontSize: 19, fontWeight: 900, letterSpacing: 3}}>WORK UNTIL THE SET TIME</div>
        </div>

        <div style={{position: "absolute", right: 70, top: 45, width: 620, height: 440, opacity: appear, transform: `scale(${0.88 + schedule * 0.12})`, borderRadius: 32, border: `5px solid ${GREEN}`, backgroundColor: `${GREEN}0a`, padding: 42, boxSizing: "border-box"}}>
          <div style={{color: GREEN, fontSize: 22, fontWeight: 900, letterSpacing: 4}}>NEXT CHECK</div>
          <div style={{marginTop: 52, textAlign: "center", fontSize: 118, lineHeight: 1, fontWeight: 900}}>10:30</div>
          <div style={{marginTop: 42, textAlign: "center", color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 3}}>EXACT TIME · NOT LATER</div>
          <div style={{margin: "48px auto 0", width: 270, height: 70, opacity: lock, borderRadius: 18, backgroundColor: GREEN, color: CREAM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 23, fontWeight: 900, letterSpacing: 4}}>TIME SET</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
