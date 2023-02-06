import express from 'express';
import Connection from "./database/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser';
import authRouter from './routes/auth.js';
import postRouter from './routes/post.js'
import contactRouter from './routes/contact.js'
import commentsRouter from './routes/comments.js'
import errorMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser';

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
});

const app = express();
app.use(express.json());
app.use(cors({useCredentials: true} ));
app.use(fileUpload({
    useTempFiles:true
})); 
// app.use(fileUpload());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const port = process.env.PORT || 8080;
dotenv.config();
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/api/contact', contactRouter)
app.use('/api/comments', commentsRouter)

// Middleware for errors
app.use(errorMiddleware)

const server = app.listen(port, () => console.log(`Server is running on ${port}`));

// Connecting to database
Connection();

// Unhandled promise rejection for database
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to technical issue`)
    server.close(() => {
        process.exit(1);
    });
});