// This file needs to be required in the server.js file

// add required controller files
var users = require("../server/controllers/users.js");

// List of all of the RESTful routes
// module.exports = function(app) {
// 	// verb: get, plural of target as the URI is the RESTful index method
// 	// customers
// 	app.get('/customers', function (req,res) {
// 		customers.index(req,res);
// 	});
// 	app.post('/customers', function (req,res) {
// 		customers.create(req,res);
// 	});
// 	// orders
// 	app.get('/orders', function (req,res) {
// 		orders.index(req,res);
// 	});
// 	app.post('/orders', function (req,res) {
// 		orders.create(req,res);
// 	});
// }

module.exports = function (app) {
	app.post('/register', function (req, res) {
		users.register(req, res);
	});
	app.post('/login', function (req, res) {
		users.login(req, res);
	})
}