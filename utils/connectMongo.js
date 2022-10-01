import mongoose from 'mongoose';

const connectMongoose = async () =>
  mongoose.connect(process.env.NEXT_PUBLIC_MONGO_DB_URI, {
    //must add in order to not get any error masseges:
  });

export default connectMongoose;
