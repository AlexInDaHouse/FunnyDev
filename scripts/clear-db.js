const mongoose = require('mongoose');
const User = require('../models/user');
const config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(`${config.mongo}/users`, { useMongoClient: true });

User.remove({}, (err, result) => {
    mongoose.disconnect();

    if(err) return console.error(`${err}`);
    console.info(`${result}`);
});