import express, { Router } from 'express';
import dotenv from 'dotenv';
import { usersRouter } from '../../features/users/user.routes.js';
import { postsRouter } from '../../features/posts/post.routes.js';
import cookieParser from 'cookie-parser';
import { commentsRouter } from '../../features/comments/comments.routes.js';
dotenv.config()

/* Creating a app */
const app = express();

/* Setting app configs */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


/* Setting Routers to handle paths */
app.use('/api/users/', usersRouter);
app.use('/api/posts/', postsRouter);
app.use('/api/comments/', commentsRouter);
// app.use('/api/likes/');
// app.use('/api/friends/');
// app.use('/api/otp/')


export default app;