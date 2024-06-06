const bcrypt = require("bcrypt");

const hash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, val) => {
            resolve(val);
        });
    });
};

const compare = (password1, password2) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password1, password2, (error, value) => {
            if (error) return reject(error);
            resolve(value);
        });
    });
};

module.exports = {
    hash,
    compare,
};
