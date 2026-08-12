import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const composition = timing.compositions.find((item) => item.id === "C12");
if (!composition) throw new Error("C12 timing missing");
const scenes = timing.scenes.filter((scene) => scene.composition === "C12");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S36") throw new Error(`C12 scene map mismatch: ${sceneIds}`);
if (composition.startFrame !== 11938 || composition.endFrame !== 12414 || composition.durationFrames !== 476) throw new Error("C12 timing boundary mismatch");

const start = (id: string) => {
  const scene = scenes.find((item) => item.id === id);
  if (!scene) throw new Error(`Missing ${id}`);
  return scene.startFrame - composition.startFrame;
};

const PromptCard: React.FC<{label: string; left: number; top: number; progress: number; delay: number}> = ({label, left, top, progress, delay}) => {
  const local = value(progress, [delay, delay + 0.38], [0, 1]);
  return (
    <div style={{position: "absolute", left: left + local * 130, top, width: 190, height: 74, opacity: 1 - local, transform: `scale(${1 - local * 0.2})`, borderRadius: 19, border: `3px solid ${ORANGE}`, backgroundColor: CREAM, boxShadow: "0 15px 35px rgba(38,50,56,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: ORANGE, fontSize: 21, fontWeight: 900, letterSpacing: 3}}>
      {label}
    </div>
  );
};

const Toggle: React.FC<{label: string; top: number; progress: number; delay: number}> = ({label, top, progress, delay}) => {
  const off = value(progress, [delay, delay + 0.25], [0, 1]);
  return (
    <div style={{position: "absolute", left: 55, right: 55, top, height: 92, borderRadius: 22, border: `3px solid ${off > 0.5 ? GREEN : ORANGE}`, backgroundColor: `${off > 0.5 ? GREEN : ORANGE}0d`, display: "flex", alignItems: "center", padding: "0 30px", boxSizing: "border-box"}}>
      <div style={{fontSize: 24, fontWeight: 900, letterSpacing: 3}}>{label}</div>
      <div style={{position: "absolute", right: 28, width: 100, height: 48, borderRadius: 24, backgroundColor: off > 0.5 ? GREEN : ORANGE}}>
        <div style={{position: "absolute", left: 58 - off * 52, top: 6, width: 36, height: 36, borderRadius: "50%", backgroundColor: CREAM}} />
      </div>
      <div style={{position: "absolute", right: 145, color: off > 0.5 ? GREEN : ORANGE, fontSize: 19, fontWeight: 900, letterSpacing: 2}}>{off > 0.5 ? "OFF" : "ON"}</div>
    </div>
  );
};

export const CompositionC12: React.FC = () => {
  const frame = useCurrentFrame();
  const p36 = frame - start("S36");
  const sceneReveal = value(p36, [0, 18], [0, 1]);
  const close = value(p36, [55, 170], [0, 1]);
  const controls = value(p36, [95, 230], [0, 1]);
  const stamp = value(p36, [175, 235], [0, 1]);
  const promptProgress = value(p36, [25, 150], [0, 1]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden", opacity: sceneReveal}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 25% 55%, rgba(242,138,58,0.13), transparent 35%), radial-gradient(circle at 78% 52%, rgba(85,117,104,0.13), transparent 36%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />

      <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>THE SILENT DOOR TEST · LAYER ONE</div>
      <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 68, lineHeight: 0.98, fontWeight: 900}}>REMOVE EXTERNAL PROMPTS.<br /><span style={{color: GREEN}}>CLOSE THE NOTIFICATION DOOR.</span></div>

      <div style={{position: "absolute", left: 95, top: 405, width: 1050, height: 535, boxSizing: "border-box", borderRadius: 30, border: `4px solid ${ORANGE}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)", overflow: "hidden"}}>
        <div style={{position: "absolute", left: 55, top: 42, color: ORANGE, fontSize: 21, fontWeight: 900, letterSpacing: 4}}>EXTERNAL PROMPTS</div>

        <PromptCard label="BANNER" left={55} top={135} progress={promptProgress} delay={0} />
        <PromptCard label="BADGE" left={35} top={250} progress={promptProgress} delay={0.15} />
        <PromptCard label="VIBRATION" left={75} top={365} progress={promptProgress} delay={0.3} />

        <div style={{position: "absolute", left: 490, top: 42, width: 475, height: 450, perspective: 1000}}>
          <div style={{position: "absolute", left: 65, top: 0, width: 345, height: 450, borderRadius: "22px 22px 8px 8px", border: `14px solid ${GRAPHITE}`, backgroundColor: `${GRAPHITE}ee`, boxSizing: "border-box"}}>
            <div style={{position: "absolute", left: 72, top: 125, color: CREAM, opacity: 1 - close, fontSize: 28, lineHeight: 1.2, fontWeight: 900, textAlign: "center", letterSpacing: 4}}>PROMPTS<br />ENTER HERE</div>
          </div>

          <div style={{position: "absolute", left: 65, top: 0, width: 345, height: 450, borderRadius: "17px 17px 5px 5px", border: `5px solid ${GRAPHITE}`, backgroundColor: GREEN, boxSizing: "border-box", transformOrigin: "right center", transform: `rotateY(${-78 + close * 78}deg)`, boxShadow: "0 20px 50px rgba(38,50,56,0.24)"}}>
            <div style={{position: "absolute", left: 32, right: 32, top: 58, color: CREAM, fontSize: 24, lineHeight: 1.2, fontWeight: 900, textAlign: "center", letterSpacing: 3}}>NOTIFICATION<br />DOOR</div>
            <div style={{position: "absolute", right: 26, top: 215, width: 28, height: 28, borderRadius: "50%", border: `5px solid ${CREAM}`}} />
            <div style={{position: "absolute", left: 36, right: 36, bottom: 56, height: 8, borderRadius: 4, backgroundColor: `${CREAM}70`}} />
          </div>

          <div style={{position: "absolute", left: 112, top: 175, width: 250, height: 92, opacity: stamp, transform: `scale(${0.8 + stamp * 0.2}) rotate(-5deg)`, borderRadius: 18, border: `6px solid ${CREAM}`, backgroundColor: GREEN, color: CREAM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 900, letterSpacing: 5, boxShadow: "0 15px 35px rgba(38,50,56,0.20)"}}>CLOSED</div>
        </div>
      </div>

      <div style={{position: "absolute", left: 1195, top: 405, width: 630, height: 535, boxSizing: "border-box", borderRadius: 30, border: `4px solid ${GREEN}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)", padding: 40}}>
        <div style={{color: GREEN, fontSize: 21, fontWeight: 900, letterSpacing: 4}}>FOR THIS FOCUS BLOCK</div>
        <Toggle label="BANNERS" top={110} progress={controls} delay={0} />
        <Toggle label="BADGES" top={225} progress={controls} delay={0.2} />
        <Toggle label="VIBRATIONS" top={340} progress={controls} delay={0.4} />
        <div style={{position: "absolute", left: 55, right: 55, bottom: 33, opacity: stamp, color: GREEN, textAlign: "center", fontSize: 20, lineHeight: 1.25, fontWeight: 900, letterSpacing: 2}}>NO EXTERNAL SIGNAL<br />STARTS THE CHECK.</div>
      </div>
    </AbsoluteFill>
  );
};
