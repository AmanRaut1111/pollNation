const express = require("express");
const {
    registerAdmin,
    loginAdmin,
    adminLogout,
} = require("../controller/admin");
const adminRouter = express.Router();
const adminAuthenticated = require("../middleware/adminAuth");
adminRouter.post("/logout", adminAuthenticated, adminLogout);

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);

module.exports = adminRouter;
