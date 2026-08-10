import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";
const RED = "#c85b4a";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

const ToggleRow: React.FC<{label: string; frame: number; delay: number; essential?: boolean}> = ({label, frame, delay, essential = false}) => {
  const switchedOff = essential ? 0 : value(frame, [delay, delay + 18], [0, 1]);
  return (
    <div style={{height: 92, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `2px solid ${GRAPHITE}18`}}>
      <div>
        <div style={{fontSize: 30, fontWeight: 900, letterSpacing: 1}}>{label}</div>
        <div style={{marginTop: 7, color: essential ? GREEN : GRAPHITE, opacity: 0.66, fontSize: 18, fontWeight: 800}}>{essential ? "ESSENTIAL CONTACT" : switchedOff > 0.5 ? "NOTIFICATIONS OFF" : "NOTIFICATIONS ON"}</div>
      </div>
      <div style={{position: "relative", width: 104, height: 54, borderRadius: 28, backgroundColor: essential ? GREEN : switchedOff > 0.5 ? `${GRAPHITE}35` : ORANGE, border: `3px solid ${GRAPHITE}`, boxShadow: "inset 0 2px 8px rgba(38,50,56,0.15)"}}>
        <div style={{position: "absolute", top: 5, left: 5 + (1 - switchedOff) * 50, width: 38, height: 38, borderRadius: "50%", backgroundColor: CREAM, border: `3px solid ${GRAPHITE}`, boxShadow: "0 4px 10px rgba(38,50,56,0.22)"}} />
      </div>
    </div>
  );
};

const Phone: React.FC<{pulse?: number}> = ({pulse = 0}) => (
  <div style={{position: "absolute", width: 310, height: 610, borderRadius: 48, backgroundColor: GRAPHITE, border: `8px solid ${GRAPHITE}`, boxShadow: `0 30px 70px rgba(38,50,56,0.28), 0 0 ${45 * pulse}px rgba(242,138,58,${0.35 * pulse})`, padding: 18}}>
    <div style={{position: "relative", width: "100%", height: "100%", borderRadius: 31, overflow: "hidden", background: `linear-gradient(160deg, ${CREAM}, #eadac3)`}}>
      <div style={{position: "absolute", top: 16, left: 98, width: 78, height: 14, borderRadius: 7, backgroundColor: GRAPHITE}} />
      <div style={{position: "absolute", left: 24, right: 24, top: 105, padding: "24px 20px", borderRadius: 20, backgroundColor: CREAM, border: `3px solid ${ORANGE}`, boxShadow: "0 14px 30px rgba(38,50,56,0.16)"}}>
        <div style={{color: ORANGE, fontSize: 16, fontWeight: 900, letterSpacing: 3}}>MESSAGE</div>
        <div style={{marginTop: 12, height: 12, width: "88%", borderRadius: 6, backgroundColor: `${GRAPHITE}38`}} />
        <div style={{marginTop: 10, height: 12, width: "62%", borderRadius: 6, backgroundColor: `${GRAPHITE}25`}} />
      </div>
    </div>
  </div>
);

const UncertaintyCard: React.FC<{text: string; top: number; left: number; frame: number; delay: number; rotation: number}> = ({text, top, left, frame, delay, rotation}) => {
  const reveal = value(frame, [delay, delay + 22], [0, 1]);
  return (
    <div style={{position: "absolute", top, left: left + (1 - reveal) * 170, width: 430, height: 116, opacity: reveal, transform: `rotate(${rotation * reveal}deg)`, borderRadius: 22, backgroundColor: CREAM, border: `4px solid ${GRAPHITE}`, boxShadow: "0 20px 46px rgba(38,50,56,0.17)", display: "flex", alignItems: "center", padding: "0 34px"}}>
      <div style={{width: 18, height: 18, flex: "0 0 auto", borderRadius: "50%", backgroundColor: ORANGE, marginRight: 22}} />
      <div style={{fontSize: 27, lineHeight: 1.1, fontWeight: 900}}>{text}</div>
    </div>
  );
};

export const CompositionC03: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneEight = value(frame, [0, 16, 147, 163], [0, 1, 1, 0]);
  const sceneNine = value(frame, [163, 179, 511, 527], [0, 1, 1, 0]);
  const sceneTen = value(frame, [527, 543], [0, 1]);
  const pulseTravel = value(frame, [205, 330], [-180, 2070]);
  const pulseVisible = value(frame, [185, 205, 330, 350], [0, 1, 1, 0]);
  const thoughtBreak = value(frame, [270, 305], [0, 1]);
  const phonePulse = value(frame, [185, 215, 245], [0, 1, 0]);

  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 78% 48%, rgba(85,117,104,0.15), transparent 34%), radial-gradient(circle at 25% 40%, rgba(242,138,58,0.12), transparent 38%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, auto, 48px 48px, 48px 48px"}} />
      <div style={{position: "absolute", left: 85, top: 55, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>NOTIFICATIONS CAN INTERRUPT</div>

      <div style={{position: "absolute", inset: 0, opacity: sceneEight}}>
        <div style={{position: "absolute", left: 115, top: 150, width: 700}}>
          <div style={{fontSize: 74, lineHeight: 0.98, fontWeight: 900}}>TURNING OFF<br /><span style={{color: ORANGE}}>INTERRUPTIONS</span><br />IS GOOD ADVICE.</div>
          <div style={{marginTop: 38, width: 580, fontSize: 28, lineHeight: 1.35, fontWeight: 700, opacity: 0.7}}>Remove the signals that do not deserve immediate access to your attention.</div>
        </div>
        <div style={{position: "absolute", right: 145, top: 135, width: 760, height: 760, borderRadius: 34, backgroundColor: "rgba(248,237,221,0.96)", border: `4px solid ${GRAPHITE}`, boxShadow: "0 28px 80px rgba(38,50,56,0.17)", padding: "38px 54px"}}>
          <div style={{fontSize: 23, color: GREEN, fontWeight: 900, letterSpacing: 4, marginBottom: 20}}>NOTIFICATION ACCESS</div>
          <ToggleRow label="SOCIAL UPDATES" frame={frame} delay={28} />
          <ToggleRow label="PROMOTIONS" frame={frame} delay={52} />
          <ToggleRow label="NEWS ALERTS" frame={frame} delay={76} />
          <ToggleRow label="DIRECT CONTACT" frame={frame} delay={100} essential />
          <div style={{marginTop: 34, color: GREEN, fontSize: 22, fontWeight: 900, letterSpacing: 2}}>NON-ESSENTIAL SIGNALS REMOVED</div>
        </div>
      </div>

      <div style={{position: "absolute", inset: 0, opacity: sceneNine}}>
        <div style={{position: "absolute", left: 110, top: 145, width: 930}}>
          <div style={{fontSize: 70, lineHeight: 1, fontWeight: 900}}>BUT AN INTERRUPTION CAN ARRIVE<br /><span style={{color: ORANGE}}>AT EXACTLY THE WRONG MOMENT.</span></div>
        </div>
        <div style={{position: "absolute", left: 130, top: 540, width: 1120, height: 170}}>
          <div style={{position: "absolute", left: 0, top: 74, width: 1040, height: 14, borderRadius: 7, backgroundColor: GREEN, transform: `translateY(${-34 * thoughtBreak}px) rotate(${-2.4 * thoughtBreak}deg)`, transformOrigin: "left center"}} />
          <div style={{position: "absolute", left: 0, top: 74, width: 1040, height: 14, borderRadius: 7, backgroundColor: GREEN, clipPath: "inset(0 0 0 58%)", transform: `translateY(${34 * thoughtBreak}px) rotate(${3.2 * thoughtBreak}deg)`, transformOrigin: "right center"}} />
          <div style={{position: "absolute", left: 0, top: 20, color: GREEN, fontSize: 22, fontWeight: 900, letterSpacing: 4}}>ACTIVE THOUGHT</div>
          <div style={{position: "absolute", left: 500, top: 104, opacity: thoughtBreak, color: RED, fontSize: 21, fontWeight: 900, letterSpacing: 3}}>CONTEXT BROKEN</div>
        </div>
        <div style={{position: "absolute", right: 135, top: 350}}><Phone pulse={phonePulse} /></div>
        <div style={{position: "absolute", left: pulseTravel, top: 577, width: 74, height: 74, opacity: pulseVisible, borderRadius: "50%", backgroundColor: ORANGE, border: `6px solid ${GRAPHITE}`, boxShadow: "0 0 0 20px rgba(242,138,58,0.17), 0 0 0 43px rgba(242,138,58,0.08)"}} />
      </div>

      <div style={{position: "absolute", inset: 0, opacity: sceneTen}}>
        <div style={{position: "absolute", left: 105, top: 145, width: 920}}>
          <div style={{fontSize: 73, lineHeight: 0.98, fontWeight: 900}}>THE SCREEN CAN BE SILENT.<br /><span style={{color: ORANGE}}>UNCERTAINTY CAN STAY.</span></div>
          <div style={{marginTop: 38, width: 770, fontSize: 30, lineHeight: 1.35, fontWeight: 700, opacity: 0.72}}>Someone may be waiting. Something may have changed. The possibility remains available.</div>
        </div>
        <UncertaintyCard text="DID THEY REPLY?" top={500} left={180} frame={frame} delay={550} rotation={-3} />
        <UncertaintyCard text="IS SOMEONE WAITING?" top={650} left={250} frame={frame} delay={574} rotation={2} />
        <UncertaintyCard text="AM I MISSING SOMETHING?" top={800} left={150} frame={frame} delay={598} rotation={-2} />
        <div style={{position: "absolute", right: 240, top: 310}}><Phone /></div>
        <div style={{position: "absolute", right: 103, top: 735, width: 580, textAlign: "center", color: GREEN, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>NO EXTERNAL SIGNAL</div>
      </div>

      <div style={{position: "absolute", left: 85, right: 85, bottom: 42, height: 7, borderRadius: 4, backgroundColor: "rgba(38,50,56,0.14)"}}>
        <div style={{height: "100%", width: `${frame / 684 * 100}%`, borderRadius: 4, backgroundColor: ORANGE}} />
      </div>
    </AbsoluteFill>
  );
};
