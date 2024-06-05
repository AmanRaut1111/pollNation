const express = require("express");
const { registerVoter, loginVoter } = require("../controller/voter");

const voterRouter = express.Router();

voterRouter.post("/registerCandidate", registerVoter);
voterRouter.post("/login", loginVoter);

module.exports = voterRouter;
