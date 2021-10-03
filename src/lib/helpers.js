const helpers = {};
const bcrypt = require('bcryptjs');

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // generar un patron
    const hash = await bcrypt.hash(password, salt); // generar hash
    return hash;
};

helpers.comparePassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
};

module.exports = helpers;