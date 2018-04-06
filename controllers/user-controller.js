const mongoose = require('mongoose');
const config = require('../config');
const User = require('../models/user');

async function add(user) {
    let success = false;

    mongoose.connect(config.mongo + '/users', { useMongoClient: true });
    await User.create(user, (err, doc) => {
        mongoose.disconnect();

        if (err) {
            console.error(err);
        }
        else {
            success = true;
            console.info('User added:' + doc);
        }
    });

    return success;
}

module.exports = {
    add: add
};
