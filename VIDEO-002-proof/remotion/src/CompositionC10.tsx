import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";
const RED = "#c85b4a";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const composition = timing.compositions.find((item) => item.id === "C10");
if (!composition) throw new Error("C10 timing missing");
const scenes = timing.scenes.filter((scene) => scene.composition === "C10");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S31,S32,S33") throw new Error(`C10 scene map mismatch: ${sceneIds}`);
if (composition.startFrame !== 10065 || composition.endFrame !== 10791 || composition.durationFrames !== 726) throw new Error("C10 timing boundary mismatch");

const start = (id: string) => {
  const scene = scenes.find((item) => item.id === id);
  if (!scene) throw new Error(`Missing ${id}`);
  return scene.startFrame - composition.startFrame;
};

const reveal = (frame: number, id: string) => value(frame, [start(id), start(id) + 18], [0, 1]);

const Panel: React.FC<{children: React.ReactNode; left: number; top: number; width: number; height: number; accent?: string}> = ({children, left, top, width, height, accent = GRAPHITE}) => (
  <div style={{position: "absolute", left, top, width, height, boxSizing: "border-box", borderRadius: 30, border: `4px solid ${accent}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)", padding: 38}}>
    {children}
  </div>
);

const Phone: React.FC<{blocked: number}> = ({blocked}) => (
  <div style={{position: "relative", width: 260, height: 440, borderRadius: 44, border: `7px solid ${GRAPHITE}`, backgroundColor: GRAPHITE, padding: 14, boxSizing: "border-box", boxShadow: "0 28px 65px rgba(38,50,56,0.23)"}}>
    <div style={{position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 26, background: `linear-gradient(150deg, ${CREAM}, #e6d3ba)`}}>
      <div style={{position: "absolute", top: 12, left: 76, width: 72, height: 12, borderRadius: 6, backgroundColor: GRAPHITE}} />
      <div style={{position: "absolute", left: 28, right: 28, top: 82, height: 82, borderRadius: 20, backgroundColor: `${ORANGE}22`, border: `4px solid ${ORANGE}`, display: "flex", alignItems: "center", justifyContent: "center", color: ORANGE, fontSize: 24, fontWeight: 900}}>WEB</div>
      <div style={{position: "absolute", left: 28, right: 28, top: 205, height: 18, borderRadius: 9, backgroundColor: `${GRAPHITE}18`}} />
      <div style={{position: "absolute", left: 28, width: 125, top: 250, height: 18, borderRadius: 9, backgroundColor: `${GRAPHITE}18`}} />
      <div style={{position: "absolute", left: 24, right: 24, top: 118, height: 12, opacity: blocked, borderRadius: 6, backgroundColor: RED, transform: "rotate(-24deg)", transformOrigin: "center center"}} />
      <div style={{position: "absolute", left: 32, right: 32, bottom: 45, opacity: blocked, textAlign: "center", color: RED, fontSize: 19, fontWeight: 900, letterSpacing: 2}}>PATH BLOCKED</div>
    </div>
  </div>
);

const FlowBox: React.FC<{label: string; detail: string; left: number; accent: string; progress: number}> = ({label, detail, left, accent, progress}) => (
  <div style={{position: "absolute", left, top: 440, width: 430, height: 270, boxSizing: "border-box", opacity: progress, transform: `translateY(${(1 - progress) * 30}px)`, borderRadius: 28, border: `4px solid ${accent}`, backgroundColor: CREAM, padding: 36, boxShadow: "0 22px 55px rgba(38,50,56,0.14)"}}>
    <div style={{color: accent, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>{label}</div>
    <div style={{marginTop: 42, fontSize: 31, lineHeight: 1.12, fontWeight: 900}}>{detail}</div>
  </div>
);

export const CompositionC10: React.FC = () => {
  const frame = useCurrentFrame();
  const p31 = frame - start("S31");
  const p32 = frame - start("S32");
  const p33 = frame - start("S33");
  const reach = value(p31, [24, 95], [0, 1]);
  const blocked = value(p31, [75, 130], [0, 1]);
  const impulse = value(p32, [15, 55], [0, 1]);
  const decision = value(p32, [55, 105], [0, 1]);
  const app = value(p32, [105, 155], [0, 1]);
  const collapse = value(p33, [8, 55], [0, 1]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 22% 55%, rgba(242,138,58,0.12), transparent 34%), radial-gradient(circle at 78% 48%, rgba(85,117,104,0.13), transparent 35%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />

      <AbsoluteFill style={{opacity: reveal(frame, "S31"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>WHAT STRONGER FRICTION CHANGES</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 67, lineHeight: 0.98, fontWeight: 900}}>THE REACH STILL HAPPENS.<br /><span style={{color: RED}}>THE INSTANT PATH DOES NOT.</span></div>

        <Panel left={105} top={405} width={1710} height={480} accent={ORANGE}>
          <div style={{position: "absolute", left: 85, top: 180, width: 260, height: 120, opacity: reach, transform: `translateX(${reach * 260}px)`}}>
            <div style={{position: "absolute", left: 0, top: 32, width: 210, height: 18, borderRadius: 9, backgroundColor: ORANGE}} />
            <div style={{position: "absolute", left: 195, top: 9, width: 0, height: 0, borderTop: "32px solid transparent", borderBottom: "32px solid transparent", borderLeft: `58px solid ${ORANGE}`}} />
            <div style={{position: "absolute", left: 0, top: 78, width: 250, textAlign: "center", color: GRAPHITE, fontSize: 22, fontWeight: 900, letterSpacing: 3}}>REACH</div>
          </div>

          <div style={{position: "absolute", left: 660, top: 20}}>
            <Phone blocked={blocked} />
          </div>

          <div style={{position: "absolute", left: 1050, top: 105, width: 520, height: 245, boxSizing: "border-box", borderRadius: 26, border: `4px solid ${RED}`, backgroundColor: `${RED}0f`, padding: 34, opacity: blocked}}>
            <div style={{color: RED, fontSize: 23, fontWeight: 900, letterSpacing: 4}}>INSTANT ACCESS</div>
            <div style={{marginTop: 40, maxWidth: 420, fontSize: 38, lineHeight: 1.05, fontWeight: 900}}>REQUIRES A DECISION</div>
          </div>
        </Panel>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S32"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: GREEN, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>FRICTION CREATES A MOMENT</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 67, lineHeight: 0.98, fontWeight: 900}}>A DIFFERENT DECISION<br /><span style={{color: ORANGE}}>BECOMES POSSIBLE.</span></div>

        <FlowBox label="1 · IMPULSE" detail="THE REACH BEGINS" left={105} accent={ORANGE} progress={impulse} />
        <div style={{position: "absolute", left: 560, top: 525, opacity: decision, color: GRAPHITE, fontSize: 66, fontWeight: 900}}>&rarr;</div>
        <FlowBox label="2 · DECISION" detail="NOTICE AND CHOOSE" left={700} accent={GREEN} progress={decision} />
        <div style={{position: "absolute", left: 1155, top: 525, opacity: app, color: GRAPHITE, fontSize: 66, fontWeight: 900}}>&rarr;</div>
        <FlowBox label="3 · ACTION" detail="CONTINUE OR OPEN DELIBERATELY" left={1290} accent={ORANGE} progress={app} />

        <div style={{position: "absolute", left: 700, top: 748, width: 430, height: 105, boxSizing: "border-box", opacity: decision, borderRadius: 22, backgroundColor: GREEN, color: CREAM, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: 23, lineHeight: 1.2, fontWeight: 900, letterSpacing: 2}}>THE MISSING STEP<br />IS NOW VISIBLE</div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S33"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>A SMALLER TEST</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 68, lineHeight: 0.98, fontWeight: 900}}>NOT TWO WEEKS.<br /><span style={{color: GREEN}}>ONE WORK SESSION.</span></div>

        <div style={{position: "absolute", left: 160, top: 435, width: 610, height: 360, boxSizing: "border-box", opacity: 1 - collapse * 0.72, transform: `scale(${1 - collapse * 0.18})`, borderRadius: 30, border: `4px solid ${RED}`, backgroundColor: `${RED}0d`, padding: 42}}>
          <div style={{color: RED, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>RESEARCH INTERVENTION</div>
          <div style={{marginTop: 62, fontSize: 82, fontWeight: 900}}>2 WEEKS</div>
          <div style={{marginTop: 48, display: "grid", gridTemplateColumns: "repeat(7, 46px)", gap: 20}}>
            {Array.from({length: 14}).map((_, index) => <div key={index} style={{width: 40, height: 40, borderRadius: 11, backgroundColor: index < Math.round(collapse * 14) ? `${RED}28` : RED}} />)}
          </div>
        </div>

        <div style={{position: "absolute", left: 850, top: 555, color: ORANGE, fontSize: 92, fontWeight: 900, transform: `translateX(${collapse * 45}px)`}}>&rarr;</div>

        <div style={{position: "absolute", left: 1080, top: 400, width: 650, height: 430, boxSizing: "border-box", opacity: collapse, transform: `scale(${0.82 + collapse * 0.18})`, borderRadius: 34, border: `5px solid ${GREEN}`, backgroundColor: CREAM, boxShadow: "0 30px 75px rgba(38,50,56,0.18)", padding: 44}}>
          <div style={{color: GREEN, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>ORDINARY WORK SESSION</div>
          <div style={{marginTop: 44, textAlign: "center", color: GRAPHITE, fontSize: 122, lineHeight: 1, fontWeight: 900}}>25:00</div>
          <div style={{marginTop: 42, height: 18, borderRadius: 9, backgroundColor: `${GRAPHITE}16`}}>
            <div style={{width: `${collapse * 100}%`, height: "100%", borderRadius: 9, backgroundColor: GREEN}} />
          </div>
          <div style={{marginTop: 38, textAlign: "center", color: ORANGE, fontSize: 25, fontWeight: 900, letterSpacing: 3}}>ONE TASK · ONE BLOCK</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
