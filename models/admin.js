const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "admin",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model("admin", adminSchema);
