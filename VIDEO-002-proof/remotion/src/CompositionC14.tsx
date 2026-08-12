import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";
const RED = "#c85b4a";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const composition = timing.compositions.find((item) => item.id === "C14");
if (!composition) throw new Error("C14 timing missing");
const scenes = timing.scenes.filter((scene) => scene.composition === "C14");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S38") throw new Error(`C14 scene map mismatch: ${sceneIds}`);
if (composition.startFrame !== 13106 || composition.endFrame !== 13983 || composition.durationFrames !== 877) throw new Error("C14 timing boundary mismatch");

const AppCard: React.FC<{label: string; top: number; color: string; status: string; progress: number; closed?: boolean}> = ({label, top, color, status, progress, closed = false}) => (
  <div style={{position: "absolute", left: 55, right: 55, top, height: 105, opacity: progress, transform: `translateY(${(1 - progress) * 24}px)`, borderRadius: 22, border: `4px solid ${color}`, backgroundColor: `${color}0c`, display: "flex", alignItems: "center", padding: "0 30px", boxSizing: "border-box"}}>
    <div style={{fontSize: 27, fontWeight: 900, letterSpacing: 3}}>{label}</div>
    <div style={{position: "absolute", right: 28, padding: "12px 18px", borderRadius: 13, backgroundColor: color, color: CREAM, fontSize: 18, fontWeight: 900, letterSpacing: 2}}>{status}</div>
    {closed ? <div style={{position: "absolute", left: 28, right: 28, top: 49, height: 7, borderRadius: 4, backgroundColor: RED}} /> : null}
  </div>
);

export const CompositionC14: React.FC = () => {
  const frame = useCurrentFrame();
  const close = value(frame, [45, 210], [0, 1]);
  const tools = value(frame, [155, 290], [0, 1]);
  const boundary = value(frame, [250, 335], [0, 1]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 24% 56%, rgba(200,91,74,0.11), transparent 35%), radial-gradient(circle at 76% 56%, rgba(85,117,104,0.13), transparent 36%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />
      <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>THE SILENT DOOR TEST · LAYER THREE</div>
      <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 66, lineHeight: 0.98, fontWeight: 900}}>CLOSE DISTRACTING APPS.<br /><span style={{color: GREEN}}>KEEP NECESSARY TOOLS.</span></div>

      <div style={{position: "absolute", left: 100, top: 405, width: 790, height: 545, boxSizing: "border-box", borderRadius: 30, border: `4px solid ${RED}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)"}}>
        <div style={{position: "absolute", left: 55, top: 38, color: RED, fontSize: 21, fontWeight: 900, letterSpacing: 4}}>DISTRACTION PATHS</div>
        <AppCard label="FEEDS" top={105} color={RED} status="CLOSED" progress={close} closed />
        <AppCard label="SHORT VIDEO" top={230} color={RED} status="CLOSED" progress={close} closed />
        <AppCard label="SOCIAL" top={355} color={RED} status="CLOSED" progress={close} closed />
      </div>

      <div style={{position: "absolute", left: 1030, top: 405, width: 790, height: 545, boxSizing: "border-box", borderRadius: 30, border: `4px solid ${GREEN}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)"}}>
        <div style={{position: "absolute", left: 55, top: 38, color: GREEN, fontSize: 21, fontWeight: 900, letterSpacing: 4}}>NECESSARY TOOLS</div>
        <AppCard label="CALLS" top={105} color={GREEN} status="OPEN" progress={tools} />
        <AppCard label="CAMERA" top={230} color={GREEN} status="OPEN" progress={tools} />
        <AppCard label="NOTES" top={355} color={GREEN} status="OPEN" progress={tools} />
      </div>

      <div style={{position: "absolute", left: 920, top: 430, width: 14, height: 490, borderRadius: 7, backgroundColor: GRAPHITE, opacity: boundary}} />
      <div style={{position: "absolute", left: 845, top: 845, width: 240, opacity: boundary, color: ORANGE, textAlign: "center", fontSize: 19, lineHeight: 1.2, fontWeight: 900, letterSpacing: 2}}>SELECTIVE ACCESS<br />NOT TOTAL REMOVAL</div>
    </AbsoluteFill>
  );
};
