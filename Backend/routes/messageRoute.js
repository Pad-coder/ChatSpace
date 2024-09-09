import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import messageController from '../controller/messageController.js'

const Routes = Router()


Routes.get('/:id',protectRoute,messageController.getMessages)
Routes.post('/send/:id',protectRoute,messageController.sendMessage)


export default Routes