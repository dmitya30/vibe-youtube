import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";
const RED = "#c85b4a";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

const Phone: React.FC<{signal?: number; scale?: number}> = ({signal = 0, scale = 1}) => (
  <div style={{position: "relative", width: 250, height: 500, transform: `scale(${scale})`, transformOrigin: "center center"}}>
    <div style={{position: "absolute", inset: 0, borderRadius: 42, backgroundColor: GRAPHITE, border: `7px solid ${GRAPHITE}`, boxShadow: `0 25px 60px rgba(38,50,56,0.27), 0 0 ${55 * signal}px rgba(242,138,58,${0.34 * signal})`, padding: 15}}>
      <div style={{position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 27, background: `linear-gradient(155deg, ${CREAM}, #e8d7bf)`}}>
        <div style={{position: "absolute", top: 14, left: 76, width: 70, height: 13, borderRadius: 7, backgroundColor: GRAPHITE}} />
        <div style={{position: "absolute", left: 28, right: 28, top: 118, height: 190, borderRadius: 24, border: `3px solid ${GREEN}`, backgroundColor: "rgba(85,117,104,0.09)", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div style={{width: 82, height: 82, borderRadius: "50%", border: `9px solid ${GREEN}`, opacity: 0.8}} />
        </div>
        <div style={{position: "absolute", left: 45, right: 45, bottom: 54, height: 14, borderRadius: 7, backgroundColor: `${GRAPHITE}28`}} />
      </div>
    </div>
  </div>
);

const LabTask: React.FC<{frame: number}> = ({frame}) => {
  const disruption = value(frame, [170, 205, 300, 335], [0, 1, 1, 0]);
  const notificationX = value(frame, [170, 250], [1210, 480]);
  const target = Math.min(11, Math.floor(Math.max(0, frame - 40) / 38));
  return (
    <div style={{position: "absolute", left: 90, right: 90, top: 300, bottom: 105}}>
      <div style={{position: "absolute", left: 0, top: 0, width: 1110, height: 610, borderRadius: 34, border: `4px solid ${GRAPHITE}`, backgroundColor: "rgba(248,237,221,0.96)", boxShadow: "0 28px 75px rgba(38,50,56,0.16)", padding: "46px 52px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div style={{color: GREEN, fontSize: 23, fontWeight: 900, letterSpacing: 4}}>SUSTAINED-ATTENTION TASK</div>
          <div style={{padding: "10px 20px", borderRadius: 18, backgroundColor: `${GREEN}18`, color: GREEN, fontSize: 18, fontWeight: 900}}>PHONE UNTOUCHED</div>
        </div>
        <div style={{marginTop: 58, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 30}}>
          {Array.from({length: 12}).map((_, index) => {
            const active = index === target;
            const completed = index < target;
            return <div key={index} style={{height: 92, borderRadius: 21, border: `4px solid ${active ? ORANGE : GRAPHITE}`, backgroundColor: active ? `rgba(242,138,58,${0.18 + disruption * 0.22})` : completed ? `${GREEN}24` : `${GRAPHITE}0b`, display: "flex", alignItems: "center", justifyContent: "center", transform: active ? `translate(${disruption * 18}px, ${disruption * -12}px) rotate(${disruption * 5}deg)` : "none"}}>
              <div style={{width: active ? 33 : 24, height: active ? 33 : 24, borderRadius: active ? 5 : "50%", backgroundColor: active ? ORANGE : completed ? GREEN : `${GRAPHITE}35`}} />
            </div>;
          })}
        </div>
        <div style={{position: "absolute", left: 52, right: 52, bottom: 44, height: 15, borderRadius: 8, backgroundColor: `${GRAPHITE}18`}}>
          <div style={{height: "100%", width: `${Math.min(100, frame / 5.5)}%`, borderRadius: 8, backgroundColor: GREEN}} />
        </div>
      </div>
      <div style={{position: "absolute", right: 0, top: 0, width: 565, height: 610, borderRadius: 34, border: `4px solid ${GRAPHITE}`, backgroundColor: "rgba(248,237,221,0.96)", boxShadow: "0 28px 75px rgba(38,50,56,0.16)", padding: "42px"}}>
        <div style={{fontSize: 21, color: ORANGE, fontWeight: 900, letterSpacing: 3}}>PERFORMANCE TRACE</div>
        <svg viewBox="0 0 480 250" style={{position: "absolute", left: 42, top: 120, width: 480, height: 250}}>
          <line x1="15" y1="220" x2="465" y2="220" stroke={GRAPHITE} strokeWidth="4" opacity="0.25" />
          <line x1="15" y1="20" x2="15" y2="220" stroke={GRAPHITE} strokeWidth="4" opacity="0.25" />
          <polyline points="15,78 75,72 135,82 195,68 255,76 315,70 375,80 465,72" fill="none" stroke={GREEN} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="230,75 275,122 320,174 370,147 420,126 465,108" fill="none" stroke={ORANGE} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" opacity={disruption} />
          <circle cx="270" cy="116" r="15" fill={ORANGE} opacity={disruption} />
        </svg>
        <div style={{position: "absolute", left: 48, top: 405, color: RED, opacity: disruption, fontSize: 23, fontWeight: 900, letterSpacing: 3}}>ATTENTION DISRUPTED</div>
        <div style={{position: "absolute", left: 48, bottom: 48, width: 455, fontSize: 23, lineHeight: 1.35, fontWeight: 800, opacity: 0.67}}>The phone does not need to be touched for the incoming signal to affect the task.</div>
      </div>
      <div style={{position: "absolute", left: notificationX, top: 262, width: 70, height: 70, opacity: disruption, borderRadius: "50%", backgroundColor: ORANGE, border: `6px solid ${GRAPHITE}`, boxShadow: "0 0 0 20px rgba(242,138,58,0.16), 0 0 0 42px rgba(242,138,58,0.07)"}} />
    </div>
  );
};

const HandHoldingPhone: React.FC = () => (
  <div style={{position: "relative", width: 620, height: 790}}>
    <div style={{position: "absolute", left: 150, top: 455, width: 430, height: 210, borderRadius: "105px 115px 90px 80px", backgroundColor: "#d9ae7f", border: `6px solid ${GRAPHITE}`, transform: "rotate(-16deg)", boxShadow: "0 28px 60px rgba(38,50,56,0.22)"}} />
    <div style={{position: "absolute", left: 90, top: 560, width: 330, height: 180, borderRadius: "88px 40px 40px 88px", backgroundColor: GREEN, border: `6px solid ${GRAPHITE}`, transform: "rotate(-16deg)"}} />
    <div style={{position: "absolute", left: 180, top: 170, zIndex: 2}}><Phone scale={1.18} /></div>
    {[0, 1, 2, 3].map((index) => <div key={index} style={{position: "absolute", zIndex: 3, left: 448, top: 292 + index * 72, width: 120, height: 58, borderRadius: 30, backgroundColor: "#ddb487", border: `5px solid ${GRAPHITE}`, transform: `rotate(${-9 + index * 2}deg)`}} />)}
    <div style={{position: "absolute", zIndex: 3, left: 112, top: 420, width: 175, height: 74, borderRadius: 38, backgroundColor: "#ddb487", border: `5px solid ${GRAPHITE}`, transform: "rotate(-31deg)"}} />
  </div>
);

export const CompositionC04: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneEleven = value(frame, [0, 18, 594, 612], [0, 1, 1, 0]);
  const sceneTwelve = value(frame, [612, 630, 928, 946], [0, 1, 1, 0]);
  const sceneThirteen = value(frame, [946, 964], [0, 1]);
  const externalSignal = 1 - value(frame, [670, 735], [0, 1]);
  const checkingLoop = value(frame, [650, 705], [0, 1]);
  const matchScale = value(frame, [946, 995], [0.86, 1]);
  const matchX = value(frame, [946, 995], [80, 0]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 78% 45%, rgba(85,117,104,0.14), transparent 36%), radial-gradient(circle at 24% 46%, rgba(242,138,58,0.11), transparent 38%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />
      <div style={{position: "absolute", left: 85, top: 54, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>NOTIFICATIONS CAN INTERRUPT</div>

      <div style={{position: "absolute", inset: 0, opacity: sceneEleven}}>
        <div style={{position: "absolute", left: 90, top: 125, width: 1510, fontSize: 66, lineHeight: 0.98, fontWeight: 900}}>A SIGNAL CAN BREAK ATTENTION<br /><span style={{color: ORANGE}}>WITHOUT A SINGLE TAP.</span></div>
        <LabTask frame={frame} />
      </div>

      <div style={{position: "absolute", inset: 0, opacity: sceneTwelve}}>
        <div style={{position: "absolute", left: 100, top: 135, width: 1040, fontSize: 72, lineHeight: 0.98, fontWeight: 900}}>SILENCE REMOVES THE SIGNAL.<br /><span style={{color: ORANGE}}>CHECKING CAN REMAIN.</span></div>
        <div style={{position: "absolute", left: 170, top: 420, width: 650, height: 410, borderRadius: 32, border: `4px solid ${GRAPHITE}`, backgroundColor: "rgba(248,237,221,0.94)", boxShadow: "0 25px 65px rgba(38,50,56,0.15)"}}>
          <div style={{position: "absolute", left: 0, right: 0, top: 42, textAlign: "center", fontSize: 22, fontWeight: 900, letterSpacing: 4}}>EXTERNAL SIGNALS</div>
          <div style={{position: "absolute", left: 275, top: 145, width: 100, height: 110, opacity: externalSignal}}>
            <div style={{position: "absolute", left: 21, top: 0, width: 58, height: 72, borderRadius: "32px 32px 15px 15px", backgroundColor: ORANGE, border: `5px solid ${GRAPHITE}`}} />
            <div style={{position: "absolute", left: 8, top: 70, width: 84, height: 15, borderRadius: 8, backgroundColor: GRAPHITE}} />
            <div style={{position: "absolute", left: 39, top: 88, width: 22, height: 22, borderRadius: "50%", backgroundColor: GRAPHITE}} />
          </div>
          <div style={{position: "absolute", left: 100, right: 100, bottom: 70, height: 12, backgroundColor: `${GRAPHITE}18`, borderRadius: 6}}><div style={{width: `${externalSignal * 100}%`, height: "100%", borderRadius: 6, backgroundColor: ORANGE}} /></div>
          <div style={{position: "absolute", left: 0, right: 0, bottom: 27, textAlign: "center", color: externalSignal > 0.2 ? ORANGE : GREEN, fontSize: 20, fontWeight: 900}}>{externalSignal > 0.2 ? "ACTIVE" : "REMOVED"}</div>
        </div>
        <div style={{position: "absolute", right: 170, top: 420, width: 650, height: 410, borderRadius: 32, border: `4px solid ${GRAPHITE}`, backgroundColor: "rgba(248,237,221,0.94)", boxShadow: "0 25px 65px rgba(38,50,56,0.15)"}}>
          <div style={{position: "absolute", left: 0, right: 0, top: 42, textAlign: "center", fontSize: 22, fontWeight: 900, letterSpacing: 4}}>SELF-CREATED CHECK</div>
          <div style={{position: "absolute", left: 255, top: 105, transform: `scale(${0.62 + checkingLoop * 0.08})`}}><Phone /></div>
          <div style={{position: "absolute", left: 210, top: 110, width: 230, height: 230, borderRadius: "50%", border: `10px dashed ${GREEN}`, opacity: checkingLoop, transform: `rotate(${frame * 0.16}deg)`}} />
          <div style={{position: "absolute", left: 0, right: 0, bottom: 27, textAlign: "center", color: GREEN, fontSize: 20, fontWeight: 900}}>PATH STILL AVAILABLE</div>
        </div>
      </div>

      <div style={{position: "absolute", inset: 0, opacity: sceneThirteen}}>
        <div style={{position: "absolute", left: 105, top: 160, width: 890}}>
          <div style={{fontSize: 78, lineHeight: 0.96, fontWeight: 900}}>NO BUZZ.<br />NO BANNER.<br /><span style={{color: ORANGE}}>PHONE ALREADY IN HAND.</span></div>
          <div style={{marginTop: 52, width: 720, fontSize: 31, lineHeight: 1.36, fontWeight: 700, opacity: 0.72}}>Silent checking does not feel like an interruption. That is exactly why it is easy to miss.</div>
          <div style={{marginTop: 58, display: "inline-block", padding: "18px 28px", borderRadius: 20, backgroundColor: `${GREEN}18`, border: `3px solid ${GREEN}`, color: GREEN, fontSize: 22, fontWeight: 900, letterSpacing: 3}}>EXTERNAL SIGNAL: NONE</div>
        </div>
        <div style={{position: "absolute", right: 130 + matchX, top: 140, transform: `scale(${matchScale})`, transformOrigin: "center center"}}><HandHoldingPhone /></div>
      </div>

    </AbsoluteFill>
  );
};
