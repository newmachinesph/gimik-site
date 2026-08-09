import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * The real mark, inlined. Satori cannot fetch a relative URL while rendering,
 * so the PNG is read off disk at build time and embedded as a data URI.
 */
const MARK = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/brand/gora-mark.png"),
).toString("base64")}`;

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  'Gora — turns "we should do that sometime" into a date on the calendar';

// Token values from src/styles/tokens.css:
// --paper #FBF7F0, --ink #16130F, --ink-muted #6B6259,
// --orange #FF5C24, --orange-deep #C63D0B, --sky-deep #0A6FA8
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FBF7F0",
          color: "#16130F",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            color: "#6B6259",
          }}
        >
          GORA — PLANS WITH PEOPLE YOU LIKE
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -4 }}>
            We should do that
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 32,
              marginTop: 8,
            }}
          >
            <span
              style={{
                fontSize: 104,
                fontStyle: "italic",
                color: "#0A6FA8",
                textDecoration: "line-through",
              }}
            >
              sometime
            </span>
            {/* Must stay on one line: the whole point of the card is the swap
                reading left to right. At 64 it overran 1200 and wrapped under
                "sometime", which read as two unrelated lines. */}
            <span
              style={{
                fontSize: 52,
                fontWeight: 600,
                letterSpacing: 2,
                color: "#C63D0B",
                whiteSpace: "nowrap",
              }}
            >
              SAT 14 MAR · 9:00
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* 76, not 56: the PNG carries transparent canvas around the pin,
                so a 56 box renders a ~34px mark and reads undersized next to
                the wordmark. */}
            <img src={MARK} width={76} height={76} alt="" />
            <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
              Gora
            </span>
          </div>
          <span style={{ fontSize: 26, color: "#6B6259" }}>getgora.app</span>
        </div>
      </div>
    ),
    size,
  );
}
