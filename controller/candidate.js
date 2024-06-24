const { mongo } = require("mongoose");
const candidateModel = require("../models/candidate");
const addCandidate = async (req, res) => {
    try {
        const { candidateName, age, state, partyName, gender, constituency } =
            req.body;
        const candidateData = await candidateModel({
            candidateName: candidateName,
            age: age,
            state: state,
            partyName: partyName,
            gender: gender,
            constituency: constituency,
        });

        const data = await candidateData.save();
        if (data) {
            res.status(200).json({
                message: "Cadidate Added Sucessfully..!",
                status: true,
                statusCode: 200,
                data: data,
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

const getAllCandidate = async (req, res) => {
    try {
        const candidateData = await candidateModel.find();
        if (candidateData) {
            res.status(200).json({
                message: "Data Found Sucessfully..!",
                status: true,
                sttausCode: 200,
                data: candidateData,
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

const deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deleteData = await candidateModel.findByIdAndDelete(id);
        if (deleteData) {
            res.status(200).json({
                message: "candidate deleted Sucessfully...!",
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

const updateCandidate = async (req, res) => {
    try {
        const { id } = req.params;

        const updateCandidate = await candidateModel.findByIdAndUpdate(
            id,
            {
                $set: req.body,
                updatedAt: new Date(),
            },
            { new: true }
        );
        if (updateCandidate) {
            res.status(200).json({
                message: "Candiadate updateed Sucessfully...!",
                status: true,
                statsuCode: 200,
                data: updateCandidate,
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
const getAllCandidateFromState = async (req, res) => {
    try {
        const { state, constituency } = req.query;
        if (!state || !constituency) {
            return res.status(400).json({
                message: " Input is Required",
                status: false,
                statsuCode: 400,
            });
        }

        const data = await candidateModel.aggregate([
            {
                $match: {
                    state: state,
                    constituency: constituency,
                },
            },
            {
                $project: {
                    candidateName: 1,
                    constituency: 1,
                    partyName: 1,
                    gender: 1,
                    state: 1,
                },
            },
        ]);
        if (data) {
            res.status(200).json({
                message: "Data found Sucessfully...!",
                status: true,
                statusCode: 200,
                data: data,
            });
        } else {
            res.status(400).json({
                message: "Something Went wrong...!",
                status: true,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something Went wrong...!",
            status: true,
            statusCode: 500,
        });
    }
};

const getCandidateWithParty = async (req, res) => {
    try {
        const { state, partyName } = req.query;

        if (!state || !partyName) {
            return res.status(400).json({
                message: " Input is Required",
                status: false,
                statsuCode: 400,
            });
        }
        const data = await candidateModel.aggregate([
            {
                $match: {
                    state: state,
                    partyName: partyName,
                },
            },
            {
                $project: {
                    candidateName: 1,
                    partyName: 1,
                    state: 1,
                    constituency: 1,
                    gender: 1,
                },
            },
        ]);
        if (data) {
            res.status(200).json({
                message: "Data found Sucessfully...!",
                status: true,
                statusCode: 200,
                data: data,
            });
        } else {
            res.status(400).json({
                message: "Something Went wrong...!",
                status: true,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something Went wrong...!",
            status: true,
            statusCode: 500,
        });
    }
};
const countVote = async (req, res) => {
    try {
        const { state, constituency } = req.query;
        const voteData = await candidateModel.aggregate([
            {
                $match: {
                    state: state,
                    constituency: constituency,
                },
            },
            {
                $project: {
                    candidateName: 1,
                    state1: 1,
                    totalVotes: 1,
                    partyName: 1,
                    constituency: 1,
                },
            },
            {
                $sort: {
                    totalVotes: -1,
                },
            },
        ]);
        if (voteData) {
            res.status(200).json({
                message: " Data found  sucessfully ...!",
                statsuCode: 200,
                status: 200,
                data: voteData,
            });
        } else {
            res.status(400).json({
                message: "Something Went wrong...!",
                status: false,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something Went wrong...!",
            status: false,
            statusCode: 500,
        });
    }
};
const winnerCandidate = async (req, res) => {
    try {
        const { state, constituency } = req.query;
        const voteData = await candidateModel.aggregate([
            {
                $match: {
                    state: state,
                    constituency: constituency,
                },
            },
            {
                $project: {
                    candidateName: 1,
                    state1: 1,
                    totalVotes: 1,
                    partyName: 1,
                    constituency: 1,
                    winner: 1,
                },
            },
            {
                $sort: {
                    totalVotes: -1,
                },
            },
            {
                $limit: 1,
            },
        ]);
        if (voteData) {
            const updatestatus = await candidateModel.findByIdAndUpdate(
                voteData[0]._id,
                { $set: { winner: true } }
            );
            res.status(200).json({
                message: " Winner Candidate Found Sucessfully ...!",
                statsuCode: 200,
                status: 200,
                data: voteData,
            });
        } else {
            res.status(400).json({
                message: "Something Went wrong...!",
                status: false,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something Went wrong...!",
            status: false,
            statusCode: 500,
        });
    }
};

const winnerFromState = async (req, res) => {
    try {
        const { state, winner, partyName, page, limit, search = "" } = req.query;
        let winnerCondition;
        if (winner.toLowerCase() === "true") {
            winnerCondition = true;
        } else if (winner.toLowerCase() === "false") {
            winnerCondition = false;
        }

        if (!state || !winner || !partyName || !limit || !page) {
            return res.status(400).json({
                message: "Please Provide input details...!",
                statsu: false,
                statsuCode: 400,
            });
        }
        const totalwinnners = await candidateModel.aggregate([
            {
                $match: {
                    state: state,
                    winner: winnerCondition,
                    partyName: partyName,
                },
            },
            {
                $project: {
                    candidateName: 1,
                    totalVotes: 1,
                    partyName: 1,
                    constituency: 1,
                    winner: 1,
                },
            },
        ]);
        const result = await candidateModel.aggregate([
            {
                $match: {
                    state: state,
                    winner: winnerCondition,
                    partyName: partyName,
                },
            },
            {
                $project: {
                    candidateName: 1,
                    totalVotes: 1,
                    partyName: 1,
                    constituency: 1,
                    winner: 1,
                },
            },
            { $match: { candidateName: { $regex: search, $options: "i" } } },

            {
                $skip: parseInt(page - 1) * 10,
            },
            {
                $limit: limit * 1,
            },
        ]);

        if (result) {
            res.status(200).json({
                message: " Data found Sucessfully...!",
                status: true,
                statsuCode: 200,
                data: result,
                totalWinner: totalwinnners.length,
            });
        } else {
            res.status(400).json({
                message: "Something Went wrong...!",
                status: false,
                statusCode: 400,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something Went wrong...!",
            status: false,
            statusCode: 500,
        });
    }
};

module.exports = {
    addCandidate,
    getAllCandidate,
    deleteCandidate,
    updateCandidate,
    getAllCandidateFromState,
    getCandidateWithParty,
    countVote,
    winnerCandidate,
    winnerFromState,
};
