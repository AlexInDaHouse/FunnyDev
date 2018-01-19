const User = require('../models/user');

class UserController {

    register(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        
        if (req.body.password === req.body.password2) {
            // let user = new User({
            //     first_name: req.body.first_name || null,
            //     last_name: req.body.last_name || null,
            //     login: req.body.login,
            //     password: req.body.password,
            //     email: req.body.email,
            //     avatar: 'default.png',
            //     specialty: null,
            //     role: 'user',
            //     active: true
            // });

            // let error = validate(user);

            // if (error) {

            // }
            // else {

            // }
            res.end('Good');
        }

        console.log(req.body.password);
        res.redirect(303, '/');
    }
}

function validate(user) {
    
}

module.exports = new UserController();
