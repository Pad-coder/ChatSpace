import { Router } from "express";
import authController from "../controller/authController.js";
const Routes = Router()

Routes.post('/signup',authController.signup)
Routes.post('/login',authController.login)



export default Routes