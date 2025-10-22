
const mongoose = require('mongoose');

const connectMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected successfully");
    }
    catch(err){
        console.error("Error : ", err);
        process.exit(1);
    }
}

module.exports = connectMongoDB
