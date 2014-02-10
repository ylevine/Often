angular.module('oftenControllers')
	.controller('logffCtrl', ['$location', '$rootScope', 'userLogOffSvc',
		function ($location, $rootScope, userLogOffSvc) {
			userLogOffSvc.logOff(function () {
				$rootScope.logged = false;
				$rootScope.currentUser = "";
				$location.path("/");
			});
		}]);