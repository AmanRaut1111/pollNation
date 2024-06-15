
const express = require('express')
const { addCandidate, getAllCandidate } = require('../controller/candidate')
const candidateRouter = express.Router()

candidateRouter.post("/add", addCandidate)
candidateRouter.get('/getDetails', getAllCandidate)

module.exports = candidateRouter