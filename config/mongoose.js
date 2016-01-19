// This is a config file that connects to MongoDB and loads all of our models for us.
// Require Mongoose
var mongoose = require('mongoose');

// Require file-system so that we can load, read, require all of the model files
var fs 	 = require('fs'),
	path = require('path');

// Connect to the database
mongoose.connect('mongodb://localhost/CustomersApp');

// Specify the path to all of the models
var models_path = path.join(__dirname, '/../server/models');

// Read all of the files in the models_path and for each one check if it is a javascript file before requiring it
// This is just a simpler way than having to list out each individual model file
fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('.js') > 0) {
		require(models_path + '/' + file);
	}
});