const mongoose = require("mongoose");

const candidateschema = mongoose.Schema({
    candidateName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    partyName: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    constituency: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    votes: [{

        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: ""

        },


        voteAt: {
            type: Date,
            default: new Date(),
        },
    },
    ],

    totalVotes: {
        type: String,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model("candidate", candidateschema);
