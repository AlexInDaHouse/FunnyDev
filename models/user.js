const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
    firstName: {
    	type: String,
    	default: 'Nameless'
    },
    lastName: {
    	type: String,
    	default: 'Person'
    },
    login: {
    	type: String,
    	required: true,
    	minlength: 4,
    	maxlength: 20
    },
    password: {
    	type: String,
    	required: true,
    	minlength: 64,
    	maxlength: 64
    },
    email: {
    	type: String,
    	required: true,
    	maxlength: 100
    },
    avatar: String,
    specialty: {
    	type: String,
    	enum: ['Developer', 'Graphic designer', 'Quality assurance', 'Musician',
    		'Artist', '3d engineer', 'Team lead', 'Level designer', 'Screenwriter', 'Sound producer']
    },
    role: {
    	type: String,
    	required: true,
    	enum: ['admin', 'user', 'test']
    },
    active: {
    	type: Boolean,
    	required: true
    }
});

module.exports = mongoose.model('User', userScheme);