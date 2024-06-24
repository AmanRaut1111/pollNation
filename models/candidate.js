const mongoose = require("mongoose");

const candidateschema = mongoose.Schema({
    candidateName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: [18, 'Age must be at least 18'] // Replace 18 with your minimum age value
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

        voterId: {
            type: mongoose.Schema.Types.ObjectId,


            required: true,
        },
        voteAt: {
            type: Date,
            default: Date.now(),
        },
    }],
    winner: {
        type: Boolean,
        default: "false"
    },

    totalVotes: {
        type: Number,
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
