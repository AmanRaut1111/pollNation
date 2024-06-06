const adminModel = require('../models/admin')

const registerAdmin = async (req, res) => {
    const { userName, password } = req.body
    try {
        const adminData = adminModel({
            userName: userName,
            password: password
        })

        const data = await adminData.save()

        if (data) {
            res.status(200).json({ message: "Admin Registerd Sucessfully...!", status: true, statusCode: 200 })
        } else {
            res.status(400).json({ message: "Something Went Wrong..!", status: true, statusCode: 400 })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong..!", status: true, statusCode: 500 })
    }
}

module.exports = registerAdmin