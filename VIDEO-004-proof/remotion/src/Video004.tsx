import React from "react";
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from "remotion";
import {sceneSpecs, SceneId} from "./scenes";
import {timing} from "./timing";

const CREAM = "#f4eddf";
const PAPER = "#fffaf0";
const GRAPHITE = "#252525";
const ORANGE = "#ff6b2c";
const MUTED = "#8d8578";
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const progress = (frame: number, start: number, end: number) => interpolate(frame, [start, end], [0, 1], clamp);

const Nod: React.FC<{x?: number; y?: number; scale?: number; lean?: number}> = ({x = 220, y = 400, scale = 1, lean = 0}) => (
  <div style={{position: "absolute", left: x, top: y, width: 250, height: 430, transform: `scale(${scale}) rotate(${lean}deg)`, transformOrigin: "bottom center"}}>
    <div style={{position: "absolute", left: 58, top: 0, width: 142, height: 142, borderRadius: "48% 52% 45% 55%", background: PAPER, border: `12px solid ${GRAPHITE}`, boxShadow: `10px 12px 0 ${GRAPHITE}22`}}>
      <div style={{position: "absolute", left: 34, top: 58, width: 14, height: 18, borderRadius: 20, background: GRAPHITE}} />
      <div style={{position: "absolute", right: 34, top: 58, width: 14, height: 18, borderRadius: 20, background: GRAPHITE}} />
      <div style={{position: "absolute", left: 55, top: 94, width: 32, height: 8, borderRadius: 10, background: GRAPHITE}} />
    </div>
    <div style={{position: "absolute", left: 70, top: 142, width: 120, height: 205, borderRadius: "58px 58px 30px 30px", background: GRAPHITE}} />
    <div style={{position: "absolute", left: 20, top: 170, width: 76, height: 170, borderRadius: 45, background: GRAPHITE, transform: "rotate(12deg)"}} />
    <div style={{position: "absolute", right: 20, top: 170, width: 76, height: 170, borderRadius: 45, background: GRAPHITE, transform: "rotate(-12deg)"}} />
    <div style={{position: "absolute", left: 53, top: 325, width: 62, height: 105, borderRadius: 35, background: GRAPHITE}} />
    <div style={{position: "absolute", right: 53, top: 325, width: 62, height: 105, borderRadius: 35, background: GRAPHITE}} />
  </div>
);

const Project: React.FC<{x?: number; y?: number; scale?: number; weight?: number}> = ({x = 1040, y = 260, scale = 1, weight = 0}) => (
  <div style={{position: "absolute", left: x, top: y + weight * 70, width: 600, height: 520, transform: `scale(${scale})`, transformOrigin: "center"}}>
    {[0, 1, 2].map((layer) => <div key={layer} style={{position: "absolute", left: layer * 34, top: layer * 30, width: 510, height: 390, borderRadius: 34, background: layer === 2 ? PAPER : "#d9d0c1", border: `8px solid ${GRAPHITE}`, boxShadow: "0 28px 60px #25252522"}} />)}
    <div style={{position: "absolute", left: 115, top: 105, width: 330, height: 34, borderRadius: 18, background: GRAPHITE}} />
    <div style={{position: "absolute", left: 115, top: 175, width: 240, height: 24, borderRadius: 14, background: MUTED}} />
    <div style={{position: "absolute", left: 115, top: 230, width: 300, height: 24, borderRadius: 14, background: MUTED}} />
    <div style={{position: "absolute", left: 115, top: 295, width: 170, height: 56, borderRadius: 18, border: `6px dashed ${ORANGE}`}} />
  </div>
);

const Pill: React.FC<{text: string; x: number; y: number; active?: boolean; rotate?: number}> = ({text, x, y, active = false, rotate = 0}) => (
  <div style={{position: "absolute", left: x, top: y, padding: "22px 34px", borderRadius: 28, background: active ? ORANGE : PAPER, color: active ? PAPER : GRAPHITE, border: `6px solid ${GRAPHITE}`, fontSize: 34, fontWeight: 900, letterSpacing: 1, transform: `rotate(${rotate}deg)`, boxShadow: "0 18px 34px #25252520"}}>{text}</div>
);

const Hero: React.FC<{frame: number}> = ({frame}) => {
  const email = progress(frame, 194, 250);
  const rename = progress(frame, 250, 318);
  const tutorial = progress(frame, 282, 373);
  const relief = progress(frame, 500, 550);
  const transfer = progress(frame, 566, 828);
  const compress = progress(frame, 828, 1015);
  const camera = 1 + progress(frame, 0, 1015) * 0.08 + compress * 0.25;
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at ${70 - transfer * 25}% 48%, #fff8e9 0%, ${CREAM} 55%, #d9d0c1 100%)`, overflow: "hidden"}}>
      <div style={{position: "absolute", inset: -120, transform: `scale(${camera}) translateX(${-compress * 130}px)`, transformOrigin: "center"}}>
        <Nod x={170} y={390} lean={-2 + relief * 3} />
        <Project x={1080 + transfer * 250} y={250} weight={transfer} />
        <Pill text="EMAIL" x={interpolate(email, [0, 1], [1920, 680], clamp)} y={280} rotate={-4} />
        <Pill text="RENAME" x={interpolate(rename, [0, 1], [1920, 760], clamp)} y={470} rotate={3} />
        <Pill text="TUTORIAL" x={interpolate(tutorial, [0, 1], [1920, 650], clamp)} y={660} rotate={-2} />
      </div>
      <div style={{position: "absolute", left: 0, top: 0, width: `${transfer * 52}%`, height: "100%", background: `${ORANGE}${Math.round(relief * 28).toString(16).padStart(2, "0")}`}} />
      <div style={{position: "absolute", left: "50%", top: 90, width: 8, height: 900, background: GRAPHITE, opacity: transfer}} />
      <div style={{position: "absolute", left: 120, top: 90, fontSize: 38, fontWeight: 900, letterSpacing: 8, opacity: transfer}}>NOW</div>
      <div style={{position: "absolute", right: 120, top: 90, fontSize: 38, fontWeight: 900, letterSpacing: 8, opacity: transfer}}>LATER</div>
      <div style={{position: "absolute", left: "50%", top: "50%", transform: `translate(-50%, -50%) scale(${0.7 + relief * 0.3})`, width: 330 + relief * 260, height: 330 + relief * 260, borderRadius: "50%", border: `${10 + relief * 16}px solid ${ORANGE}`, opacity: relief * (1 - compress), boxShadow: `0 0 ${120 * relief}px ${ORANGE}66`}} />
      <div style={{position: "absolute", left: "50%", top: "50%", transform: `translate(-50%, -50%) scale(${relief})`, color: GRAPHITE, fontSize: 82, fontWeight: 1000, letterSpacing: 10, opacity: relief * (1 - transfer)}}>RELIEF</div>
      <div style={{position: "absolute", left: "50%", top: "50%", transform: `translate(-50%, -50%) scale(${0.8 + compress * 0.2})`, width: 520 - compress * 250, height: 250, borderRadius: 42, background: GRAPHITE, color: PAPER, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: 54, lineHeight: 1.05, fontWeight: 1000, letterSpacing: 4, opacity: compress}}>CHANGE THE<br />FIRST MOMENT</div>
    </AbsoluteFill>
  );
};

const Header: React.FC<{eyebrow: string; title: string; detail: string}> = ({eyebrow, title, detail}) => (
  <div style={{position: "absolute", left: 120, top: 95, width: 1680}}>
    <div style={{fontSize: 30, letterSpacing: 7, fontWeight: 900, color: ORANGE}}>{eyebrow}</div>
    <div style={{marginTop: 26, maxWidth: 1500, fontSize: 88, lineHeight: 0.96, letterSpacing: -3, fontWeight: 1000, color: GRAPHITE}}>{title}</div>
    <div style={{marginTop: 28, maxWidth: 1260, fontSize: 35, lineHeight: 1.3, color: MUTED, fontWeight: 650}}>{detail}</div>
  </div>
);

const Generic: React.FC<{sceneId: SceneId; localFrame: number; duration: number}> = ({sceneId, localFrame, duration}) => {
  const spec = sceneSpecs[sceneId];
  const appear = progress(localFrame, 0, Math.min(30, duration * 0.18));
  const drift = Math.sin(localFrame / 35) * 8;
  const itemWidth = spec.items.length > 4 ? 285 : spec.items.length > 2 ? 390 : 620;
  const isCharacter = spec.kind === "character";
  const isLoop = spec.kind === "loop";
  const isTimeline = spec.kind === "timeline";
  const isScale = spec.kind === "scale";
  return (
    <AbsoluteFill style={{background: `linear-gradient(135deg, ${CREAM}, #e6ddce)`, overflow: "hidden", opacity: appear}}>
      <div style={{position: "absolute", right: -180 + drift, top: -240, width: 700, height: 700, borderRadius: "50%", background: `${ORANGE}15`}} />
      <Header eyebrow={spec.eyebrow} title={spec.title} detail={spec.detail} />
      {isCharacter && <><Nod x={170} y={520} scale={0.82} lean={drift / 12} /><Project x={1050} y={520} scale={0.72} weight={sceneId === "S12" ? progress(localFrame, 0, duration) : 0} /></>}
      {isScale && <div style={{position: "absolute", left: 180, right: 180, bottom: 165, height: 250, display: "flex", alignItems: "end", justifyContent: "space-between"}}>{spec.items.map((item, index) => <div key={item} style={{width: 650, height: index === 0 ? 110 : 235, background: index === 0 ? PAPER : ORANGE, border: `8px solid ${GRAPHITE}`, borderRadius: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 1000}}>{item}</div>)}</div>}
      {isTimeline && <div style={{position: "absolute", left: 170, right: 170, bottom: 245, height: 18, borderRadius: 20, background: GRAPHITE}}><div style={{position: "absolute", left: `${progress(localFrame, 0, duration) * 88}%`, top: -70, width: 74, height: 160, borderRadius: 28, background: ORANGE, transform: "translateX(-50%)"}} />{spec.items.map((item, index) => <div key={item} style={{position: "absolute", left: index === 0 ? 0 : "100%", top: 50, transform: index === 0 ? "none" : "translateX(-100%)", fontSize: 32, fontWeight: 900}}>{item}</div>)}</div>}
      {isLoop && <div style={{position: "absolute", left: 120, right: 120, bottom: 150, display: "flex", gap: 24, alignItems: "center"}}>{spec.items.map((item, index) => <React.Fragment key={item}><div style={{flex: 1, minHeight: 170, borderRadius: 34, background: index === 3 ? ORANGE : PAPER, border: `7px solid ${GRAPHITE}`, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 20, fontSize: 30, fontWeight: 1000, transform: `translateY(${Math.sin(localFrame / 28 + index) * 10}px)`}}>{item}</div>{index < spec.items.length - 1 && <div style={{fontSize: 52, fontWeight: 1000}}>→</div>}</React.Fragment>)}</div>}
      {!isCharacter && !isLoop && !isTimeline && !isScale && <div style={{position: "absolute", left: 120, right: 120, bottom: 120, display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "center"}}>{spec.items.map((item, index) => {const delay = index * 12; const lift = progress(localFrame, delay, delay + 26); return <div key={item} style={{width: itemWidth, minHeight: 145, borderRadius: 34, background: index === spec.items.length - 1 && (spec.kind === "builder" || spec.kind === "protocol") ? ORANGE : PAPER, border: `7px solid ${GRAPHITE}`, boxShadow: "0 20px 45px #25252518", padding: "30px 34px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: 31, lineHeight: 1.1, fontWeight: 950, opacity: lift, transform: `translateY(${(1 - lift) * 55 + Math.sin(localFrame / 32 + index) * 6}px)`}}>{item}</div>})}</div>}
    </AbsoluteFill>
  );
};

const Canvas: React.FC<{timelineOffset?: number}> = ({timelineOffset = 0}) => {
  const frame = useCurrentFrame() + timelineOffset;
  const scene = timing.scenes.find((item) => frame >= item.startFrame && frame < item.endFrame) ?? timing.scenes[timing.scenes.length - 1];
  if (frame < timing.compositions[0].endFrame) return <Hero frame={frame} />;
  return <Generic sceneId={scene.id as SceneId} localFrame={frame - scene.startFrame} duration={scene.durationFrames} />;
};

export const Video004Master: React.FC = () => (
  <AbsoluteFill>
    <Canvas />
    <Audio src={staticFile("audio/video004-narration-master-v1.wav")} />
  </AbsoluteFill>
);

export const Video004Segment: React.FC<{compositionId: string}> = ({compositionId}) => {
  const composition = timing.compositions.find((item) => item.id === compositionId);
  if (!composition) throw new Error(`Unknown composition ${compositionId}`);
  return <Canvas timelineOffset={composition.startFrame} />;
};
