const jwt = require("jsonwebtoken");
require("dotenv").config();
const voterSchema = require('../models/voter')
const adminSchema = require('../models/admin')

const verifyToken = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decode = await jwt.verify(token, process.env.SETCRET_KEY);

            const voter = await voterSchema.findOne({
                _id: decode._id
            }).catch((error) => {
                console.log('error :', error);
                return false;
            });

            const admin = await adminSchema.findOne({
                _id: decode._id
            }).catch((error) => {
                console.log('error :', error);
                return false;
            });

            if (voter) {
                req['AuthenticateUser'] = voter;
                next();
            } else if (admin) {
                req['AuthenticateUser'] = admin;
                next();
            }
            else
                return res.status(401).json({ status: false, statusCode: 401, message: "Unauthorized! Please login" });
        } catch (error) {
            console.log('error :', error);
            return res.status(401).json({
                status: false,
                msg: "Unauthorized! Please login",
            });
        }
    }
    else {
        return res.status(401).json({
            status: false,
            msg: "Unauthorized! Please login",
        });
    }
};

module.exports = verifyToken;
