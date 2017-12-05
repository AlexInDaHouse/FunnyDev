const mongoose = require('mongoose');
const User = require('../models/user');
const config = require('../config');

mongoose.Promise = global.Promise;

const createTestUsers = async () => {
    let users = [
        new User({
            firstName: 'Alice',
            lastName: 'Kingsley',
            login: 'alice.kingsley@example.com',
            password: 'test.passwd.alice',
            avatar: 'alice.jpeg',
            specialty: ['Traveler to Wonderland', 'Developer', 'Designer'],
            role: 'test',
            active: true
        }),
        new User({
            firstName: 'Bob',
            lastName: 'Dylan',
            login: 'bob.dylan@example.com',
            password: 'test.passwd.bob',
            avatar: 'bob.jpeg',
            specialty: ['Musician'],
            role: 'test',
            active: true
        }),
        new User({
            firstName: 'Eva',
            lastName: 'Green',
            login: 'eva.green@example.com',
            password: 'test.passwd.eva',
            avatar: 'eva.jpeg',
            specialty: ['Actress'],
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
