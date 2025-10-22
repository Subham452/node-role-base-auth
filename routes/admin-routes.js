
const express = require('express');
const authMiddleWear = require('../middlewares/auth-middlewear');
const adminMiddlewear = require('../middlewares/admin-middlewear');
const router = express.Router();

router.get('/welcome',authMiddleWear, adminMiddlewear, (req, res)=>{
    res.status(200).json({
        message:"this is welcome page for admin",
        route:"/admin/welcome",
    });
});

module.exports = router;
