import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/siteConfig";

export const runtime = "edge";
export const alt = "Sunil Kumar Bohara — SEO Specialist Nepal";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#06070a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background Gradients */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(0,229,153,0.2) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Brand Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(13, 15, 22, 0.8)",
            border: "1px solid rgba(0, 229, 153, 0.4)",
            padding: "10px 24px",
            borderRadius: "9999px",
            color: "#00e599",
            fontSize: "20px",
            letterSpacing: "1px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              background: "#00e599",
              borderRadius: "50%",
            }}
          />
          SEO Specialist & Growth Strategist • Nepal
        </div>

        {/* Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            Sunil Kumar Bohara
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#94a3b8",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            I Turn Search Visibility Into Scalable Digital Growth
          </div>
        </div>

        {/* Footer Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "32px",
            color: "#64748b",
            fontSize: "18px",
          }}
        >
          <div>sunilbohara.com</div>
          <div style={{ color: "#00e599" }}>
            Technical SEO • Keyword Research • Core Web Vitals • Schema Graph
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
