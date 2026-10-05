import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';

import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateAccessAndRefreshTokens = async (user) => {
    const AccessToken = user.generateAccessToken();
    const RefreshToken = user.generateResfreshToken();
    user.RefreshToken = RefreshToken;
    await user.save({validateBeforeSave : false});
    return {AccessToken, RefreshToken}; 
    
}

const registerUser = asyncHandler(async (req, res) => {


    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    const { fullName, email, password, username } = req.body;

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [
            { email: email },
            { name: name }
        ]
    })

    if (existedUser) {
        throw new ApiError("User already exists", 400);
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const CoverLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError("Avatar image is required", 400);
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(CoverLocalPath);

    if (!avatar) {
        throw new ApiError("avatar is required", 400);
    }


    const result = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || null,
        email,
        password,
        username: name.toLowerCase(),
    })

    const createdUser = await User.findById(result._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError("Something went wrong while registering the user", 500);
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
    // we will get the user details from the request body and will store them in the database. and we will also check if the user already exists in the database or not. if the user already exists then we will send an error response to the client. if the user does not exist then we will create a new user and will send a success response to the client.
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;

    if (!username || !email) {
        throw new ApiError("Username or email is not provided", 400);

    }
    const user = await User.findOne({
        $or: [
            { email }, { username }
        ]
    })

    if (!user) {
        throw new ApiError("User Not Found", 404);
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid)
        throw new ApiError("Invalid user credentials", 401);


   const {AccessToken , RefreshToken} =await generateAccessAndRefreshTokens(user._id);

   const loggedInUser = await User.findById(user._id).select("-password -RefreshToken");  

    const options = {
        httpOnly : true , 
        secure : true 

    }
    return res.status(200).cookie("refreshhToken", refreshToken , options).cookie("accessToken", accessToken , options).json(new ApiResponse(200, {
        user: loggedInUser,
        accessToken,refreshToken  
    }, "User logged in successfully"));

})


// node js will work when we hit a url so will make some routes to make the user register and login and get the user details. we will use express router to make the routes.

export {
    registerUser,
    loginUser
}; 