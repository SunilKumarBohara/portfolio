import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#06070a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#00e599",
          borderRadius: 8,
          border: "2px solid #00e599",
          fontWeight: 900,
          fontFamily: "sans-serif",
        }}
      >
        S
      </div>
    ),
    {
      ...size,
    }
  );
}
