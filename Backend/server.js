import path from 'path'
import express from 'express'
import 'dotenv/config.js'
import Routes from './routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import { app,server } from './socket/socket.js';

const port = process.env.PORT || 8000;
const __dirname = path.resolve()
app.use(cors());

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api",Routes)


server.listen(port,()=>{console.log(`Server is running on port ${port}`)})