import express from 'express'
import { register, login, logout, verifyEmail } from "../controllers/userController.js";

// Create a new router
const userRouter = express.Router();

// Define routes
userRouter.post('/register', register);
userRouter.get('/verify-email', verifyEmail);
userRouter.post('/login', login);

export default userRouter;