const { mongo } = require("mongoose")
const candidateModel = require("../models/candidate")
const addCandidate = async (req, res) => {
    try {
        const { candidateName, age, state, partyName, gender, constituency } = req.body
        const candidateData = await candidateModel({
            candidateName: candidateName,
            age: age,
            state: state,
            partyName: partyName,
            gender: gender,
            constituency: constituency
        })

        const data = await candidateData.save()
        if (data) {
            res.status(200).json({ message: "Cadidate Added Sucessfully..!", status: true, statusCode: 200, data: data })
        } else {
            res.status(400).json({ message: "Something went wrong...!", status: false, statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong...!", status: false, statusCode: 500 });
    }
}


const getAllCandidate = async (req, res) => {
    try {
        const candidateData = await candidateModel.find()
        if (candidateData) {
            res.status(200).json({ message: "Data Found Sucessfully..!", status: true, sttausCode: 200, data: candidateData })
        } else {
            res.status(400).json({ message: "Something went wrong...!", status: false, statusCode: 400 });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong...!", status: false, statusCode: 500 });
    }
}

const deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deleteData = await candidateModel.findByIdAndDelete(id)
        if (deleteData) {
            res.status(200).json({ message: 'candidate deleted Sucessfully...!', status: true, statusCode: 200 })
        } else {
            res.status(400).json({ message: "Something went wrong...!", status: false, statusCode: 400 });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong...!", status: false, statusCode: 500 });
        console.log(error);
    }

}


const updateCandidate = async (req, res) => {
    try {
        const { id } = req.params

        const updateCandidate = await candidateModel.findByIdAndUpdate(id, {
            $set: req.body,
            updatedAt: new Date(),

        }, { new: true })
        if (updateCandidate) {
            res.status(200).json({ message: "Candiadate updateed Sucessfully...!", status: true, statsuCode: 200, data: updateCandidate })
        } else {
            res.status(400).json({ message: "Something went wrong...!", status: false, statusCode: 400 });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong...!", status: false, statusCode: 500 });

    }
}
module.exports = { addCandidate, getAllCandidate, deleteCandidate, updateCandidate }