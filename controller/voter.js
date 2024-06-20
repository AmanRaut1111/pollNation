const candidate = require("../models/candidate");
const voterModel = require("../models/voter");
const candidateModel = require("../models/candidate");

const bcrypt = require("bcrypt");
const { default: mongoose, Mongoose } = require("mongoose");

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
            res.status(200).json({
                message: "Voter Registered Sucessfully..!",
                status: true,
                statusCode: 200,
                data: data,
            });
        } else {
            res.status(400).json({
                message: "Something Went Wrong...!",
                status: false,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
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
                    res.status(200).json({
                        message: "Login Sucessfully...!",
                        status: true,
                        statusCode: 200,
                    });
                } else {
                    res.status(400).json({
                        message: "Password Does Not Match. Try Again..!",
                        status: false,
                        statusCode: 400,
                    });
                }
            } else {
                res.status(400).json({
                    message: "This Adhar No Is not found",
                    status: false,
                    statusCode: 400,
                });
            }
        } else
            res.status(400).json({
                message: "Something Went Wrong...!",
                status: false,
                statusCode: 400,
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something Went Wrong...!",
            status: false,
            statusCode: 500,
        });
    }
};
const updateVoterProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const voterData = await voterModel.findByIdAndUpdate(
            id,
            { $set: req.body, updatedAt: new Date() },
            { new: true }
        );
        if (voterData) {
            res.status(200).json({
                message: "Voter profile Updated sucessfully...!",
                status: true,
                statusCode: 200,
                data: voterData,
            });
        } else {
            res.status(400).json({
                message: "Something went wrong...!",
                status: false,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong...!",
            status: false,
            statusCode: 500,
        });
    }
};

const updateVoterPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const updatePassword = await voterModel.findByIdAndUpdate(id, {
            $set: { password: hashPassword },
        });
        if (updatePassword) {
            res.status(200).json({
                message: "Password updated sucessfully..!",
                status: true,
                statusCode: 200,
            });
        } else {
            res.status(400).json({
                message: "Something went wrong...!",
                status: false,
                statusCode: 400,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong...!",
            status: false,
            statusCode: 500,
        });
        console.log(error);
    }
};
const getVoterDetails = async (req, res) => {
    try {
        const votersData = await voterModel.aggregate([
            {
                $project: {
                    voterName: 1,
                    gender: 1,
                    age: 1,
                    state: 1,
                    constituency: 1,
                    mobileNo: 1,
                    isVoted: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);
        if (votersData) {
            res.status(200).json({
                message: "Data Found Sucessfully..!",
                status: true,
                statusCode: 200,
                data: votersData,
            });
        } else {
            res.status(400).json({
                message: "Something went wrong...!",
                status: false,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong...!",
            status: false,
            statusCode: 500,
        });
    }
};

const giveVote = async (req, res) => {
    try {
        const { id } = req.params;
        const { votes, voterId } = req.body;

        const checkIsVoted = await voterModel.findById(voterId);

        if (checkIsVoted.isVoted)
            return res
                .status(404)
                .json({ message: "You have voted", status: false, statsuCode: 404 });

        const voteObjects = votes.map((vote) => ({
            voterId: new mongoose.Types.ObjectId(vote.voterId),
            voteAt: new Date(),
        }));

        // const candidate = await candidateModel.findById(id);

        // if (candidate) {
        //     const check = candidate.votes
        //         .toString()
        //         .includes(voteObjects[0].voterId.toString());

        //     if (check) {
        //         return res.status(400).json({
        //             message: "You are already Voted...!",
        //             statusCode: 400,
        //             statsu: false,
        //         });
        //     }
        // } else {
        //     return res.status(404).json({
        //         message: "Cadidate is not found...!",
        //         status: false,
        //         statsuCode: 404,
        //     });
        // }

        const updatedCandidate = await candidateModel.findByIdAndUpdate(
            id,
            {
                $push: { votes: voteObjects },
                $inc: { totalVotes: voteObjects.length },
            },

            { new: true }
        );

        if (updatedCandidate) {
            const checkIVoted = await voterModel.findByIdAndUpdate(voterId, {
                $set: { isVoted: true },
            });

            console.log(checkIVoted);
            res
                .status(200)
                .json({
                    message: "Vote added Sucessfully...!",
                    staus: true,
                    statsuCode: 200,
                    data: updatedCandidate,
                });
        } else {
            res
                .status(400)
                .json({
                    message: "Something went wrong...! ",
                    status: false,
                    statsuCode: 400,
                });
        }
    } catch (error) {
        console.error("Error adding vote:", error);
        res.status(500).json({
            message: "Something went wrong",
            status: false,
            statusCode: 500,
        });
    }
};

module.exports = {
    registerVoter,
    loginVoter,
    updateVoterProfile,
    updateVoterPassword,
    getVoterDetails,
    giveVote,
};
