import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(to bottom, #000000, #111827)",
        color: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(6, 182, 212, 0.2)",
          marginBottom: 30,
        }}
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </div>
      <div style={{ fontSize: 60, fontWeight: "bold", marginBottom: 10 }}>CAP Theorem Explorer</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(59, 130, 246, 0.2)",
          }}
        >
          <div style={{ fontSize: 36, fontWeight: "bold", color: "#3b82f6" }}>C</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(34, 197, 94, 0.2)",
          }}
        >
          <div style={{ fontSize: 36, fontWeight: "bold", color: "#22c55e" }}>A</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(245, 158, 11, 0.2)",
          }}
        >
          <div style={{ fontSize: 36, fontWeight: "bold", color: "#f59e0b" }}>P</div>
        </div>
      </div>
      <div
        style={{
          fontSize: 24,
          opacity: 0.8,
          marginTop: 20,
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        Explore the tradeoffs between Consistency, Availability, and Partition Tolerance
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}

