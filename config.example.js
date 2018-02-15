// Make your own config.js using this file
const CryptoJS = require('crypto-js');

module.exports = {
	cookieSecret: CryptoJS.SHA256('secret').toString(),
    mongo: 'mongodb://hostname:port'
};
