import React from "react";
import Editor from "@monaco-editor/react";
import "./index.css"; // Import global styles

const CodeEditor = ({ code, setCode, language, setLanguage, theme, toggleTheme, handleRunCode, output, loading }) => {
  return (
    <div className={`editor-wrapper ${theme}`}>
      {/* Left Side - Code Editor */}
      <div className="editor-container">
        <h2>Online Code Editor</h2>

        {/* Theme Toggle Button */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-selector"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>
{/* Run Button */}
      <button className="execute-button" onClick={handleRunCode}>
          {loading ? "Running..." : "Run Code"}
        </button>
        {/* Monaco Code Editor */}
        <Editor
          height="500px"
          width="100%"
          theme={theme === "dark" ? "vs-dark" : "light"}
          language={language}
          value={code}
          onChange={(newCode) => setCode(newCode)}
        />

        
      </div>

      {/* Right Side - Output Console */}
      <div className="output-container">
        <h3>Output Console</h3>
        <pre className="output-box">{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
