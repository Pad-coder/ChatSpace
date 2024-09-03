import { Router } from "express";
import authRoute from './authRoute.js'
import userRoute from './userRoute.js'
import postRoute from './postRoute.js'
import notificationRoute from './notificationRoute.js'

const Routes = Router()

Routes.use('/auth',authRoute)
Routes.use('/user',userRoute)
Routes.use('/post',postRoute)
Routes.use('/notification',notificationRoute)

export default Routes