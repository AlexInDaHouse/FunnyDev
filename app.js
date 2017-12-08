const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const config = require('./config');

const User = require('./models/user');

const app = express();
app.set('port', process.env.PORT || 3000)

mongoose.Promise = global.Promise;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/src'));

// Routes
app.get('/', function(req, res) {
    mongoose.connect(config.mongo + '/users', { useMongoClient: true });

    User.find({}, (err, docs) => {
        mongoose.disconnect();

        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            res.render('home', {
                title: 'FunnyDev: Home',
                users: docs
            })
        }

    });
});

app.get('/sign-in', function (req, res) {
    res.render('sign-in', { title: 'Sign in' });
});

app.get('/sign-up', function (req, res) {
    res.render('sign-up', { title: 'Sign up' });
});

// app.get('/error-test', function(req, res) {
// 	//
// });

app.use(function(req, res, next) {
	res.type('text/html');
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	console.log('Error: ' + err.name);
	console.log(err.stack);
	res.type('text/html');
	res.status(500);
	res.render('505');
});

app.listen(app.get('port'), function() {
	console.info(`Listening on port ${app.get('port')}...`);
});
