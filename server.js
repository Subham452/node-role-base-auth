
// require("dotenv").config();

// const express = require('express');

// const app = express();

// app.get("/", (req, res)=>{
//     app.send("this is home page");
// });

// const PORT = process.env.PORT || 3000

// app.listen(PORT, ()=>{
//     console.log(`Server is running on ${PORT}`);
// });



require("dotenv").config();
const connectMongoDB = require('./db/db')
const express = require('express');
const authRouter = require('./routes/auth-routes');
const homeRouter = require('./routes/home-routers');
const adminRouter = require('./routes/auth-routes');
const app = express();

// middlewares
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);
app.use("api/admin", adminRouter);

// call mongodb
connectMongoDB();

app.get("/", (req, res)=>{
    res.send("this is home page");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
