import { Crown, GitMerge, Hash, Lock, MessageCircle, Network } from "lucide-react"

export const SITE_CONFIG = {
  name: "Distributed Systems Visualizer",
  description: "Interactive visualizations of distributed systems algorithms and concepts",
  url: "https://distributed-systems-visualizer.vercel.app",
  ogImage: "/og-image.png",
  author: "Rajiv",
  authorUrl: "https://iamrajiv.github.io",
  github: "https://github.com/rajivpunjabi/distributed-systems-visualizer",
}

export const ALGORITHMS = [
  {
    title: "CAP Theorem Explorer",
    description: "Interactive demonstration of consistency, availability, and partition tolerance tradeoffs",
    href: "/algorithms/cap-theorem",
    icon: Network,
    color: "bg-cyan-500/10 text-cyan-500",
    shortDescription: "Explore the fundamental trade-offs in distributed systems",
  },
  {
    title: "Consensus Algorithms",
    description: "Visualize how Paxos and Raft achieve consensus across distributed nodes",
    href: "/algorithms/consensus",
    icon: GitMerge,
    color: "bg-blue-500/10 text-blue-500",
    shortDescription: "See how distributed nodes reach agreement",
  },
  {
    title: "Leader Election",
    description: "See how distributed systems elect leaders to coordinate operations",
    href: "/algorithms/leader-election",
    icon: Crown,
    color: "bg-amber-500/10 text-amber-500",
    shortDescription: "Understand how systems choose coordinators",
  },
  {
    title: "Distributed Mutual Exclusion",
    description: "Understand how distributed systems manage access to shared resources",
    href: "/algorithms/mutual-exclusion",
    icon: Lock,
    color: "bg-rose-500/10 text-rose-500",
    shortDescription: "Learn about coordinating resource access",
  },
  {
    title: "Gossip Protocols",
    description: "Visualize how information propagates through a distributed system",
    href: "/algorithms/gossip",
    icon: MessageCircle,
    color: "bg-green-500/10 text-green-500",
    shortDescription: "See how information spreads between nodes",
  },
  {
    title: "Consistent Hashing",
    description: "Learn how data is distributed across nodes in a scalable way",
    href: "/algorithms/consistent-hashing",
    icon: Hash,
    color: "bg-purple-500/10 text-purple-500",
    shortDescription: "Discover efficient data distribution techniques",
  },
]

