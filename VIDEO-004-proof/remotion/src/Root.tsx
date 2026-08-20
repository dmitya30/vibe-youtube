import React from "react";
import {Composition} from "remotion";
import {timing} from "./timing";
import {Video004Master, Video004Segment} from "./Video004";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Video004Master" component={Video004Master} durationInFrames={timing.compositionDurationFrames} fps={timing.fps} width={1920} height={1080} />
    {timing.compositions.map((composition) => (
      <Composition
        key={composition.id}
        id={`Video004-${composition.id}`}
        component={Video004Segment}
        durationInFrames={composition.durationFrames}
        fps={timing.fps}
        width={1920}
        height={1080}
        defaultProps={{compositionId: composition.id}}
      />
    ))}
  </>
);
