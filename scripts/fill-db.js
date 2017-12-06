const mongoose = require('mongoose');
const User = require('../models/user');
const CryptoJS = require('crypto-js');
const config = require('../config');

mongoose.Promise = global.Promise;

const createTestUsers = async () => {
    let users = [
        new User({
            firstName: 'Alice',
            lastName: 'Kingsley',
            login: 'alice.kingsley',
            email: 'alice.kingsley@example.com',
            password: CryptoJS.SHA256('test.passwd.alice').toString(),
            avatar: 'alice.jpeg',
            specialty: 'Developer',
            role: 'test',
            active: true
        }),
        new User({
            firstName: 'Bob',
            lastName: 'Dylan',
            login: 'bob.dylan',
            email: 'bob.dylan@example.com',
            password: CryptoJS.SHA256('test.passwd.bob').toString(),
            avatar: 'bob.jpeg',
            specialty: 'Musician',
            role: 'test',
            active: true
        }),
        new User({
            firstName: 'Eva',
            lastName: 'Green',
            login: 'eva.green',
            email: 'eva.green@example.com',
            password: CryptoJS.SHA256('test.passwd.eva').toString(),
            avatar: 'eva.jpeg',
            specialty: 'Screenwriter',
            role: 'test',
            active: true
        })
    ];

    for (let user of users) {
        await createUser(user);
    }
};

createTestUsers();

function createUser(user) {
    mongoose.connect(config.mongo + '/users', { useMongoClient: true });

    User.create(user, (err, doc) => {
        mongoose.disconnect();

        if (err) {
            console.error(err);
        }
        else {
            console.info('User added:' + doc);
        }
    });
}
