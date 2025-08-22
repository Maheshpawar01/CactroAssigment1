import express from 'express';
const app = express();
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from './db.js';
dotenv.config()

connectDB()
app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hi there!');
});


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
