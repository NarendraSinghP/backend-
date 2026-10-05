// require("dotenv").config({path: "./.env"}); // this will load the environment variables from the .env file into process.env either this or
import mongoose from "mongoose";
import { Database_Name } from "./constants.js";
import connectToDatabase from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // or this but we will change dev in package.json to "start": "node -r dotenv/config src/index.js" so that we don't need to import dotenv in every file. and we will also change the path of the .env file to "./.env" because we are running the code from the root directory and not from the src directory. so we need to change the path of the .env file to "./.env" because we are running the code from the root directory and not from the src directory.


// because we use async and await in connectToDatabase function so we need to use try and catch block to handle errors and exceptions. 

connectToDatabase()
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.error("Error connecting to the database", error);
})


// : Cannot find module '/Users/narendrasingh/Programming/backend /project/src/db/constants.js' imported from /Users/narendrasingh/Programming/backend /project/src/db/index.js common error 



// whenever we want to use database we will use try and catch block to handle errors and exceptions and we will use async and await to handle asynchronous code. because it takes time to connect to the database and we don't want to block the execution of the code while waiting for the connection to be established. so we will use async and await to handle asynchronous code. and we will use try and catch block to handle errors and exceptions.

// professional approach to connect to the database is to use a function that will connect to the database and return a promise.

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to the database");
//   } catch (error) {
//     console.error("Error connecting to the database", error);
//     process.exit(1); // exit the process with failure
//   }
// };  
// export default connectToDatabase; 
// this is correct  but we can also use iife (immediately invoked function expression) to connect to the database and return a promise. this is a more professional approach to connect to the database.
// we write a semi colon before the iife to avoid any syntax errors. because if we don't write a semi colon before the iife then it will throw an error. because javascript will think that we are trying to call a function on the previous line. so we write a semi colon before the iife to avoid any syntax errors.
// ;(async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URL, backend_DB,
//     //     {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     // } in new version of mongoose we don't need to pass these options because they are default options in new version of mongoose
// );
//     app.on("error" , (error) => {
//         console.error("Error connecting to the database", error);
//         throw error; // throw the error to be caught by the catch block
//     })
//     app.listen(process.env.PORT, () => {
//         console.log(`Server is running on port ${process.env.PORT}`);
//     });
//     console.log("Connected to the database");
//   } catch (error) {
//     console.error("Error connecting to the database", error);
//     process.exit(1); // exit the process with failure
//   }
// })();