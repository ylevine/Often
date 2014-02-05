angular.module('oftenControllers')
	.controller('userRegistrationCtrl', function ($scope, $http, $location, $rootScope) {
		$scope.register = function (user) {
			var isValid = true;
			removeInputFeedback($('#username'));
			removeInputFeedback($('#password'));
			removeInputFeedback($('#confirm'));
			removeInputFeedback($('#email'));

			if ($('#username').val() < 5) {
				styleFailedInput($('#username'));
				isValid = false;
			}

			if ($('#email').val() < 5) {
				styleFailedInput($('#email'));
				isValid = false;
			}

			if ($('#password').val() != $('#confirm').val()) {
				styleFailedInput($('#password'));
				styleFailedInput($('#confirm'));
				isValid = false;
			} else {
				if ($('#password').val() < 5) {
					styleFailedInput($('#password'));
					isValid = false;
				}

				if ($('#confirm').val() < 5) {
					styleFailedInput($('#confirm'));
					isValid = false;
				}
			}

			if (!isValid) return false;

			$http.post('/user/register', user).success(function (data) {
				if (data.isSuccessful) {
					$rootScope.logged = true;
					$rootScope.currentUser = user.username;
					$location.path($rootScope.redirectTo == undefined ? '/' + user.username : $rootScope.redirectTo);
				}
			});
		}
	});