import React from "react";
import {AbsoluteFill, Img, staticFile} from "remotion";

export const Video003ThumbnailB: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: "#090e17",
      color: "#fff8ed",
      fontFamily: "Arial, Helvetica, sans-serif",
      overflow: "hidden",
    }}
  >
    <Img
      src={staticFile("assets/nod/video003-s01-bedroom-scroll-v1.jpg")}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center center",
        transform: "scale(1.025)",
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(90deg,rgba(4,7,13,0.96) 0%,rgba(4,7,13,0.82) 27%,rgba(4,7,13,0.34) 49%,rgba(4,7,13,0.02) 73%), linear-gradient(0deg,rgba(4,7,13,0.48) 0%,transparent 38%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 62,
        top: 126,
        width: 560,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 92,
          height: 12,
          marginBottom: 26,
          borderRadius: 999,
          background: "#f2b84b",
          boxShadow: "0 0 28px rgba(242,184,75,0.58)",
        }}
      />
      <div
        style={{
          fontSize: 108,
          lineHeight: 0.84,
          fontWeight: 950,
          letterSpacing: -5,
          textShadow: "0 7px 24px rgba(0,0,0,0.76)",
        }}
      >
        STILL
        <br />
        AWAKE?
      </div>
    </div>
  </AbsoluteFill>
);
