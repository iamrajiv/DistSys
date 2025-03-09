"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  backLink?: string
  backLabel?: string
  children?: React.ReactNode
}

export function PageHeader({ title, backLink = "/", backLabel = "Back to Home", children }: PageHeaderProps) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        {backLink && (
          <Button variant="ghost" size="sm" asChild className="h-8">
            <Link href={backLink}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLabel}
            </Link>
          </Button>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
      </div>
      {children}
    </motion.div>
  )
}

