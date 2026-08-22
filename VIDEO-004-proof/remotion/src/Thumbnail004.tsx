import React from "react";
import {AbsoluteFill, Img, staticFile} from "remotion";

const COLORS = {
  ink: "#17212b",
  midnight: "#101827",
  cream: "#fff8ed",
  orange: "#f28a3a",
  coral: "#ff795f",
  blue: "#67b7c9",
};

const FONT = "Arial, Helvetica, sans-serif";
const A01 = staticFile("assets/nod/video004-a01-opening-workspace-v3.jpg");
const A02 = staticFile("assets/nod/video004-a02-now-later-transfer-v2.jpg");

const CoverImage: React.FC<{
  src: string;
  scale: number;
  position: string;
}> = ({src, scale, position}) => (
  <AbsoluteFill style={{overflow: "hidden", background: COLORS.midnight}}>
    <Img
      src={src}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: position,
        transform: `scale(${scale})`,
      }}
    />
  </AbsoluteFill>
);

export const Video004ThumbnailA: React.FC = () => (
  <AbsoluteFill
    style={{
      background: COLORS.midnight,
      color: COLORS.cream,
      fontFamily: FONT,
      overflow: "hidden",
    }}
  >
    <CoverImage src={A02} scale={1.09} position="center 52%" />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(90deg, rgba(6,11,18,0.88) 0%, rgba(6,11,18,0.52) 39%, rgba(6,11,18,0.08) 68%, rgba(6,11,18,0.28) 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 92,
        top: 92,
        width: 720,
        fontSize: 150,
        lineHeight: 0.82,
        letterSpacing: -8,
        fontWeight: 900,
        textShadow: "0 12px 35px rgba(0,0,0,0.65)",
      }}
    >
      <div>NOT</div>
      <div style={{color: COLORS.orange}}>NOW.</div>
    </div>
    <div
      style={{
        position: "absolute",
        left: 100,
        bottom: 82,
        width: 350,
        height: 12,
        borderRadius: 20,
        background: COLORS.orange,
        boxShadow: "0 0 34px rgba(242,138,58,0.7)",
      }}
    />
    <div
      style={{
        position: "absolute",
        right: 94,
        bottom: 76,
        color: COLORS.blue,
        fontSize: 27,
        fontWeight: 900,
        letterSpacing: 8,
        textShadow: "0 7px 24px rgba(0,0,0,0.7)",
      }}
    >
      FUTURE YOU
    </div>
  </AbsoluteFill>
);

export const Video004ThumbnailB: React.FC = () => (
  <AbsoluteFill
    style={{
      background: COLORS.midnight,
      color: COLORS.cream,
      fontFamily: FONT,
      overflow: "hidden",
    }}
  >
    <CoverImage src={A01} scale={1.14} position="center 51%" />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(5,10,17,0.78) 0%, rgba(5,10,17,0.18) 46%, rgba(5,10,17,0.36) 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "57%",
        width: 470,
        height: 470,
        borderRadius: "50%",
        border: `16px solid ${COLORS.orange}`,
        boxShadow:
          "0 0 45px rgba(242,138,58,0.95), 0 0 150px rgba(242,138,58,0.52)",
        transform: "translate(-50%, -50%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 78,
        right: 78,
        top: 62,
        textAlign: "center",
        fontSize: 118,
        lineHeight: 0.86,
        letterSpacing: -5,
        fontWeight: 900,
        textShadow: "0 12px 40px rgba(0,0,0,0.78)",
      }}
    >
      <span style={{color: COLORS.cream}}>RELIEF</span>
      <span style={{color: COLORS.coral}}> IS THE TRAP</span>
    </div>
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: 68,
        transform: "translateX(-50%)",
        padding: "13px 25px",
        borderRadius: 14,
        color: COLORS.ink,
        background: COLORS.orange,
        fontSize: 25,
        fontWeight: 900,
        letterSpacing: 5,
        boxShadow: "0 15px 40px rgba(0,0,0,0.46)",
      }}
    >
      FEELS BETTER NOW
    </div>
  </AbsoluteFill>
);
