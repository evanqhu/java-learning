import { ArrowRight, BookOpenCheck, Braces, CircleCheck, Clock3, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { frontendJavaMap, lessons } from '../content/curriculum'
import { useLearning } from '../state/learning-context'

export default function DashboardPage() {
  const { completed } = useLearning()
  const nextLesson = lessons.find((lesson) => !completed.has(lesson.slug)) ?? lessons[0]

  return (
    <div className="dashboard page-enter">
      <section className="hero">
        <div className="hero-copy">
          <span className="status-pill"><i /> LEARNING SYSTEM ONLINE</span>
          <p className="eyebrow">JAVA BACKEND · RAPID FIELD COURSE</p>
          <h1>别从语法书开始。<br /><em>先跑起来。</em></h1>
          <p className="hero-lead">给前端开发者的 Java 后端实战地图。用一个真实 Todo API，走完环境、启动、CRUD、测试，再回头看懂团队的多模块项目。</p>
          <div className="hero-actions">
            <Link className="primary-button" to={`/learn/${nextLesson.slug}`}>继续：{nextLesson.shortTitle}<ArrowRight size={18} /></Link>
            <Link className="text-button" to="/learn/launch-lab"><Terminal size={18} />直接看启动命令</Link>
          </div>
        </div>
        <div className="terminal-card">
          <div className="terminal-head"><span><i /><i /><i /></span><small>~/java-learning/mini-backend</small></div>
          <div className="terminal-body">
            <p><b>$</b> java -version</p><p className="muted">openjdk version "21"</p>
            <p><b>$</b> ./mvnw spring-boot:run</p>
            <p className="log"><span>INFO</span> Tomcat started on port 8080</p>
            <p className="log"><span>INFO</span> Started JavaLearningApplication</p>
            <p className="cursor"><b>$</b> curl localhost:8080/api/health <i /></p>
          </div>
          <div className="terminal-foot"><CircleCheck size={16} />你的第一个 Java 服务，活着。</div>
        </div>
      </section>

      <section className="dashboard-strip">
        <div><Clock3 /><span><small>总路线</small><strong>约 4 小时</strong></span></div>
        <div><Braces /><span><small>真实接口</small><strong>7 个 API</strong></span></div>
        <div><BookOpenCheck /><span><small>目标</small><strong>独立启动与调试</strong></span></div>
      </section>

      <section className="roadmap-section">
        <div className="section-heading"><div><p className="eyebrow">YOUR ROUTE</p><h2>六站走完，不绕远路</h2></div><p>每一站都有明确的完成标准。你的进度只保存在当前浏览器。</p></div>
        <div className="roadmap-grid">
          {lessons.map((lesson) => (
            <Link className={completed.has(lesson.slug) ? 'route-card complete' : 'route-card'} to={`/learn/${lesson.slug}`} key={lesson.slug}>
              <div className="route-number">{String(lesson.order).padStart(2, '0')}</div>
              <span className="route-status">{completed.has(lesson.slug) ? 'DONE' : lesson.duration}</span>
              <h3>{lesson.shortTitle}</h3>
              <p>{lesson.summary}</p>
              <span className="route-link">进入现场 <ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mapping-section">
        <div className="section-heading"><div><p className="eyebrow">MENTAL MODEL</p><h2>你不是从零开始</h2></div><p>把熟悉的前端工具，换一组名字。</p></div>
        <div className="mapping-table">
          <div className="mapping-header"><span>FRONTEND</span><span>JAVA BACKEND</span></div>
          {frontendJavaMap.map(([front, back]) => <div className="mapping-row" key={front}><code>{front}</code><ArrowRight size={16} /><code>{back}</code></div>)}
        </div>
      </section>
    </div>
  )
}
