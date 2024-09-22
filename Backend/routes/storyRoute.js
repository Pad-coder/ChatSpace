import { Router } from 'express'
import storyController from '../controller/storyController.js'
import { protectRoute } from '../middleware/protectRoute.js'

const Routes = Router()

Routes.post('/upload',protectRoute,storyController.createStory)
Routes.get('/all',protectRoute,storyController.getStory)
Routes.delete('/:id',protectRoute,storyController.deleteStory)

export default Routes