import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

// Import additional Prism languages
//import "prismjs/components/prism-python";
//import "prismjs/components/prism-java";
import "prismjs/components/prism-clike"; 
//import "prismjs/components/prism-cpp";

function App() {
  // Language state for the selected programming language
  const [language, setLanguage] = useState("javascript");

  // State for AI code review result
  const [review, setReview] = useState("");

  // State for code editor content
  const [code, setCode] = useState(`function sum(){
  return 1+1  
}`);

  // Re-highlight code whenever language or code changes
 useEffect(() => {
  async function loadLanguage() {
    // Dynamically load C++ support if selected
    if (language === "cpp" && !prism.languages.cpp) {
      await import("prismjs/components/prism-cpp");
    }
    // Add support for other languages too if needed
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

  // Function to send code and language to backend for AI review
  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
        language,
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
            onChange={(e) => setLanguage(e.target.value)}
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
              zIndex: 10,
            }}
          >
        <option value="javascript">JavaScript</option>
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="java">Java</option>

          </select>

          {/* Code editor */}
          <div className="code">
            <Editor
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
                width: "100%",
              }}
            />
          </div>

          {/* Review button */}
          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>

        {/* Display AI review */}
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review || ""}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
