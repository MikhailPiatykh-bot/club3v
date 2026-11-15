import { ImageResponse } from "next/og";

export const alt = "Veni Vidi Vici — ушу и акробатика для детей с 3 лет в СЗАО";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1c1412",
          color: "#f3eee6",
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4 }}>VENI VIDI VICI</div>
        <div style={{ display: "flex", fontSize: 64, lineHeight: 1.05, maxWidth: 900 }}>
          Ушу и акробатика для детей с 3 лет
        </div>
        <div style={{ display: "flex", fontSize: 28 }}>Хорошёво-Мнёвники · пр-т Маршала Жукова, 51 · 9 000 ₽</div>
      </div>
    ),
    { ...size },
  );
}
