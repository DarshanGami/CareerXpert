const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

exports.connection = () => {
    mongoose
        .connect(process.env.DATABASE, {
            dbName: 'CareerXpert',
        })
        .then(() => {
            console.log('DB connection Successful');
        })
        .catch((err) => {
            console.log(process.env.DATABASE);
            console.log(err);
        });
};