
const express = require('express');

const checkUserIsAdmin = (req, res, next) =>{
    if(req?.user?.role !== "admin"){
        res.status(403).json({
            status:"failed",
            message:"Access denied, only admin can access data",
            success:false,
        });
    }
    next();

}

module.exports = checkUserIsAdmin
