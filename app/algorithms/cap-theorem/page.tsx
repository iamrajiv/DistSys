import type { Metadata } from "next"
import { CAPTheoremExplorer } from "@/components/algorithms/cap-theorem/cap-theorem-explorer"

export const metadata: Metadata = {
  title: "CAP Theorem Explorer",
  description:
    "Interactive demonstration of consistency, availability, and partition tolerance tradeoffs in distributed systems",
}

export default function CAPTheoremPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CAP Theorem</h1>
      <p className="mb-4">
        The CAP theorem states that it is impossible for a distributed data store
        to simultaneously provide more than two out of the following three guarantees:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Consistency</strong>: Every read receives the most recent write or an error</li>
        <li><strong>Availability</strong>: Every request receives a response, without guarantee that it contains the most recent write</li>
        <li><strong>Partition tolerance</strong>: The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network</li>
      </ul>
      <p>
        Understanding the CAP theorem is crucial for designing distributed systems and
        making appropriate trade-offs based on system requirements.
      </p>
    </div>
  )
}

