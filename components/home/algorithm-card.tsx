"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AlgorithmCardProps {
  algorithm: {
    title: string
    description: string
    href: string
    icon: LucideIcon
    color: string
  }
  index: number
}

export function AlgorithmCard({ algorithm, index }: AlgorithmCardProps) {
  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  return (
    <Link href={algorithm.href} className="block h-full">
      <motion.div custom={index} variants={cardVariants} whileHover="hover" className="h-full">
        <Card className="border overflow-hidden h-full flex flex-col group hover:border-primary/50 transition-colors cursor-pointer">
          <CardHeader className="gap-4 flex-grow">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${algorithm.color} flex items-center justify-center`}>
              <algorithm.icon className="size-5 sm:size-6" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl break-words">{algorithm.title}</CardTitle>
              <CardDescription className="line-clamp-2 text-xs sm:text-sm">{algorithm.description}</CardDescription>
            </div>
          </CardHeader>
          <CardFooter>
            <div className="w-full flex items-center justify-between group-hover:bg-secondary/50 h-auto py-2 px-3 rounded-md">
              <span>Explore</span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="ml-2 size-4 flex-shrink-0" />
              </motion.div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  )
}

