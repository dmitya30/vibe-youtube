import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {timing} from "./timing";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";
const RED = "#c85b4a";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
const composition = timing.compositions.find((item) => item.id === "C11");
if (!composition) throw new Error("C11 timing missing");
const scenes = timing.scenes.filter((scene) => scene.composition === "C11");
const sceneIds = scenes.map((scene) => scene.id).join(",");
if (sceneIds !== "S34,S35") throw new Error(`C11 scene map mismatch: ${sceneIds}`);
if (composition.startFrame !== 10791 || composition.endFrame !== 11938 || composition.durationFrames !== 1147) throw new Error("C11 timing boundary mismatch");

const start = (id: string) => {
  const scene = scenes.find((item) => item.id === id);
  if (!scene) throw new Error(`Missing ${id}`);
  return scene.startFrame - composition.startFrame;
};

const reveal = (frame: number, id: string) => value(frame, [start(id), start(id) + 18], [0, 1]);

const Panel: React.FC<{children: React.ReactNode; left: number; top: number; width: number; height: number; accent?: string; opacity?: number}> = ({children, left, top, width, height, accent = GRAPHITE, opacity = 1}) => (
  <div style={{position: "absolute", left, top, width, height, opacity, boxSizing: "border-box", borderRadius: 30, border: `4px solid ${accent}`, backgroundColor: CREAM, boxShadow: "0 25px 65px rgba(38,50,56,0.15)", padding: 38}}>
    {children}
  </div>
);

const Document: React.FC<{progress: number}> = ({progress}) => (
  <div style={{position: "relative", width: 500, height: 410, boxSizing: "border-box", borderRadius: 24, border: `4px solid ${GRAPHITE}`, backgroundColor: "#fffaf1", padding: 42, boxShadow: "0 24px 55px rgba(38,50,56,0.17)"}}>
    <div style={{color: ORANGE, fontSize: 20, fontWeight: 900, letterSpacing: 4}}>ONE DOCUMENT</div>
    <div style={{marginTop: 28, width: 310, height: 22, borderRadius: 11, backgroundColor: GRAPHITE}} />
    {[0, 1, 2, 3, 4, 5].map((index) => (
      <div key={index} style={{marginTop: index === 0 ? 38 : 22, width: index === 5 ? 255 : index % 2 === 0 ? 395 : 350, height: 12, borderRadius: 6, backgroundColor: `${GRAPHITE}${index < Math.floor(progress * 7) ? "70" : "18"}`}} />
    ))}
    <div style={{position: "absolute", left: 42, right: 42, bottom: 38, height: 16, borderRadius: 8, backgroundColor: `${GRAPHITE}16`}}>
      <div style={{width: `${progress * 100}%`, height: "100%", borderRadius: 8, backgroundColor: GREEN}} />
    </div>
  </div>
);

const Timer: React.FC<{progress: number}> = ({progress}) => (
  <div style={{position: "relative", width: 330, height: 330, borderRadius: "50%", background: `conic-gradient(${GREEN} ${progress * 330}deg, ${GRAPHITE}18 0deg)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 24px 60px rgba(38,50,56,0.17)"}}>
    <div style={{width: 265, height: 265, borderRadius: "50%", backgroundColor: CREAM, border: `4px solid ${GREEN}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <div style={{color: GREEN, fontSize: 20, fontWeight: 900, letterSpacing: 4}}>ONE BLOCK</div>
      <div style={{marginTop: 20, color: GRAPHITE, fontSize: 72, lineHeight: 1, fontWeight: 900}}>25:00</div>
      <div style={{marginTop: 22, color: ORANGE, fontSize: 19, fontWeight: 900, letterSpacing: 3}}>FOCUS TIMER</div>
    </div>
  </div>
);

const MutedPath: React.FC<{label: string; top: number; opacity: number}> = ({label, top, opacity}) => (
  <div style={{position: "absolute", left: 62, top, width: 350, height: 74, opacity, boxSizing: "border-box", borderRadius: 18, border: `3px solid ${RED}`, color: RED, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, letterSpacing: 3}}>
    {label}
    <div style={{position: "absolute", left: 35, right: 35, top: 33, height: 7, borderRadius: 4, backgroundColor: RED}} />
  </div>
);

export const CompositionC11: React.FC = () => {
  const frame = useCurrentFrame();
  const p34 = frame - start("S34");
  const p35 = frame - start("S35");
  const documentProgress = value(p34, [30, 230], [0.12, 0.82]);
  const timerProgress = value(p34, [60, 250], [0.08, 0.78]);
  const finishReveal = value(p34, [115, 185], [0, 1]);
  const mutedReveal = value(p35, [25, 105], [0, 1]);
  const contactReveal = value(p35, [90, 165], [0, 1]);
  const routeProgress = value(p35, [145, 235], [0, 1]);
  const pulse = value(p35 % 90, [0, 45, 90], [0.72, 1, 0.72]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 20% 55%, rgba(242,138,58,0.11), transparent 34%), radial-gradient(circle at 80% 50%, rgba(85,117,104,0.13), transparent 36%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />

      <AbsoluteFill style={{opacity: reveal(frame, "S34"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>SET THE TEST</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 68, lineHeight: 0.98, fontWeight: 900}}>ONE TASK.<br /><span style={{color: GREEN}}>ONE 25-MINUTE BLOCK.</span></div>

        <Panel left={100} top={400} width={1720} height={535} accent={ORANGE}>
          <div style={{position: "absolute", left: 70, top: 58}}>
            <Document progress={documentProgress} />
          </div>

          <div style={{position: "absolute", left: 685, top: 100, opacity: finishReveal}}>
            <div style={{color: ORANGE, fontSize: 23, fontWeight: 900, letterSpacing: 4}}>CLEAR FINISH LINE</div>
            <div style={{position: "relative", marginTop: 50, width: 310, height: 145}}>
              <div style={{position: "absolute", left: 0, top: 65, width: 250, height: 14, borderRadius: 7, backgroundColor: ORANGE}} />
              <div style={{position: "absolute", right: 0, top: 39, width: 0, height: 0, borderTop: "33px solid transparent", borderBottom: "33px solid transparent", borderLeft: `60px solid ${ORANGE}`}} />
              <div style={{position: "absolute", right: -40, top: 0, width: 13, height: 145, backgroundColor: GRAPHITE}} />
              <div style={{position: "absolute", right: -95, top: 0, width: 55, height: 55, background: `repeating-conic-gradient(${GRAPHITE} 0 25%, ${CREAM} 0 50%) 0 0 / 28px 28px`, border: `3px solid ${GRAPHITE}`}} />
            </div>
          </div>

          <div style={{position: "absolute", right: 82, top: 78}}>
            <Timer progress={timerProgress} />
          </div>
        </Panel>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: reveal(frame, "S35"), backgroundColor: CREAM}}>
        <div style={{position: "absolute", left: 85, top: 54, color: GREEN, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>SELECTIVE FRICTION</div>
        <div style={{position: "absolute", left: 95, top: 145, width: 1700, fontSize: 66, lineHeight: 0.98, fontWeight: 900}}>CLOSE THE DISTRACTION PATH.<br /><span style={{color: GREEN}}>KEEP NECESSARY CONTACT OPEN.</span></div>

        <Panel left={100} top={405} width={500} height={530} accent={RED}>
          <div style={{color: RED, fontSize: 22, fontWeight: 900, letterSpacing: 4}}>CLOSED DURING SESSION</div>
          <MutedPath label="FEEDS" top={115} opacity={mutedReveal} />
          <MutedPath label="BROWSING" top={220} opacity={mutedReveal} />
          <MutedPath label="AUTOMATIC CHECKING" top={325} opacity={mutedReveal} />
          <div style={{position: "absolute", left: 62, right: 62, bottom: 35, color: RED, textAlign: "center", fontSize: 20, fontWeight: 900, letterSpacing: 2}}>DISTRACTION ROUTES PAUSE</div>
        </Panel>

        <div style={{position: "absolute", left: 650, top: 610, width: 250, height: 18, borderRadius: 9, backgroundColor: `${GRAPHITE}16`, opacity: contactReveal}}>
          <div style={{width: `${routeProgress * 100}%`, height: "100%", borderRadius: 9, backgroundColor: GREEN}} />
          <div style={{position: "absolute", right: -20, top: -19, width: 0, height: 0, borderTop: "28px solid transparent", borderBottom: "28px solid transparent", borderLeft: `48px solid ${GREEN}`}} />
          <div style={{position: "absolute", left: 18, top: 40, width: 240, color: GREEN, fontSize: 18, fontWeight: 900, letterSpacing: 3}}>NECESSARY CONTACT</div>
        </div>

        <Panel left={950} top={405} width={870} height={530} accent={GREEN} opacity={contactReveal}>
          <div style={{color: GREEN, fontSize: 22, fontWeight: 900, letterSpacing: 4}}>EMERGENCY ROUTE REMAINS AVAILABLE</div>

          <div style={{position: "absolute", left: 60, top: 125, width: 250, height: 320, boxSizing: "border-box", borderRadius: 38, border: `6px solid ${GRAPHITE}`, backgroundColor: GRAPHITE, padding: 13}}>
            <div style={{position: "relative", width: "100%", height: "100%", borderRadius: 22, backgroundColor: CREAM, overflow: "hidden"}}>
              <div style={{position: "absolute", left: 70, top: 12, width: 80, height: 11, borderRadius: 6, backgroundColor: GRAPHITE}} />
              <div style={{position: "absolute", left: 30, right: 30, top: 80, height: 92, borderRadius: 46, backgroundColor: GREEN, display: "flex", alignItems: "center", justifyContent: "center", color: CREAM, fontSize: 44, fontWeight: 900, transform: `scale(${pulse})`}}>☎</div>
              <div style={{position: "absolute", left: 25, right: 25, bottom: 54, color: GREEN, textAlign: "center", fontSize: 18, lineHeight: 1.2, fontWeight: 900, letterSpacing: 2}}>ALLOWED<br />CONTACT</div>
            </div>
          </div>

          <div style={{position: "absolute", left: 390, top: 145, width: 410}}>
            <div style={{fontSize: 43, lineHeight: 1.05, fontWeight: 900}}>NOT TOTAL<br />ISOLATION.</div>
            <div style={{marginTop: 50, padding: "26px 30px", borderRadius: 20, backgroundColor: GREEN, color: CREAM, fontSize: 24, lineHeight: 1.2, fontWeight: 900}}>CALLS FROM NECESSARY CONTACTS STAY AVAILABLE.</div>
            <div style={{marginTop: 35, color: ORANGE, fontSize: 20, lineHeight: 1.3, fontWeight: 900, letterSpacing: 2}}>FRICTION TARGETS THE AUTOMATIC DETOUR.</div>
          </div>
        </Panel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
