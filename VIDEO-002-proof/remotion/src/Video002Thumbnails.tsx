import React from "react";
import {AbsoluteFill, Img, staticFile} from "remotion";

const WHITE = "#fff8ec";
const ORANGE = "#ff861c";
const GRAPHITE = "#17191b";

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const edgeShade: React.CSSProperties = {
  boxShadow:
    "inset 0 0 0 2px rgba(255,248,236,0.14), inset 0 0 76px rgba(0,0,0,0.16)",
};

const headlineStyle: React.CSSProperties = {
  fontFamily: "Arial Black, Arial, Helvetica, sans-serif",
  fontWeight: 900,
  textTransform: "uppercase",
  textShadow: "0 5px 0 rgba(0,0,0,0.68), 0 10px 30px rgba(0,0,0,0.58)",
};

export const Video002ThumbnailA: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: GRAPHITE}}>
    <Img
      src={staticFile(
        "assets/nod/video002-thumbnail-a-silent-reach-v1.jpg"
      )}
      style={imageStyle}
    />
    <AbsoluteFill style={edgeShade} />
  </AbsoluteFill>
);

export const Video002ThumbnailB: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: GRAPHITE}}>
    <Img
      src={staticFile(
        "assets/nod/video002-thumbnail-b-still-checking-hero-v2.jpg"
      )}
      style={imageStyle}
    />

    <AbsoluteFill
      style={{
        background:
          "linear-gradient(90deg, rgba(17,18,18,0.76) 0%, rgba(17,18,18,0.52) 31%, rgba(17,18,18,0.08) 56%, transparent 70%)",
      }}
    />

    <div
      style={{
        ...headlineStyle,
        position: "absolute",
        left: 54,
        top: 112,
        width: 560,
        color: WHITE,
        fontSize: 91,
        lineHeight: 0.9,
        letterSpacing: -5,
      }}
    >
      <span style={{display: "block"}}>STILL</span>
      <span style={{display: "block", color: ORANGE}}>CHECKING?</span>
    </div>

    <AbsoluteFill style={edgeShade} />
  </AbsoluteFill>
);

export const Video002ThumbnailC: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: GRAPHITE}}>
    <Img
      src={staticFile(
        "assets/nod/video002-thumbnail-c-open-door-hero-v1.jpg"
      )}
      style={imageStyle}
    />

    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(10,11,11,0.56) 0%, rgba(10,11,11,0.14) 27%, transparent 47%)",
      }}
    />

    <div
      style={{
        ...headlineStyle,
        position: "absolute",
        left: 48,
        top: 38,
        color: WHITE,
        fontSize: 78,
        lineHeight: 1,
        letterSpacing: -4,
        whiteSpace: "nowrap",
      }}
    >
      STILL <span style={{color: ORANGE}}>OPEN</span>
    </div>

    <AbsoluteFill style={edgeShade} />
  </AbsoluteFill>
);
