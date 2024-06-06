const express = require("express");
const { registerVoter, loginVoter, updateVoterProfile, updatePassword, updateVoterPassword } = require("../controller/voter");

const voterRouter = express.Router();

voterRouter.post("/registerCandidate", registerVoter);
voterRouter.post("/login", loginVoter);
voterRouter.put('/update/:id', updateVoterProfile)
voterRouter.patch('/updatePassword/:id', updateVoterPassword)

module.exports = voterRouter;
