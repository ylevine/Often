angular.module('often.directives')
	.directive('logoff', ['$rootScope', '$location', 'userSvc',
		function ($rootScope, $location, userSvc) {
			return function (scope, element, attr) {
				element.on('click', function () {
					userSvc.logOff(function () {
						$rootScope.logged = false;
						$rootScope.currentUser = "";
						$location.path("/");
					});
				});
			};
		}]);