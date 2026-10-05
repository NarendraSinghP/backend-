import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
// file system module is used to delete the file after uploading it to cloudinary
// file system is a built-in module in node.js that allows us to work with the file system on our computer. it allows us to read, write, delete, and manipulate files and directories. it is used to delete the file after uploading it to cloudinary because we don't want to store the file on our server after uploading it to cloudinary. we will use fs.unlink() method to delete the file. it takes two arguments, the first argument is the path of the file and the second argument is a callback function that will be called after the file is deleted. if there is an error while deleting the file, it will be passed as an argument to the callback function.

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET 

})

const uploadOnCloudinary = async (localFilePath) => {
   try {
    if(!localFilePath)
   {
     return null;
    }
    const result = await cloudinary.uploader.upload(localFilePath , {
        resource_type : "auto" // it will automatically detect the file type and upload it accordingly. if we don't specify the resource type, it will upload the file as an image by default. so we need to specify the resource type as auto to upload any type of file.
    })
    console.log("file uploaded on cloudinary successfully", result.url);

    return result;

   } catch (error) {
    // if there is an error while uploading the file to cloudinary, it will be caught in the catch block and we can handle it accordingly. we can log the error or throw the error to be handled by the calling function. we can also return a custom error message to the user.
    // we will remove the file from the local storage after uploading it to cloudinary because we don't want to store the file on our server after uploading it to cloudinary. we will use fs.unlink() method to delete the file. it takes two arguments, the first argument is the path of the file and the second argument is a callback function that will be called after the file is deleted. if there is an error while deleting the file, it will be passed as an argument to the callback function.

    fs.unlinkSync(localFilePath )
    return null 
    
   }

    }

    
    // all the tasks having some conflicts we use try catch block to handle the errors. if there is an error while uploading the file to cloudinary, it will be caught in the catch block and we can handle it accordingly. we can log the error or throw the error to be handled by the calling function. we can also return a custom error message to the user.
    
    // and if a work is takking time to complete we use async await to wait for the work to complete before moving on to the next line of code. it makes the code more readable and easier to understand. it also helps in handling errors more effectively
    
    export  {uploadOnCloudinary};