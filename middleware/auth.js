const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    try {
        if (token) {
            const decode = jwt.verify(token, process.env.SETCRET_KEY);
            console.log("decode", decode);
        } else {
            return res.status(401).json({
                status: false,
                statusCode: 401,
                message: "Unauthorized! Please login",
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Unauthorized! Please login",
        });
    }
};

module.exports = verifyToken;
