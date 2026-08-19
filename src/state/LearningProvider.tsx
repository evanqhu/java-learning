import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { LearningContext, type LearningState, type Theme } from './learning-context'

const STORAGE_KEY = 'java-field-guide:v1'

function readInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { completed: [] as string[], theme: 'dark' as Theme }
    const parsed = JSON.parse(raw) as { completed?: string[]; theme?: Theme }
    return {
      completed: parsed.completed ?? [],
      theme: parsed.theme === 'light' ? 'light' as Theme : 'dark' as Theme,
    }
  } catch {
    return { completed: [] as string[], theme: 'dark' as Theme }
  }
}

export function LearningProvider({ children }: { children: ReactNode }) {
  const [initialState] = useState(readInitialState)
  const [completed, setCompleted] = useState(() => new Set(initialState.completed))
  const [theme, setTheme] = useState<Theme>(initialState.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: [...completed], theme }))
  }, [completed, theme])

  const value = useMemo<LearningState>(() => ({
    completed,
    theme,
    toggleCompleted: (slug) => setCompleted((current) => {
      const next = new Set(current)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    }),
    toggleTheme: () => setTheme((current) => current === 'dark' ? 'light' : 'dark'),
  }), [completed, theme])

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>
}
