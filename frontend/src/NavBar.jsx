import React from "react";
import "./index.css"; // Import styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Code Execution Platform</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/editor">Editor</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
