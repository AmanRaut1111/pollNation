const express = require("express");
const db = require('./config/db');
const voterRouter = require("./Routes/voterRouter");
const adminRouter = require("./Routes/adminRouter");
require("dotenv").config();


const app = express();
app.use(express.json())


app.use('/', voterRouter)
app.use('admin', adminRouter)

app.listen(process.env.PORT, () => {
    console.log("server is Running  on PORT 3000");
});
