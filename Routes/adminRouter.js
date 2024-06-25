const express = require("express");
const {
    registerAdmin,
    loginAdmin,
    adminLogout,
} = require("../controller/admin");
const adminAuthenticated = require("../middleware/adminAuth");
const verifyToken = require("../middleware/auth");
const adminRouter = express.Router();


adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", verifyToken, loginAdmin);
adminRouter.post("/logout", adminAuthenticated, adminLogout);

module.exports = adminRouter;
