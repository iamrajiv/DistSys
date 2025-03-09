import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(_: Request, ctx: { params: Record<string, string> }) {
  const params = await ctx.params;
  const { __metadata_id__, ...rest } = params || {};
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
          background: "rgba(255, 255, 255, 0.1)",
          marginBottom: 30,
        }}
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 10h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z" />
        </svg>
      </div>
      <div style={{ fontSize: 60, fontWeight: "bold", marginBottom: 10 }}>Distributed Systems</div>
      <div style={{ fontSize: 48, fontWeight: "bold", color: "#06b6d4" }}>Visualizer</div>
      <div
        style={{
          fontSize: 24,
          opacity: 0.8,
          marginTop: 20,
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        Interactive visualizations of distributed systems algorithms and concepts
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}

