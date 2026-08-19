import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const LessonPage = lazy(() => import('./pages/LessonPage'))
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'))

export function App() {
  return (
    <AppShell>
      <Suspense fallback={<div className="page-loader">正在装载学习现场…</div>}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/learn/:slug" element={<LessonPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppShell>
  )
}
