import mongoose from "mongoose";    
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.MONGODB_CONNECTION_URL;

if(!mongoURL){
    throw new Error("MONGODB_CONNECTION_URL is not defined in environment variables");
}

const connectToMongoDB = async () : Promise<void> => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB successfully");

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB connection lost. Attempting to reconnect...');
        })
    } catch(error) {
        console.error("Error connecting to MongoDB:", (error as Error).message);
    }
} 



export default connectToMongoDB;