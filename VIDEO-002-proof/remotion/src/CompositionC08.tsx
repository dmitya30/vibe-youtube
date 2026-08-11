import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";
const RED = "#c85b4a";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const composition = timing.compositions.find((item) => item.id === "C08");
if (!composition) throw new Error("C08 timing missing");
const scenes = timing.scenes.filter((scene) => scene.composition === "C08");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S24,S25,S26") throw new Error(`C08 scene map mismatch: ${sceneIds}`);
if (composition.startFrame !== 7802 || composition.endFrame !== 8822 || composition.durationFrames !== 1020) throw new Error("C08 timing boundary mismatch");
const start = (id: string) => {
  const scene = scenes.find((item) => item.id === id);
  if (!scene) throw new Error(`Missing ${id}`);
  return scene.startFrame - composition.startFrame;
};
const reveal = (frame: number, id: string) => value(frame, [start(id), start(id) + 18], [0, 1]);

const Panel: React.FC<{children: React.ReactNode; left: number; top: number; width: number; height: number; accent?: string}> = ({children, left, top, width, height, accent = GRAPHITE}) => (
  <div style={{position: "absolute", left, top, width, height, boxSizing: "border-box", borderRadius: 30, border: `4px solid ${accent}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)", padding: 40}}>{children}</div>
);

const RejectedLabel: React.FC<{label: string; left: number; progress: number; delay: number}> = ({label, left, progress, delay}) => {
  const active = value(progress, [delay, delay + 28], [0, 1]);
  return (
    <div style={{position: "absolute", left, top: 470 - active * 12, width: 650, height: 260, boxSizing: "border-box", borderRadius: 30, border: `4px solid ${GRAPHITE}`, backgroundColor: CREAM, boxShadow: "0 24px 60px rgba(38,50,56,0.15)", padding: "48px 42px", opacity: active}}>
      <div style={{fontSize: 50, lineHeight: 1, fontWeight: 900, textAlign: "center", textDecoration: "line-through", textDecorationColor: RED, textDecorationThickness: 9}}>{label}</div>
      <div style={{marginTop: 44, textAlign: "center", color: RED, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>NOT A DIAGNOSIS</div>
    </div>
  );
};

const Phone: React.FC<{progress: number}> = ({progress}) => (
  <div style={{position: "relative", width: 330, height: 570, borderRadius: 48, border: `7px solid ${GRAPHITE}`, backgroundColor: GRAPHITE, padding: 16, boxShadow: "0 30px 70px rgba(38,50,56,0.24)"}}>
    <div style={{position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 30, background: `linear-gradient(155deg, ${CREAM}, #e6d3ba)`}}>
      <div style={{position: "absolute", top: 14, left: 105, width: 72, height: 13, borderRadius: 7, backgroundColor: GRAPHITE}} />
      {["CALLS","MESSAGES","CAMERA"].map((label, index) => <div key={label} style={{position: "absolute", left: 28, right: 28, top: 95 + index * 118, height: 88, opacity: value(progress, [index * 24, index * 24 + 25], [0, 1]), boxSizing: "border-box", borderRadius: 20, border: `4px solid ${GREEN}`, backgroundColor: `${GREEN}12`, display: "flex", alignItems: "center", padding: "0 24px", fontSize: 24, fontWeight: 900, letterSpacing: 2}}><div style={{width: 26, height: 26, marginRight: 20, borderRadius: 8, backgroundColor: GREEN}} />{label}</div>)}
      <div style={{position: "absolute", left: 54, right: 54, bottom: 45, height: 13, borderRadius: 7, backgroundColor: `${GRAPHITE}25`}} />
    </div>
  </div>
);

export const CompositionC08: React.FC = () => {
  const frame = useCurrentFrame();
  const p24 = frame - start("S24");
  const p25 = frame - start("S25");
  const p26 = frame - start("S26");
  const functionsAvailable = value(p25, [28, 115], [0, 1]);
  const checkingPath = value(p26, [25, 85], [0, 1]);
  const visibleAction = value(p26, [85, 155], [0, 1]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 24% 52%, rgba(200,91,74,0.10), transparent 35%), radial-gradient(circle at 78% 52%, rgba(85,117,104,0.13), transparent 35%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />

      <AbsoluteFill style={{opacity: reveal(frame, "S24"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: RED, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>KEEP THE CLAIM BOUNDED</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1680, fontSize: 70, lineHeight: 0.98, fontWeight: 900}}>FRICTION IS AN EXPLANATION.<br /><span style={{color: ORANGE}}>IT IS NOT A DIAGNOSIS.</span></div>
        <RejectedLabel label="BROKEN BRAIN" left={180} progress={p24} delay={30} />
        <RejectedLabel label="ADDICTION" left={1090} progress={p24} delay={80} />
        <div style={{position: "absolute", left: 420, right: 420, bottom: 125, textAlign: "center", color: GREEN, fontSize: 26, lineHeight: 1.25, fontWeight: 900}}>A BEHAVIORAL PATH CAN BE EASY<br />WITHOUT BECOMING A UNIVERSAL LABEL.</div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S25"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: GREEN, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>THE PHONE IS ALSO A TOOL</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1650, fontSize: 70, lineHeight: 0.98, fontWeight: 900}}>LEGITIMATE FUNCTIONS<br /><span style={{color: ORANGE}}>STAY AVAILABLE.</span></div>
        <div style={{position: "absolute", left: 185, top: 410}}><Phone progress={functionsAvailable * 100} /></div>
        <Panel left={700} top={430} width={1020} height={430} accent={GREEN}>
          <div style={{fontSize: 23, color: GREEN, fontWeight: 900, letterSpacing: 4}}>WHAT THE TASK ACTUALLY REQUIRES</div>
          <div style={{marginTop: 45, fontSize: 43, lineHeight: 1.08, fontWeight: 900}}>KEEP NECESSARY ACCESS.<br />REMOVE THE AUTOMATIC DETOUR.</div>
          <div style={{marginTop: 50, display: "flex", gap: 22}}>
            {["CONTACT","CAPTURE","COORDINATE"].map((label, index) => <div key={label} style={{flex: 1, height: 92, opacity: value(functionsAvailable, [index * 0.25, index * 0.25 + 0.25], [0, 1]), borderRadius: 20, border: `3px solid ${GREEN}`, backgroundColor: `${GREEN}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, fontWeight: 900, letterSpacing: 2}}>{label}</div>)}
          </div>
        </Panel>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S26"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>MAKE THE NEXT ACTION VISIBLE</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1660, fontSize: 68, lineHeight: 0.98, fontWeight: 900}}>CHECKING IS EASY.<br /><span style={{color: ORANGE}}>NOTICING CAN BECOME EASIER.</span></div>
        <Panel left={110} top={430} width={760} height={440} accent={ORANGE}>
          <div style={{fontSize: 24, color: ORANGE, fontWeight: 900, letterSpacing: 4}}>AUTOMATIC PATH</div>
          <div style={{marginTop: 48, display: "flex", alignItems: "center", gap: 22, opacity: checkingPath}}>
            <div style={{padding: "24px 28px", borderRadius: 20, border: `4px solid ${GRAPHITE}`, fontSize: 27, fontWeight: 900}}>FRICTION</div>
            <div style={{color: ORANGE, fontSize: 58, fontWeight: 900}}>&rarr;</div>
            <div style={{padding: "24px 28px", borderRadius: 20, border: `4px solid ${ORANGE}`, fontSize: 27, fontWeight: 900}}>CHECK</div>
          </div>
          <div style={{marginTop: 54, color: RED, opacity: checkingPath, fontSize: 24, lineHeight: 1.25, fontWeight: 900}}>THE DETOUR ARRIVES<br />BEFORE A CONSCIOUS DECISION.</div>
        </Panel>
        <Panel left={1050} top={430} width={760} height={440} accent={GREEN}>
          <div style={{fontSize: 24, color: GREEN, fontWeight: 900, letterSpacing: 4}}>VISIBLE NEXT ACTION</div>
          <div style={{marginTop: 42, opacity: visibleAction}}>
            {["1  NOTICE THE STALL","2  NAME THE NEXT STEP","3  CONTINUE OR CHOOSE"].map((label, index) => <div key={label} style={{height: 74, marginBottom: 18, borderRadius: 18, border: `3px solid ${index === 0 ? ORANGE : GREEN}`, backgroundColor: index === 0 ? `${ORANGE}12` : `${GREEN}10`, display: "flex", alignItems: "center", padding: "0 25px", fontSize: 24, fontWeight: 900}}>{label}</div>)}
          </div>
        </Panel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
