import React from "react";
import {Composition} from "remotion";
import {timing} from "./timing";
import {Video002Master, Video002Segment} from "./Video002Master";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Video002Master" component={Video002Master} durationInFrames={timing.compositionDurationFrames} fps={timing.fps} width={1920} height={1080} />
    {timing.compositions.map((composition) => (
      <Composition key={composition.id} id={`Video002-${composition.id}`} component={Video002Segment} durationInFrames={composition.durationFrames} fps={timing.fps} width={1920} height={1080} defaultProps={{compositionId: composition.id}} />
    ))}
  </>
);
