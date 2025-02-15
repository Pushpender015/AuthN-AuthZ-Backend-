const bcrypt = require("bcrypt");
const userAuth = require("../models/userAuth");
const jwt = require("jsonwebtoken")

// config. load on process object
require("dotenv").config();

// signup route handler
exports.signup = async (req , res) => {
    try {
        // get data
        const {name, email, password, role} = req.body;
        // check if user already exist
        const existingUser = await userAuth.findOne({email});   // email ki koi entry phele se pdi hai ya nahi padi hai
   
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
            // user exist krta hai kuch nhi krna jsut error msg show kr do bs
        }

        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password , 10);  // hash "password" in "10" round
        }
        catch(err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password',
            });
        }

        // if email id are valid and password are valid then,
        
        // create entry for user
        const user = await userAuth.create({
            name , email , password:hashedPassword , role
        })

        return res.status(200).json({
            success:true,
            message: 'User Created Successfully',
        });

    }
    catch(err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message: 'User cannot be registered, please try again later',
        })
    }
}


// login ( validation )
exports.login = async (req , res) => {
    try {
        // data fetch
        const {email , password} = req.body;
        // validation on email and password
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all credentials!"
            });
        }
        
        // check for registered user
        let user = await userAuth.findOne({email});
        // if not a registered user 
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered"
            });
        }

        // payload make ( for jwt )
        const payload = {
            email: user.email,
            id: user._id,
            role : user.role
        }

        // verify password & "generate a JWT token"
        const isPasswordMatch = await bcrypt.compare(password , user.password);

        if(isPasswordMatch) {
            // if password match
            let token = jwt.sign(
                            payload , 
                            process.env.JWT_SECRET , 
                            {
                                expiresIn: "2h",
                            }
                        );
            
            // token convert into object
            user = user.toObject();

            // also create a section of token in database
            user.token = token;

            // but password remove jsut form object, not from data base
            user.password = undefined;

            // cookie create 
            const options = {
                // expire time
                expires: new Date(Date.now() + 20000),
                httpOnly: true, // dont manipulate on clint side
            }
            res.cookie("token" , token , options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully"
            })

        }
        else {
            // password do not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect"
            })
        }
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message: 'User cannot be login, please try again later',
        })
    }
}