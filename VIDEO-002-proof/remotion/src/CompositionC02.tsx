import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

const Door: React.FC<{label: string; openness: number; accent?: boolean}> = ({label, openness, accent = false}) => (
  <div style={{position: "relative", width: 360, height: 500}}>
    <div style={{position: "absolute", left: 60, top: 20, width: 240, height: 350, border: `9px solid ${GRAPHITE}`, borderBottom: "none", backgroundColor: "rgba(38,50,56,0.08)"}} />
    <div style={{position: "absolute", left: 69, top: 29, width: 222, height: 341, backgroundColor: accent ? ORANGE : GREEN, border: `4px solid ${GRAPHITE}`, transformOrigin: "left center", transform: `perspective(800px) rotateY(${-62 * openness}deg)`, boxShadow: "12px 12px 28px rgba(38,50,56,0.18)"}}>
      <div style={{position: "absolute", right: 22, top: 165, width: 17, height: 17, borderRadius: "50%", backgroundColor: CREAM, border: `3px solid ${GRAPHITE}`}} />
    </div>
    <div style={{position: "absolute", top: 405, left: 0, width: 360, textAlign: "center", fontSize: 29, fontWeight: 900, letterSpacing: 2, color: accent ? ORANGE : GREEN}}>{label}</div>
  </div>
);

const StudyCard: React.FC<{frame: number}> = ({frame}) => {
  const result = value(frame, [360, 410], [0, 1]);
  return (
    <div style={{position: "absolute", left: 245, top: 100, width: 1430, height: 820, borderRadius: 34, backgroundColor: "rgba(248,237,221,0.97)", border: `4px solid ${GRAPHITE}`, boxShadow: "0 28px 80px rgba(38,50,56,0.16)", padding: "52px 65px"}}>
      <div style={{color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 5}}>RANDOMIZED STUDY</div>
      <div style={{display: "flex", gap: 30, marginTop: 36}}>
        <div style={{padding: "24px 34px", borderRadius: 20, backgroundColor: GRAPHITE, color: CREAM, fontSize: 38, fontWeight: 900}}>205 PEOPLE</div>
        <div style={{padding: "24px 34px", borderRadius: 20, backgroundColor: GREEN, color: CREAM, fontSize: 38, fontWeight: 900}}>1 WEEK</div>
        <div style={{padding: "24px 34px", borderRadius: 20, border: `3px solid ${GRAPHITE}`, fontSize: 30, fontWeight: 900}}>NOTIFICATIONS OFF</div>
      </div>
      <div style={{marginTop: 70, display: "grid", gridTemplateColumns: "310px 1fr", rowGap: 46, alignItems: "center"}}>
        <div style={{fontSize: 31, fontWeight: 900}}>PHONE CHECKS</div>
        <div style={{position: "relative", height: 38, borderRadius: 19, backgroundColor: "rgba(38,50,56,0.12)"}}><div style={{width: `${72 - result * 3}%`, height: "100%", borderRadius: 19, backgroundColor: ORANGE}} /></div>
        <div style={{fontSize: 31, fontWeight: 900}}>SCREEN TIME</div>
        <div style={{position: "relative", height: 38, borderRadius: 19, backgroundColor: "rgba(38,50,56,0.12)"}}><div style={{width: `${67 - result * 2}%`, height: "100%", borderRadius: 19, backgroundColor: GREEN}} /></div>
      </div>
      <div style={{marginTop: 68, textAlign: "center", opacity: result}}>
        <div style={{fontSize: 57, lineHeight: 1, fontWeight: 900}}>NO SIGNIFICANT REDUCTION</div>
        <div style={{marginTop: 20, color: GREEN, fontSize: 27, fontWeight: 800}}>OBJECTIVE PHONE LOGS</div>
      </div>
    </div>
  );
};

export const CompositionC02: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneFive = value(frame, [0, 16, 237, 253], [0, 1, 1, 0]);
  const sceneSix = value(frame, [253, 269, 617, 633], [0, 1, 1, 0]);
  const sceneSeven = value(frame, [633, 649], [0, 1]);
  const firstOpen = value(frame, [20, 75], [0, 1]);
  const notificationOpen = 1 - value(frame, [655, 710], [0, 1]);
  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <AbsoluteFill style={{backgroundImage: `radial-gradient(circle at 50% 45%, rgba(242,138,58,0.12), transparent 42%), linear-gradient(${GRAPHITE}0b 1px, transparent 1px), linear-gradient(90deg, ${GRAPHITE}0b 1px, transparent 1px)`, backgroundSize: "auto, 48px 48px, 48px 48px"}} />
      <div style={{position: "absolute", left: 85, top: 55, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>TWO DIFFERENT PROBLEMS</div>
      <div style={{position: "absolute", inset: 0, opacity: sceneFive}}>
        <div style={{position: "absolute", left: 170, top: 135, width: 1580, textAlign: "center", fontSize: 66, lineHeight: 1, fontWeight: 900}}>NOTIFICATIONS AND CHECKING<br /><span style={{color: ORANGE}}>ARE NOT THE SAME DOOR.</span></div>
        <div style={{position: "absolute", left: 565, top: 330, display: "flex", gap: 70}}>
          <Door label="NOTIFICATION" openness={firstOpen} accent />
          <Door label="CHECKING" openness={firstOpen} />
        </div>
      </div>
      <div style={{position: "absolute", inset: 0, opacity: sceneSix}}><StudyCard frame={frame} /></div>
      <div style={{position: "absolute", inset: 0, opacity: sceneSeven}}>
        <div style={{position: "absolute", left: 220, top: 135, width: 1480, textAlign: "center", fontSize: 72, lineHeight: 1, fontWeight: 900}}>SILENCE CLOSED<br /><span style={{color: ORANGE}}>ONLY ONE DOOR.</span></div>
        <div style={{position: "absolute", left: 565, top: 330, display: "flex", gap: 70}}>
          <Door label="NOTIFICATION" openness={notificationOpen} accent />
          <Door label="CHECKING" openness={1} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
