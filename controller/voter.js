const voterModel = require("../models/voter");

const bcrypt = require("bcrypt");
const registerVoter = async (req, res) => {
    try {
        const {
            voterName,
            gender,
            age,
            state,
            address,
            constituency,
            adharNumber,
            password,
            mobileNo,
        } = req.body;
        const haspassword = await bcrypt.hash(password, 10);
        const candiateData = voterModel({
            voterName: voterName,
            gender: gender,
            age: age,
            state: state,
            address: address,
            constituency: constituency,
            adharNumber: adharNumber,
            password: haspassword,
            mobileNo: mobileNo,
        });

        const data = await candiateData.save();
        if (data) {
            res
                .status(200)
                .json({
                    message: "Voter Registered Sucessfully..!",
                    status: true,
                    statusCode: 200,
                    data: data,
                });
        } else {
            res
                .status(400)
                .json({
                    message: "Something Went Wrong...!",
                    status: false,
                    statusCode: 400,
                });
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
                message: "Something Went Wrong...!",
                status: false,
                statusCode: 500,
            });
    }
};

const loginVoter = async (req, res) => {
    try {
        const { adharNumber, password } = req.body;
        if ((adharNumber, password)) {
            const checkAdhar = await voterModel.findOne({ adharNumber });
            if (checkAdhar) {
                const matchPassword = await bcrypt.compare(
                    password,
                    checkAdhar.password
                );
                if (matchPassword) {
                    res
                        .status(200)
                        .json({
                            message: "Login Sucessfully...!",
                            status: true,
                            statusCode: 200,
                        });
                } else {
                    res
                        .status(400)
                        .json({
                            message: "Password does Not match..!",
                            status: false,
                            statusCode: 400,
                        });
                }
            } else {
                res
                    .status(400)
                    .json({
                        message: "This Adhar No Is not found",
                        status: false,
                        statusCode: 400,
                    });
            }
        } else
            res
                .status(400)
                .json({
                    message: "Something Went Wrong...!",
                    status: false,
                    statusCode: 400,
                });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
                message: "Something Went Wrong...!",
                status: false,
                statusCode: 500,
            });
    }
};

module.exports = { registerVoter, loginVoter };
