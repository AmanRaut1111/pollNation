const express = require("express");
const db = require('./config/db');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const voterRouter = require("./Routes/voterRouter");
const adminRouter = require("./Routes/adminRouter");
const candidateRouter = require("./Routes/candidateRouter");
require("dotenv").config();


const app = express();
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 4000 } // Use true in production with HTTPS
}))
app.use(cookieParser()); // Add this line


app.use('/', voterRouter)
app.use('/admin', adminRouter)
app.use('/candidate', candidateRouter)

app.listen(process.env.PORT, () => {
    console.log("server is Running  on PORT 3000");
});
