import React from "react";
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from "remotion";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";

const CLEAN_FRAME = staticFile("assets/nod/video002-c01-silent-desk-clean-v1.jpg");
const REACH_FRAME = staticFile("assets/nod/video002-c01-silent-desk-reach-v2.jpg");

const value = (frame: number, input: number[], output: number[]) => interpolate(frame, input, output, {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

const FullFrame: React.FC<{src: string; opacity?: number; scale?: number}> = ({src, opacity = 1, scale = 1}) => (
  <Img src={src} style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity, transform: `scale(${scale})`}} />
);

const NotificationRow: React.FC<{label: string; delay: number; frame: number}> = ({label, delay, frame}) => {
  const off = value(frame, [12 + delay, 50 + delay], [0, 1]);
  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: 520, padding: "20px 24px", borderRadius: 20, backgroundColor: "rgba(248,237,221,0.92)", border: `2px solid ${GRAPHITE}`, boxShadow: "0 8px 24px rgba(38,50,56,0.10)"}}>
      <span style={{fontSize: 25, fontWeight: 900, letterSpacing: 1}}>{label}</span>
      <div style={{position: "relative", width: 82, height: 44, borderRadius: 25, backgroundColor: off > 0.5 ? "#b9bbb7" : GREEN}}>
        <div style={{position: "absolute", top: 5, left: 39 - off * 34, width: 34, height: 34, borderRadius: "50%", backgroundColor: "#ffffff", boxShadow: "0 2px 7px rgba(0,0,0,0.2)"}} />
      </div>
    </div>
  );
};

export const CompositionC01: React.FC = () => {
  const frame = useCurrentFrame();
  const reachOpacity = value(frame, [482, 490], [0, 1]);
  const lightMask = value(frame, [478, 486, 494], [0, 0.34, 0]);
  const sceneOne = value(frame, [0, 76, 92], [1, 1, 0]);
  const sceneTwo = value(frame, [92, 108, 242, 258], [0, 1, 1, 0]);
  const sceneThree = value(frame, [258, 274, 466, 482], [0, 1, 1, 0]);
  const sceneFour = value(frame, [482, 498], [0, 1]);
  const backgroundScale = value(frame, [0, 544], [1, 1.025]);
  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <FullFrame src={CLEAN_FRAME} scale={backgroundScale} />
      <FullFrame src={REACH_FRAME} opacity={reachOpacity} scale={backgroundScale} />
      <AbsoluteFill style={{background: "linear-gradient(90deg, rgba(248,237,221,0.98) 0%, rgba(248,237,221,0.90) 30%, rgba(248,237,221,0.30) 52%, rgba(248,237,221,0) 70%)"}} />
      <div style={{position: "absolute", left: 86, top: 55, color: ORANGE, fontSize: 24, fontWeight: 900, letterSpacing: 4}}>SILENT PHONE</div>
      <div style={{position: "absolute", left: 86, top: 135, opacity: sceneOne}}>
        <div style={{fontSize: 64, lineHeight: 0.98, fontWeight: 900, marginBottom: 34}}>EVERY NOTIFICATION<br /><span style={{color: GREEN}}>OFF</span></div>
        <div style={{display: "grid", gap: 14}}>
          <NotificationRow label="BANNERS" delay={0} frame={frame} />
          <NotificationRow label="VIBRATIONS" delay={7} frame={frame} />
          <NotificationRow label="BADGES" delay={14} frame={frame} />
        </div>
      </div>
      <div style={{position: "absolute", left: 86, top: 180, width: 620, opacity: sceneTwo}}>
        <div style={{fontSize: 76, lineHeight: 1.02, fontWeight: 900}}>NO BANNERS.<br />NO VIBRATIONS.<br /><span style={{color: ORANGE}}>NO BADGES.</span></div>
        <div style={{marginTop: 38, width: 170, height: 10, borderRadius: 5, backgroundColor: GREEN}} />
      </div>
      <div style={{position: "absolute", left: 86, top: 215, width: 620, opacity: sceneThree}}>
        <div style={{fontSize: 91, lineHeight: 0.96, fontWeight: 900}}>SILENT.<br /><span style={{color: ORANGE}}>FACE DOWN.</span></div>
        <div style={{marginTop: 42, fontSize: 30, lineHeight: 1.2, fontWeight: 800}}>THE EXIT IS STILL THERE.</div>
      </div>
      <div style={{position: "absolute", left: 86, top: 250, width: 650, opacity: sceneFour}}>
        <div style={{fontSize: 96, lineHeight: 0.96, fontWeight: 900}}>YOU REACH<br /><span style={{color: ORANGE}}>ANYWAY.</span></div>
      </div>
      <AbsoluteFill style={{backgroundColor: CREAM, opacity: lightMask, pointerEvents: "none"}} />
      <div style={{position: "absolute", left: 86, right: 86, bottom: 42, height: 7, borderRadius: 4, backgroundColor: "rgba(38,50,56,0.14)"}}>
        <div style={{height: "100%", width: `${frame / 544 * 100}%`, borderRadius: 4, backgroundColor: ORANGE}} />
      </div>
    </AbsoluteFill>
  );
};
