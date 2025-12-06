"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

type AnimatedThemeTogglerProps = {
  className?: string
}

/**
 * Botão de alternância de tema com animação de ícone (Sun/Moon)
 * e transição radial usando View Transitions API (quando suportado).
 * 
 * CORREÇÕES PARA MOBILE:
 * - Removida dependência de flushSync que causava múltiplos re-renders
 * - View Transition API apenas em desktop (não suportada no Safari iOS)
 * - Estado local desacoplado para evitar flickering durante animação
 * - Transição de ícones otimizada com Framer Motion
 */
export const AnimatedThemeToggler = ({ className }: AnimatedThemeTogglerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { resolvedTheme, setTheme } = useTheme()
  
  // Estado local para animação dos ícones (não causa re-render do tema)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState(false)

  // Sincroniza estado inicial após montagem
  useEffect(() => {
    setIsMounted(true)
    setDarkMode(resolvedTheme === "dark")
  }, [resolvedTheme])

  const onToggle = useCallback(async () => {
    const buttonEl = buttonRef.current
    if (!buttonEl) return

    const nextIsDark = !darkMode
    
    // Atualiza estado local IMEDIATAMENTE para animação do ícone
    setDarkMode(nextIsDark)

    // Detecta se é mobile (Safari iOS não suporta View Transitions)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const hasViewTransitions = 'startViewTransition' in document
    
    // Em mobile ou browsers sem suporte, apenas troca o tema
    if (isMobile || !hasViewTransitions) {
      setTheme(nextIsDark ? "dark" : "light")
      return
    }

    // APENAS EM DESKTOP: View Transition API com animação radial
    const { left, top, width, height } = buttonEl.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const maxDistance = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY)
    )

    // @ts-expect-error - View Transitions API experimental
    const transition = document.startViewTransition(() => {
      setTheme(nextIsDark ? "dark" : "light")
    })

    try {
      await transition.ready
      
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${centerX}px ${centerY}px)`,
            `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
          ],
        },
        {
          duration: 600,
          easing: "ease-in-out",
          // @ts-expect-error - pseudoElement experimental
          pseudoElement: "::view-transition-new(root)",
        }
      )
    } catch (error) {
      // Fallback silencioso se a animação falhar
      console.warn("View Transition failed:", error)
    }
  }, [darkMode, setTheme])

  // Evita flash no SSR
  if (!isMounted) {
    return <div className={cn("h-9 w-9", className)} />
  }

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      aria-label="Alternar tema"
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-full p-2 outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer",
        "bg-transparent hover:bg-surface-2 transition-colors",
        "h-9 w-9",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkMode ? (
          <motion.span
            key="sun-icon"
            initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
            transition={{ 
              duration: 0.25, 
              ease: [0.4, 0, 0.2, 1] // cubic-bezier para suavidade
            }}
            className="text-amber-400"
          >
            <Sun className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon-icon"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            transition={{ 
              duration: 0.25, 
              ease: [0.4, 0, 0.2, 1] // cubic-bezier para suavidade
            }}
            className="text-slate-700 dark:text-slate-300"
          >
            <Moon className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}


