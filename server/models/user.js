// Creates the model schema for the applications users
var mongoose = require('mongoose'),
	ObjectId = mongoose.Schema.ObjectId,
	Projects = require("./project.js");

// Create the base schema for users
var UserSchema = new mongoose.Schema({
	id  		: ObjectId,
	firstName	: { type: String, required: true },
	lastName	: { type: String, required: true },
	username	: { type: String, required: true },
	password	: { type: String, required: true },
	created 	: { type: Date, default: new Date() },
	projects 	: [ Projects ]
});

// Now create the model which will create the plural collection in mongoDB
mongoose.model('User', UserSchema);