import mongoose from 'mongoose';

const connectMongoose = async () =>
  mongoose.connect(process.env.NEXT_PUBLIC_MONGO_DB_URI);

export default connectMongoose;
