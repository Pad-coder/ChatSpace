import { Router } from "express";
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
import postRoutes from './postRoutes.js'

const Routes = Router()

Routes.use('/auth',authRoutes)
Routes.use('/user',userRoutes)
Routes.use('/post',postRoutes)

export default Routes