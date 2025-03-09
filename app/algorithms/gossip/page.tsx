"use client"

import { useState, useEffect, useRef } from "react"
import { PlayCircle, RefreshCw, StopCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function GossipProtocol() {
  // This is a placeholder for the Gossip Protocol implementation
  // The full implementation would include:
  // - Visualization of information propagation through a network
  // - Different gossip variants (push, pull, push-pull)
  // - Network topology options
  // - Node failure scenarios
  // - Performance metrics

  const isMobile = useMediaQuery("(max-width: 640px)")

  // State declarations
  const [nodeCount, setNodeCount] = useState(isMobile ? 10 : 20)
  const [fanout, setFanout] = useState(2)
  const [algorithm, setAlgorithm] = useState("gossip")
  const [speed, setSpeed] = useState(1)
  const [isRunning, setIsRunning] = useState(false)
  const [round, setRound] = useState(0)
  const [showNodeIds, setShowNodeIds] = useState(!isMobile)
  const [failureRate, setFailureRate] = useState(0)
  const [networkTopology, setNetworkTopology] = useState("random")
  const [infectedCount, setInfectedCount] = useState(1)
  const [nodesWithInfo, setNodesWithInfo] = useState([0]) // Start with node 0 having the info
  const [isSimulationComplete, setIsSimulationComplete] = useState(false)

  // Generate nodes
  const nodes = Array.from({ length: nodeCount }).map((_, index) => {
    const awareness =
      algorithm === "gossip"
        ? round === 0 && index === 0
          ? 100
          : round > 0 && nodesWithInfo.includes(index)
            ? 100
            : 0
        : calculatePushPullAwareness(index)

    return {
      id: index + 1,
      awareness: awareness,
      position: getNodePosition(index, networkTopology),
      failed: Math.random() < failureRate / 100,
    }
  })

  function calculatePushPullAwareness(index) {
    if (round === 0 && index === 0) return 100
    if (round === 0) return 0

    // For push-pull, information spreads faster
    const spreadProbability = Math.min(1, (round * fanout * 2) / nodeCount)
    return Math.random() < spreadProbability ? 100 : 0
  }

  function getNodePosition(index, topology) {
    if (topology === "ring") {
      const angle = (2 * Math.PI * index) / nodeCount
      return {
        x: Math.cos(angle),
        y: Math.sin(angle),
      }
    } else if (topology === "grid") {
      const gridSize = Math.ceil(Math.sqrt(nodeCount))
      const row = Math.floor(index / gridSize)
      const col = index % gridSize
      return {
        x: (col / Math.max(1, gridSize - 1)) * 2 - 1,
        y: (row / Math.max(1, gridSize - 1)) * 2 - 1,
      }
    } else {
      // random
      return {
        x: (Math.random() * 2 - 1) * 0.8,
        y: (Math.random() * 2 - 1) * 0.8,
      }
    }
  }

  // Animation frame reference
  const animationRef = useRef<number>()
  const visualizationRef = useRef<HTMLDivElement>(null)

  // Control the animation
  useEffect(() => {
    if (isRunning) {
      let lastRoundTime = Date.now()

      const animate = () => {
        const now = Date.now()
        if (now - lastRoundTime > 1000 / speed) {
          simulateGossipRound()
          lastRoundTime = now

          // Stop if all non-failed nodes have the information
          const healthyNodeCount = nodes.filter((n) => !n.failed).length
          if (infectedCount >= healthyNodeCount) {
            setIsRunning(false)
            setIsSimulationComplete(true)
          }
        }
        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [isRunning, speed, nodesWithInfo, infectedCount, round, algorithm, fanout, nodes])

  // Reset when changing parameters
  useEffect(() => {
    resetSimulation()
  }, [nodeCount, algorithm, networkTopology, failureRate])

  // Adjust node count for mobile
  useEffect(() => {
    if (isMobile && nodeCount > 15) {
      setNodeCount(10)
    }
  }, [isMobile, nodeCount])

  const simulateGossipRound = () => {
    const newInfected = [...nodesWithInfo]

    // Each infected node tries to infect 'fanout' other nodes
    nodesWithInfo.forEach((nodeIdx) => {
      if (nodeIdx >= nodes.length || nodes[nodeIdx].failed) return // Skip if node doesn't exist or failed

      // Choose 'fanout' random targets
      const targets = []
      for (let i = 0; i < fanout; i++) {
        const target = Math.floor(Math.random() * nodeCount)
        if (target !== nodeIdx && target < nodes.length && !nodes[target].failed) {
          targets.push(target)
        }
      }

      // Infect targets
      targets.forEach((target) => {
        if (!newInfected.includes(target)) {
          newInfected.push(target)
        }
      })
    })

    setNodesWithInfo(newInfected)
    setInfectedCount(newInfected.length)
    setRound((prev) => prev + 1)
  }

  const toggleSimulation = () => {
    setIsRunning(!isRunning)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setRound(0)
    setNodesWithInfo([0])
    setInfectedCount(1)
    setIsSimulationComplete(false)
  }

  // Get status message
  const getStatusMessage = () => {
    const percentComplete = Math.round((infectedCount / Math.max(1, nodes.filter((n) => !n.failed).length)) * 100)

    if (round === 0) {
      return "Initial state. Only the first node has the information."
    } else if (percentComplete < 100) {
      return `Round ${round}: ${infectedCount} nodes (${percentComplete}%) have received the information.`
    } else {
      return `Complete! All ${infectedCount} healthy nodes received the information in ${round} rounds.`
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 animate-in">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Gossip Protocols</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visualization</CardTitle>
              <CardDescription>
                {algorithm === "gossip"
                  ? "Watch how information spreads through the network using push-based gossip"
                  : "See how push-pull gossip accelerates information propagation"}
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">
                  This is a placeholder for the gossip protocol visualization. The full implementation would show an
                  interactive simulation of information spreading through a network.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="grid items-center gap-1.5">
                  <Label htmlFor="show-ids">Show Node IDs</Label>
                  <Switch id="show-ids" checked={showNodeIds} onCheckedChange={setShowNodeIds} />
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={toggleSimulation} variant={isRunning ? "secondary" : "default"} className="w-40">
                  {isRunning ? (
                    <>
                      <StopCircle className="mr-2 size-4" />
                      Stop
                    </>
                  ) : (
                    <>
                      <PlayCircle className="mr-2 size-4" />
                      Start Simulation
                    </>
                  )}
                </Button>

                <Button onClick={resetSimulation} variant="outline">
                  <RefreshCw className="mr-2 size-4" />
                  Reset
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Adjust the gossip protocol parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Gossip Variant</h3>
                <RadioGroup
                  defaultValue="gossip"
                  value={algorithm}
                  onValueChange={setAlgorithm}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gossip" id="gossip" />
                    <Label htmlFor="gossip">Push Gossip</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="push-pull" id="push-pull" />
                    <Label htmlFor="push-pull">Push-Pull Gossip</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Network Topology</h3>
                <RadioGroup
                  defaultValue="random"
                  value={networkTopology}
                  onValueChange={setNetworkTopology}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="random" id="random" />
                    <Label htmlFor="random">Random Network</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ring" id="ring" />
                    <Label htmlFor="ring">Ring Network</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grid" id="grid" />
                    <Label htmlFor="grid">Grid Network</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Number of Nodes: {nodeCount}</h3>
                <Slider
                  value={[nodeCount]}
                  min={isMobile ? 5 : 10}
                  max={isMobile ? 15 : 50}
                  step={5}
                  onValueChange={(value) => setNodeCount(value[0])}
                  className="w-full"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Gossip Fanout: {fanout}</h3>
                <Slider
                  value={[fanout]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(value) => setFanout(value[0])}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">Number of peers each node contacts in each round</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Node Failure Rate: {failureRate}%</h3>
                <Slider
                  value={[failureRate]}
                  min={0}
                  max={30}
                  step={5}
                  onValueChange={(value) => setFailureRate(value[0])}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How Gossip Protocols Work</CardTitle>
              <CardDescription>Efficient information dissemination in distributed systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue={algorithm} value={algorithm} onValueChange={setAlgorithm}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="gossip">Push</TabsTrigger>
                  <TabsTrigger value="push-pull">Push-Pull</TabsTrigger>
                </TabsList>
                <TabsContent value="gossip" className="space-y-4">
                  <p className="text-muted-foreground">
                    This is a placeholder for the push-based gossip explanation. The full implementation would include
                    detailed information about how push-based gossip works.
                  </p>
                </TabsContent>
                <TabsContent value="push-pull" className="space-y-4">
                  <p className="text-muted-foreground">
                    This is a placeholder for the push-pull gossip explanation. The full implementation would include
                    detailed information about how push-pull gossip works.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="https://en.wikipedia.org/wiki/Gossip_protocol" target="_blank">
                  Learn More
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Real-World Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Cassandra & DynamoDB:</h3>
                <p className="text-sm text-muted-foreground">
                  Use gossip protocols to maintain cluster state and detect node failures.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Consul:</h3>
                <p className="text-sm text-muted-foreground">
                  Employs gossip for service discovery and monitoring the health of nodes.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Blockchain Networks:</h3>
                <p className="text-sm text-muted-foreground">
                  Many blockchain systems use gossip protocols to propagate transactions and blocks.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Epidemic Algorithms:</h3>
                <p className="text-sm text-muted-foreground">
                  Used in large-scale data synchronization, including distributed caching systems.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm">SWIM Protocol:</h3>
                <p className="text-sm text-muted-foreground">
                  Scalable Weakly-consistent Infection-style Membership protocol used in systems like Serf for failure
                  detection.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

