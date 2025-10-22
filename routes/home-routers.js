

const express = require('express');
const authMiddlewear = require('../middlewares/auth-middlewear');
const router = express.Router();

// so here, a non authenticate user can access the route,
// to protect the router we have to use middleware
// router.get('/welcome', (req, res)=>{
//     res.status(201).json({
//         message:"this is home page",
//         route:"/home",
//     });
// });  //we have to use middleware as handler to protect the route

// protect the route through middleware
router.get('/welcome', authMiddlewear, (req, res) => {

    // access the decodedToken user data bu re.userInfo
    const { userName, email, id, role } = req?.userInfo;
    res.status(201).json({
        message: "welcome from home page",
        route: "/api/home/welcome",
        userInfo: {
            userId: id,
            userName: userName,
            email: email,
            role: role || "user",
        }
    });
});
// here auth-middlewear is handler

// here, auth-middlewear called when ever we request to the
// welcome route
// message : Server is running on port 3000
//           mongodb connected successfully
//           auth-middlewear called


module.exports = router

