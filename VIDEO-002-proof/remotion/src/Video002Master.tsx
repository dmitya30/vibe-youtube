import React from "react";
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame} from "remotion";
import {timing} from "./timing";
import {CompositionC01} from "./CompositionC01";
import {CompositionC02} from "./CompositionC02";
import {CompositionC03} from "./CompositionC03";
import {CompositionC04} from "./CompositionC04";
import {CompositionC05} from "./CompositionC05";
import {CompositionC06} from "./CompositionC06";
import {CompositionC07} from "./CompositionC07";
import {CompositionC08} from "./CompositionC08";

const CREAM = "#f8eddd";
const GRAPHITE = "#263238";
const ORANGE = "#f28a3a";
const GREEN = "#557568";

type Scene = (typeof timing.scenes)[number];
type SegmentProps = {compositionId: string};

const SceneSlate: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const fadeFrames = Math.min(18, Math.max(1, scene.durationFrames - 1));
  const opacity = interpolate(frame, [0, fadeFrames], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <AbsoluteFill style={{backgroundColor: CREAM, color: GRAPHITE, fontFamily: "Arial, Helvetica, sans-serif", padding: 80, opacity}}>
      <div style={{position: "absolute", top: 55, left: 80, color: ORANGE, fontSize: 34, fontWeight: 900}}>{scene.composition} · {scene.id}</div>
      <div style={{position: "absolute", top: 55, right: 80, color: GREEN, fontSize: 26, fontWeight: 800}}>{scene.section}</div>
      <div style={{marginTop: 150, maxWidth: 1500, fontSize: 72, lineHeight: 1.08, fontWeight: 900}}>{scene.visualState}</div>
      <div style={{marginTop: 55, maxWidth: 1450, borderLeft: `10px solid ${ORANGE}`, paddingLeft: 32, fontSize: 38, lineHeight: 1.25}}>{scene.anchor}</div>
      <div style={{position: "absolute", left: 80, bottom: 70, fontSize: 24, fontWeight: 700}}>frames {scene.startFrame}–{scene.endFrame} · cues {scene.cueStart}–{scene.cueEndExclusive ?? "END"}</div>
      <div style={{position: "absolute", left: 80, right: 80, bottom: 35, height: 8, borderRadius: 4, backgroundColor: `${GRAPHITE}22`}}>
        <div style={{width: `${Math.min(100, frame / Math.max(1, scene.durationFrames - 1) * 100)}%`, height: "100%", borderRadius: 4, backgroundColor: ORANGE}} />
      </div>
    </AbsoluteFill>
  );
};

export const Video002Master: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: CREAM}}>
    <Audio src={staticFile("audio/video002-narration-combined-repaired-v2.wav")} />
    {timing.compositions.map((composition) => (
      <Sequence key={composition.id} from={composition.startFrame} durationInFrames={composition.durationFrames} name={composition.id}>
        <Video002Segment compositionId={composition.id} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export const Video002Segment: React.FC<SegmentProps> = ({compositionId}) => {
  const composition = timing.compositions.find((item) => item.id === compositionId);
  if (!composition) {
    throw new Error(`Unknown composition: ${compositionId}`);
  }
  if (compositionId === "C01") {
    return (
      <AbsoluteFill>
        <Audio src={staticFile("audio/video002-narration-combined-repaired-v2.wav")} trimBefore={composition.startFrame} trimAfter={composition.endFrame} />
        <CompositionC01 />
      </AbsoluteFill>
    );
  }
  if (compositionId === "C02") {
    return (
      <AbsoluteFill>
        <Audio src={staticFile("audio/video002-narration-combined-repaired-v2.wav")} trimBefore={composition.startFrame} trimAfter={composition.endFrame} />
        <CompositionC02 />
      </AbsoluteFill>
    );
  }
  if (compositionId === "C03") {
    return (
      <AbsoluteFill>
        <Audio src={staticFile("audio/video002-narration-combined-repaired-v2.wav")} trimBefore={composition.startFrame} trimAfter={composition.endFrame} />
        <CompositionC03 />
      </AbsoluteFill>
    );
  }
  if (compositionId === "C04") {
    return (
      <AbsoluteFill>
        <Audio src={staticFile("audio/video002-narration-combined-repaired-v2.wav")} trimBefore={composition.startFrame} trimAfter={composition.endFrame} />
        <CompositionC04 />
      </AbsoluteFill>
    );
  }
  if (compositionId === "C05") {
    return (
      <AbsoluteFill>
        <Audio src={staticFile("audio/video002-narration-combined-repaired-v2.wav")} trimBefore={composition.startFrame} trimAfter={composition.endFrame} />
        <CompositionC05 />
      </AbsoluteFill>
    );
  }
  if (compositionId === "C06") {
    return (
      <AbsoluteFill>
        <Audio src={staticFile("audio/video002-narration-combined-repaired-v2.wav")} trimBefore={composition.startFrame} trimAfter={composition.endFrame} />
        <CompositionC06 />
      </AbsoluteFill>
    );
  }
  if (compositionId === "C07") {
    return (
      <AbsoluteFill>
        <Audio src={staticFile("audio/video002-narration-combined-repaired-v2.wav")} trimBefore={composition.startFrame} trimAfter={composition.endFrame} />
        <CompositionC07 />
      </AbsoluteFill>
    );
  }
  if (compositionId === "C08") {
    return (
      <AbsoluteFill>
        <Audio src={staticFile("audio/video002-narration-combined-repaired-v2.wav")} trimBefore={composition.startFrame} trimAfter={composition.endFrame} />
        <CompositionC08 />
      </AbsoluteFill>
    );
  }
  const scenes = timing.scenes.filter((scene) => scene.composition === compositionId);
  return (
    <AbsoluteFill style={{backgroundColor: CREAM}}>
      <Audio src={staticFile("audio/video002-narration-combined-repaired-v2.wav")} trimBefore={composition.startFrame} trimAfter={composition.endFrame} />
      {scenes.map((scene) => (
        <Sequence key={scene.id} from={scene.startFrame - composition.startFrame} durationInFrames={scene.durationFrames} name={`${scene.id} ${scene.anchor}`}>
          <SceneSlate scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
