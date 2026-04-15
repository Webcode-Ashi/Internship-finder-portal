const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 👇 ADD THIS
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "internship_portal"
});

db.connect(err => {
  if (err) throw err;
  console.log("Database Connected");
});

// SIGNUP
app.post("/signup", (req, res) => {
  const { fname, lname, email, password, role } = req.body;

  const sql = "INSERT INTO users (fname,lname,email,password,role) VALUES (?,?,?,?,?)";
  db.query(sql, [fname, lname, email, password, role], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("User Registered");
  });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length > 0) {
      res.send({ success: true, user: result[0] });
    } else {
      res.send({ success: false });
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});