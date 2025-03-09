"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CAPSystemInfo() {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 24 },
        },
      }}
    >
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>System Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-1.5"
            >
              <h3 className="font-semibold text-blue-500">CP Systems</h3>
              <p className="text-sm text-muted-foreground">
                CP systems prioritize consistency and partition tolerance over availability. When a network partition
                occurs, the system will become unavailable rather than risk returning inconsistent data.
              </p>
              <div className="flex gap-1 flex-wrap pt-1">
                <Badge variant="outline" className="bg-blue-500/5">
                  HBase
                </Badge>
                <Badge variant="outline" className="bg-blue-500/5">
                  MongoDB
                </Badge>
                <Badge variant="outline" className="bg-blue-500/5">
                  Redis
                </Badge>
                <Badge variant="outline" className="bg-blue-500/5">
                  Zookeeper
                </Badge>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-1.5"
            >
              <h3 className="font-semibold text-green-500">AP Systems</h3>
              <p className="text-sm text-muted-foreground">
                AP systems prioritize availability and partition tolerance over consistency. When a network partition
                occurs, they will continue to serve requests, potentially returning stale or inconsistent data.
              </p>
              <div className="flex gap-1 flex-wrap pt-1">
                <Badge variant="outline" className="bg-green-500/5">
                  Cassandra
                </Badge>
                <Badge variant="outline" className="bg-green-500/5">
                  DynamoDB
                </Badge>
                <Badge variant="outline" className="bg-green-500/5">
                  CouchDB
                </Badge>
                <Badge variant="outline" className="bg-green-500/5">
                  Riak
                </Badge>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-1.5"
            >
              <h3 className="font-semibold text-amber-500">CA Systems</h3>
              <p className="text-sm text-muted-foreground">
                CA systems prioritize consistency and availability but cannot handle network partitions. These are
                typically single-node databases or systems that don't scale horizontally.
              </p>
              <div className="flex gap-1 flex-wrap pt-1">
                <Badge variant="outline" className="bg-amber-500/5">
                  Traditional RDBMS
                </Badge>
                <Badge variant="outline" className="bg-amber-500/5">
                  PostgreSQL
                </Badge>
                <Badge variant="outline" className="bg-amber-500/5">
                  MySQL
                </Badge>
                <Badge variant="outline" className="bg-amber-500/5">
                  Single-node systems
                </Badge>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

