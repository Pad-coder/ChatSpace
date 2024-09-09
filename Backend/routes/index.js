import { Router } from "express";
import authRoute from './authRoute.js'
import userRoute from './userRoute.js'
import postRoute from './postRoute.js'
import storyRoute from './storyRoute.js'
import notificationRoute from './notificationRoute.js'
import messageRoutes from './messageRoute.js'

const Routes = Router()

Routes.use('/auth',authRoute)
Routes.use('/user',userRoute)
Routes.use('/post',postRoute)
Routes.use('/story',storyRoute)
Routes.use('/notification',notificationRoute)
Routes.use('/message',messageRoutes)

export default Routes