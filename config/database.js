// import mongoose
const mongoose = require("mongoose");

// load data in process object
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log("DB connected successfuly")
    })
    .catch((err) => {
        console.log("DB not connected");
        console.error(err);
        process.exit(1);
    });
} 