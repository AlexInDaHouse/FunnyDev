const mongoose = require('mongoose');
const config = require('../config');
const CryptoJS = require('crypto-js');
const User = require('../models/user');

class UserController {

    register(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        let user;
        let response = '';
        let success;
        
        if (req.body.password === req.body.password2) {
            user = new User({
                firstName: req.body.first_name || null,
                lastName: req.body.last_name || null,
                login: req.body.login,
                password: CryptoJS.SHA256(req.body.password),
                email: req.body.email,
                avatar: 'default.png',
                specialty: 'Another specialist',
                role: 'user',
                active: true
            });

            let errors = this.validate(user);

            if (errors.length === 0) {
            	success = addUserToDB(user);
            	response = JSON.stringify(user);
            }
            else {
            	for (let error of errors) {
            		response += error + '\n';
            	}
            }
        }
        else {
        	response = 'Passwords don\'t match';
        }

        if (success) {
        	req.session.authUser = user.login;
        	res.cookie('authUser', user.login, {
        		httpOnly: true,
        		maxAge: 2 * 30 * 24 * 60 * 60 * 1000,
        		signed: true
        	});
        	
			res.redirect(303, '/');
        }

        //test
        if (req.session.authUser)
        	console.log(`Session: ${req.session.authUser}`);
        if (req.signedCookies.authUser)
        	console.log(`Cookie: ${req.signedCookies.authUser}`);
        //end test

        console.log(response);
        res.end(response);
    }

    logout(req, res) {
    	delete req.session.authUser;
    	res.clearCookie('authUser');
    	res.redirect(303, '/');
    }

    // Returns array of errors
    validate(user) {
    	let errors = [];
    	const errorMessages = {
    		'login': 'Login incorrect!',
    		'password': 'Password incorrect!',
    		'email': 'Email incorrect!'
    	};

    	if (user.login.search(/^[A-Za-z0-9_-]{3,30}$/) !== 0) {
    		errors.push(errorMessages['login']);
    	}

    	if (user.password.search(/^[A-Za-z0-9_-]{4,}$/) !== 0) {
    		errors.push(errorMessages['password']);
    	}

    	if (user.email.search(/^[a-z0-9-]+@[a-z0-9]+.[a-z]{2,10}$/i) !== 0) {
    		errors.push(errorMessages['email']);
    	}

    	return errors;
    }
}

async function addUserToDB(user) {
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

module.exports = new UserController();
