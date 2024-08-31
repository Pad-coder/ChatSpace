import { Router } from "express";
import authRoutes from './authRoutes.js'

const Routes = Router()

Routes.use('/auth', authRoutes)

export default Routes