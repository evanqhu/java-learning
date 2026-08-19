import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleAlert, Clock3 } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CodeBlock } from '../components/CodeBlock'
import { lessons, type ContentBlock } from '../content/curriculum'
import { useLearning } from '../state/learning-context'

function Block({ block }: { block: ContentBlock }) {
  if (block.type === 'code') return <CodeBlock code={block.body ?? ''} language={block.language} title={block.title} />
  if (block.type === 'note') return <aside className="callout"><CircleAlert /><div><strong>{block.title}</strong><p>{block.body}</p></div></aside>
  if (block.type === 'compare') return <div className="compare"><div><small>{block.left?.label}</small><strong>{block.left?.value}</strong></div><span>→</span><div><small>{block.right?.label}</small><strong>{block.right?.value}</strong></div></div>
  if (block.type === 'steps') return <ol className="steps">{block.items?.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol>
  if (block.type === 'check') return <div className="checklist"><strong><CheckCircle2 />{block.title}</strong>{block.items?.map((item) => <p key={item}><Check />{item}</p>)}</div>
  return <p className="body-copy">{block.body}</p>
}

export default function LessonPage() {
  const { slug } = useParams()
  const lessonIndex = lessons.findIndex((item) => item.slug === slug)
  const { completed, toggleCompleted } = useLearning()
  if (lessonIndex < 0) return <Navigate to="/" replace />
  const lesson = lessons[lessonIndex]
  const previous = lessons[lessonIndex - 1]
  const next = lessons[lessonIndex + 1]
  const isComplete = completed.has(lesson.slug)

  return (
    <article className="lesson-page page-enter">
      <header className="lesson-hero">
        <p className="eyebrow">{lesson.eyebrow}</p>
        <div className="lesson-title-row"><div><h1>{lesson.title}</h1><p>{lesson.summary}</p></div><span className="duration"><Clock3 />{lesson.duration}</span></div>
        <div className="outcomes"><strong>完成后你可以</strong>{lesson.outcomes.map((outcome) => <span key={outcome}><Check />{outcome}</span>)}</div>
      </header>

      <div className="lesson-body">
        {lesson.sections.map((section, index) => (
          <section className="lesson-section" key={section.title}>
            <div className="section-index">{String(index + 1).padStart(2, '0')}</div>
            <div className="section-content">
              <h2>{section.title}</h2>
              {section.intro ? <p className="section-intro">{section.intro}</p> : null}
              <div className="blocks">{section.blocks.map((block, blockIndex) => <Block block={block} key={`${block.type}-${blockIndex}`} />)}</div>
            </div>
          </section>
        ))}
      </div>

      <div className="lesson-complete">
        <div><small>FIELD CHECK</small><h2>{isComplete ? '这一站已经拿下。' : '做完了吗？标记这一站。'}</h2><p>状态会保存在当前浏览器中，你随时可以回来继续。</p></div>
        <button className={isComplete ? 'complete-button done' : 'complete-button'} type="button" onClick={() => toggleCompleted(lesson.slug)}><Check />{isComplete ? '已完成 · 点击撤销' : '标记为完成'}</button>
      </div>

      <nav className="lesson-pagination">
        {previous ? <Link to={`/learn/${previous.slug}`}><ArrowLeft /><span><small>上一站</small>{previous.shortTitle}</span></Link> : <Link to="/"><ArrowLeft /><span><small>返回</small>路线首页</span></Link>}
        {next ? <Link to={`/learn/${next.slug}`}><span><small>下一站</small>{next.shortTitle}</span><ArrowRight /></Link> : <Link to="/"><span><small>完成路线</small>回到首页</span><ArrowRight /></Link>}
      </nav>
    </article>
  )
}
