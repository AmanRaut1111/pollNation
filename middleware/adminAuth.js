const adminAuthenticated = (req, res, next) => {
    try {
        if (req.session.adminId) {
            return next()
        } else {
            res.status(401).json({ message: "Unauthorized...! No Admin is LogedIn", status: false, statsCode: 401 })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong...!', status: false, statusCode: 500 })
    }
}

module.exports = adminAuthenticated