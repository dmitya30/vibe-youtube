import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {sceneSpecs, type SceneId} from "./scenes";
import {timing} from "./timing";

const COLORS = {
  ink: "#17212b",
  midnight: "#101827",
  cream: "#fff8ed",
  paper: "#f5ecdd",
  orange: "#f28a3a",
  coral: "#ff795f",
  blue: "#67b7c9",
  green: "#74a68b",
  muted: "#8d98a3",
};

const FONT = "Arial, Helvetica, sans-serif";
const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const A01 = staticFile("assets/nod/video004-a01-opening-workspace-v3.jpg");
const A02 = staticFile("assets/nod/video004-a02-now-later-transfer-v2.jpg");
const A04 = staticFile("assets/nod/video004-a04-final-visible-action-v1.jpg");

const progress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], clamp);

const TITLE_LINES: Partial<Record<SceneId, readonly string[]>> = {
  S04: ["INTEND TO DO", "DELAY ANYWAY"],
  S06: ["YOU STILL INTEND", "TO DO IT"],
  S09: ["RELIEF", "REINFORCES ESCAPE"],
  S11: ["EASY", "INITIATION"],
  S14: ["NAME THE", "FIRST ESCAPE"],
  S15: ["WHAT FELT", "DIFFICULT?"],
  S16: ["MAKE THE ACTION", "VISIBLE"],
  S18: ["REAL WORK OR", "FALSE PROGRESS?"],
  S19: ["ATTACH ACTION", "TO CUE"],
  S21: ["CAN HELP", "NOT GUARANTEE"],
  S22: ["ONE BOUNDED", "EXPERIMENT"],
  S23: ["NOT EVERY BLOCK", "IS BEHAVIORAL"],
  S24: ["MAKE THE REAL", "ACTION VISIBLE"],
};

const modeFor = (composition: string) => {
  if (composition === "C03") {
    return {
      background: COLORS.midnight,
      foreground: COLORS.cream,
      secondary: "#c7d0d8",
      accent: COLORS.coral,
      panel: "#1c2938",
    };
  }
  if (composition === "C04") {
    return {
      background: COLORS.midnight,
      foreground: COLORS.cream,
      secondary: "#c7d0d8",
      accent: COLORS.orange,
      panel: "#1c2938",
    };
  }
  if (composition === "C05") {
    return {
      background: "#eef4f4",
      foreground: COLORS.ink,
      secondary: "#536270",
      accent: COLORS.blue,
      panel: "#ffffff",
    };
  }
  if (composition === "C06") {
    return {
      background: COLORS.paper,
      foreground: COLORS.ink,
      secondary: "#59646d",
      accent: COLORS.green,
      panel: COLORS.cream,
    };
  }
  if (composition === "C07") {
    return {
      background: "#0d1d2a",
      foreground: COLORS.cream,
      secondary: "#b8c8d2",
      accent: COLORS.blue,
      panel: "#162c3b",
    };
  }
  if (composition === "C08") {
    return {
      background: COLORS.cream,
      foreground: COLORS.ink,
      secondary: "#59646d",
      accent: COLORS.green,
      panel: "#ffffff",
    };
  }
  return {
    background: COLORS.cream,
    foreground: COLORS.ink,
    secondary: "#59646d",
    accent: COLORS.blue,
    panel: "#ffffff",
  };
};

const Header: React.FC<{
  sceneId: SceneId;
  foreground: string;
  secondary: string;
  accent: string;
  compact?: boolean;
}> = ({sceneId, foreground, secondary, accent, compact = false}) => {
  const spec = sceneSpecs[sceneId];
  const lines = TITLE_LINES[sceneId] ?? [spec.title];
  return (
    <div
      style={{
        position: "absolute",
        left: 112,
        top: compact ? 70 : 86,
        width: compact ? 940 : 1540,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          color: accent,
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: 6,
        }}
      >
        {spec.eyebrow}
      </div>
      <div
        style={{
          marginTop: 18,
          color: foreground,
          fontSize: compact ? 66 : lines.length > 1 ? 76 : 84,
          lineHeight: 0.96,
          letterSpacing: -2.5,
          fontWeight: 900,
        }}
      >
        {lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
      <div
        style={{
          marginTop: 22,
          width: compact ? 850 : 1260,
          color: secondary,
          fontSize: 31,
          lineHeight: 1.24,
          fontWeight: 600,
        }}
      >
        {spec.detail}
      </div>
    </div>
  );
};

const ImageLayer: React.FC<{
  src: string;
  zoom?: number;
  position?: string;
  shade?: number;
}> = ({src, zoom = 1, position = "center", shade = 0.18}) => (
  <AbsoluteFill style={{overflow: "hidden", background: COLORS.midnight}}>
    <Img
      src={src}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: position,
        transform: `scale(${zoom})`,
      }}
    />
    <AbsoluteFill style={{background: `rgba(8, 14, 22, ${shade})`}} />
  </AbsoluteFill>
);

const Chip: React.FC<{
  text: string;
  x: number;
  y: number;
  opacity: number;
  accent?: boolean;
}> = ({text, x, y, opacity, accent = false}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      padding: "10px 20px",
      borderRadius: 10,
      color: accent ? COLORS.ink : COLORS.cream,
      background: accent ? COLORS.orange : "rgba(16, 24, 39, 0.78)",
      border: `2px solid ${accent ? COLORS.orange : "rgba(255,248,237,0.46)"}`,
      borderLeft: `8px solid ${COLORS.orange}`,
      boxShadow: "0 12px 30px rgba(0,0,0,0.28)",
      fontFamily: FONT,
      fontSize: 25,
      fontWeight: 900,
      letterSpacing: 1.5,
      opacity,
    }}
  >
    {text}
  </div>
);

const Hero: React.FC<{frame: number}> = ({frame}) => {
  const email = progress(frame, 100, 170);
  const rename = progress(frame, 185, 255);
  const tutorial = progress(frame, 270, 355);
  const relief = progress(frame, 390, 500);
  const transfer = progress(frame, 535, 760);
  const interval = progress(frame, 820, 1000);
  const exitHandoff = progress(frame, 700, 730);
  const exitMove = progress(frame, 730, 910);
  const zoom = 1.02 + progress(frame, 0, 1015) * 0.08 + interval * 0.12;

  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <AbsoluteFill style={{opacity: 1 - exitHandoff}}>
        <ImageLayer src={A01} zoom={zoom} position="center" shade={0.1 + transfer * 0.2} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          overflow: "hidden",
          clipPath: "polygon(0% 8%, 39% 8%, 39% 100%, 0% 100%)",
          opacity: exitHandoff * (1 - exitMove),
          transform: `translateX(${-1200 * exitMove}px)`,
        }}
      >
        <ImageLayer src={A01} zoom={zoom} position="center" shade={0.1 + transfer * 0.2} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          overflow: "hidden",
          clipPath: "polygon(47% 6%, 100% 6%, 100% 100%, 47% 100%)",
          opacity: exitHandoff * (1 - exitMove),
          transform: `translateX(${1200 * exitMove}px)`,
        }}
      >
        <ImageLayer src={A01} zoom={zoom} position="center" shade={0.1 + transfer * 0.2} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, rgba(7,12,19,0.12), rgba(7,12,19,${0.08 + transfer * 0.42}))`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 94,
          top: 70,
          color: COLORS.cream,
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: 6,
        }}
      >
        IMPORTANT WORK
      </div>
      <Chip
        text="EMAIL"
        x={interpolate(email, [0, 1], [1930, 760], clamp)}
        y={320}
        opacity={email * (1 - relief * 0.82) * (1 - exitHandoff)}
      />
      <Chip
        text="RENAME FILE"
        x={interpolate(rename, [0, 1], [1980, 735], clamp)}
        y={477}
        opacity={rename * (1 - relief * 0.82) * (1 - exitHandoff)}
      />
      <Chip
        text="ONE MORE VIDEO"
        x={interpolate(tutorial, [0, 1], [2020, 690], clamp)}
        y={637}
        opacity={tutorial * (1 - relief * 0.82) * (1 - exitHandoff)}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          border: `9px solid ${COLORS.orange}`,
          boxShadow: `0 0 ${90 * relief}px rgba(242,138,58,0.42)`,
          opacity: relief * (1 - transfer),
          transform: `translate(-50%, -50%) scale(${0.82 + relief * 0.18})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          color: COLORS.cream,
          fontSize: 58,
          fontWeight: 900,
          letterSpacing: 7,
          opacity: relief * (1 - transfer),
          transform: "translate(-50%, -50%)",
        }}
      >
        RELIEF
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: 5,
          height: "100%",
          background: COLORS.blue,
          opacity: transfer,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 82,
          color: COLORS.orange,
          fontSize: 32,
          fontWeight: 900,
          letterSpacing: 7,
          opacity: transfer,
        }}
      >
        NOW
      </div>
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 82,
          color: COLORS.blue,
          fontSize: 32,
          fontWeight: 900,
          letterSpacing: 7,
          opacity: transfer,
        }}
      >
        LATER
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 92,
          transform: `translateX(-50%) scale(${0.86 + interval * 0.14})`,
          padding: "25px 38px",
          borderRadius: 24,
          color: COLORS.cream,
          background: COLORS.ink,
          border: `3px solid ${COLORS.green}`,
          fontSize: 48,
          lineHeight: 1,
          fontWeight: 900,
          letterSpacing: 2,
          opacity: interval,
        }}
      >
        CHANGE THE FIRST MOMENT
      </div>
    </AbsoluteFill>
  );
};

const CharacterScene: React.FC<{
  sceneId: SceneId;
  localFrame: number;
  duration: number;
}> = ({sceneId, localFrame, duration}) => {
  const isTransfer = sceneId === "S10" || sceneId === "S12";
  const isFinal = sceneId === "S24";
  const src = isTransfer ? A02 : isFinal ? A04 : A01;
  const appear = progress(localFrame, 0, Math.min(24, duration * 0.2));
  const move = progress(localFrame, 0, duration);
  const accent = isFinal ? COLORS.green : isTransfer ? COLORS.blue : COLORS.orange;

  return (
    <AbsoluteFill style={{fontFamily: FONT, opacity: appear}}>
      <ImageLayer
        src={src}
        zoom={1.02 + move * 0.07}
        position={isFinal ? "center" : "center"}
        shade={isFinal ? 0.22 : 0.3}
      />
      <AbsoluteFill
        style={{
          background: "linear-gradient(90deg, rgba(7,12,19,0.72) 0%, rgba(7,12,19,0.22) 62%, rgba(7,12,19,0.08) 100%)",
        }}
      />
      <Header
        sceneId={sceneId}
        foreground={COLORS.cream}
        secondary="#d3d9dd"
        accent={accent}
        compact
      />
      {sceneId === "S12" && (
        <>
          <div
            style={{
              position: "absolute",
              left: 430,
              right: 410,
              bottom: 132,
              height: 6,
              background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.blue})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 420,
              bottom: 78,
              color: COLORS.orange,
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: 5,
            }}
          >
            NOW
          </div>
          <div
            style={{
              position: "absolute",
              right: 390,
              bottom: 78,
              color: COLORS.blue,
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: 5,
            }}
          >
            LATER
          </div>
          <div
            style={{
              position: "absolute",
              left: interpolate(move, [0, 1], [430, 1350], clamp),
              bottom: 110,
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: COLORS.orange,
              boxShadow: "0 0 35px rgba(242,138,58,0.7)",
            }}
          />
        </>
      )}
      {isFinal && (
        <div
          style={{
            position: "absolute",
            left: 104,
            bottom: 80,
            display: "flex",
            gap: 16,
          }}
        >
          {["NAME ESCAPE", "SHOW ACTION", "TIE TO CUE"].map((item, index) => (
            <div
              key={item}
              style={{
                padding: "15px 20px",
                borderRadius: 16,
                color: index === 1 ? COLORS.ink : COLORS.cream,
                background: index === 1 ? COLORS.green : "rgba(16,24,39,0.88)",
                border: `2px solid ${index === 1 ? COLORS.green : "#64727e"}`,
                fontSize: 23,
                fontWeight: 900,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};

const DiagramScene: React.FC<{
  sceneId: SceneId;
  composition: string;
  localFrame: number;
  duration: number;
}> = ({sceneId, composition, localFrame, duration}) => {
  const spec = sceneSpecs[sceneId];
  const mode = modeFor(composition);
  const appear = progress(localFrame, 0, Math.min(24, duration * 0.18));
  const isLoop = spec.kind === "loop";
  const isTimeline = spec.kind === "timeline";
  const isScale = spec.kind === "scale";
  const isBuilder = spec.kind === "builder";
  const isSplit = spec.kind === "split";
  const isProtocol = spec.kind === "protocol";
  const bottom = 112;
  const panelBorder = composition === "C03" || composition === "C07"
    ? "#405466"
    : "#c7d0d5";

  const itemCard = (item: string, index: number, count: number) => {
    const active = isBuilder
      ? index === Math.min(count - 1, Math.floor(progress(localFrame, 0, duration) * count))
      : isSplit
        ? index === 1
        : isProtocol
          ? index <= Math.floor(progress(localFrame, 0, duration) * count)
          : false;
    return (
      <div
        key={item}
        style={{
          minHeight: isProtocol ? 145 : 170,
          padding: "24px",
          borderRadius: 26,
          color: active ? COLORS.ink : mode.foreground,
          background: active ? mode.accent : mode.panel,
          border: `3px solid ${active ? mode.accent : panelBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: item.length > 22 ? 27 : 31,
          lineHeight: 1.08,
          fontWeight: 900,
          boxShadow: "0 18px 45px rgba(15,25,35,0.13)",
        }}
      >
        {item}
      </div>
    );
  };

  return (
    <AbsoluteFill
      style={{
        background: mode.background,
        color: mode.foreground,
        fontFamily: FONT,
        opacity: appear,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -180,
          top: -240,
          width: 720,
          height: 720,
          borderRadius: "50%",
          background: mode.accent,
          opacity: 0.1,
        }}
      />
      <Header
        sceneId={sceneId}
        foreground={mode.foreground}
        secondary={mode.secondary}
        accent={mode.accent}
      />
      {isTimeline ? (
        <div
          style={{
            position: "absolute",
            left: 150,
            right: 150,
            bottom: 230,
            height: 18,
            borderRadius: 20,
            background: mode.foreground,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: `${progress(localFrame, 0, duration) * 94}%`,
              top: -57,
              width: 38,
              height: 132,
              borderRadius: 20,
              background: mode.accent,
              boxShadow: `0 0 40px ${mode.accent}`,
            }}
          />
          {spec.items.map((item, index) => (
            <div
              key={item}
              style={{
                position: "absolute",
                left: index === 0 ? 0 : "100%",
                top: 48,
                transform: index === 0 ? "none" : "translateX(-100%)",
                color: mode.foreground,
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      ) : isScale ? (
        <div
          style={{
            position: "absolute",
            left: 170,
            right: 170,
            bottom,
            height: 300,
            display: "flex",
            gap: 70,
            alignItems: "end",
          }}
        >
          {spec.items.map((item, index) => (
            <div
              key={item}
              style={{
                flex: 1,
                height: index === 0 ? 120 : 270,
                borderRadius: 28,
                background: index === 0 ? mode.panel : mode.accent,
                color: index === 0 ? mode.foreground : COLORS.ink,
                border: `3px solid ${index === 0 ? panelBorder : mode.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                fontWeight: 900,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      ) : isLoop ? (
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            bottom: 130,
            display: "grid",
            gridTemplateColumns: `repeat(${spec.items.length}, 1fr)`,
            gap: 14,
          }}
        >
          {spec.items.map((item, index) => (
            <div
              key={item}
              style={{
                minHeight: 165,
                borderRadius: 24,
                padding: "18px",
                background: index === 3 ? COLORS.green : mode.panel,
                color: index === 3 ? COLORS.ink : mode.foreground,
                border: `3px solid ${index === 3 ? COLORS.green : panelBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: 25,
                lineHeight: 1.08,
                fontWeight: 900,
                transform: `translateY(${Math.sin(localFrame / 28 + index) * 8}px)`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            left: isProtocol ? 86 : 120,
            right: isProtocol ? 86 : 120,
            bottom,
            display: "grid",
            gridTemplateColumns: isBuilder
              ? "1fr 1fr 1fr"
              : `repeat(${Math.min(spec.items.length, 4)}, 1fr)`,
            gap: 22,
          }}
        >
          {spec.items.map((item, index) => itemCard(item, index, spec.items.length))}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Scene: React.FC<{
  sceneId: SceneId;
  composition: string;
  localFrame: number;
  duration: number;
}> = ({sceneId, composition, localFrame, duration}) => {
  if (composition === "C01") {
    return <Hero frame={localFrame} />;
  }
  if (["S06", "S10", "S12", "S24"].includes(sceneId)) {
    return (
      <CharacterScene
        sceneId={sceneId}
        localFrame={localFrame}
        duration={duration}
      />
    );
  }
  return (
    <DiagramScene
      sceneId={sceneId}
      composition={composition}
      localFrame={localFrame}
      duration={duration}
    />
  );
};

const Canvas: React.FC<{timelineOffset?: number}> = ({timelineOffset = 0}) => {
  const frame = useCurrentFrame() + timelineOffset;
  const active =
    timing.scenes.find(
      (scene) => frame >= scene.startFrame && frame < scene.endFrame,
    ) ?? timing.scenes[timing.scenes.length - 1];
  const sceneId = active.id as SceneId;
  const activeComposition = timing.compositions.find(
    (composition) => composition.id === active.composition,
  );
  const localFrame =
    active.composition === "C01" && activeComposition
      ? frame - activeComposition.startFrame
      : frame - active.startFrame;

  return (
    <Scene
      sceneId={sceneId}
      composition={active.composition}
      localFrame={localFrame}
      duration={active.durationFrames}
    />
  );
};

export const Video004Master: React.FC = () => (
  <AbsoluteFill style={{background: COLORS.midnight}}>
    <Canvas />
    <Audio src={staticFile("audio/video004-narration-master-v1.wav")} />
  </AbsoluteFill>
);

export const Video004Segment: React.FC<{compositionId: string}> = ({
  compositionId,
}) => {
  const composition = timing.compositions.find(
    (item) => item.id === compositionId,
  );
  if (!composition) {
    throw new Error(`Unknown composition ${compositionId}`);
  }
  return <Canvas timelineOffset={composition.startFrame} />;
};
