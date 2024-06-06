const express = require('express')
const registerAdmin = require('../controller/admin')
const adminRouter = express.Router()

adminRouter.post('register', registerAdmin)

module.exports = adminRouter