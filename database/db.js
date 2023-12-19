import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.set('strictQuery', false);

const Connection = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
}
export default Connection;
