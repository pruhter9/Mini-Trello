app.factory('UserFactory', function ($http) {
	var factory = {};

	factory.register = function (newUser, callback) {
		$http.post('/register', {user: newUser}).success(function (output) {
			console.log(output);
			callback(output);
		});
	};

	factory.login = function (userdata, callback) {
		$http.post('/login', {user: userdata}).success(function (output) {
			console.log(output);
			callback(output);
		})
	}

	return factory;
})