import mongoose, { Schema } from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    logo: {
        type: String,
    },

    about: {
        type: String,
        required: true
    },

    galary: [{
        type: String,
    }],

    verified: {
        type: Boolean,
        default: false,
    },

    opportunities: [{
        type: Schema.Types.ObjectId,
        ref: 'Job',
    }],

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],

    avgRating: {
        type: Number,
        default: 0
    },

    registeredBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        // required:true
    }
}, {timestamps:true})

export const Company = mongoose.model('Company', companySchema);
