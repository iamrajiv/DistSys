"use client"

import { motion } from "framer-motion"
import { Network } from "lucide-react"

export default function CAPTheoremLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4"
        >
          <Network className="h-8 w-8 text-cyan-500" />
        </motion.div>
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="text-xl font-medium"
        >
          Loading CAP Theorem Explorer...
        </motion.h2>
      </motion.div>
    </div>
  )
}

