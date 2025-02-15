const express = require("express");
const router = express.Router();

// import route handler
const {login , signup} = require("../Controller/auth");
const {auth , isStudent , isAdmin} = require("../middlewares/auth&auth");


// create routes for controller
router.post("/login" , login);
router.post("/signup" , signup);

// testing protected route for single middlerware
router.get("/test" , auth , (req , res) => {
    res.json({
        success: true,
        message: "welcom to the protected route for test"
    });
})

// protected Route 
// 1. student ( authentication & autherization )
router.get("/student" , auth , isStudent , (req , res) => {
    res.json({
        success:true,
        message:"Welcome to the protected route for students"
    })
});

// 2. admin ( authentication & autherization )
router.get("/admin" , auth , isAdmin , (req , res) => {
    res.json({
        success:true,
        message:"Welcome to the protected route for students"
    })
})


module.exports = router; 