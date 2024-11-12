import { catchAsync } from '../middlewares/catchAsync.js';
import AppError from '../middlewares/errorHandler.js';
import { User } from './../models/userModel.js';
import { sendVerificationEmail } from '../utils/sendEmail.js';
import { sendEmail } from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 
import crypto from 'crypto';

const signToken = (id) => {
    // create token
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}; 

const createSendToken = (user, statusCode, res, message) => {
    const token = signToken(user._id);

    // cookie options
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true
    };
     
    res.cookie('token', token, cookieOptions); // send token via cookie for security
    res.status(statusCode).json({
        status: 'success',
        message,
        user,
        token,
    });
};

export const register = catchAsync(async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        // check if required fields are empty
        if (!username || !email || !password || !role) {
            return next(new AppError('Empty required field.', 400));
        }

        // check if email is already registered
        const isExist = await User.findOne({ email });
        if (isExist) {
            return next(new AppError('Email is already registered.', 400));
        }
        
        // create verification token
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        const user = new User({
            username,
            email,
            password,
            role
        })

        await user.save()
        
        // send verification email to user
        await sendVerificationEmail(email, verificationToken) 
        
        res.status(200).json({
            status: 'success', 
            message: 'Signup successful, check your email to verify your account.',
            user,
        });

    } catch (err) {
        res.status(400).json({
            status: 'failure',
            message: err.message,
        });
    }
});


export const verifyEmail = catchAsync(async (req, res, next) => {
    try {
      const { token } = req.query;
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Find the user by email
      const user = await User.findOne({ email: decoded.email });

      if (!user || user.isVerified) {
        return next(new AppError('Invalid token or already verified account.', 400));
      }
  
      // Update user status to verified
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
  
      res.status(200).json({ status: 'success',  message: "Email verified successfully." });
    } catch (error) {
      res.status(400).json({ status: 'failure', message: error.message });
      
    }
  });



export const login = catchAsync(async (req, res, next) => {
    const { email, password, role } = req.body;

    // check if required fields are empty
    if (!role || !email || !password) {
        return next(new AppError('Empty required field.', 400));
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError('Invalid Email.', 400));
    }

    // comapre password with hashed password that is stored in database
    const passwordMatch = await bcrypt.compare(password, user.password); 

    if (!passwordMatch) {
        return next(new AppError('Wrong password.', 400));
    }

    if (role !== user.role) {
        return next(new AppError('invalid credentials', 400));
    }

    if(!user.isVerified) {
        return next(new AppError('Email is not verified yet, please do it first', 400))
    }

    // if everything is correct, send token to client
    createSendToken(user, 201, res, 'user logged in successfully'); 
});


export const logout = catchAsync(async (req, res, next) => {

    // clear cookie by expiring it at current time
    res.status(200)
        .cookie('jwt', '', {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json({
            status: 'success',
            message: 'Logged out successfully.',
        });
});