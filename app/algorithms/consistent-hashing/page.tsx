"use client"

import { useState, useMemo } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Simple hash function (murmurhash-like)
const hashFunction = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash % 360) // Map to 0-360 degrees
}

export default function ConsistentHashing() {
  const [nodes, setNodes] = useState<string[]>(["Node A", "Node B", "Node C"])
  const [virtualNodes, setVirtualNodes] = useState(3)
  const [keys, setKeys] = useState<string[]>(["user:1", "product:123", "order:456", "cart:789", "session:abc"])
  const [newKey, setNewKey] = useState("")
  const [newNode, setNewNode] = useState("")

  // Generate virtual node positions
  const ringPositions = useMemo(() => {
    const positions: { node: string; hash: number; isVirtual: boolean }[] = []
    nodes.forEach((node) => {
      // Add physical node
      positions.push({ node, hash: hashFunction(node), isVirtual: false })
      // Add virtual nodes
      for (let i = 1; i <= virtualNodes; i++) {
        const virtualHash = hashFunction(`${node}-v${i}`)
        positions.push({ node, hash: virtualHash, isVirtual: true })
      }
    })
    return positions.sort((a, b) => a.hash - b.hash)
  }, [nodes, virtualNodes])

  // Calculate key distribution
  const keyDistribution = useMemo(() => {
    const distribution: Record<string, string[]> = {}
    nodes.forEach((node) => (distribution[node] = []))

    keys.forEach((key) => {
      const keyHash = hashFunction(key)
      // Find the first node clockwise from the key's position
      const assignedNode = ringPositions.find((pos) => pos.hash >= keyHash) || ringPositions[0]
      distribution[assignedNode.node].push(key)
    })
    return distribution
  }, [keys, ringPositions])

  const addKey = () => {
    if (newKey && !keys.includes(newKey)) {
      setKeys([...keys, newKey])
      setNewKey("")
    }
  }

  const removeKey = (keyToRemove: string) => {
    setKeys(keys.filter((key) => key !== keyToRemove))
  }

  const addNode = () => {
    if (newNode && !nodes.includes(newNode)) {
      setNodes([...nodes, newNode])
      setNewNode("")
    }
  }

  const removeNode = (nodeToRemove: string) => {
    setNodes(nodes.filter((node) => node !== nodeToRemove))
  }

  const hashedNodes = useMemo(() => {
    return nodes.map(node => ({
      node,
      hash: hashFunction(node)
    }));
  }, [nodes]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Consistent Hashing</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Hash Ring Visualization</CardTitle>
              <CardDescription>Keys are assigned to the next clockwise node</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">
                  This is a placeholder for the consistent hashing visualization. The full implementation would show an
                  interactive hash ring with nodes and keys.
                </p>
              </div>
            </CardContent>
            {/* <CardContent className="min-h-[400px]">
              <div className="relative w-full h-[400px] border rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[300px] h-[300px] rounded-full border-4 border-primary relative">
                    {/* Ring positions (nodes and virtual nodes) */}
            {/* {ringPositions.map((pos, i) => {
                      const angle = pos.hash
                      const x = 150 + 150 * Math.cos((angle * Math.PI) / 180)
                      const y = 150 + 150 * Math.sin((angle * Math.PI) / 180)
                      return (
                        <div
                          key={`${pos.node}-${pos.hash}`}
                          className={`absolute w-10 h-10 rounded-full flex items-center justify-center -translate-x-5 -translate-y-5 ${
                            pos.isVirtual ? "bg-secondary" : "bg-primary"
                          }`}
                          style={{ left: `${x}px`, top: `${y}px` }}
                          title={pos.isVirtual ? `${pos.node} (virtual)` : pos.node}
                        >
                          {pos.node.charAt(0)}
                          {pos.isVirtual && <span className="text-xs">v</span>}
                        </div>
                      )
                    })} */}

            {/* Keys on the ring */}
            {/* {keys.map((key) => {
                      const hash = hashFunction(key)
                      const x = 150 + 120 * Math.cos((hash * Math.PI) / 180)
                      const y = 150 + 120 * Math.sin((hash * Math.PI) / 180)
                      return (
                        <div
                          key={key}
                          className="absolute w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs -translate-x-4 -translate-y-4"
                          style={{ left: `${x}px`, top: `${y}px` }}
                          title={key}
                        >
                          {key.split(":")[0].charAt(0)}
                        </div>
                      )
                    })} */}
            {/* </div>
                </div>
              </div>
            </CardContent> */}
            {/* <CardFooter>
              <div className="w-full">
                <h3 className="font-medium mb-2">Key Distribution:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nodes.map((node) => (
                    <div key={node} className="border rounded-md p-3">
                      <h4 className="font-medium mb-2">{node}</h4>
                      <div className="flex flex-wrap gap-2">
                        {keyDistribution[node]?.map((key) => (
                          <Badge key={key} variant="secondary">
                            {key}
                          </Badge>
                        )) || <span className="text-sm text-muted-foreground">No keys</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardFooter> */}
          </Card>
        </div>

        {/* Configuration panel remains largely the same */}
        <div className="space-y-6">
          {/* <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Adjust the consistent hashing parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Virtual Nodes per Physical Node: {virtualNodes}
                </label>
                <Slider
                  value={[virtualNodes]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setVirtualNodes(value[0])}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  More virtual nodes improve distribution but increase memory usage
                </p>
              </div>
            </CardContent>
          </Card> */}

          {/* Nodes and Keys cards remain the same */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Nodes</CardTitle>
              <CardDescription>Add or remove nodes to see redistribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="New node name" value={newNode} onChange={(e) => setNewNode(e.target.value)} />
                <Button onClick={addNode} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {nodes.map((node) => (
                  <div key={node} className="flex justify-between items-center p-2 border rounded-md">
                    <span>{node}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeNode(node)} disabled={nodes.length <= 1}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}

          {/* <Card>
            <CardHeader>
              <CardTitle>Keys</CardTitle>
              <CardDescription>Add or remove keys to see assignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="New key (e.g., user:123)"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                />
                <Button onClick={addKey} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {keys.map((key) => (
                  <div key={key} className="flex justify-between items-center p-2 border rounded-md">
                    <span>{key}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeKey(key)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}

          <Card>
            <CardHeader>
              <CardTitle>How Consistent Hashing Works</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This is a placeholder for the consistent hashing explanation. The full implementation would include
                detailed information about how consistent hashing works.
              </p>
            </CardContent>
            {/* <CardContent className="space-y-4">
              <p className="text-sm">
                Consistent hashing maps both keys and nodes to a circular hash space. Keys are assigned to the first
                node encountered moving clockwise from their position.
              </p>
              {/* Rest of the informational content remains the same */}
            {/* </CardContent> */}
            {/* <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="https://en.wikipedia.org/wiki/Consistent_hashing" target="_blank">
                  Learn More
                </Link>
              </Button>
            </CardFooter> */}
          </Card>
        </div>
      </div>
    </div>
  )
}

