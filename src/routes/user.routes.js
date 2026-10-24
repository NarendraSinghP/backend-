import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory, 
    updateAccountDetails
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )
    
    // his will now head the request to user controller and will call the registerUser function to register the user. 
// router.route("/login").post(loginUser); // this will now head the request to user controller and will call the loginUser function to login the user.
// the seperation will now help us if we want to add more functionality to the user controller like login, logout, get user details, update user details, delete user etc. we can add those functionality in the user controller and will not have to change the routes file. and if we want to add more routes for other resources like video, comment, like etc. we can create separate routes file for those resources and will not have to change the user routes file. this will make our code more organized and maintainable.

router.route("/login").post(loginUser)

//secured routes next routes are secured routes and will require authentication. so we will use the auth middleware to check if the user is authenticated or not. if the user is authenticated then we will allow the user to access the route otherwise we will return 401 unauthorized error.

router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router