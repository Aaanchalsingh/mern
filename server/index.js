import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import records from "./routes/record.js";
import jwt from "jsonwebtoken";

dotenv.config();

const app=express();
app.use(express.json());
app.use(cors({
  origin: "https://mern-lac.vercel.app",
  methods: ["POST", "GET"],
  credentials: true
}));

app.use("/record", records);

mongoose.connect("mongodb+srv://Aanchal:Aanchal123@bunch.js15mci.mongodb.net/Authentication?retryWrites=true&w=majority").then(() => {
  console.log("Connected to AuthDatabase");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

const userSchema=new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const JWT_SECRET="b46ee1ca72f9c2e4fdbaed0c26f2d5240081b9855ac50daf711d8f75b6f4e4d1";

const User=mongoose.model("User", userSchema);
const checkLoggedIn=(req, res, next) => {
  const token=req.headers.authorization;
  if (token) {
    try {
      const decoded=jwt.verify(token, JWT_SECRET);
      res.status(403).json({ message: "User is already logged in" });
    } catch (error) {
      next();
    }
  } else {
    next();
  }
};

app.post("/Login", checkLoggedIn, async (req, res) => {
  const { email, password }=req.body;
  try {
    const user=await User.findOne({ email: email });
    if (user) {
      if (password===user.password) {
        const token=jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.send({ message: "login success", token: token });
      } else {
        alert("wrong credentials");
        res.send({ message: "wrong credentials" });
      }
    } else {
      res.send("not registered");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
app.get("/", async (req, res) => {
  res.send("HI ITS ME BACKEND");
})
app.post("/Register", async (req, res) => {
  const { name, email, password }=req.body;
  try {
    const existingUser=await User.findOne({ email: email });
    if (existingUser) {
      res.send({ message: "User already exists" });
    } else {
      const newUser=new User({ name, email, password });
      await newUser.save();
      res.send({ message: "Registration successful" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.listen(6969, () => {
  console.log("Server started on port 6969");
});