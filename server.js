const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise"); 
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5500",   
  "http://localhost:5173"
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  }
}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/health", (req, res) => res.send("OK"));

let pool;
(async () => {
  pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
})();

app.post("/submit", async (req, res) => {
  try {
    const d = req.body;
    const sql = `INSERT INTO feedback
      (name, ageGroup, role, usingMess, satisfaction, problems, healthIssues, comments)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    await pool.execute(sql, [
      d.name || null,
      d.ageGroup || null,
      d.role || null,
      d.usingMess || null,
      d.satisfaction || null,
      d.problems || null,
      d.healthIssues || null,
      d.comments || null
    ]);

    res.send("Feedback saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving feedback");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
