
// so this auth-middle wear called when we visited the home router, or
// reqest to the home route

const express = require('express');
const jwt = require('jsonwebtoken');

const authMiddlewear = (req, res, next) => {
    // 5-51-00 data
    const authHeader = req.headers["authorization"];
    console.log(authHeader);

    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"Unauthorized user, access denied",
            status: failed,
            success: false,
        });
    }

    // decode the token
    try{
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_KEY);
        console.log("Decoded token info : ",decodedTokenInfo);

        // res.userInfo store all the data of user
        // we can access data of user by
        // const { userName, email, password } = req.userInfo;
        req.userInfo = decodedTokenInfo;// it decoded the jwt data into obj data
        next();// now authentication done, then call the /welcome page
        console.log("auth-middlewear called");
    }
    catch(err){
        return res.status(500).json({
            message:err.message,
            status:"error",
            success:false,
        });
    }
}

module.exports = authMiddlewear

