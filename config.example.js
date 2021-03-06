// Make your own config.js using this file
const CryptoJS = require('crypto-js');

module.exports = {
    active: false,
    port: 3000,
    cookieSecret: CryptoJS.SHA256('secret').toString(),
    mongo: 'mongodb://hostname:port',
    email: {
        user: 'address@email.com',
        pass: 'password'
    }
};
