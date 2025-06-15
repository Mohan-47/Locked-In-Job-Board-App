import mongoose from 'mongoose';
// Connect to MongoDB
const connectDB = async () =>{
    mongoose.connection.on('connected', () => console.log('MongoDB connected successfully'));    
    mongoose.connection.on('error', (err) => console.log(`MongoDB connection error: ${err}`));

    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
}

export default connectDB;