import React from "react";
import {Composition} from "remotion";
import {timing} from "./timing";
import {Video003Master, Video003Segment} from "./Video003";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Video003Master"
      component={Video003Master}
      durationInFrames={timing.compositionDurationFrames}
      fps={timing.fps}
      width={1920}
      height={1080}
    />
    {timing.compositions.map((composition) => (
      <Composition
        key={composition.id}
        id={`Video003-${composition.id}`}
        component={Video003Segment}
        durationInFrames={composition.durationFrames}
        fps={timing.fps}
        width={1920}
        height={1080}
        defaultProps={{
          compositionId: composition.id,
          withAudio: true,
        }}
      />
    ))}
  </>
);
