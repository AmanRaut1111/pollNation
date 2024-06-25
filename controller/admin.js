const adminModel = require("../models/admin");
const passwordhelper = require("../helpers/password");

const registerAdmin = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const adminData = await adminModel({
            userName: userName,
            password: await passwordhelper.hash(password),
        });

        const data = await adminData.save();

        if (data) {
            res.status(200).json({
                message: "Admin Registerd Sucessfully...!",
                status: true,
                statusCode: 200,
            });
        } else {
            res.status(400).json({
                message: "Something Went Wrong..!",
                status: true,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something Went Wrong..!",
            status: true,
            statusCode: 500,
        });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if ((userName, password)) {
            const check = await adminModel.findOne({ userName });
            if (check) {
                const checkPassword = await passwordhelper.compare(
                    password,
                    check.password
                );

                req.session.adminId = check._id;

                if (checkPassword) {
                    res.status(200).json({
                        message: "Login Sucessfully...!",
                        status: true,
                        statusCode: 200,
                    });
                } else {
                    res.statsu(400).json({
                        message: "Password Does Not Match ..Please Try Agin",
                        status: false,
                        statusCode: 400,
                    });
                }
            } else {
                res.status(400).json({
                    message: "Admin Not Found....!",
                    status: false,
                    statusCode: 400,
                });
            }
        } else {
            res.status(400).json({
                message: "Something Went Wrong..!",
                status: true,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something Went Wrong..!",
            status: true,
            statusCode: 500,
        });
    }
};

const adminLogout = (req, res) => {
    try {
        console.log("Cookies:", req.cookies); // Log cookies
        if (req.session.adminId) {
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({
                        message: "LogOut failed...!",
                        status: false,
                        stastsuCode: 500,
                    });
                }
            });

            res.clearCookie("connect.sid"); // Clear the session cookie
            res
                .status(200)
                .json({
                    message: "Logout sucessfully..!",
                    status: true,
                    statusCode: 200,
                });
        } else {
            res.status(400).json({
                message: "No Admin is Logged In.",
                status: false,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.error("Unexpected error during logout:", error);
        res.status(500).json({
            message: "Something Went Wrong During Logout.",
            status: false,
            statusCode: 500,
        });
    }
};

module.exports = { registerAdmin, loginAdmin, adminLogout };
