import { Router } from "express";
import authRoutes from './authRoute.js'
import userRoutes from './userRoute.js'
import postRoutes from './postRoute.js'

const Routes = Router()

Routes.use('/auth',authRoutes)
Routes.use('/user',userRoutes)
Routes.use('/post',postRoutes)

export default Routes