import Link from "next/link"
import { Github, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">Distributed Systems Visualizer</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/algorithms" className="flex items-center text-sm font-medium text-muted-foreground">
              Algorithms
            </Link>
            <Link href="/learn" className="flex items-center text-sm font-medium text-muted-foreground">
              Learn
            </Link>
            <Link href="/about" className="flex items-center text-sm font-medium text-muted-foreground">
              About
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/algorithms" className="text-sm font-medium">
                    Algorithms
                  </Link>
                  <Link href="/learn" className="text-sm font-medium">
                    Learn
                  </Link>
                  <Link href="/about" className="text-sm font-medium">
                    About
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  )
}

