
const express = require('express')
const { addCandidate, getAllCandidate, deleteCandidate, updateCandidate } = require('../controller/candidate')
const candidateRouter = express.Router()

candidateRouter.post("/add", addCandidate)
candidateRouter.get('/getDetails', getAllCandidate)
candidateRouter.delete('/delete/:id', deleteCandidate)
candidateRouter.put('/update/:id', updateCandidate)

module.exports = candidateRouter