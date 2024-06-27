const express = require("express");
const {
    addCandidate,
    getAllCandidate,
    deleteCandidate,
    updateCandidate,
    getAllCandidateFromState,
    getCandidateWithParty,
    countVote,
    winnerCandidate,
    winnerFromState,
    updateWinnerStatus,
} = require("../controller/candidate");
const candidateRouter = express.Router();

candidateRouter.post("/add", addCandidate);
candidateRouter.get("/getDetails", getAllCandidate);
candidateRouter.delete("/delete/:id", deleteCandidate);
candidateRouter.put("/update/:id", updateCandidate);
candidateRouter.get("/fromState", getAllCandidateFromState);
candidateRouter.get("/fromParty", getCandidateWithParty);
candidateRouter.get("/countVote", countVote);
candidateRouter.get("/winnerCandidate", winnerCandidate);
candidateRouter.get("/winnerFromstate", winnerFromState);
candidateRouter.patch("/updatestatus/:id", updateWinnerStatus);

module.exports = candidateRouter;
