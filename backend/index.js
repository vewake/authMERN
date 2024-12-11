import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes/routes.js'
import { ensureAuth } from './middlewares/jwtValid.js'

const app = express()
//require('dotenv').config X
dotenv.config()  //this is correct way
const PORT = process.env.PORT || 7500
const mongo_url = process.env.MONGO_URL

app.use(bodyParser.json())
app.use(cors())

app.use('/user', routes)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

mongoose.connect(mongo_url)
.then(()=>{
    console.log("database connected sucessfully")
})

app.get('/ping', (req,res) => {
    res.send("hello  duniya")
})
app.get("/test",ensureAuth,()=>{
    res.send("securee")
})

app.use(cors({
    origin: 'http://localhost:5173' // Yahan apne frontend ka URL daalein
}));
