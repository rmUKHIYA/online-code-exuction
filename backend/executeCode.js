// const { exec } = require("child_process");
// const fs = require("fs");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

// // Function to execute user code securely in Docker
// const executeCode = async (language, code) => {
//   return new Promise((resolve, reject) => {
//     const jobId = uuidv4(); // Generate a unique ID for the execution
//     const codeFile = path.join(
//       __dirname,
//       `temp_${jobId}.${getFileExtension(language)}`
//     );

//     // Save the user code to a temporary file
//     fs.writeFileSync(codeFile, code);

//     // Define the Docker command based on the selected language
//     let command;
//     switch (language) {
//       case "python":
//         command = `docker run --rm -v ${codeFile}:/app/script.py code-executor python3 /app/script.py`;
//         break;

//       case "java":
//         command = `docker run --rm -v ${codeFile}:/app/Main.java code-executor sh -c "javac /app/Main.java && java -cp /app Main"`;
//         break;
//       case "c":
//         command = `docker run --rm -v ${codeFile}:/app/code.c code-executor sh -c "gcc /app/code.c -o /app/code.out && /app/code.out"`;
//         break;
//       case "cpp":
//         command = `docker run --rm -v ${codeFile}:/app/code.cpp code-executor sh -c "g++ /app/code.cpp -o /app/code.out && /app/code.out"`;
//         break;
//       case "javascript":
//         command = `docker run --rm -v ${codeFile}:/app/script.js code-executor node /app/script.js`;
//         break;
//       default:
//         return reject("Unsupported language");
//     }

//     // Execute the command in Docker
//     exec(command, (error, stdout, stderr) => {
//       fs.unlinkSync(codeFile); // Delete the temporary code file after execution

//       if (error) {
//         reject(stderr || error.message);
//       } else {
//         resolve(stdout);
//       }
//     });
//   });
// };

// // Helper function to get the correct file extension
// const getFileExtension = (language) => {
//   const extensions = {
//     python: "py",
//     javascript: "js",
//     java: "java",
//     c: "c",
//     cpp: "cpp",
//   };
//   return extensions[language] || "txt";
// };

// module.exports = executeCode;









//second changes




const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Function to execute user code securely in Docker
const executeCode = async (language, code) => {
  return new Promise((resolve, reject) => {
    const jobId = uuidv4(); // Generate a unique ID for the execution
    const codeFile = path.join(__dirname, `temp_${jobId}.${getFileExtension(language)}`);

    try {
      // Save the user code to a temporary file
      fs.writeFileSync(codeFile, code);
    } catch (err) {
      return reject(`Error writing code file: ${err.message}`);
    }

    // Define the Docker command based on the selected language
    let command;
    switch (language) {
      case "python":
        command = `docker run --rm -v ${codeFile}:/app/script.py code-executor python3 /app/script.py`;
        break;

      case "javascript":
         const dockerPath = codeFile.replace(/\\/g, "/"); // Convert Windows path to Linux path
         command = `docker run --rm -v "${dockerPath}:/app/script.js" code-executor node /app/script.js`;
         break;
        
      case "java":
        command = `docker run --rm -v ${codeFile}:/app/Main.java code-executor sh -c "javac /app/Main.java && java -cp /app Main"`;
        break;

      case "c":
        command = `docker run --rm -v ${codeFile}:/app/code.c code-executor sh -c "gcc /app/code.c -o /app/code.out && /app/code.out"`;
        break;

      case "cpp":
        command = `docker run --rm -v ${codeFile}:/app/code.cpp code-executor sh -c "g++ /app/code.cpp -o /app/code.out && /app/code.out"`;
        break;

      default:
        return reject(`Unsupported language: ${language}`);
    }

    console.log(`Executing: ${command}`); // Debug log

    // Execute the command in Docker
    exec(command, (error, stdout, stderr) => {
      try {
        fs.unlinkSync(codeFile); // Delete the temporary code file after execution
      } catch (err) {
        console.error(`Error deleting file: ${err.message}`);
      }

      if (error) {
        console.error(`Execution Error: ${stderr || error.message}`);
        return reject(`Execution Failed: ${stderr || error.message}`);
      }

      resolve(stdout || "No output");
    });
  });
};

// Helper function to get the correct file extension
const getFileExtension = (language) => {
  const extensions = {
    python: "py",
    javascript: "js",
    java: "java",
    c: "c",
    cpp: "cpp",
  };
  return extensions[language] || "txt";
};

module.exports = executeCode;

