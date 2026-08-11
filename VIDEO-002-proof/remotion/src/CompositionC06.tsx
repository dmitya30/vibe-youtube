import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";
const RED = "#c85b4a";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const composition = timing.compositions.find((item) => item.id === "C06");
if (!composition) throw new Error("C06 timing missing");
const scenes = timing.scenes.filter((scene) => scene.composition === "C06");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S19,S20") throw new Error(`C06 scene map mismatch: ${sceneIds}`);
const start = (id: string) => {
  const scene = scenes.find((item) => item.id === id);
  if (!scene) throw new Error(`Missing ${id}`);
  return scene.startFrame - composition.startFrame;
};
const reveal = (frame: number, id: string) => value(frame, [start(id), start(id) + 18], [0, 1]);

const Phone: React.FC = () => (
  <div style={{position: "relative", width: 270, height: 540, borderRadius: 46, backgroundColor: GRAPHITE, border: `7px solid ${GRAPHITE}`, boxShadow: "0 28px 65px rgba(38,50,56,0.25)", padding: 16}}>
    <div style={{position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 29, background: `linear-gradient(155deg, ${CREAM}, #e6d3ba)`}}>
      <div style={{position: "absolute", top: 14, left: 82, width: 72, height: 13, borderRadius: 7, backgroundColor: GRAPHITE}} />
      <div style={{position: "absolute", left: 37, right: 37, top: 128, height: 180, borderRadius: 24, border: `3px solid ${GRAPHITE}`, opacity: 0.18}} />
      <div style={{position: "absolute", left: 50, right: 50, bottom: 62, height: 14, borderRadius: 7, backgroundColor: `${GRAPHITE}25`}} />
    </div>
  </div>
);

const FrictionCard: React.FC<{title: string; detail: string; left: number; delay: number; progress: number}> = ({title, detail, left, delay, progress}) => {
  const active = value(progress, [delay, delay + 24], [0, 1]);
  return (
    <div style={{position: "absolute", left, top: 470 - active * 18, width: 420, height: 300, boxSizing: "border-box", borderRadius: 30, border: `4px solid ${active > 0.5 ? ORANGE : GRAPHITE}`, backgroundColor: CREAM, boxShadow: `0 ${20 + active * 10}px ${45 + active * 20}px rgba(38,50,56,${0.13 + active * 0.08})`, padding: "42px 38px"}}>
      <div style={{width: 68, height: 68, borderRadius: 20, backgroundColor: active > 0.5 ? ORANGE : `${GRAPHITE}16`, border: `4px solid ${GRAPHITE}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 31, fontWeight: 900}}>{active > 0.5 ? "!" : "·"}</div>
      <div style={{marginTop: 32, fontSize: 34, lineHeight: 1.02, fontWeight: 900}}>{title}</div>
      <div style={{marginTop: 22, fontSize: 22, lineHeight: 1.3, fontWeight: 700, opacity: 0.67}}>{detail}</div>
    </div>
  );
};

export const CompositionC06: React.FC = () => {
  const frame = useCurrentFrame();
  const p19 = frame - start("S19");
  const p20 = frame - start("S20");
  const boundary = value(p19, [35, 95], [0, 1]);
  const chainBreak = value(p19, [120, 175], [0, 1]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 78% 46%, rgba(85,117,104,0.14), transparent 36%), radial-gradient(circle at 24% 46%, rgba(242,138,58,0.11), transparent 38%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />

      <AbsoluteFill style={{opacity: reveal(frame, "S19"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>WHAT THE STUDY CAN AND CANNOT SAY</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1730, fontSize: 66, lineHeight: 0.98, fontWeight: 900}}>ONE RESULT CHALLENGES A SIMPLE STORY.<br /><span style={{color: ORANGE}}>IT DOES NOT PROVE SILENCE IS USELESS.</span></div>
        <div style={{position: "absolute", left: 110, top: 405, width: 1020, height: 455, borderRadius: 32, border: `4px solid ${GRAPHITE}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)", padding: "42px 48px", boxSizing: "border-box"}}>
          <div style={{fontSize: 23, color: GREEN, fontWeight: 900, letterSpacing: 4}}>STUDY BOUNDARY</div>
          <div style={{marginTop: 48, display: "flex", gap: 24}}>
            {["ONE INTERVENTION","ONE WEEK","ONE GROUP"].map((label,index) => <div key={label} style={{flex: 1, height: 170, opacity: value(boundary,[index*0.2,index*0.2+0.22],[0,1]), borderRadius: 24, border: `4px solid ${GRAPHITE}`, backgroundColor: index===1 ? `${ORANGE}16` : `${GREEN}13`, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 20, boxSizing: "border-box", fontSize: 28, lineHeight: 1.08, fontWeight: 900}}>{label}</div>)}
          </div>
          <div style={{marginTop: 38, fontSize: 22, fontWeight: 800, opacity: 0.66}}>A bounded result, not a universal diagnosis.</div>
        </div>
        <div style={{position: "absolute", right: 105, top: 405, width: 610, height: 455, borderRadius: 32, border: `4px solid ${GRAPHITE}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)", padding: "42px", boxSizing: "border-box"}}>
          <div style={{fontSize: 23, color: ORANGE, fontWeight: 900, letterSpacing: 4}}>SIMPLE STORY</div>
          <div style={{marginTop: 70, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 25, fontWeight: 900}}>
            <div style={{padding: "22px 24px", borderRadius: 20, border: `4px solid ${ORANGE}`}}>SIGNAL</div>
            <div style={{position: "relative", width: 68, height: 72, flex: "0 0 68px", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <div style={{fontSize: 45, lineHeight: 1}}>→</div>
              <div style={{position: "absolute", left: 29, top: 3, width: 10, height: 66, opacity: chainBreak, borderRadius: 5, backgroundColor: RED, transform: "rotate(46deg)", transformOrigin: "center center"}} />
            </div>
            <div style={{padding: "22px 24px", borderRadius: 20, border: `4px solid ${GREEN}`}}>CHECK</div>
          </div>

          <div style={{position: "absolute", left: 55, right: 55, bottom: 50, textAlign: "center", color: RED, opacity: chainBreak, fontSize: 22, lineHeight: 1.2, fontWeight: 900, letterSpacing: 2}}>REMOVE SIGNAL ≠ REMOVE CHECKING</div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S20"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>THE QUIET PHONE STILL OFFERS AN EXIT</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1450, fontSize: 76, lineHeight: 0.98, fontWeight: 900}}>THE PHONE GETS QUIETER.<br /><span style={{color: ORANGE}}>CHECKING REMAINS EASY.</span></div>
        <FrictionCard title="DIFFICULT PARAGRAPH" detail="Progress slows and novelty becomes attractive." left={90} delay={20} progress={p20} />
        <FrictionCard title="LOADING FILE" detail="A short wait creates an empty moment." left={540} delay={55} progress={p20} />
        <FrictionCard title="BLANK NEXT STEP" detail="Uncertainty makes leaving easier than continuing." left={990} delay={90} progress={p20} />
        <div style={{position: "absolute", right: 120, top: 390}}><Phone /></div>
        <div style={{position: "absolute", right: 85, bottom: 115, width: 420, textAlign: "center", color: GREEN, fontSize: 23, fontWeight: 900, letterSpacing: 3}}>NO BUZZ REQUIRED</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
