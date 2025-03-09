"use client"

import Link from "next/link"
import { PlayCircle, Github } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { AlgorithmCard } from "@/components/home/algorithm-card"
import { ALGORITHMS, SITE_CONFIG } from "@/lib/constants"

export default function Home() {
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

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6 space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="pt-6 space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{SITE_CONFIG.name}</h1>
        <p className="text-muted-foreground text-lg">{SITE_CONFIG.description}</p>

        <div className="flex flex-wrap gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild>
              <Link href="/algorithms/cap-theorem">
                <PlayCircle className="mr-2 size-4" />
                Start Exploring
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" asChild>
              <Link href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 size-4" />
                View on GitHub
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {ALGORITHMS.map((algorithm, i) => (
          <AlgorithmCard key={algorithm.title} algorithm={algorithm} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

