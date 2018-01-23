const User = require('../models/user');

class UserController {

    register(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        
        if (req.body.password === req.body.password2) {
            let user = new User({
                first_name: req.body.first_name || null,
                last_name: req.body.last_name || null,
                login: req.body.login,
                password: req.body.password,
                email: req.body.email,
                avatar: 'default.png',
                specialty: null,
                role: 'user',
                active: true
            });

            let errors = this.validate(user);

            if (errors) {
            	let message = '';

            	for (let error of errors) {
            		message += error + '\n';
            	}
            	res.end(message);
            }
            else {
            	res.end('OK');
            }
        }
        else {
        	res.end('Passwords don\'t match');
        }

        // res.redirect(303, '/');
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

module.exports = new UserController();
