const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const config = require('./config');

const User = require('./models/user');

const app = express();
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

app.listen(3000);
console.info('Listening on port 3000...');
