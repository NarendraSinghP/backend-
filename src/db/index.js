import mongoose from "mongoose";
import { Database_Name } from "../constants.js";

const connectToDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${Database_Name}`);
    console.log(`"Connected to the database || DB_HOST: ${connectionInstance} `);
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

export default connectToDatabase;

// whenever we change the environment variables in the .env file we need to restart the server to take effect. because the environment variables are loaded into process.env when the server starts and they are not updated when we change the .env file. so we need to restart the server to take effect manually.