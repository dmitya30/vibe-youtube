import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";
const RED = "#c85b4a";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const composition = timing.compositions.find((item) => item.id === "C09");
if (!composition) throw new Error("C09 timing missing");
const scenes = timing.scenes.filter((scene) => scene.composition === "C09");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S27,S28,S29,S30") throw new Error(`C09 scene map mismatch: ${sceneIds}`);
if (composition.startFrame !== 8822 || composition.endFrame !== 10065 || composition.durationFrames !== 1243) throw new Error("C09 timing boundary mismatch");
const start = (id: string) => {
  const scene = scenes.find((item) => item.id === id);
  if (!scene) throw new Error(`Missing ${id}`);
  return scene.startFrame - composition.startFrame;
};
const reveal = (frame: number, id: string) => value(frame, [start(id), start(id) + 18], [0, 1]);

const Panel: React.FC<{children: React.ReactNode; left: number; top: number; width: number; height: number; accent?: string}> = ({children, left, top, width, height, accent = GRAPHITE}) => (
  <div style={{position: "absolute", left, top, width, height, boxSizing: "border-box", borderRadius: 30, border: `4px solid ${accent}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)", padding: 40}}>{children}</div>
);

const PhoneStatus: React.FC<{progress: number}> = ({progress}) => (
  <div style={{position: "relative", width: 340, height: 590, borderRadius: 50, border: `7px solid ${GRAPHITE}`, backgroundColor: GRAPHITE, padding: 16, boxShadow: "0 30px 70px rgba(38,50,56,0.24)"}}>
    <div style={{position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 31, background: `linear-gradient(155deg, ${CREAM}, #e6d3ba)`}}>
      <div style={{position: "absolute", top: 14, left: 110, width: 72, height: 13, borderRadius: 7, backgroundColor: GRAPHITE}} />
      <div style={{position: "absolute", left: 28, right: 28, top: 86, height: 125, borderRadius: 22, border: `4px solid ${RED}`, backgroundColor: `${RED}12`, padding: 22, boxSizing: "border-box"}}>
        <div style={{fontSize: 23, color: RED, fontWeight: 900, letterSpacing: 3}}>MOBILE INTERNET</div>
        <div style={{position: "absolute", left: 20, right: 20, top: 57, height: 9, borderRadius: 5, backgroundColor: `${GRAPHITE}22`}} />
        <div style={{position: "absolute", left: 20, right: 20, top: 57, height: 9, opacity: progress, borderRadius: 5, backgroundColor: RED, transform: "rotate(-7deg)"}} />
        <div style={{position: "absolute", right: 22, bottom: 15, opacity: progress, color: RED, fontSize: 20, fontWeight: 900}}>BLOCKED</div>
      </div>
      {["CALLS","TEXTS"].map((label, index) => <div key={label} style={{position: "absolute", left: 28, right: 28, top: 245 + index * 112, height: 88, opacity: value(progress, [index * 0.18, index * 0.18 + 0.25], [0, 1]), borderRadius: 20, border: `4px solid ${GREEN}`, backgroundColor: `${GREEN}12`, display: "flex", alignItems: "center", padding: "0 24px", boxSizing: "border-box", fontSize: 25, fontWeight: 900, letterSpacing: 3}}><div style={{width: 25, height: 25, marginRight: 20, borderRadius: 8, backgroundColor: GREEN}} />{label}</div>)}
      <div style={{position: "absolute", left: 62, right: 62, bottom: 42, height: 13, borderRadius: 7, backgroundColor: `${GRAPHITE}25`}} />
    </div>
  </div>
);

const Laptop: React.FC<{progress: number}> = ({progress}) => (
  <div style={{position: "relative", width: 800, height: 510}}>
    <div style={{position: "absolute", left: 65, top: 0, width: 670, height: 430, borderRadius: 28, border: `8px solid ${GRAPHITE}`, backgroundColor: GRAPHITE, padding: 16, boxSizing: "border-box", boxShadow: "0 28px 65px rgba(38,50,56,0.22)"}}>
      <div style={{position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 15, backgroundColor: CREAM}}>
        <div style={{height: 58, backgroundColor: `${GREEN}18`, borderBottom: `3px solid ${GREEN}`, display: "flex", alignItems: "center", padding: "0 24px", boxSizing: "border-box", color: GREEN, fontSize: 20, fontWeight: 900, letterSpacing: 3}}>COMPUTER ACCESS</div>
        <div style={{position: "absolute", left: 45, right: 45, top: 105, height: 45, opacity: progress, borderRadius: 12, backgroundColor: `${GRAPHITE}12`}} />
        <div style={{position: "absolute", left: 45, width: 420, top: 185, height: 22, opacity: progress, borderRadius: 11, backgroundColor: GREEN}} />
        <div style={{position: "absolute", left: 45, width: 520, top: 240, height: 18, opacity: progress, borderRadius: 9, backgroundColor: `${GRAPHITE}22`}} />
        <div style={{position: "absolute", left: 45, width: 470, top: 286, height: 18, opacity: progress, borderRadius: 9, backgroundColor: `${GRAPHITE}22`}} />
        <div style={{position: "absolute", right: 42, bottom: 28, opacity: progress, color: GREEN, fontSize: 21, fontWeight: 900, letterSpacing: 3}}>AVAILABLE</div>
      </div>
    </div>
    <div style={{position: "absolute", left: 0, bottom: 24, width: 800, height: 46, borderRadius: "8px 8px 24px 24px", backgroundColor: GRAPHITE}} />
  </div>
);

const OutcomeCard: React.FC<{label: string; valueText: string; detail: string; left: number; accent: string; progress: number}> = ({label, valueText, detail, left, accent, progress}) => (
  <div style={{position: "absolute", left, top: 430, width: 760, height: 420, boxSizing: "border-box", opacity: progress, borderRadius: 30, border: `4px solid ${accent}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)", padding: 42}}>
    <div style={{fontSize: 23, color: accent, fontWeight: 900, letterSpacing: 4}}>{label}</div>
    <div style={{marginTop: 48, fontSize: 56, lineHeight: 1, fontWeight: 900}}>{valueText}</div>
    <div style={{marginTop: 40, fontSize: 26, lineHeight: 1.25, fontWeight: 800}}>{detail}</div>
    <div style={{position: "absolute", left: 42, right: 42, bottom: 40, height: 16, borderRadius: 8, backgroundColor: `${GRAPHITE}14`}}><div style={{width: label === "OBJECTIVE" ? "58%" : "76%", height: "100%", borderRadius: 8, backgroundColor: accent}} /></div>
  </div>
);

export const CompositionC09: React.FC = () => {
  const frame = useCurrentFrame();
  const p27 = frame - start("S27");
  const p28 = frame - start("S28");
  const p29 = frame - start("S29");
  const p30 = frame - start("S30");
  const mobileBlock = value(p27, [25, 95], [0, 1]);
  const computerAccess = value(p28, [25, 105], [0, 1]);
  const objective = value(p29, [25, 80], [0, 1]);
  const reported = value(p29, [70, 125], [0, 1]);
  const subset = value(p30, [35, 145], [0, 1]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 24% 52%, rgba(200,91,74,0.10), transparent 35%), radial-gradient(circle at 78% 52%, rgba(85,117,104,0.13), transparent 35%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />

      <AbsoluteFill style={{opacity: reveal(frame, "S27"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>A STRONGER FRICTION TEST</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1680, fontSize: 68, lineHeight: 0.98, fontWeight: 900}}>MOBILE INTERNET CLOSED.<br /><span style={{color: GREEN}}>CALLS AND TEXTS REMAINED.</span></div>
        <div style={{position: "absolute", left: 190, top: 390}}><PhoneStatus progress={mobileBlock} /></div>
        <Panel left={720} top={430} width={1000} height={430} accent={ORANGE}>
          <div style={{fontSize: 23, color: ORANGE, fontWeight: 900, letterSpacing: 4}}>FRICTION, NOT TOTAL REMOVAL</div>
          <div style={{marginTop: 50, fontSize: 42, lineHeight: 1.1, fontWeight: 900}}>THE INSTANT INTERNET PATH CLOSES.</div>
          <div style={{marginTop: 42, display: "flex", gap: 22}}>
            <div style={{flex: 1, height: 100, borderRadius: 20, border: `4px solid ${RED}`, backgroundColor: `${RED}10`, display: "flex", alignItems: "center", justifyContent: "center", color: RED, fontSize: 24, fontWeight: 900}}>INTERNET BLOCKED</div>
            <div style={{flex: 1, height: 100, borderRadius: 20, border: `4px solid ${GREEN}`, backgroundColor: `${GREEN}10`, display: "flex", alignItems: "center", justifyContent: "center", color: GREEN, fontSize: 24, fontWeight: 900}}>CONTACT OPEN</div>
          </div>
        </Panel>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S28"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: GREEN, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>ACCESS DID NOT DISAPPEAR</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 68, lineHeight: 0.98, fontWeight: 900}}>THE INTERNET REMAINED<br /><span style={{color: ORANGE}}>AVAILABLE ON COMPUTERS.</span></div>
        <div style={{position: "absolute", left: 560, top: 410}}><Laptop progress={computerAccess} /></div>
        <div style={{position: "absolute", left: 560, bottom: 95, width: 800, textAlign: "center", color: GREEN, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>DELIBERATE ACCESS REMAINS POSSIBLE</div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S29"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>KEEP THE MEASURES SEPARATE</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 66, lineHeight: 0.98, fontWeight: 900}}>OBJECTIVE ATTENTION AND<br /><span style={{color: ORANGE}}>SELF-REPORT ARE NOT THE SAME.</span></div>
        <OutcomeCard label="OBJECTIVE" valueText="TASK PERFORMANCE" detail="Measured behavior during sustained attention." left={120} accent={GREEN} progress={objective} />
        <OutcomeCard label="SELF-REPORTED" valueText="FELT EXPERIENCE" detail="What participants said about focus and effort." left={1040} accent={ORANGE} progress={reported} />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S30"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: RED, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>A NARROWER RESULT</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 66, lineHeight: 0.98, fontWeight: 900}}>THE EFFECT WAS DIFFICULT TO FOLLOW<br /><span style={{color: ORANGE}}>ACROSS THE FULL GROUP.</span></div>
        <Panel left={105} top={420} width={1710} height={455}>
          <div style={{fontSize: 23, color: GRAPHITE, fontWeight: 900, letterSpacing: 4}}>PARTICIPANT FLOW</div>
          <div style={{marginTop: 42, display: "flex", alignItems: "center", gap: 42}}>
            <div style={{width: 760}}>
              <div style={{fontSize: 22, color: GREEN, fontWeight: 900, letterSpacing: 3}}>FULL GROUP</div>
              <div style={{marginTop: 24, display: "grid", gridTemplateColumns: "repeat(10, 50px)", gap: 18}}>{Array.from({length: 20}).map((_, index) => <div key={index} style={{width: 42, height: 42, borderRadius: 14, border: `3px solid ${GRAPHITE}`, backgroundColor: `${GREEN}25`}} />)}</div>
            </div>
            <div style={{color: ORANGE, fontSize: 72, fontWeight: 900}}>&rarr;</div>
            <div style={{width: 560, opacity: subset}}>
              <div style={{fontSize: 22, color: ORANGE, fontWeight: 900, letterSpacing: 3}}>COMPLIANT SUBSET</div>
              <div style={{marginTop: 24, display: "grid", gridTemplateColumns: "repeat(5, 50px)", gap: 18}}>{Array.from({length: 10}).map((_, index) => <div key={index} style={{width: 42, height: 42, borderRadius: 14, border: `3px solid ${ORANGE}`, backgroundColor: `${ORANGE}22`}} />)}</div>
            </div>
          </div>
          <div style={{position: "absolute", right: 55, bottom: 42, width: 600, color: RED, opacity: subset, fontSize: 21, lineHeight: 1.25, fontWeight: 900}}>INTERPRETATION NARROWS WHEN ONLY PART OF THE GROUP FOLLOWS THE INTERVENTION.</div>
        </Panel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
