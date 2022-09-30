import mongoose from "mongoose";


const connectMongoose = async () => mongoose.connect(process.env.MONGO_DB_URI!)


export default connectMongoose;