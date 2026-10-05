import {Router} from 'express';
import upload from '../middlewares/multer.middleware.js';
import {registerUser} from '../controllers/user.controller.js';

const router = Router();


router.route("/register").post(
    upload.fields([
        {name : "avatar" , maxCount : 1},
        {name : "coverImage", maxCount : 1}
    ]),
    registerUser); // this will now head the request to user controller and will call the registerUser function to register the user. 
// router.route("/login").post(loginUser); // this will now head the request to user controller and will call the loginUser function to login the user.
// \\
// the seperation will now help us if we want to add more functionality to the user controller like login, logout, get user details, update user details, delete user etc. we can add those functionality in the user controller and will not have to change the routes file. and if we want to add more routes for other resources like video, comment, like etc. we can create separate routes file for those resources and will not have to change the user routes file. this will make our code more organized and maintainable.


export default router ;