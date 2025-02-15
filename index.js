// create a instance of express
const express = require("express");
const app = express();

// data load into process object from .env
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// if you want to retrive the data form body then use
//1. middleware "use()"
app.use(express.json());

// 2. cookie-parser ( what is this and why we need this ? )
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//connect the database from application
require("./config/database").connect();
 
// route import and mount
const user = require("./routes/user");
app.use("/api/v1" , user);

// activation
app.listen(PORT , () => {
    console.log(`app activate on ${PORT}`);
});

// for frontend connection
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // URL of your React app
  credentials: true, // For sending cookies from backend
}));

app.get("/" , (req , res) => {
    res.send("working properly");
})