const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const config = require('./config');
const authController = require('./controllers/auth-controller');

const User = require('./models/user');
const mailer = require('./modules/mailer');

const app = express();
app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');

mongoose.Promise = global.Promise;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.static(__dirname + '/src'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.cookieSecret));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.cookieSecret
}));

// Routes
app.get('/', function(req, res) {
    //test
    if (req.session.authUser)
        console.log(`Session: ${req.session.authUser}`);
    if (req.signedCookies.authUser)
        console.log(`Cookie: ${req.signedCookies.authUser}`);
    //end test
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

app.get('/logout', function (req, res) {
    authController.logout(req, res);
});

// test
app.get('/send-mail', function (req, res) {
    mailer('address@email.com', 'hola mundo', 'test message :)');
    res.end('sending...');
});
// end test

app.post('/sign-up', function (req, res) {
    authController.register(req, res);
});

// app.get('/error-test', function(req, res) {
// 	//
// });

app.use(function(err, req, res, next) {
    console.log('Error: ' + err.name);
    console.log(err.stack);
    res.type('text/html');
    res.status(500);
    res.render('500');
});

app.use(function(req, res, next) {
	res.type('text/html');
	res.status(404);
	res.render('404');
});

app.listen(app.get('port'), function() {
	console.info(`Listening on port ${app.get('port')}...`);
});
