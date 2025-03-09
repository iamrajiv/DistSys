"use client"

import { useState, useEffect } from "react"
import { Check, Clock, Cloud, CloudOff, Database, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useMediaQuery } from "@/hooks/use-media-query"
import { toast } from "@/hooks/use-toast"
import { PageHeader } from "@/components/layout/page-header"
import { CAPSystemInfo } from "@/components/algorithms/cap-theorem/cap-system-info"
import { CAPLearnMore } from "@/components/algorithms/cap-theorem/cap-learn-more"
import { cn } from "@/lib/utils"

export function CAPTheoremExplorer() {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  const [activeTab, setActiveTab] = useState("cp")
  const [networkPartition, setNetworkPartition] = useState(false)
  const [nodeCount, setNodeCount] = useState(isMobile ? 3 : 5)
  const [requestLatency, setRequestLatency] = useState(0)
  const [consistencyLevel, setConsistencyLevel] = useState("strong")
  const [showLogs, setShowLogs] = useState(!isMobile)

  // Generate logs
  const [logs, setLogs] = useState<string[]>([])
  const [currentOperation, setCurrentOperation] = useState<string | null>(null)

  // Generate nodes
  const nodes = Array.from({ length: nodeCount }).map((_, index) => ({
    id: index + 1,
    region: getNodeRegion(index),
    status: networkPartition && index >= Math.floor(nodeCount / 2) ? "disconnected" : "healthy",
    value:
      index === 0
        ? 42
        : activeTab === "ap" && networkPartition
          ? 42 + (index >= Math.floor(nodeCount / 2) ? 1 : 0)
          : 42,
  }))

  function getNodeRegion(index: number) {
    const regions = ["US East", "US West", "EU West", "Asia Pacific", "South America"]
    return regions[index % regions.length]
  }

  // Update logs
  useEffect(() => {
    if (networkPartition) {
      addLog(
        `Network partition detected! Nodes 1-${Math.floor(nodeCount / 2)} can't communicate with nodes ${Math.floor(nodeCount / 2) + 1}-${nodeCount}.`,
      )
    } else {
      setLogs([])
    }
  }, [networkPartition, nodeCount])

  // Adjust node count for mobile
  useEffect(() => {
    if (isMobile && nodeCount > 5) {
      setNodeCount(3)
    }
  }, [isMobile, nodeCount])

  const addLog = (message: string) => {
    setLogs((prev) => {
      const timestamp = new Date().toLocaleTimeString()
      return [...prev.slice(-9), `[${timestamp}] ${message}`]
    })
  }

  const simulateOperation = (operation: "read" | "write") => {
    if (currentOperation) {
      toast({
        title: "Operation in progress",
        description: "Please wait for the current operation to complete",
        variant: "destructive",
      })
      return
    }

    setCurrentOperation(operation)

    const startTime = Date.now()
    const value = operation === "read" ? nodes[0].value : nodes[0].value + 1

    // Clear previous logs related to operations
    setLogs((prev) => prev.filter((log) => !log.includes("READ") && !log.includes("WRITE")))

    addLog(
      `${operation.toUpperCase()} operation initiated: ${operation === "read" ? "Getting current value" : "Setting value to " + value}`,
    )

    if (activeTab === "ca") {
      if (networkPartition) {
        setTimeout(() => {
          addLog(
            `ERROR: ${operation.toUpperCase()} failed due to network partition. The system is not partition tolerant.`,
          )
          setCurrentOperation(null)

          toast({
            title: "Operation Failed",
            description: "CA systems cannot handle network partitions",
            variant: "destructive",
          })
        }, 1000)
        return
      }

      setTimeout(() => {
        addLog(`All ${nodeCount} nodes contacted successfully.`)

        setTimeout(() => {
          addLog(`${operation.toUpperCase()} successful on all nodes. Consistent view achieved.`)
          setCurrentOperation(null)

          toast({
            title: "Operation Successful",
            description: `${operation.toUpperCase()} completed with consistent view`,
            variant: "default",
          })
        }, 500 * requestLatency)
      }, 500)
    } else if (activeTab === "cp") {
      if (networkPartition) {
        const availableNodes = Math.floor(nodeCount / 2)
        addLog(`Only ${availableNodes} out of ${nodeCount} nodes are reachable.`)

        if (
          consistencyLevel === "strong" ||
          (consistencyLevel === "quorum" && availableNodes < Math.ceil(nodeCount / 2))
        ) {
          setTimeout(() => {
            addLog(
              `ERROR: ${operation.toUpperCase()} failed. Cannot achieve required consistency level with current available nodes.`,
            )
            setCurrentOperation(null)

            toast({
              title: "Operation Failed",
              description: `Cannot achieve ${consistencyLevel} consistency during partition`,
              variant: "destructive",
            })
          }, 1000)
          return
        }
      }

      setTimeout(() => {
        const reachableNodes = networkPartition ? Math.floor(nodeCount / 2) : nodeCount
        addLog(`${reachableNodes} nodes contacted successfully.`)

        setTimeout(() => {
          if (consistencyLevel === "eventual" || reachableNodes >= Math.ceil(nodeCount / 2)) {
            addLog(`${operation.toUpperCase()} successful with ${consistencyLevel} consistency.`)

            toast({
              title: "Operation Successful",
              description: `${operation.toUpperCase()} completed with ${consistencyLevel} consistency`,
              variant: "default",
            })
          } else {
            addLog(`ERROR: ${operation.toUpperCase()} failed. Consistency requirement not met.`)

            toast({
              title: "Operation Failed",
              description: "Consistency requirement not met",
              variant: "destructive",
            })
          }
          setCurrentOperation(null)
        }, 500 * requestLatency)
      }, 500)
    } else if (activeTab === "ap") {
      setTimeout(() => {
        const reachableNodes = networkPartition ? Math.floor(nodeCount / 2) : nodeCount
        addLog(`${reachableNodes} out of ${nodeCount} nodes contacted.`)

        setTimeout(() => {
          addLog(`${operation.toUpperCase()} successful on reachable nodes. System remains available.`)

          if (networkPartition && operation === "write") {
            addLog(`WARNING: Network partition detected. Data may be inconsistent across partitions.`)

            toast({
              title: "Operation Successful with Warning",
              description: "Data may be inconsistent across partitions",
              variant: "warning",
            })
          } else {
            toast({
              title: "Operation Successful",
              description: `${operation.toUpperCase()} completed on available nodes`,
              variant: "default",
            })
          }

          setCurrentOperation(null)
        }, 500 * requestLatency)
      }, 500)
    }
  }

  const toggleNetworkPartition = () => {
    if (currentOperation) {
      toast({
        title: "Operation in progress",
        description: "Cannot change network state during an operation",
        variant: "destructive",
      })
      return
    }

    setNetworkPartition(!networkPartition)

    if (!networkPartition) {
      toast({
        title: "Network Partition Activated",
        description: "The network is now partitioned",
        variant: "warning",
      })
    } else {
      toast({
        title: "Network Partition Resolved",
        description: "The network is now fully connected",
        variant: "default",
      })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto p-4 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <PageHeader title="CAP Theorem Explorer" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Visualization</CardTitle>
                <CardDescription>
                  Explore how different distributed database systems handle trade-offs between consistency,
                  availability, and partition tolerance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cp" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
                    <TabsTrigger value="cp">CP System</TabsTrigger>
                    <TabsTrigger value="ap">AP System</TabsTrigger>
                    <TabsTrigger value="ca">CA System</TabsTrigger>
                  </TabsList>
                  <TabsContent value="cp" className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 gap-2"
                    >
                      <div>
                        <h3 className="font-medium">Consistency + Partition Tolerance</h3>
                        <p className="text-sm text-muted-foreground">Sacrifices availability when partitioned</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 self-start sm:self-center text-xs sm:text-sm whitespace-normal text-center h-auto py-1"
                      >
                        Examples: HBase, MongoDB, Redis
                      </Badge>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="ap" className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 gap-2"
                    >
                      <div>
                        <h3 className="font-medium">Availability + Partition Tolerance</h3>
                        <p className="text-sm text-muted-foreground">Sacrifices consistency when partitioned</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-500 hover:bg-green-500/20 self-start sm:self-center text-xs sm:text-sm whitespace-normal text-center h-auto py-1"
                      >
                        Examples: Cassandra, DynamoDB, CouchDB
                      </Badge>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="ca" className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 gap-2"
                    >
                      <div>
                        <h3 className="font-medium">Consistency + Availability</h3>
                        <p className="text-sm text-muted-foreground">Cannot handle network partitions</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 self-start sm:self-center text-xs sm:text-sm whitespace-normal text-center h-auto py-1"
                      >
                        Examples: Traditional RDBMS, Single-node systems
                      </Badge>
                    </motion.div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 relative min-h-[300px] border rounded-lg p-4">
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Network Partition:</span>
                    <Switch
                      checked={networkPartition}
                      onCheckedChange={toggleNetworkPartition}
                      disabled={currentOperation !== null}
                    />
                  </div>

                  <div className="flex flex-col items-center gap-8">
                    {/* Client */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-24 h-24 rounded-lg bg-secondary flex items-center justify-center flex-col"
                      >
                        <Cloud className="h-8 w-8 mb-1" />
                        <span className="text-xs">Client</span>
                      </motion.div>
                      <div className="mt-4 flex gap-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            onClick={() => simulateOperation("read")}
                            disabled={currentOperation !== null}
                            className="relative"
                          >
                            {currentOperation === "read" && (
                              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                              </span>
                            )}
                            Read
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            onClick={() => simulateOperation("write")}
                            disabled={currentOperation !== null}
                            className="relative"
                          >
                            {currentOperation === "write" && (
                              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                              </span>
                            )}
                            Write
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Network */}
                    <div className="w-full flex items-center justify-center relative">
                      <AnimatePresence>
                        {networkPartition && (
                          <>
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              exit={{ scaleX: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                              <Separator className="w-full bg-destructive/40" />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute -translate-y-4 bg-card px-2 z-10"
                            >
                              <Badge variant="destructive">Network Partition</Badge>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Nodes */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 w-full">
                      {nodes.map((node, index) => (
                        <motion.div
                          key={node.id}
                          custom={index}
                          variants={nodeVariants}
                          className="flex flex-col items-center max-w-[120px]" // Added max width
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={cn(
                              "w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center flex-col relative",
                              node.status === "disconnected" ? "bg-muted text-muted-foreground" : "bg-primary/10",
                              currentOperation && "animate-pulse",
                            )}
                          >
                            <Database className="h-4 w-4 sm:h-6 sm:w-6 mb-0.5 sm:mb-1" />
                            <span className="text-[10px] sm:text-xs truncate w-full text-center px-1">
                              Node {node.id}
                            </span>
                            {node.status === "disconnected" && (
                              <CloudOff className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-3 w-3 sm:h-4 sm:w-4 text-destructive" />
                            )}
                          </motion.div>
                          <div className="mt-1 text-[10px] sm:text-xs flex flex-col items-center w-full">
                            <span className="text-muted-foreground truncate w-full text-center">{node.region}</span>
                            <span
                              className={cn(
                                "truncate w-full text-center transition-colors duration-0", // Added duration-0 to prevent color transition delay
                                activeTab === "ap" && networkPartition && node.value !== nodes[0].value
                                  ? "text-amber-500"
                                  : "",
                              )}
                            >
                              Value: {node.value}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {showLogs && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 border rounded-lg p-2 bg-black text-green-400 font-mono text-xs"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-green-500">System Logs</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setLogs([])}>
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-1 max-h-[200px] overflow-auto">
                        {logs.length > 0 ? (
                          logs.map((log, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="whitespace-nowrap"
                            >
                              {log}
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-muted-foreground text-xs">
                            No logs yet. Perform operations to see results.
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between border-t pt-6 gap-4">
                <div className="flex items-center gap-4 self-start">
                  <div className="grid items-center gap-1.5">
                    <Label htmlFor="show-logs">Show Logs</Label>
                    <Switch id="show-logs" checked={showLogs} onCheckedChange={setShowLogs} />
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-end">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium ${
                      currentOperation ? "text-amber-500" : "text-green-500"
                    }`}
                  >
                    {currentOperation ? (
                      <>
                        <Clock className="h-3 w-3" />
                        {currentOperation.toUpperCase()} in progress...
                      </>
                    ) : (
                      <>
                        <Check className="h-3 w-3" />
                        Ready
                      </>
                    )}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>Adjust the distributed system parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Number of Nodes: {nodeCount}</h3>
                  <Slider
                    value={[nodeCount]}
                    min={3}
                    max={isMobile ? 5 : 9}
                    step={2}
                    onValueChange={(value) => setNodeCount(value[0])}
                    className="w-full"
                    disabled={currentOperation !== null}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Request Latency: {requestLatency === 0 ? "Low" : requestLatency === 1 ? "Medium" : "High"}
                  </h3>
                  <Slider
                    value={[requestLatency]}
                    min={0}
                    max={2}
                    step={1}
                    onValueChange={(value) => setRequestLatency(value[0])}
                    className="w-full"
                    disabled={currentOperation !== null}
                  />
                </div>

                {activeTab === "cp" && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Consistency Level</h3>
                    <RadioGroup
                      defaultValue="strong"
                      value={consistencyLevel}
                      onValueChange={setConsistencyLevel}
                      className="flex flex-col space-y-1"
                      disabled={currentOperation !== null}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="strong" id="strong" />
                        <Label htmlFor="strong">Strong Consistency (All nodes)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="quorum" id="quorum" />
                        <Label htmlFor="quorum">Quorum Consistency (Majority of nodes)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="eventual" id="eventual" />
                        <Label htmlFor="eventual">Eventual Consistency (At least one node)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <CAPSystemInfo />
          <CAPLearnMore />
        </div>
      </div>
    </motion.div>
  )
}

