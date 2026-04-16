const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

mongoose.connect("mongodb+srv://ashiguptagr2004_db_user:RmAdUIAMiDCNFB1z@cluster0.2oaj9wv.mongodb.net/internship-portal?appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: { type: String, unique: true },
  password: String,
  role: String
});

const User = mongoose.model("Users", UserSchema);

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User Registered");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.send({ success: true, user });
    } else {
      res.send({ success: false });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});