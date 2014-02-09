angular.module('oftenControllers')
	.controller('userLoginCtrl', ['$scope', 'cfpLoadingBar', '$location', '$rootScope', 'userSvc',
		function ($scope, cfpLoadingBar, $location, $rootScope, userSvc) {
			$scope.loading = true;

			$scope.user = {};

			$scope.update = function (user) {
				var isValid = true;
				removeInputFeedback($('#username'));
				removeInputFeedback($('#password'));

				if ($('#username').val().length < 5) {
					styleFailedInput($('#username'));
					isValid = false;
				}

				if ($('#password').val().length < 5) {
					styleFailedInput($('#password'));
					isValid = false;
				}

				if (!isValid) {
					return false;
				}

				$scope.user = angular.copy(user);
				userSvc.login(user, function (data) {
					if (data.isSuccessful) {
						styleSuccessInput($('#username'));
						styleSuccessInput($('#password'));

						$rootScope.logged = true;
						$rootScope.currentUser = user.name;
						$location.path($rootScope.redirectTo === undefined ? '/' + user.name : $rootScope.redirectTo);
					} else {
						styleFailedInput($('#username'));
						styleFailedInput($('#password'));
					}
				})
			};

			$rootScope.$on('event:auth-loginRequired', function () {
				cfpLoadingBar.complete();
				$rootScope.logged = false;
				$rootScope.currentUser = "";
				$location.path('/login');
			});
		}]);