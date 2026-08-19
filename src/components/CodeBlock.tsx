import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export function CodeBlock({ code, language = 'text', title }: { code: string; language?: string; title?: string }) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="code-window">
      <div className="code-toolbar">
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <span>{title ?? language}</span>
        <button type="button" onClick={copyCode} aria-label="复制代码">
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  )
}
