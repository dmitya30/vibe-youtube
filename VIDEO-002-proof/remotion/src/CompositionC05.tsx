import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";
const RED = "#c85b4a";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const composition = timing.compositions.find((item) => item.id === "C05");
if (!composition) throw new Error("C05 timing missing");
const scenes = timing.scenes.filter((scene) => scene.composition === "C05");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S14,S15,S16,S17,S18") throw new Error(`C05 scene map mismatch: ${sceneIds}`);
const start = (id: string) => {
  const scene = scenes.find((item) => item.id === id);
  if (!scene) throw new Error(`Missing ${id}`);
  return scene.startFrame - composition.startFrame;
};
const reveal = (frame: number, id: string) => value(frame, [start(id), start(id) + 18], [0, 1]);

const Panel: React.FC<{children: React.ReactNode; left: number; top: number; width: number; height: number}> = ({children, left, top, width, height}) => (
  <div style={{position: "absolute", left, top, width, height, boxSizing: "border-box", borderRadius: 32, border: `4px solid ${GRAPHITE}`, backgroundColor: "rgba(248,237,221,0.97)", boxShadow: "0 26px 70px rgba(38,50,56,0.16)", padding: 38}}>{children}</div>
);

const Phone: React.FC<{quiet?: boolean}> = ({quiet = false}) => (
  <div style={{position: "relative", width: 270, height: 540, borderRadius: 45, backgroundColor: GRAPHITE, border: `7px solid ${GRAPHITE}`, boxShadow: "0 28px 65px rgba(38,50,56,0.25)", padding: 16}}>
    <div style={{position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 29, background: `linear-gradient(155deg, ${CREAM}, #e7d5bc)`}}>
      <div style={{position: "absolute", top: 14, left: 82, width: 72, height: 13, borderRadius: 7, backgroundColor: GRAPHITE}} />
      <div style={{position: "absolute", left: 35, right: 35, top: 128, height: 180, borderRadius: 24, border: `3px solid ${quiet ? GRAPHITE : ORANGE}`, opacity: quiet ? 0.25 : 1}} />
      <div style={{position: "absolute", left: 50, right: 50, bottom: 62, height: 14, borderRadius: 7, backgroundColor: `${GRAPHITE}25`}} />
    </div>
  </div>
);

const MetricBar: React.FC<{label: string; before: number; after: number; delay: number; frame: number}> = ({label, before, after, delay, frame}) => {
  const progress = value(frame, [delay, delay + 28], [0, 1]);
  return (
    <div style={{marginTop: 34}}>
      <div style={{fontSize: 23, fontWeight: 900, letterSpacing: 2}}>{label}</div>
      <div style={{marginTop: 16, display: "grid", gridTemplateColumns: "120px 1fr", alignItems: "center", gap: 18}}>
        <div style={{fontSize: 18, fontWeight: 900, color: GREEN}}>BASELINE</div>
        <div style={{height: 22, borderRadius: 11, backgroundColor: `${GRAPHITE}15`}}><div style={{height: "100%", width: `${before}%`, borderRadius: 11, backgroundColor: GREEN}} /></div>
        <div style={{fontSize: 18, fontWeight: 900, color: ORANGE}}>SILENT</div>
        <div style={{height: 22, borderRadius: 11, backgroundColor: `${GRAPHITE}15`}}><div style={{height: "100%", width: `${before + (after - before) * progress}%`, borderRadius: 11, backgroundColor: ORANGE}} /></div>
      </div>
    </div>
  );
};

export const CompositionC05: React.FC = () => {
  const frame = useCurrentFrame();
  const p14 = frame - start("S14");
  const p15 = frame - start("S15");
  const p18 = frame - start("S18");
  const logProgress = value(p15, [25, 150], [0, 1]);
  const bubbleFade = 1 - value(p15, [65, 115], [0, 1]);
  const fomo = value(p18, [25, 90], [0, 1]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 78% 46%, rgba(85,117,104,0.14), transparent 36%), radial-gradient(circle at 24% 46%, rgba(242,138,58,0.11), transparent 38%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />

      <AbsoluteFill style={{opacity: reveal(frame, "S14"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>THE NOTIFICATION-FREE WEEK</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 72, lineHeight: 0.98, fontWeight: 900}}>A PREREGISTERED STUDY.<br /><span style={{color: ORANGE}}>205 PEOPLE. ONE WEEK.</span></div>
        <Panel left={95} top={410} width={1730} height={485}>
          <div style={{display: "flex", height: "100%", alignItems: "center", justifyContent: "space-around"}}>
            <div style={{textAlign: "center"}}><div style={{fontSize: 150, fontWeight: 900, color: GREEN}}>205</div><div style={{fontSize: 25, fontWeight: 900, letterSpacing: 4}}>PARTICIPANTS</div></div>
            <div style={{height: 300, width: 4, backgroundColor: `${GRAPHITE}20`}} />
            <div style={{position: "relative", width: 520, height: 280}}>
              <div style={{position: "absolute", left: 0, top: 20, fontSize: 25, color: ORANGE, fontWeight: 900, letterSpacing: 4}}>SEVEN-DAY INTERVENTION</div>
              <div style={{position: "absolute", left: 0, right: 0, top: 115, height: 14, borderRadius: 7, backgroundColor: `${GRAPHITE}18`}}><div style={{height: "100%", width: `${Math.min(100, p14 / 2.4)}%`, borderRadius: 7, backgroundColor: ORANGE}} /></div>
              <div style={{position: "absolute", left: 0, right: 0, top: 155, display: "flex", justifyContent: "space-between", fontSize: 21, fontWeight: 900}}>{[1,2,3,4,5,6,7].map((day) => <span key={day}>{day}</span>)}</div>
            </div>
            <div style={{height: 300, width: 4, backgroundColor: `${GRAPHITE}20`}} />
            <div style={{width: 420, textAlign: "center"}}><div style={{fontSize: 35, fontWeight: 900}}>NOTIFICATIONS</div><div style={{marginTop: 35, display: "inline-block", padding: "20px 40px", borderRadius: 24, backgroundColor: `${GRAPHITE}12`, border: `4px solid ${GRAPHITE}`, fontSize: 42, color: ORANGE, fontWeight: 900}}>OFF</div></div>
          </div>
        </Panel>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S15"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>HOW CHECKING WAS MEASURED</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1100, fontSize: 76, lineHeight: 0.98, fontWeight: 900}}>OBJECTIVE PHONE LOGS<br /><span style={{color: ORANGE}}>REPLACE THE GUESS.</span></div>
        <Panel left={100} top={400} width={680} height={485}>
          <div style={{fontSize: 24, fontWeight: 900, letterSpacing: 4}}>SELF-ESTIMATE</div>
          <div style={{position: "absolute", left: 110, top: 145, width: 455, padding: "38px", opacity: bubbleFade, borderRadius: "55px 55px 55px 10px", backgroundColor: `${GRAPHITE}10`, border: `4px dashed ${GRAPHITE}70`, fontSize: 32, lineHeight: 1.25, fontWeight: 800}}>I THINK I CHECKED<br />ABOUT THIS MUCH.</div>
          <div style={{position: "absolute", left: 60, right: 60, bottom: 45, color: RED, opacity: 1 - bubbleFade, textAlign: "center", fontSize: 22, fontWeight: 900, letterSpacing: 3}}>ESTIMATE REMOVED</div>
        </Panel>
        <Panel left={840} top={400} width={980} height={485}>
          <div style={{fontSize: 24, color: GREEN, fontWeight: 900, letterSpacing: 4}}>OBJECTIVE EVENT LOG</div>
          <div style={{marginTop: 35}}>
            {[["08:42:16","SCREEN UNLOCK"],["09:05:31","SCREEN UNLOCK"],["09:47:08","SCREEN UNLOCK"],["10:12:44","SCREEN UNLOCK"]].map((row,index) => <div key={row[0]} style={{height: 70, opacity: value(logProgress,[index*0.2,index*0.2+0.18],[0,1]), display: "grid", gridTemplateColumns: "190px 1fr 90px", alignItems: "center", borderBottom: `2px solid ${GRAPHITE}18`, fontSize: 24, fontWeight: 900}}><span style={{color: ORANGE}}>{row[0]}</span><span>{row[1]}</span><span style={{color: GREEN}}>LOGGED</span></div>)}
          </div>
        </Panel>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S16"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>OBJECTIVE OUTCOMES</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1400, fontSize: 76, lineHeight: 0.98, fontWeight: 900}}>THE EXPECTED DROP<br /><span style={{color: ORANGE}}>DID NOT APPEAR CLEARLY.</span></div>
        <Panel left={120} top={390} width={1680} height={500}>
          <div style={{width: 1000}}>
            <MetricBar label="PHONE CHECKS" before={79} after={76} delay={start("S16") + 25} frame={frame} />
            <MetricBar label="TOTAL SCREEN TIME" before={72} after={70} delay={start("S16") + 65} frame={frame} />
          </div>
          <div style={{position: "absolute", right: 65, top: 65, width: 445, height: 330, borderRadius: 28, backgroundColor: `${ORANGE}13`, border: `4px solid ${ORANGE}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
            <div style={{color: ORANGE, fontSize: 25, fontWeight: 900, letterSpacing: 4}}>RESULT</div>
            <div style={{marginTop: 30, fontSize: 44, lineHeight: 1.03, fontWeight: 900}}>NO SIGNIFICANT<br />REDUCTION</div>
            <div style={{marginTop: 24, fontSize: 19, fontWeight: 800, opacity: 0.65}}>NOT THE SAME AS PROVING ZERO EFFECT</div>
          </div>
        </Panel>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S17"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>TWO TYPES OF MEASUREMENT</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1500, fontSize: 74, lineHeight: 0.98, fontWeight: 900}}>THE FEELING CHANGED.<br /><span style={{color: ORANGE}}>THE LOG DID NOT SHOW THE EXPECTED DROP.</span></div>
        <Panel left={120} top={410} width={760} height={460}>
          <div style={{fontSize: 24, color: GREEN, fontWeight: 900, letterSpacing: 4}}>SELF-REPORTED EXPERIENCE</div>
          <div style={{marginTop: 80, display: "flex", alignItems: "center", justifyContent: "center", gap: 35}}>
            <div style={{fontSize: 92, color: GREEN, fontWeight: 900}}>↓</div>
            <div style={{fontSize: 44, lineHeight: 1.05, fontWeight: 900}}>CHECKING FELT<br />LESS HABITUAL</div>
          </div>
        </Panel>
        <Panel left={960} top={410} width={840} height={460}>
          <div style={{fontSize: 24, color: ORANGE, fontWeight: 900, letterSpacing: 4}}>OBJECTIVE PHONE LOG</div>
          <div style={{marginTop: 75, fontSize: 45, lineHeight: 1.08, fontWeight: 900}}>CHECK FREQUENCY</div>
          <div style={{marginTop: 45, height: 30, borderRadius: 15, backgroundColor: `${GRAPHITE}18`}}><div style={{width: "77%", height: "100%", borderRadius: 15, backgroundColor: ORANGE}} /></div>
          <div style={{marginTop: 35, color: ORANGE, fontSize: 26, fontWeight: 900}}>NO SIGNIFICANT REDUCTION</div>
        </Panel>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S18"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>THE COST OF SILENCE</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1100, fontSize: 76, lineHeight: 0.98, fontWeight: 900}}>THE PHONE WAS QUIETER.<br /><span style={{color: ORANGE}}>UNCERTAINTY GREW.</span></div>
        <div style={{position: "absolute", left: 790, top: 410}}><Phone quiet /></div>
        {[["DID SOMETHING ARRIVE?",260,470,-4],["IS SOMEONE WAITING?",1190,420,3],["WHAT AM I MISSING?",1160,700,-2]].map((item,index) => <div key={String(item[0])} style={{position: "absolute", left:Number(item[1]), top:Number(item[2]), width:430, padding:"28px 30px", opacity:value(fomo,[index*0.2,index*0.2+0.22],[0,1]), transform:`rotate(${Number(item[3])}deg)`, borderRadius:24, border:`4px solid ${GRAPHITE}`, backgroundColor:CREAM, boxShadow:"0 20px 50px rgba(38,50,56,0.17)", fontSize:27, fontWeight:900}}>{String(item[0])}</div>)}
        <div style={{position: "absolute", left: 100, top: 920, width: 650, textAlign: "left", color: RED, fontSize: 27, fontWeight: 900, letterSpacing: 4}}>SELF-REPORTED FEAR OF MISSING OUT ↑</div>
      </AbsoluteFill>


    </AbsoluteFill>
  );
};
