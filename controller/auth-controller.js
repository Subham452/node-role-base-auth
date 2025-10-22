
const express = require('express');
const jwt = require('jsonwebtoken');
const { users } = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const registerUser = async (req, res) => {
    try {
        const { userName, email, password, role } = req?.body;
        // check userName or email already exist or not.
        const findUserIfExist = await users.findOne(
            {
                $or: [{ userName: userName }, { email: email }]
            }
        );

        if (findUserIfExist) {
            res.status(401).json({
                status: "",
                message: "this user or emal id already exits, try another user name or mail id",
                success: false,
            });
        }

        const saltRounds = 10; // Define saltRounds inside the async function or globally
        const hashPassword = await bcrypt.hash(password, saltRounds);
        // Store hash in your password DB.

        const userInfo = users.create({
            userName,
            email,
            password: hashPassword,
            role: role || "user",
        });

        if(userInfo){
            console.log("succesfully user registered");
            res.status(200).json({
                status:"success",
                message:"Succefully user registered",
                success:true,
                data:{
                    userName:userName,
                    email:email,
                    password:{
                        realOne:password,
                        hashOne:hashPassword,
                    },
                    role:role,
                },
            });
        }
        else{
            console.log("Internal server error");
            res.status(500).json({
                status:"error",
                message:"Internal server error",
                success:false,
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            status: "error",
            message: "Something went wrong! try again later",
            success: false,
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req?.body;

        // now fetch the userinfo based on username
        const user = await users.findOne({
            $or : [{userName: userName}, {password: password}]
        });

        // now with the help of user we can access any 
        // instace(data of object) of that perticular object

        // now metch the user input username is equal to database
        // user name and password or not

        const isPasswordMatch = await bcrypt.compare(password, user?.password)

        if(!isPasswordMatch){
            res.status(401).json({
                status:"failed",
                message:"Invalid credential, password or id not match",
                success:false,
            });
        }

        const accessToken = jwt.sign(
            {
                id:user?._id,
                userName:user?.userName,
                email:user?.email,
                password:user?.password,
                role:user?.role,
            },process.env.JWT_KEY,{
                expiresIn:"15m",
            },
        );
        // message:"Successfully created the temporary toke, valit for 15 minutes",

        res.status(200).json({
            status:"success",
            message:"Successfully login",
            success:true,
            data:accessToken,
        });


    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Something went wrong! try again later",
        });
    }
}

module.exports = { registerUser, loginUser }

