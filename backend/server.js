// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const sequelize = require("./config/database");
// const authRoutes = require("./routes/authRoutes");
// const executeCode = require("./executeCode");


// const app = express();
// const PORT = process.env.PORT || 8080;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/api/auth", authRoutes);

// // Test Route
// app.get("/", (req, res) => {
//   res.send("Code Execution API is running...");
// });

// // Sync Database and Start Server (Only Once)
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Database synced successfully!");
//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error syncing database:", error);
//   });
//   ///


  



// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const sequelize = require("./config/database");
// const authRoutes = require("./routes/authRoutes");
// const executeCode = require("./executeCode");

// const app = express();
// const PORT = process.env.PORT || 8080;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());


// app.use(bodyParser.urlencoded({ extended: true })); // ✅ Allows form data parsing




// // Routes
// app.use("/api/auth", authRoutes);

// // Test Route
// app.get("/", (req, res) => {
//   res.send("Code Execution API is running...");
// });



// // Code Execution Route
// app.post("/execute", async (req, res) => {
//   const { language, code } = req.body;

//   if (!language || !code) {
//     return res.status(400).json({ error: "Language and code are required" });
//   }

//   try {
//     const output = await executeCode(language, code);
//     res.json({ output });
//   } catch (error) {
//     res.status(500).json({ error: error.toString() });
//   }
// });

// // Sync Database and Start Server (Only Once)
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Database synced successfully!");
//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error syncing database:", error);
//   });
//   // server.timeout = 30000;










require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const executeCode = require("./executeCode");
// const rateLimiter = require("./middleware/rateLimitMiddleware");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use("/execute", rateLimiter);

// Test Route
app.get("/", (req, res) => {
  res.send("Code Execution API is running...");
});

// Code Execution Route
app.post("/execute", async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: "Language and code are required" });
  }

  try {
    console.log(`Executing ${language} code...`); // Debug log
    const output = await executeCode(language, code);
    console.log(`Execution output: ${output}`); // Debug log
    res.json({ output });
  } catch (error) {
    console.error("Execution Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});

// Sync Database and Start Server
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully!");

    // Start the server with a timeout fix
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    server.timeout = 30000; // Set timeout to 30 seconds to prevent ECONNRESET errors
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
