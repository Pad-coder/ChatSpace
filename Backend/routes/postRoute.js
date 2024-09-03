import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import postController from '../controller/postController.js'


const Routes = Router()

Routes.get('/allPost',protectRoute,postController.getAllPost)
Routes.get('/liked/:id',protectRoute,postController.getLikedPosts)
Routes.get('/followingPosts',protectRoute,postController.getFollowingPosts)
Routes.get('/user/:username',protectRoute,postController.getUserPosts)
Routes.post('/create',protectRoute,postController.createPost)
Routes.post('/like/:id',protectRoute,postController.likeUnlikePost)
Routes.post('/comment/:id',protectRoute,postController.commentPost)
Routes.delete('/:id',protectRoute,postController.deletePost)

export default Routes