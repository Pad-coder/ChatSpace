import express from 'express'
import 'dotenv/config.js'
import Routes from './routes/index.js'
import connectDb from './MongoDb/connectDb.js'
const app = express()
const port = process.env.PORT 

app.use(Routes)

app.listen(port,()=>{console.log(`Server is running on port ${port}`)
connectDb()
})