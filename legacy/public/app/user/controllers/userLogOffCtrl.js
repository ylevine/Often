angular.module('oftenControllers')
	.controller('logoffCtrl', ['$location', '$rootScope', 'userSvc',
		function ($location, $rootScope, userSvc) {
			userSvc.logOff(function () {
				$rootScope.logged = false;
				$rootScope.currentUser = "";
				$location.path("/");
			})
		}]);