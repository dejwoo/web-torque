var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({
	username: {
		type:String,
		required: [true, 'Username needed!']
	},
	password: {
		type:String,
		required: [true, 'Password needed!']
	},
	email: {
		type:String,
		required: [true, 'Why you no provide no email!']
	},
	firstName: {
		type:String
	},
	lastName: {
		type:String
	},
	createdOn: {
		type:Date,
		default: Date.now()
	}
}));
//TODO Create midleware validators for User