const express = require('express')
const { registerAdmin, loginAdmin } = require('../controller/admin')
const adminRouter = express.Router()

adminRouter.post('/register', registerAdmin)
adminRouter.post('/login', loginAdmin)

module.exports = adminRouter