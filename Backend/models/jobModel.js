import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    requirements: {
        type: [String]
    },

    location: {
        type: String,
        required: true
    },

    experience: {
        type: String,
        required: true
    },

    salary: {
        type: String,
        required: true
    },

    perks: {
        type: [String]
    },

    category: {
        type: String,
        required: true
    },

    domain: {
        type: String,
        required: true,
        enum: ['Management', 'Engineering', 'Law', 'Arts', 'Biology', 'Others']
    },

    workType: {
        type: String,
        required: true,
        enum: ['In Office', 'Remote', 'Field Work', 'Hybrid']
    },

    userType: {
        type: String,
        enum: ['College Students', 'Fresher', 'Professionals']
    },

    postedDate: {
        type: Date,
        default: Date.now(),
        required: true
    },

    deadline: {
        type: Date
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },

    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]

}, {timestamps:true})

export const Job = mongoose.model('Job', jobSchema) 