angular.module('oftenControllers')
	.controller('logffCtrl', function ($scope, $http, $location, $rootScope) {
		$http.post('/user/logoff').
			success(function (data) {
				$rootScope.logged = false;
				$rootScope.currentUser = "";
				$location.path("/");
			});
	});