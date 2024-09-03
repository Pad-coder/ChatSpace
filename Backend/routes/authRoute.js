import { Router } from "express";
import authController from "../controller/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const Routes = Router()

Routes.get('/me',protectRoute,authController.getUser)
Routes.post('/signup',authController.signup)
Routes.post('/login',authController.login)
Routes.post('/logout',authController.logout)



export default Routes