"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function CAPLearnMore() {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 24, delay: 0.1 },
        },
      }}
    >
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>The CAP Theorem</CardTitle>
          <CardDescription>Understanding the fundamental trade-offs in distributed systems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              The CAP theorem states that a distributed data store can only provide two of the following three
              guarantees simultaneously:
            </p>

            <div className="pt-2 space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  C
                </div>
                <div>
                  <h3 className="font-semibold">Consistency</h3>
                  <p className="text-sm text-muted-foreground">
                    Every read receives the most recent write or an error. All nodes see the same data at the same time.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  A
                </div>
                <div>
                  <h3 className="font-semibold">Availability</h3>
                  <p className="text-sm text-muted-foreground">
                    Every request receives a response, without guarantee that it contains the most recent version of the
                    information.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  P
                </div>
                <div>
                  <h3 className="font-semibold">Partition Tolerance</h3>
                  <p className="text-sm text-muted-foreground">
                    The system continues to operate despite an arbitrary number of messages being dropped or delayed
                    between nodes.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
            <Button variant="outline" className="w-full" asChild>
              <Link href="https://en.wikipedia.org/wiki/CAP_theorem" target="_blank">
                Learn More
              </Link>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

