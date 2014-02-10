angular.module('oftenControllers')
	.controller('userLoginCtrl', ['$scope', 'cfpLoadingBar', '$location', '$rootScope', 'userLoginSvc',
		function ($scope, cfpLoadingBar, $location, $rootScope, userLoginSvc) {
			$scope.loading = true;

			$scope.user = {};

			$scope.update = function (user) {
				var isValid = true;
				var $username = $('#username');
				var $password = $('#password');
				removeInputFeedback($username);
				removeInputFeedback($password);

				if ($username.val().length < 5) {
					styleFailedInput($username);
					isValid = false;
				}

				if ($password.val().length < 5) {
					styleFailedInput($password);
					isValid = false;
				}

				if (!isValid) {
					return false;
				}

				$scope.user = angular.copy(user);
				userLoginSvc.login(user, function (data) {
					if (data.isSuccessful) {
						styleSuccessInput($username);
						styleSuccessInput($password);

						$rootScope.logged = true;
						$rootScope.currentUser = user.name;
						$location.path($rootScope.redirectTo === undefined ? '/' + user.name : $rootScope.redirectTo);
					} else {
						styleFailedInput($username);
						styleFailedInput($password);
					}
				})

				return true;
			};

			$rootScope.$on('event:auth-loginRequired', function () {
				cfpLoadingBar.complete();
				$rootScope.logged = false;
				$rootScope.currentUser = "";
				$location.path('/login');
			});
		}]);