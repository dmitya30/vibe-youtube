import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {sceneSpecs, type SceneSpec} from "./scenes";
import {timing} from "./timing";

const COLORS = {
  ink: "#17212b",
  midnight: "#101827",
  paper: "#f5ecdd",
  cream: "#fff8ed",
  coral: "#ff795f",
  amber: "#f2b84b",
  blue: "#67b7c9",
  green: "#74a68b",
  muted: "#8d98a3",
};

type SegmentProps = {
  compositionId: string;
  withAudio?: boolean;
};

const Phone: React.FC<{feed?: boolean; parked?: boolean}> = ({
  feed = false,
  parked = false,
}) => {
  const frame = useCurrentFrame();
  const drift = feed ? (frame * 2.4) % 150 : 0;
  return (
    <div
      style={{
        width: 310,
        height: 610,
        borderRadius: 52,
        border: `14px solid ${COLORS.ink}`,
        background: "#0c111b",
        boxShadow: parked
          ? "0 30px 70px rgba(20,30,40,0.25)"
          : "0 0 85px rgba(103,183,201,0.45)",
        overflow: "hidden",
        transform: parked ? "rotate(8deg) scale(0.82)" : "rotate(-5deg)",
      }}
    >
      <div
        style={{
          width: 110,
          height: 22,
          borderRadius: 20,
          background: COLORS.ink,
          margin: "12px auto 24px",
        }}
      />
      <div
        style={{
          transform: `translateY(-${drift}px)`,
          padding: "0 18px",
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            style={{
              height: 120,
              borderRadius: 22,
              marginBottom: 18,
              background:
                item % 2 === 0
                  ? "linear-gradient(135deg,#31445c,#182333)"
                  : "linear-gradient(135deg,#724b54,#30212c)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const CharacterState: React.FC<{landing: boolean}> = ({landing}) => {
  const frame = useCurrentFrame();
  const reach = interpolate(frame, [0, 35], [0, landing ? 210 : 35], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "relative",
        width: 720,
        height: 560,
        borderRadius: 56,
        background:
          "radial-gradient(circle at 72% 32%,rgba(103,183,201,0.22),transparent 32%),linear-gradient(150deg,#1b2940,#0e1522)",
        overflow: "hidden",
        boxShadow: "0 35px 90px rgba(0,0,0,0.32)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 185,
          height: 185,
          borderRadius: "50%",
          background: "#d4a17e",
          left: 120,
          top: 90,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 330,
          height: 330,
          borderRadius: "46% 46% 18% 18%",
          background: "#41516a",
          left: 48,
          top: 250,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 270,
          height: 68,
          borderRadius: 50,
          background: "#d4a17e",
          left: 270,
          top: 310,
          transform: `translateX(${reach}px) rotate(-8deg)`,
          transformOrigin: "left center",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: landing ? 72 : 105,
          bottom: landing ? 72 : 145,
          width: 112,
          height: 205,
          border: `8px solid ${COLORS.ink}`,
          borderRadius: 24,
          background: COLORS.blue,
          transform: landing ? "rotate(12deg)" : "rotate(-8deg)",
          boxShadow: "0 0 45px rgba(103,183,201,0.6)",
        }}
      />
      {landing ? (
        <div
          style={{
            position: "absolute",
            right: 28,
            bottom: 35,
            width: 220,
            height: 42,
            borderRadius: 20,
            background: COLORS.paper,
          }}
        />
      ) : null}
    </div>
  );
};

const CardGrid: React.FC<{items: readonly string[]; accent: string}> = ({
  items,
  accent,
}) => {
  const frame = useCurrentFrame();
  return (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: items.length > 3 ? "1fr 1fr" : "1fr",
      gap: 18,
      width: 650,
    }}
  >
    {items.map((item, index) => (
      <div
        key={item}
        style={{
          padding: "24px 28px",
          borderRadius: 24,
          color: COLORS.ink,
          background: index === 0 ? accent : COLORS.cream,
          border: `2px solid ${COLORS.ink}18`,
          boxShadow: "0 14px 34px rgba(23,33,43,0.10)",
          opacity: interpolate(
            frame,
            [index * 10, index * 10 + 12],
            [0, 1],
            {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
          ),
          transform: `translateY(${
            interpolate(
              frame,
              [index * 10, index * 10 + 16],
              [24, 0],
              {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
            ) + Math.sin((frame + index * 17) / 25) * 3
          }px)`,
          fontSize: 30,
          lineHeight: 1.08,
          fontWeight: 900,
          letterSpacing: 0.5,
        }}
      >
        {item}
      </div>
    ))}
  </div>
  );
};

const CinematicScene: React.FC<{
  sceneId: string;
  spec: SceneSpec;
  durationFrames: number;
}> = ({sceneId, spec, durationFrames}) => {
  const frame = useCurrentFrame();
  const progress = frame / Math.max(1, durationFrames - 1);
  const opening = sceneId === "S01" || sceneId === "S02";
  const openingImage = staticFile(
    "assets/nod/video003-s01-bedroom-scroll-v1.jpg",
  );
  const landingImage = staticFile(
    "assets/nod/video003-s18-phone-landing-v1.jpg",
  );
  const endOfDayImage = staticFile(
    "assets/nod/video003-s08-not-fun-anymore-v1.jpg",
  );
  const openingVideo = staticFile(
    "assets/video/video003-s01-bedroom-scroll-kling-pingpong-v1.mp4",
  );
  const image =
    opening
      ? openingImage
      : sceneId === "S08"
        ? endOfDayImage
        : landingImage;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.midnight,
        color: COLORS.cream,
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
      }}
    >
      <Img
        src={image}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${1.025 + progress * 0.025})`,
        }}
      />
      {opening ? (
        <OffthreadVideo
          src={openingVideo}
          muted
          trimBefore={
            sceneId === "S02"
              ? timing.scenes.find((scene) => scene.id === "S02")
                  ?.startFrame ?? 0
              : 0
          }
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : null}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg,rgba(5,9,15,0.88) 0%,rgba(5,9,15,0.58) 36%,rgba(5,9,15,0.08) 68%,rgba(5,9,15,0.18) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 88,
          bottom: 112,
          width: 820,
          transform: `translateY(${interpolate(
            frame,
            [0, 20],
            [34, 0],
            {extrapolateRight: "clamp"},
          )}px)`,
          opacity: interpolate(frame, [0, 14], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            color: COLORS.amber,
            fontSize: 25,
            fontWeight: 900,
            letterSpacing: 4,
          }}
        >
          {spec.eyebrow}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: spec.title.length > 30 ? 66 : 82,
            lineHeight: 0.98,
            fontWeight: 950,
            letterSpacing: -2,
          }}
        >
          {spec.title}
        </div>
        <div
          style={{
            marginTop: 22,
            maxWidth: 720,
            color: "#d5dde6",
            fontSize: 29,
            lineHeight: 1.22,
            fontWeight: 600,
          }}
        >
          {spec.detail}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneVisual: React.FC<{
  sceneId: string;
  spec: SceneSpec;
  durationFrames: number;
}> = ({sceneId, spec, durationFrames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = spring({
    fps,
    frame,
    config: {damping: 18, stiffness: 115, mass: 0.8},
  });
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const isDark =
    spec.kind === "character" ||
    spec.kind === "feed" ||
    spec.kind === "title";
  const accent =
    spec.kind === "caution"
      ? COLORS.coral
      : spec.kind === "study"
        ? COLORS.blue
        : spec.kind === "step" || spec.kind === "log"
          ? COLORS.green
          : COLORS.amber;
  const landing = spec.title.includes("LANDING PLACE");
  const finalPhone = spec.title.includes("DECIDE WHERE IT ENDS");

  if (
    sceneId === "S01" ||
    sceneId === "S02" ||
    sceneId === "S08" ||
    sceneId === "S18" ||
    sceneId === "S25"
  ) {
    return (
      <CinematicScene
        sceneId={sceneId}
        spec={spec}
        durationFrames={durationFrames}
      />
    );
  }

  return (
    <AbsoluteFill
      style={{
        background: isDark
          ? "radial-gradient(circle at 80% 15%,#263957,#101827 56%,#090e17)"
          : "linear-gradient(135deg,#fff9ef,#efe4d3)",
        color: isDark ? COLORS.cream : COLORS.ink,
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "72px 88px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 620,
          height: 620,
          borderRadius: "50%",
          background: accent,
          opacity: isDark ? 0.08 : 0.13,
          right: -170,
          top: -230,
        }}
      />
      <div
        style={{
          fontSize: 25,
          fontWeight: 900,
          color: accent,
          letterSpacing: 4,
          opacity,
        }}
      >
        {spec.eyebrow}
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 75,
          transform: `translateY(${(1 - entrance) * 38}px) translateX(${
            Math.sin(frame / 55) * 5
          }px) scale(${1 + Math.min(frame, 900) / 45000})`,
          opacity,
        }}
      >
        <div style={{maxWidth: spec.kind === "title" ? 1220 : 940}}>
          <div
            style={{
              fontSize:
                spec.title.length > 43
                  ? 66
                  : spec.title.length > 28
                    ? 78
                    : 96,
              lineHeight: 0.98,
              fontWeight: 950,
              letterSpacing: -2.5,
              textWrap: "balance",
            }}
          >
            {spec.title}
          </div>
          <div
            style={{
              marginTop: 30,
              maxWidth: 880,
              fontSize: 32,
              lineHeight: 1.24,
              color: isDark ? "#cbd4df" : "#53606b",
              fontWeight: 600,
            }}
          >
            {spec.detail}
          </div>
        </div>

        {spec.kind === "character" ? (
          <CharacterState landing={landing || finalPhone} />
        ) : spec.kind === "feed" ? (
          <Phone feed={!finalPhone} parked={finalPhone} />
        ) : spec.kind === "title" ? (
          <div
            style={{
              width: 390,
              height: 390,
              borderRadius: "50%",
              background: `radial-gradient(circle,${accent},${accent}22 58%,transparent 60%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Phone parked={finalPhone} />
          </div>
        ) : spec.kind === "study" ? (
          <div
            style={{
              width: 610,
              padding: "52px",
              borderRadius: 44,
              background: COLORS.ink,
              color: COLORS.cream,
              boxShadow: "0 28px 70px rgba(23,33,43,0.22)",
            }}
          >
            <div style={{fontSize: 28, color: accent, fontWeight: 900}}>
              EVIDENCE
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 52,
                lineHeight: 1.02,
                fontWeight: 950,
              }}
            >
              {spec.items[0]}
            </div>
            <div
              style={{
                marginTop: 28,
                paddingTop: 25,
                borderTop: `3px solid ${accent}`,
                fontSize: 29,
                fontWeight: 800,
              }}
            >
              {spec.items[1]}
            </div>
          </div>
        ) : (
          <CardGrid items={spec.items} accent={accent} />
        )}
      </div>

    </AbsoluteFill>
  );
};

const getSpec = (sceneId: string): SceneSpec => {
  const spec = sceneSpecs[sceneId];
  if (!spec) {
    throw new Error(`Missing declarative scene spec: ${sceneId}`);
  }
  return spec;
};

export const Video003Segment: React.FC<SegmentProps> = ({
  compositionId,
  withAudio = true,
}) => {
  const composition = timing.compositions.find(
    (item) => item.id === compositionId,
  );
  if (!composition) {
    throw new Error(`Unknown composition: ${compositionId}`);
  }
  const scenes = timing.scenes.filter(
    (scene) => scene.composition === compositionId,
  );
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.midnight}}>
      {withAudio ? (
        <Audio
          src={staticFile("audio/video003-narration-master-v1.wav")}
          trimBefore={composition.startFrame}
          trimAfter={composition.endFrame}
        />
      ) : null}
      {scenes.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame - composition.startFrame}
          durationInFrames={scene.durationFrames}
          name={`${scene.id} ${scene.anchor}`}
        >
          <SceneVisual
            sceneId={scene.id}
            spec={getSpec(scene.id)}
            durationFrames={scene.durationFrames}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const Video003Master: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: COLORS.midnight}}>
    <Audio src={staticFile("audio/video003-narration-master-v1.wav")} />
    {timing.compositions.map((composition) => (
      <Sequence
        key={composition.id}
        from={composition.startFrame}
        durationInFrames={composition.durationFrames}
        name={composition.id}
      >
        <Video003Segment
          compositionId={composition.id}
          withAudio={false}
        />
      </Sequence>
    ))}
  </AbsoluteFill>
);
