import { BookOpen, Menu, Moon, Sun, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { lessons } from '../content/curriculum'
import { useLearning } from '../state/learning-context'

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { completed, theme, toggleTheme } = useLearning()
  const progress = Math.round((completed.size / lessons.length) * 100)

  return (
    <div className="app-shell">
      <header className="mobile-header">
        <NavLink to="/" className="mini-brand">J/FG</NavLink>
        <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="切换导航">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <aside className={menuOpen ? 'sidebar open' : 'sidebar'}>
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">J/</span>
          <span><strong>JAVA FIELD GUIDE</strong><small>FRONTEND → BACKEND</small></span>
        </NavLink>

        <div className="progress-card">
          <div><span>FIELD PROGRESS</span><strong>{progress}%</strong></div>
          <div className="progress-track"><i style={{ width: `${progress}%` }} /></div>
          <small>{completed.size} / {lessons.length} 个阶段完成</small>
        </div>

        <nav className="lesson-nav" aria-label="学习章节">
          <span className="nav-label">MISSION LOG</span>
          {lessons.map((lesson) => (
            <NavLink key={lesson.slug} to={`/learn/${lesson.slug}`} onClick={() => setMenuOpen(false)}>
              <span className={completed.has(lesson.slug) ? 'step done' : 'step'}>{completed.has(lesson.slug) ? '✓' : String(lesson.order).padStart(2, '0')}</span>
              <span><strong>{lesson.shortTitle}</strong><small>{lesson.duration}</small></span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/glossary" onClick={() => setMenuOpen(false)}><BookOpen size={17} />术语速查</NavLink>
          <button type="button" onClick={toggleTheme}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}{theme === 'dark' ? '切到浅色' : '切到深色'}</button>
        </div>
      </aside>
      {menuOpen ? <button className="backdrop" aria-label="关闭导航" onClick={() => setMenuOpen(false)} /> : null}
      <main className="main-content">{children}</main>
    </div>
  )
}
