"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Cloud, MessageCircle } from "lucide-react"
import { cn, scrollToTop } from "@/lib/utils"

interface LandingLogoProps {
  href?: string
  className?: string
  showText?: boolean
}

export function LandingLogo({
  href = "/",
  className,
  showText = true,
}: LandingLogoProps) {
  const pathname = usePathname()
  const isLanding = pathname === "/"
  const [justClicked, setJustClicked] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (isLanding && href === "/") {
      e.preventDefault()
      setJustClicked(true)
      scrollToTop()
      setTimeout(() => setJustClicked(false), 800)
    }
  }

  const springTransition = { type: "spring" as const, stiffness: 500, damping: 25 }
  const smoothTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] }

  const content = (
    <motion.div
      initial={{ opacity: 0.9, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.06, transition: springTransition }}
      whileTap={{ scale: 0.94, transition: { duration: 0.1 } }}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 font-semibold rounded-xl p-2 -m-2 transition-all duration-300",
        "hover:shadow-xl hover:shadow-primary/25 hover:bg-primary/5",
        "active:shadow-lg active:shadow-primary/30 active:bg-primary/10",
        "dark:hover:bg-primary/10 dark:active:bg-primary/15",
        className
      )}
    >
      <motion.div
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 dark:bg-primary/15"
        animate={
          justClicked
            ? {
                scale: [1, 1.3, 1.05],
                rotate: [0, 15, -15, 0],
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              }
            : {}
        }
        whileHover={{
          scale: 1.05,
          rotate: [0, -6, 6, 0],
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        <motion.div
          className="relative"
          animate={justClicked ? { scale: [1, 1.15, 1], transition: smoothTransition } : {}}
        >
          <Cloud className="h-5 w-5 text-primary" strokeWidth={2} />
          <motion.span
            className="absolute -bottom-0.5 -right-0.5"
            animate={
              justClicked
                ? { scale: [1, 1.4, 1], y: [0, -2, 0], transition: smoothTransition }
                : {}
            }
            whileHover={{ scale: 1.15, y: -1, transition: springTransition }}
          >
            <MessageCircle className="h-3 w-3 text-primary" strokeWidth={2} />
          </motion.span>
        </motion.div>
      </motion.div>
      {showText && (
        <motion.span
          className="whitespace-nowrap text-lg font-semibold tracking-tight"
          animate={
            justClicked
              ? {
                  x: [0, 3, -2, 0],
                  scale: [1, 1.02, 1],
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }
              : {}
          }
        >
          <span className="text-primary">Fecha</span>
          <span className="text-foreground">Lead</span>
        </motion.span>
      )}
    </motion.div>
  )

  if (href) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className="focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-lg"
      >
        {content}
      </Link>
    )
  }

  return content
}
