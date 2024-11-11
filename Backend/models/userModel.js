import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true, 
        validate: [validator.isEmail, 'Please provide valid email'],
    },

    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must contain atleast 8 characters'],
    },

    role: {
        type: String,
        required: true,
        enum: ['Job Seeker', 'Recruiter'],
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    verificationToken: {
        type: String,
    },

    phone: {
        type: String,
        // required: true,
    },

    address: {
        type: String,
        // required: true,
    },

    skills: {
        type: String,
        // required: true,
        enum: ['C++', 'SQL', 'python', 'Reactjs', 'nodejs', 'API Testing'],
    },

    jobPreference: {
        first: String,
        second: String,
        third: String,
    },

    coverLetter: {
        type: String,
    },

    resume: {
        id: String,
        url: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    passwordResetToken: String,

    passwordResetExpires: Date,
    
}, {timestamps:true});


export const User = mongoose.model('User', userSchema);