import express from 'express'
import 'dotenv/config.js'
import Routes from './routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express()
const port = process.env.PORT || 8000
app.use(cors());

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api",Routes)

app.listen(port,()=>{console.log(`Server is running on port ${port}`)})