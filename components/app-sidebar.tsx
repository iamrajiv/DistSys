"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ChevronDown,
  Crown,
  GitMerge,
  Grid,
  Github,
  Hash,
  Home,
  Lock,
  Menu,
  MessageCircle,
  Network,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"

export function AppSidebar() {
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [algorithmsOpen, setAlgorithmsOpen] = useState(true)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const algorithms = [
    {
      title: "CAP Theorem",
      href: "/algorithms/cap-theorem",
      icon: Network,
    },
    {
      title: "Consensus",
      href: "/algorithms/consensus",
      icon: GitMerge,
    },
    {
      title: "Leader Election",
      href: "/algorithms/leader-election",
      icon: Crown,
    },
    {
      title: "Mutual Exclusion",
      href: "/algorithms/mutual-exclusion",
      icon: Lock,
    },
    {
      title: "Gossip Protocol",
      href: "/algorithms/gossip",
      icon: MessageCircle,
    },
    {
      title: "Consistent Hashing",
      href: "/algorithms/consistent-hashing",
      icon: Hash,
    },
    // Future algorithms can be added here
  ]

  const SidebarContent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="size-8 rounded-full bg-foreground flex items-center justify-center"
          >
            <Grid className="size-4 text-background" />
          </motion.div>
          <span className="font-semibold text-lg">DistSys</span>
        </Link>
      </div>

      <div className="px-2 py-2">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            variant="ghost"
            asChild
            className={`w-full justify-start ${pathname === "/" ? "bg-accent" : ""}`}
            onClick={() => isMobile && setIsOpen(false)}
          >
            <Link href="/">
              <Home className="mr-2 size-4" />
              Dashboard
            </Link>
          </Button>
        </motion.div>
      </div>

      <Separator className="my-2" />

      <div className="px-3 py-2 flex-1 overflow-hidden">
        <Collapsible open={algorithmsOpen} onOpenChange={setAlgorithmsOpen}>
          <div
            className="flex items-center text-sm text-muted-foreground py-1.5 w-full hover:text-foreground cursor-pointer"
            onClick={(e) => {
              // Stop all event propagation and default behavior
              e.preventDefault()
              e.stopPropagation()
              // Toggle the algorithms open state directly
              setAlgorithmsOpen(!algorithmsOpen)
            }}
          >
            <motion.div animate={{ rotate: algorithmsOpen ? 0 : -90 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="size-3.5 mr-1.5" />
            </motion.div>
            Algorithms
          </div>
          <CollapsibleContent className="pt-1 space-y-1">
            {algorithms.map((algorithm) => (
              <motion.div key={algorithm.title} whileHover={{ scale: 1.03, x: 5 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="ghost"
                  asChild
                  className={`w-full justify-start h-9 px-2 text-sm font-normal ${pathname === algorithm.href ? "bg-accent" : ""}`}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <Link href={algorithm.href}>
                    <algorithm.icon className="mr-2 size-4" />
                    {algorithm.title}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="mt-auto p-4 border-t flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Created by <span className="font-medium">Rajiv</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link
              href="https://github.com/rajivpunjabi/distributed-systems-visualizer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub Repository</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  )

  if (!isMounted) return null

  if (isMobile) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-4 z-50 md:hidden"
        >
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border shadow-md"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-r">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </motion.div>
      </>
    )
  }

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col h-screen sticky top-0 hidden md:flex">
      <SidebarContent />
    </div>
  )
}

