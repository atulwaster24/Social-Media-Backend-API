import express, { Router } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { usersRouter } from '../../features/users/user.routes.js';
import { postsRouter } from '../../features/posts/post.routes.js';
import { commentsRouter } from '../../features/comments/comments.routes.js';
import { likesRouter } from '../../features/likes/likes.routes.js';

/* Environmental Variables Configuration (dotenv) */
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
app.use('/api/likes/', likesRouter);
// app.use('/api/friends/');
// app.use('/api/otp/')


export default app;