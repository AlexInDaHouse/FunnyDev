// const nodemailer = require('nodemailer');

module.exports = function(email, subject, message) {
	const mailTransport = require('nodemailer').createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: 'user',
			pass: 'pass'
		}
	});

	mailTransport.sendMail({
		from: 'Rendering 6',
		to: email,
		subject: subject,
		text: message
	}, function(err) {
		if (err) {
			console.log(`Sending message: failed!\n${err}`);
		} else {
			console.log('Sending message: success!');
		}
	});
}
