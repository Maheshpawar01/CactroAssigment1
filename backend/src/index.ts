import express from 'express';
const app = express();
import dotenv from "dotenv"
// import { userMiddleware } from "./middleware";
import { userModel } from './db.js';
import jwt from "jsonwebtoken";
import cors from "cors"
dotenv.config()

const JWT_PASSWORD = process.env.JWT_PASSWORD as string;


app.get('/', (req, res) => {
  res.send('hi there!');
});

//start creating backend apis
app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  try {
    const user = await userModel.create({
      username: username,
      password: password,
      name:name,
    });

          const token = jwt.sign(
        {          id:user._id  },
        JWT_PASSWORD);
        // console.log("signup token",  token)

    res.status(200).json({
      token,
      name:name,
      message: "user signed up",
    });
  } catch (error) {
    res.status(411).json({
      message: "User alread exists",
    });
  }
});
app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const existingUser = await userModel.findOne({
      username,
      password,
    });
    if (existingUser) {
      const token = jwt.sign(
        {
          id: existingUser._id,
        },
        JWT_PASSWORD
      );

      res.json({
        token,
        name:existingUser.name,     
      });
    } else {
      res.status(403).json({
        message: "incorrect credentials",
      });
    }
  } catch (error) {
    res.status(403).json({
      message:"incoreect credentials"
    })
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
