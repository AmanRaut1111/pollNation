const express = require("express");
const { registerVoter, loginVoter, updateVoterProfile, updateVoterPassword, getVoterDetails, giveVote } = require("../controller/voter");

const voterRouter = express.Router();

voterRouter.post("/registerVoter", registerVoter);
voterRouter.post("/login", loginVoter);
voterRouter.put('/update/:id', updateVoterProfile)
voterRouter.patch('/updatePassword/:id', updateVoterPassword)
voterRouter.get('/getVoterDetails', getVoterDetails)
voterRouter.post('/giveVote/:id', giveVote)

module.exports = voterRouter;
