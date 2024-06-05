const mongoose = require('mongoose')
require("dotenv").config();

mongoose.connect(process.env.dbUrl).then(() => {
    console.log("connected");
}).catch((error) => {
    console.log(error);
})