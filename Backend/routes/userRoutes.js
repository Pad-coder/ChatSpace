import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import userController from '../controller/userController.js'

const Routes = Router()

Routes.get('/profile/:username',protectRoute,userController.getUserProfile)
Routes.get('/suggested',protectRoute,userController.getSuggestedUser)
Routes.post('/follow/:id',protectRoute,userController.followUnFollowUser)
Routes.post('/update',protectRoute,userController.updateUserProfile)

export default Routes