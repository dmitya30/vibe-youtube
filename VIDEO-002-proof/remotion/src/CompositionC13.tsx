import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";
const RED = "#c85b4a";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const composition = timing.compositions.find((item) => item.id === "C13");
if (!composition) throw new Error("C13 timing missing");
const scenes = timing.scenes.filter((scene) => scene.composition === "C13");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S37") throw new Error(`C13 scene map mismatch: ${sceneIds}`);
if (composition.startFrame !== 12414 || composition.endFrame !== 13106 || composition.durationFrames !== 692) throw new Error("C13 timing boundary mismatch");

const Phone: React.FC = () => (
  <div style={{position: "relative", width: 180, height: 315, borderRadius: 34, border: `7px solid ${GRAPHITE}`, backgroundColor: GRAPHITE, padding: 12, boxSizing: "border-box", boxShadow: "0 24px 55px rgba(38,50,56,0.22)"}}>
    <div style={{position: "relative", width: "100%", height: "100%", borderRadius: 20, backgroundColor: CREAM}}>
      <div style={{position: "absolute", left: 46, top: 10, width: 62, height: 10, borderRadius: 5, backgroundColor: GRAPHITE}} />
      <div style={{position: "absolute", left: 28, right: 28, top: 75, height: 70, borderRadius: 18, backgroundColor: `${ORANGE}22`, border: `3px solid ${ORANGE}`}} />
      <div style={{position: "absolute", left: 28, right: 28, bottom: 65, color: GREEN, textAlign: "center", fontSize: 18, lineHeight: 1.2, fontWeight: 900, letterSpacing: 2}}>AVAILABLE<br />IF CHOSEN</div>
    </div>
  </div>
);

export const CompositionC13: React.FC = () => {
  const frame = useCurrentFrame();
  const move = value(frame, [45, 260], [0, 1]);
  const path = value(frame, [80, 235], [0, 1]);
  const parked = value(frame, [225, 300], [0, 1]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 25% 58%, rgba(242,138,58,0.13), transparent 36%), radial-gradient(circle at 78% 55%, rgba(85,117,104,0.13), transparent 36%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />
      <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>THE SILENT DOOR TEST · LAYER TWO</div>
      <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 67, lineHeight: 0.98, fontWeight: 900}}>MOVE THE PHONE OUTSIDE<br /><span style={{color: GREEN}}>AUTOMATIC REACH.</span></div>

      <div style={{position: "absolute", left: 95, top: 405, width: 1730, height: 535, boxSizing: "border-box", borderRadius: 30, border: `4px solid ${ORANGE}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)", overflow: "hidden"}}>
        <div style={{position: "absolute", left: 65, top: 45, color: RED, fontSize: 20, fontWeight: 900, letterSpacing: 4}}>AUTOMATIC REACH ZONE</div>
        <div style={{position: "absolute", left: 45, top: 90, width: 690, height: 385, borderRadius: 34, border: `4px dashed ${RED}`, backgroundColor: `${RED}08`}}>
          <div style={{position: "absolute", left: 48, top: 45, width: 360, height: 270, borderRadius: 24, border: `4px solid ${GRAPHITE}`, backgroundColor: "#fffaf1", padding: 30, boxSizing: "border-box"}}>
            <div style={{color: ORANGE, fontSize: 18, fontWeight: 900, letterSpacing: 3}}>CURRENT TASK</div>
            {[0, 1, 2, 3, 4].map((index) => <div key={index} style={{marginTop: index === 0 ? 40 : 24, width: index === 4 ? 210 : 280, height: 11, borderRadius: 6, backgroundColor: `${GRAPHITE}35`}} />)}
          </div>
          <div style={{position: "absolute", left: 465, top: 55, color: RED, fontSize: 64, fontWeight: 900}}>×</div>
          <div style={{position: "absolute", left: 435, top: 145, width: 185, color: RED, textAlign: "center", fontSize: 20, lineHeight: 1.25, fontWeight: 900}}>PHONE STARTS<br />TOO CLOSE</div>
        </div>

        <div style={{position: "absolute", left: 680, top: 265, width: 535, height: 15, borderRadius: 8, backgroundColor: `${GRAPHITE}15`}}>
          <div style={{width: `${path * 100}%`, height: "100%", borderRadius: 8, backgroundColor: GREEN}} />
          <div style={{position: "absolute", right: -18, top: -18, width: 0, height: 0, borderTop: "25px solid transparent", borderBottom: "25px solid transparent", borderLeft: `45px solid ${GREEN}`}} />
          <div style={{position: "absolute", left: 145, top: 36, color: GREEN, fontSize: 19, fontWeight: 900, letterSpacing: 3}}>ADD PHYSICAL DISTANCE</div>
        </div>

        <div style={{position: "absolute", left: 1260, top: 75, width: 390, height: 400, borderRadius: 28, border: `4px solid ${GREEN}`, backgroundColor: `${GREEN}0b`}}>
          <div style={{position: "absolute", left: 35, right: 35, top: 28, color: GREEN, textAlign: "center", fontSize: 21, fontWeight: 900, letterSpacing: 4}}>PARKING PLACE</div>
          <div style={{position: "absolute", left: 70, right: 70, bottom: 28, color: GREEN, textAlign: "center", fontSize: 19, lineHeight: 1.25, fontWeight: 900}}>AVAILABLE.<br />NOT AUTOMATIC.</div>
        </div>

        <div style={{position: "absolute", left: 540 + move * 790, top: 155, opacity: 1}}>
          <Phone />
        </div>
        <div style={{position: "absolute", left: 1310, top: 195, width: 290, height: 180, opacity: parked, borderRadius: 22, border: `5px solid ${GREEN}`, boxShadow: `0 0 0 9px ${GREEN}18`}} />
      </div>
    </AbsoluteFill>
  );
};
