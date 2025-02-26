import "./index.css";
import React, { useState } from "react";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import Navbar from "./NavBar";


function App() {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark"); // Default theme: Dark

  // Toggle Light/Dark Mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Handle Run Code Execution
  const handleRunCode = async () => {
    setLoading(true);
    setOutput("Running...");

    try {
      const response = await axios.post("http://localhost:8080/execute", {
        language,
        code,
      });

      setOutput(response.data.output);
    } catch (error) {
      setOutput(error.response?.data?.error || "Error executing code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <CodeEditor
        code={code}
        setCode={setCode}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
        handleRunCode={handleRunCode}
        output={output}
        loading={loading}
      />
    </div>
  );
}

export default App;
