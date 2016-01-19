// Creates the model schema for the applications users
var mongoose = require('mongoose'),
	ObjectId = mongoose.Schema.ObjectId,
	Users = require("./user.js");

// Create the base schema for users
var ProjectSchema = new mongoose.Schema({
	id  		: ObjectId,
	title		: { type: String, required: true },
	created 	: { type: Date, default: new Date() },
	buckets		: String,
	users 		: [ Users ]
});

// Now create the model which will create the plural collection in mongoDB
mongoose.model('Project', ProjectSchema);