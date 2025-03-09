import type { Metadata } from "next"
import { CAPTheoremExplorer } from "@/components/algorithms/cap-theorem/cap-theorem-explorer"

export const metadata: Metadata = {
  title: "CAP Theorem Explorer",
  description:
    "Interactive demonstration of consistency, availability, and partition tolerance tradeoffs in distributed systems",
}

export default function CAPTheoremPage() {
  return <CAPTheoremExplorer />
}

