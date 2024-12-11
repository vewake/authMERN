import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import UserModel from './models/bd.js'
import jwt from 'jsonwebtoken'

import routes from './routes/routes.js'
import { ensureAuth } from './middlewares/jwtValid.js'

import dotenv from 'dotenv';
dotenv.config();

const app = express()
//require('dotenv').config X
const PORT = process.env.PORT || 7500
const mongo_url = process.env.MONGO_URL

app.use(bodyParser.json())
// app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


app.use('/user', routes)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

mongoose.connect(mongo_url)
  .then(() => {
    console.log("database connected sucessfully")
  })

app.get('/ping', (req, res) => {
  res.send("hello  duniya")
})

app.post("/me", async (req, res) => {
  const body = req.body
  const { token, test } = body
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    req.user = decoded.user;
    req.email = decoded.email;

    const email = req.email;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send(user);
    console.log(req.email);
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//
// app.use(cors({
//   origin: 'http://localhost:5173' // Yahan apne frontend ka URL daalein
// }));
