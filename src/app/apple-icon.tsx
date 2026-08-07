import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Token values from src/styles/tokens.css: --orange #FF5C24, --paper #FBF7F0
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FF5C24",
          borderRadius: 40,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 28 28">
          <line
            x1="6"
            y1="19.5"
            x2="22"
            y2="19.5"
            stroke="#FBF7F0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="14" cy="12" r="4.5" fill="#FBF7F0" />
        </svg>
      </div>
    ),
    size,
  );
}
