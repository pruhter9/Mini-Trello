// required modules
var mongoose = require('mongoose'),
	bcrypt 	 = require('bcrypt-nodejs'),
	User 	 = mongoose.model('User');

module.exports = (function() {
	return {
		register: function(req,res) {
			var temp = '';
			console.log(req.body);
			console.log("password: " + req.body.user.password);
			bcrypt.hash(req.body.user.password, null, null, function(err, hash) {
				if(err) {
					console.log("Unable to hash");
				} else {
					console.log("hashed password: " + hash);
					User.create({
						firstName	: req.body.user.fName,
						lastName	: req.body.user.lName,
						username	: req.body.user.uName,
						password	: hash
					}, function (err, data) {
						if (err) {
							console.log("Failed to create new user");
						} else {
							console.log("Created new User");
							res.json(data);
						}
					});
					// bcrypt.compare(req.body.user.password, hash, function(err, res) {
					// 	if (err) {
					// 		console.log("Unable to unencrypt");
					// 	} else {
					// 		if (res) {
					// 			console.log("match result: true");
					// 		} else {
					// 			console.log("match result: false");
					// 		}
					// 	}
					// })
				}
			});
		},
		login: function(req,res) {
			console.log(req.body);
			User.find({ username: req.body.user.uName }, function (err,result) {
				if(err) {
					console.log(err);
				} else {
					console.log(result);
					console.log('Found user: ' + result[0].firstName);
					bcrypt.compare(req.body.user.password, result[0].password, function(err, match) {
						if (err) {
							console.log("Unable to unencrypt");
						} else {
							if (match) {
								console.log("match result: true");
								res.json(result);
							} else {
								console.log("match result: false");
								res.json();
							}
						}
					});
				}
			});
		}
	};
})();

// bcrypt information that needs to be integrated into user auth functions above
//bcrypt.hash("bacon", null, null, function(err, hash) {
	// Store hash in your password DB.
//});

// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
//});