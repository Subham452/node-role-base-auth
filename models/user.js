
// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     userName:{
//         type: String,
//         trim: true,
//         required: true,
//         unique: true,
//     },
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//     },
//     role:{
//         type: String,
//         enum: ["user", "admin"],
//         default: 'user,'
//     }
// },{
//     timestamps: true,
// });

// const Users = mongoose.model("Users", userSchema);

// // exports.module = mongoose.model("User", userSchema);
// module.exports = {Users}



const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, {timestemps: true});

const users = mongoose.model("users", userSchema);

module.exports = { users };

