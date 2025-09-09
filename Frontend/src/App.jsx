import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

// Predefined code templates for each language
// When the user switches language, the editor loads these snippets
const templates = {
  javascript: `function sum() {\n  return 1 + 1;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << 1 + 1;\n  return 0;\n}`,
  python: `def sum():\n    return 1 + 1`,
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println(1 + 1);\n  }\n}`
};

function App() {
  // State for selected programming language
  const [language, setLanguage] = useState("javascript");

  // State for AI review result
  const [review, setReview] = useState("");

  // State for code editor content
  const [code, setCode] = useState(templates.javascript);

  // Load language syntax dynamically when language changes
  // This avoids loading all languages upfront and improves performance
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

      // Highlight all code blocks after loading the language
      prism.highlightAll();
    }

    loadLanguage();
  }, [language, code]); // Runs whenever language or code changes

  // Function to send code + language to backend for AI review
  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
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
      console.error(error);
    }
  }

  return (
    <>
      <header>
        <h1 className="title">🤖 RevAI – Your AI Code Reviewer</h1>
      </header>

      <main>
        <div className="left" style={{ position: "relative" }}>
          {/* Language selector dropdown */}
          <select
            value={language}
            onChange={(e) => {
              const selectedLang = e.target.value;
              setLanguage(selectedLang);

              // Load default template code when language changes
              // This removes the need to refresh manually
              setCode(templates[selectedLang]);
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

          {/* Code editor component */}
          {/* The key={language} forces the editor to remount when the language changes */}
          {/* This fixes the issue where syntax highlighting required a manual refresh */}
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

          {/* Review button */}
          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>

        {/* Display AI review in Markdown format */}
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review || ""}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
