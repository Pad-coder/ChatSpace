import express from 'express'
import 'dotenv/config.js'
import Routes from './routes/index.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(Routes)

app.listen(port,()=>{console.log(`Server is running on port ${port}`)})