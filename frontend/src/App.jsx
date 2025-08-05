import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import Prism from "prismjs"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-go"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-ruby"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

const LANGUAGE_OPTIONS = [
  { name: 'JavaScript', value: 'javascript', sample: `function sum() { return 1 + 1 }` },
  { name: 'Python', value: 'python', sample: `def sum():\n    return 1 + 1` },
  { name: 'Java', value: 'java', sample: `int sum() { return 1 + 1; }` },
  { name: 'C++', value: 'cpp', sample: `int sum() { return 1 + 1; }` },
  { name: 'Go', value: 'go', sample: `func sum() int { return 1 + 1 }` },
  { name: 'Rust', value: 'rust', sample: `fn sum() -> i32 { 1 + 1 }` },
  { name: 'C#', value: 'csharp', sample: `int Sum() { return 1 + 1; }` },
  { name: 'Ruby', value: 'ruby', sample: `def sum\n 1 + 1\nend` },
  
]

function App() {
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState(LANGUAGE_OPTIONS[0].sample)
  const [review, setReview] = useState(``)
  const [darkMode, setDarkMode] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Prism.highlightAll()
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [code, language, darkMode])

  function handleLanguageChange(e) {
    const lang = e.target.value
    setLanguage(lang)
    const option = LANGUAGE_OPTIONS.find(opt => opt.value === lang)
    setCode(option?.sample ?? "")
    setReview("")
  }

  async function reviewCode() {
    setLoading(true)
    setReview("") 
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ai/get-review`, { code, language })
      setReview(response.data)
    } catch (e) {
      setReview("Error fetching review. Please try again.")
    }
    setLoading(false)
  }


  return (
    <>
      <button
        className="toggle-theme"
        onClick={() => setDarkMode(d => !d)}
        aria-label="Toggle color theme"
      >
        {darkMode ? '🌙 Dark' : '☀️ Light'}
      </button>
      <main>
        <div className="left">
          <div style={{ marginBottom: "10px" }}>
            <select value={language} onChange={handleLanguageChange}>
              {LANGUAGE_OPTIONS.map(opt =>
                <option value={opt.value} key={opt.value}>
                  {opt.name}
                </option>
              )}
            </select>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={c => setCode(c)}
              highlight={c => Prism.highlight(c, Prism.languages[language] || Prism.languages.javascript, language)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid var(--border-color)",
                borderRadius: "5px",
                background: "var(--editor-bg)",
                color: "var(--editor-fg)",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">Review</div>
        </div>
        <div className="right">
          {loading ? (
            <div className="loader">
              <div className="spinner"></div>
              <div>Reviewing...</div>
            </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>

      </main>
    </>
  )
}

export default App
