const mongoose = require("mongoose");

const voterSchema = mongoose.Schema({
    voterName: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },
    address: {
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
    adharNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "Voter"
    }, isVoted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
});

module.exports = mongoose.model("voter", voterSchema);
