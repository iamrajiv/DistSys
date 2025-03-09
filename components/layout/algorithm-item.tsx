"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AlgorithmItemProps {
  algorithm: {
    title: string
    href: string
    icon: LucideIcon
  }
  isActive: boolean
  onClick?: () => void
}

export function AlgorithmItem({ algorithm, isActive, onClick }: AlgorithmItemProps) {
  return (
    <motion.div whileHover={{ scale: 1.03, x: 5 }} whileTap={{ scale: 0.97 }}>
      <Button
        variant="ghost"
        asChild
        className={cn("w-full justify-start h-9 px-2 text-sm font-normal", isActive && "bg-accent")}
        onClick={onClick}
      >
        <Link href={algorithm.href}>
          <algorithm.icon className="mr-2 size-4" />
          {algorithm.title}
        </Link>
      </Button>
    </motion.div>
  )
}

