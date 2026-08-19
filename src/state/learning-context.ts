import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

export interface LearningState {
  completed: Set<string>
  theme: Theme
  toggleCompleted: (slug: string) => void
  toggleTheme: () => void
}

export const LearningContext = createContext<LearningState | null>(null)

export function useLearning() {
  const context = useContext(LearningContext)
  if (!context) throw new Error('useLearning must be used inside LearningProvider')
  return context
}
