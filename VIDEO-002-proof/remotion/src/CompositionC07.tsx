import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";
const RED = "#c85b4a";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const composition = timing.compositions.find((item) => item.id === "C07");
if (!composition) throw new Error("C07 timing missing");
const scenes = timing.scenes.filter((scene) => scene.composition === "C07");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S21,S22,S23") throw new Error(`C07 scene map mismatch: ${sceneIds}`);
if (composition.startFrame !== 6353 || composition.endFrame !== 7802 || composition.durationFrames !== 1449) throw new Error("C07 timing boundary mismatch");
const start = (id: string) => {
  const scene = scenes.find((item) => item.id === id);
  if (!scene) throw new Error(`Missing ${id}`);
  return scene.startFrame - composition.startFrame;
};
const reveal = (frame: number, id: string) => value(frame, [start(id), start(id) + 18], [0, 1]);

const Door: React.FC<{label: string; open: number; accent: string}> = ({label, open, accent}) => (
  <div style={{position: "relative", width: 360, height: 480, borderRadius: 30, border: `6px solid ${GRAPHITE}`, backgroundColor: `${GRAPHITE}10`, boxShadow: "0 28px 70px rgba(38,50,56,0.18)", perspective: 900}}>
    <div style={{position: "absolute", left: 22, top: 22, width: 304, height: 404, borderRadius: 20, border: `5px solid ${accent}`, backgroundColor: CREAM, transformOrigin: "left center", transform: `rotateY(${-72 * open}deg)`, boxShadow: "10px 18px 35px rgba(38,50,56,0.18)"}}>
      <div style={{position: "absolute", left: 34, right: 34, top: 62, textAlign: "center", color: accent, fontSize: 28, lineHeight: 1.05, fontWeight: 900, letterSpacing: 3}}>{label}</div>
      <div style={{position: "absolute", right: 27, top: 202, width: 22, height: 22, borderRadius: 11, backgroundColor: GRAPHITE}} />
    </div>
    <div style={{position: "absolute", left: 36, right: 36, bottom: 14, textAlign: "center", fontSize: 18, fontWeight: 900, letterSpacing: 2}}>EXIT</div>
  </div>
);

const Phone: React.FC<{signal?: number}> = ({signal = 0}) => (
  <div style={{position: "relative", width: 250, height: 480, borderRadius: 44, border: `7px solid ${GRAPHITE}`, backgroundColor: GRAPHITE, padding: 15, boxShadow: "0 28px 65px rgba(38,50,56,0.23)"}}>
    <div style={{position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 28, background: `linear-gradient(155deg, ${CREAM}, #e6d3ba)`}}>
      <div style={{position: "absolute", top: 14, left: 76, width: 68, height: 12, borderRadius: 6, backgroundColor: GRAPHITE}} />
      <div style={{position: "absolute", left: 24, right: 24, top: 110, height: 110, opacity: signal, borderRadius: 22, border: `4px solid ${ORANGE}`, backgroundColor: `${ORANGE}18`, padding: 20, boxSizing: "border-box"}}>
        <div style={{fontSize: 19, color: ORANGE, fontWeight: 900, letterSpacing: 2}}>NEW SIGNAL</div>
        <div style={{marginTop: 15, height: 10, borderRadius: 5, backgroundColor: `${GRAPHITE}35`}} />
      </div>
    </div>
  </div>
);

const TaskCard: React.FC<{title: string; detail: string; left: number; top: number; delay: number; progress: number}> = ({title, detail, left, top, delay, progress}) => {
  const active = value(progress, [delay, delay + 28], [0, 1]);
  return (
    <div style={{position: "absolute", left, top: top - active * 12, width: 370, height: 190, boxSizing: "border-box", padding: "30px 32px", opacity: active, borderRadius: 26, border: `4px solid ${active > 0.6 ? ORANGE : GRAPHITE}`, backgroundColor: CREAM, boxShadow: "0 22px 55px rgba(38,50,56,0.16)"}}>
      <div style={{fontSize: 27, lineHeight: 1.02, fontWeight: 900}}>{title}</div>
      <div style={{marginTop: 18, fontSize: 19, lineHeight: 1.25, fontWeight: 700, opacity: 0.65}}>{detail}</div>
    </div>
  );
};

export const CompositionC07: React.FC = () => {
  const frame = useCurrentFrame();
  const p21 = frame - start("S21");
  const p22 = frame - start("S22");
  const p23 = frame - start("S23");
  const signal = value(p21, [30, 78], [0, 1]);
  const promptedOpen = value(p21, [105, 180], [0, 1]);
  const internalPressure = value(p22, [25, 90], [0, 1]);
  const selfOpen = value(p22, [95, 170], [0, 1]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 23% 54%, rgba(242,138,58,0.13), transparent 34%), radial-gradient(circle at 78% 52%, rgba(85,117,104,0.13), transparent 34%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />

      <AbsoluteFill style={{opacity: reveal(frame, "S21"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>TWO DIFFERENT DOORS</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1500, fontSize: 76, lineHeight: 0.98, fontWeight: 900}}>THE FIRST IS A<br /><span style={{color: ORANGE}}>PROMPTED EXIT.</span></div>
        <div style={{position: "absolute", left: 170, top: 430}}><Phone signal={signal} /></div>
        <div style={{position: "absolute", left: 640, top: 585, width: 510, height: 8, borderRadius: 4, backgroundColor: `${GRAPHITE}18`}}>
          <div style={{width: `${signal * 100}%`, height: "100%", borderRadius: 4, backgroundColor: ORANGE}} />
          <div style={{position: "absolute", right: -10, top: -20, color: ORANGE, opacity: signal, fontSize: 46, fontWeight: 900}}>→</div>
        </div>
        <div style={{position: "absolute", right: 170, top: 415}}><Door label="NOTIFICATION" open={promptedOpen} accent={ORANGE} /></div>
        <div style={{position: "absolute", left: 665, top: 650, width: 450, textAlign: "center", color: ORANGE, opacity: signal, fontSize: 24, fontWeight: 900, letterSpacing: 3}}>THE DEVICE OPENS IT</div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S22"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: GREEN, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>NO EXTERNAL SIGNAL</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1600, fontSize: 72, lineHeight: 0.98, fontWeight: 900}}>THE SECOND IS A<br /><span style={{color: ORANGE}}>SELF-CREATED EXIT.</span></div>
        <div style={{position: "absolute", left: 135, top: 460, width: 670, height: 390, borderRadius: 32, border: `4px solid ${GRAPHITE}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)", padding: 42, boxSizing: "border-box"}}>
          <div style={{fontSize: 22, color: GREEN, fontWeight: 900, letterSpacing: 4}}>THE TASK</div>
          <div style={{marginTop: 42, fontSize: 35, lineHeight: 1.15, fontWeight: 900}}>A sentence stops making sense.</div>
          <div style={{marginTop: 38, height: 18, borderRadius: 9, backgroundColor: `${GRAPHITE}18`}}><div style={{width: `${62 - internalPressure * 24}%`, height: "100%", borderRadius: 9, backgroundColor: GREEN}} /></div>
          <div style={{marginTop: 34, color: RED, opacity: internalPressure, fontSize: 22, fontWeight: 900, letterSpacing: 3}}>FRICTION APPEARS INSIDE THE WORK</div>
        </div>
        <div style={{position: "absolute", left: 890, top: 585, color: ORANGE, opacity: internalPressure, fontSize: 74, fontWeight: 900}}>→</div>
        <div style={{position: "absolute", right: 150, top: 420}}><Door label="CHECKING" open={selfOpen} accent={GREEN} /></div>
        <div style={{position: "absolute", right: 136, bottom: 110, width: 390, textAlign: "center", color: GREEN, fontSize: 23, fontWeight: 900, letterSpacing: 3}}>YOU OPEN THIS DOOR</div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S23"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>WHAT CREATES THE EXIT?</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1660, fontSize: 68, lineHeight: 0.98, fontWeight: 900}}>THE PHONE STAYS QUIET.<br /><span style={{color: ORANGE}}>THE TASK CREATES FRICTION.</span></div>
        <div style={{position: "absolute", left: 700, top: 440, width: 520, height: 400, borderRadius: 32, border: `5px solid ${GRAPHITE}`, backgroundColor: CREAM, boxShadow: "0 28px 70px rgba(38,50,56,0.18)", padding: 44, boxSizing: "border-box"}}>
          <div style={{fontSize: 22, color: GREEN, fontWeight: 900, letterSpacing: 4}}>CURRENT TASK</div>
          <div style={{marginTop: 40, fontSize: 36, lineHeight: 1.12, fontWeight: 900}}>Finish the difficult paragraph.</div>
          <div style={{marginTop: 42, height: 16, borderRadius: 8, backgroundColor: `${GRAPHITE}16`}}><div style={{width: "46%", height: "100%", borderRadius: 8, backgroundColor: GREEN}} /></div>
          <div style={{marginTop: 38, color: ORANGE, fontSize: 23, lineHeight: 1.25, fontWeight: 900}}>THE NEXT ACTION FEELS UNCLEAR</div>
        </div>
        <TaskCard title="CONFUSING SENTENCE" detail="Understanding briefly stalls." left={110} top={420} delay={25} progress={p23} />
        <TaskCard title="LOADING FILE" detail="Waiting creates an empty moment." left={110} top={720} delay={65} progress={p23} />
        <TaskCard title="BLANK NEXT STEP" detail="The next move is uncertain." left={1440} top={420} delay={105} progress={p23} />
        <TaskCard title="FIVE BORING SECONDS" detail="Novelty becomes easier to choose." left={1440} top={720} delay={145} progress={p23} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
