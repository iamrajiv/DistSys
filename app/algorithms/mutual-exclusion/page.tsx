"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect, useRef } from "react"
import { PlayCircle, StopCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

export default function MutualExclusion() {
  // This is a placeholder for the Mutual Exclusion implementation
  // The full implementation would include:
  // - Visualization of different mutual exclusion algorithms (Centralized, Token-based, Ricart-Agrawala)
  // - Interactive simulation of the exclusion process
  // - Critical section access visualization
  // - Performance metrics

  const [nodeCount, setNodeCount] = useState(5)
  const [algorithm, setAlgorithm] = useState("centralized")
  const [speed, setSpeed] = useState(1)
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [activeNode, setActiveNode] = useState<number | null>(null)

  // Generate nodes
  const nodes = Array.from({ length: nodeCount }).map((_, index) => ({
    id: index + 1,
    state: getNodeState(index + 1),
    position: {
      x: Math.cos((2 * Math.PI * index) / nodeCount),
      y: Math.sin((2 * Math.PI * index) / nodeCount),
    },
  }))

  function getNodeState(id: number) {
    if (algorithm === "centralized") {
      if (id === 1) return "coordinator"
      if (currentStep >= 3 && currentStep < 5 && id === 3) return "waiting"
      if (currentStep >= 5 && id === 3) return "active"
      return "idle"
    } else if (algorithm === "token") {
      if (currentStep === 0) return id === 1 ? "token" : "idle"
      if (currentStep >= 1 && currentStep < 3) {
        if (id === currentStep + 1) return "token"
        return "idle"
      }
      if (currentStep >= 3 && currentStep < 5) return id === 3 ? "active" : "idle"
      if (currentStep >= 5) return id === 4 ? "token" : id === 3 ? "idle" : "idle"
      return "idle"
    } else {
      // Ricart-Agrawala
      if (currentStep === 0) return "idle"
      if (currentStep === 1 && id === 3) return "requesting"
      if (currentStep >= 2 && currentStep < 4 && id === 3) return "waiting"
      if (currentStep >= 4 && currentStep < 6 && id === 3) return "active"
      if (currentStep >= 6 && id === 3) return "idle"
      return "idle"
    }
  }

  // Animation frame reference
  const animationRef = useRef<number | null>(null)

  // Control the animation
  useEffect(() => {
    if (isRunning) {
      let lastStepTime = Date.now()

      const animate = () => {
        const now = Date.now()
        if (now - lastStepTime > 2000 / speed) {
          setCurrentStep((prev) => {
            const nextStep = prev + 1
            if (nextStep >= (algorithm === "ricart" ? 7 : 6)) {
              setIsRunning(false)
              return prev
            }
            return nextStep
          })
          lastStepTime = now
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
  }, [isRunning, speed, algorithm])

  // Reset when changing algorithm
  useEffect(() => {
    setCurrentStep(0)
    setIsRunning(false)
    setActiveNode(null)
  }, [algorithm])

  const toggleSimulation = () => {
    if (!isRunning) {
      setCurrentStep(0)
    }
    setIsRunning(!isRunning)
  }

  // Get status message
  const getStatusMessage = () => {
    if (algorithm === "centralized") {
      switch (currentStep) {
        case 0:
          return "Initial state. Node 1 is the coordinator."
        case 1:
          return "Node 3 wants to access the critical section."
        case 2:
          return "Node 3 sends a request to the coordinator."
        case 3:
          return "Coordinator adds Node 3 to the request queue."
        case 4:
          return "Coordinator grants access to Node 3."
        case 5:
          return "Node 3 accesses the critical section."
        case 6:
          return "Node 3 releases the critical section."
        default:
          return "Process complete."
      }
    } else if (algorithm === "token") {
      switch (currentStep) {
        case 0:
          return "Initial state. Node 1 has the token."
        case 1:
          return "Token passes to Node 2 (no request)."
        case 2:
          return "Node 3 wants to access the critical section."
        case 3:
          return "Node 3 receives token and enters critical section."
        case 4:
          return "Node 3 accesses the critical section."
        case 5:
          return "Node 3 finishes and passes token to Node 4."
        default:
          return "Process complete."
      }
    } else {
      // Ricart-Agrawala
      switch (currentStep) {
        case 0:
          return "Initial state. All nodes are idle."
        case 1:
          return "Node 3 wants to access the critical section."
        case 2:
          return "Node 3 sends request messages to all other nodes."
        case 3:
          return "All nodes send reply messages to Node 3."
        case 4:
          return "Node 3 has all permissions and enters the critical section."
        case 5:
          return "Node 3 accesses the critical section."
        case 6:
          return "Node 3 finishes and sends release messages."
        default:
          return "Process complete."
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Distributed Mutual Exclusion</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visualization</CardTitle>
              <CardDescription>
                {algorithm === "centralized"
                  ? "Watch how nodes request access from a central coordinator"
                  : algorithm === "token"
                    ? "See how a token circulates to grant exclusive access"
                    : "Observe how nodes request and receive permission from all other nodes"}
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] flex flex-col items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">
                  This is a placeholder for the mutual exclusion visualization. The full implementation would show an
                  interactive simulation of the exclusion process.
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-8">
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
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <div className="flex items-center gap-2">
                <Badge variant={isRunning ? "outline" : "secondary"} className="h-6">
                  Step {currentStep + 1} of {algorithm === "ricart" ? 7 : 6}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Speed:</span>
                <Slider
                  value={[speed]}
                  min={0.5}
                  max={2}
                  step={0.5}
                  onValueChange={(value) => setSpeed(value[0])}
                  className="w-24"
                />
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Adjust the mutual exclusion parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Algorithm</h3>
                <RadioGroup
                  defaultValue="centralized"
                  value={algorithm}
                  onValueChange={setAlgorithm}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="centralized" id="centralized" />
                    <Label htmlFor="centralized">Centralized Algorithm</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="token" id="token" />
                    <Label htmlFor="token">Token-Based Algorithm</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ricart" id="ricart" />
                    <Label htmlFor="ricart">Ricart-Agrawala Algorithm</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Number of Nodes: {nodeCount}</h3>
                <Slider
                  value={[nodeCount]}
                  min={3}
                  max={7}
                  step={1}
                  onValueChange={(value) => setNodeCount(value[0])}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How Mutual Exclusion Works</CardTitle>
              <CardDescription>Ensuring only one process accesses a shared resource at a time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue={algorithm} value={algorithm} onValueChange={setAlgorithm}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="centralized" className="text-xs px-1 sm:text-sm sm:px-4">
                    Centralized
                  </TabsTrigger>
                  <TabsTrigger value="token" className="text-xs px-1 sm:text-sm sm:px-4">
                    Token
                  </TabsTrigger>
                  <TabsTrigger value="ricart" className="text-xs px-1 sm:text-sm sm:px-4">
                    Ricart
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="centralized" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Centralized Algorithm:</h3>
                    <p className="text-sm text-muted-foreground">
                      Uses a central coordinator to manage access to the critical section:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>When a process wants to enter the critical section, it sends a request to the coordinator</li>
                      <li>
                        The coordinator adds the request to a queue if the critical section is busy, or grants
                        permission immediately if it&apos;s free
                      </li>
                      <li>When a process finishes, it sends a release message to the coordinator</li>
                      <li>The coordinator grants access to the next process in the queue</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Advantages:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Simple to implement</li>
                      <li>Low message complexity: 3 messages per critical section entry</li>
                      <li>Fair scheduling with FIFO queue</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Disadvantages:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Single point of failure (coordinator)</li>
                      <li>Performance bottleneck at the coordinator</li>
                      <li>Vulnerable to coordinator crashes</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="token" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Token-Based Algorithm:</h3>
                    <p className="text-sm text-muted-foreground">
                      Uses a unique token that circulates among processes:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>A single token circulates among all nodes in the system</li>
                      <li>Only the process holding the token can enter the critical section</li>
                      <li>After finishing, the process passes the token to the next process</li>
                      <li>If a process doesn&apos;t need the token, it immediately passes it on</li>
                      <li>The token typically follows a predefined logical ring structure</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Advantages:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Decentralized solution with no bottlenecks</li>
                      <li>Simple to implement with low message overhead</li>
                      <li>No starvation if token circulation is fair</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Disadvantages:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Token loss requires complex recovery mechanism</li>
                      <li>Process failures can disrupt token passing</li>
                      <li>Potentially long waiting times if many nodes are using the critical section</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="ricart" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Ricart-Agrawala Algorithm:</h3>
                    <p className="text-sm text-muted-foreground">
                      A permission-based algorithm using logical timestamps:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>
                        When a process wants to enter the critical section, it sends a request with a timestamp to all
                        other processes
                      </li>
                      <li>
                        Other processes send back a reply (permission) if they&apos;re not interested or have a higher
                        timestamp
                      </li>
                      <li>If a process is also interested with a lower timestamp, it defers the reply</li>
                      <li>A process enters critical section after receiving replies from all other processes</li>
                      <li>After exiting, it sends deferred replies to any waiting processes</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Advantages:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Fully distributed with no central coordinator</li>
                      <li>Ensures mutual exclusion with total ordering of events</li>
                      <li>Deadlock-free and ensures fairness based on timestamps</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Disadvantages:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>High message complexity: 2(n-1) messages per critical section entry</li>
                      <li>Vulnerable to process failures</li>
                      <li>All processes must respond for the algorithm to work</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="https://en.wikipedia.org/wiki/Mutual_exclusion" target="_blank">
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
                <h3 className="font-semibold text-sm">Distributed Databases:</h3>
                <p className="text-sm text-muted-foreground">
                  Used to manage concurrent access to database records and ensure consistency during updates.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Distributed File Systems:</h3>
                <p className="text-sm text-muted-foreground">
                  Ensures only one client can write to a file or directory at a time.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Distributed Services:</h3>
                <p className="text-sm text-muted-foreground">
                  Used in microservices to coordinate access to shared resources across multiple service instances.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Cloud Infrastructure:</h3>
                <p className="text-sm text-muted-foreground">
                  Enables coordination between distributed nodes in cloud clusters and prevents conflicts in resource
                  allocation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

