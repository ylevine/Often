angular.module('often.directives')
	.directive('logoff', ['$rootScope', '$location', 'userLogOffSvc',
		function ($rootScope, $location, userLogOffSvc) {
			return function (scope, element, attr) {
				element.on('click', function () {
					userLogOffSvc.logOff(function () {
						$rootScope.logged = false;
						$rootScope.currentUser = "";
						$location.path("/");
					});
				});
			};
		}]);