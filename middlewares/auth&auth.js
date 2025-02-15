// MIDDLEWARE: 
// 1. auth      ( authentication )
// 2. isStudent ( authorization )
// 3. isAdmin   ( authorization )

const jwt = require("jsonwebtoken");
require("dotenv").config();

// 1. authentication
exports.auth = (req , res , next) => {
    try {
       // extract "JWT" token from all three ways
        // 1. req.body ( -- body parser middlware-- )
        console.log("body:", req.body.token);
        // 2. req.cookie( -- cookie parser -- )
        console.log("cookies:", req.cookies.token);
        // 3. req.header ( -- Authorization key -- )
        console.log("header:" , req.header("Authorization").replace("Bearer" , ""));

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer" , "");

        // if token not found
        if(!token) {
            return res.json({
                success: true,
                message: "Token Missing"
            });
        }

        try {
            // verify the token ( for authentication )
            const payload = jwt.verify(token , process.env.JWT_SECRET);    // there is verify method are used to convert into decoded object and store into payload using JWT_SECRET ( for verification purpuse )
            console.log(payload);
            
            // store decoded data into "req"
            req.user = payload;    // why ?
                // ans: because after decoding our token we store our payload into req.user for autherization
                    // how autherization ?
                    // role define into payload then we fetch req.user and verify req.user.role are equal to student or admin. whatever you want 
        }
        catch(error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            });
        }
        // next() is used for for whole project what can i do next
        next();

    }
    catch(err) {
        return res.status(401).json({
            success: false,
            message: "something went wrong, while verifying the token"
        });
    }
}

// 2. student authorization
exports.isStudent = (req , res , next) => {
    try {
        // fetch the role from req.user body ( decoded object ) and then check match or not 
        if(req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students"
            });
        }
        // next() is used for for whole project what can i do next
        next();
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching"
        })
    }
}

// 3. admin authorization
exports.isAdmin = (req , res , next) => {
    try {
        // fetch the role from req.user body ( decoded object ) and then check match or not 
        if(req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admins"
            });
        }
        // next() is used for for whole project what can i do next
        next();
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching"
        })
    }
}
