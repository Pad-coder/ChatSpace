import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import notificationController from "../controller/notificationController.js";


const Routes = Router()

Routes.get('/',protectRoute,notificationController.getAllNotification)
Routes.delete('/',protectRoute,notificationController.deleteNotifications)
Routes.delete('/:id',protectRoute,notificationController.deleteNotification)


export default Routes