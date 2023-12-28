import express, { Router } from 'express';
import dotenv from 'dotenv';
import { userRouter } from '../../features/users/user.routes.js';
import { postRouter } from '../../features/posts/post.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config()

/* Creating a app */
const app = express();

/* Setting app configs */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


/* Setting Routers to handle paths */
app.use('/api/users/', userRouter);
app.use('/api/posts/', postRouter);
// app.use('/api/comments/');
// app.use('/api/likes/');
// app.use('/api/friends/');
// app.use('/api/otp/')


export default app;