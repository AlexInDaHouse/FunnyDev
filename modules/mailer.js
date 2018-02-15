const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = function(email, subject, message) {
	const mailTransport = nodemailer.createTransport({
		service: 'gmail',
        secure: false,
		port: 25,
		auth: {
			user: config.email.user,
			pass: config.email.pass
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	mailTransport.sendMail({
		from: 'Rendering 6',
		to: email,
		subject: subject,
		text: message
	}, function(err, info) {
		if (err) {
			console.log(`Sending message: failed!\n${err}`);
		} else {
			console.log(`Sending message: success!\n${info}`);
		}
	});
};
