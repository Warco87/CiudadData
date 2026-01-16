import mongoose, { connect } from 'mongoose';
import {config} from 'dotenv';

config()
export const connectDB = async () =>{
    const {
        MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_DB,
        MONGO_HOSTNAME
    } = process.env;

   const url= `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DB}.${MONGO_HOSTNAME}.mongodb.net/?appName=${MONGO_DB}`;
    try {
        await mongoose.connect(url);
        console.log('MongoDB is connected');
    } catch (error: any) {
        console.error('MongoDB connection error:', error.message);
        throw error; 
    }
}