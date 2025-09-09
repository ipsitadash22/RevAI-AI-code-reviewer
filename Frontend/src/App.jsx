import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

const templates = {
  javascript: `function sum() {\n  return 1 + 1;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << 1 + 1;\n  return 0;\n}`,
  python: `def sum():\n    return 1 + 1`,
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println(1 + 1);\n  }\n}`
};

function App() {
  const [language, setLanguage] = useState("javascript");
  const [review, setReview] = useState("");
  const [code, setCode] = useState(templates.javascript);

  const backendURL = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");

  useEffect(() => {
    async function loadLanguage() {
      if (language === "cpp" && !prism.languages.cpp) {
        await import("prismjs/components/prism-cpp");
      }
      if (language === "java" && !prism.languages.java) {
        await import("prismjs/components/prism-java");
      }
      if (language === "python" && !prism.languages.python) {
        await import("prismjs/components/prism-python");
      }
      prism.highlightAll();
    }
    loadLanguage();
  }, [language, code]);

  async function reviewCode() {
    if (!backendURL) {
      setReview("Error: Backend URL is not set.");
      return;
    }

    try {
      setReview("Processing..."); // Show loading state
      const response = await axios.post(`${backendURL}/ai/get-review`, {
        code,
        language
      });

      const result =
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data, null, 2);

      setReview(result);
    } catch (error) {
      setReview("Error: Unable to fetch review.");
      console.error("Review API Error:", error);
    }
  }

  return (
    <>
      <header>
        <h1 className="title">🤖 RevAI – Your AI Code Reviewer</h1>
      </header>

      <main>
        <div className="left" style={{ position: "relative" }}>
          <select
            value={language}
            onChange={(e) => {
              const selectedLang = e.target.value;
              setLanguage(selectedLang);
              setCode(templates[selectedLang]);
              setReview(""); // ✅ Clear previous review
            }}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              padding: "0.3rem 0.8rem",
              borderRadius: "5px",
              border: "none",
              fontWeight: "bold",
              background: "#dbeafe",
              color: "#000",
              zIndex: 10
            }}
          >
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          <div className="code">
            <Editor
              key={language}
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(
                  code,
                  prism.languages[language] || prism.languages.javascript,
                  language
                )
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>

          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>

        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review || ""}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
