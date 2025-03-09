import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with Next.js and Tailwind CSS by{" "}
          <Link
            href="https://iamrajiv.github.io"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Rajiv
          </Link>
          . The source code is available on{" "}
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/privacy" className="underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/terms" className="underline underline-offset-4">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}

