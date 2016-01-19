app.controller ('UsersController', function ($scope, UserFactory, $location, $cookieStore) {
	var my = this;

	my.sessionInfo = {};

	var setSession = function () {
		console.log('here');
		my.sessionInfo = {
			loggedIn: true,
			userId: $cookieStore.get('userId'),
			name: $cookieStore.get('name')
		};
	}

	if ($cookieStore.get('loggedIn')) {
		setSession();
		$location.path('/dashboard');
	}

	console.log("User Controller loaded");

	my.register = function () {
		console.log("registering...");
		UserFactory.register(my.newUser, function(data) {
			console.log(data);
		})
	}

	my.login = function () {
		console.log("logging in...");
		UserFactory.login(my.User, function(data) {
			console.log("data returned: " + data);
			$cookieStore.put('loggedIn', true);
			$cookieStore.put('userId', data[0]._id);
			$cookieStore.put('name', data[0].firstName + " " + data[0].lastName);
			setSession();
			$location.path('/dashboard');
		})
	}

	my.logout = function () {
		$cookieStore.remove('loggedIn');
		$location.path('/');
	}


});

// Directives
app.directive('pwMatch', [function () {
    return {
        scope: true,
        require: 'ngModel',
        link: function (scope, elem , attrs, control) {
            var checker = function () {
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);
                //get the value of the other password
                var e2 = scope.$eval(attrs.pwMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity("match", n);
            });
        }
    };
}]);
