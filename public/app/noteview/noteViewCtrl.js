angular.module('oftenControllers')
	.controller('noteViewCtrl', function ($scope, $http, $routeParams) {
		$scope.loading = true;

		$http.get('/api/note/get/' + $routeParams.username + '/' + $routeParams.slug).success(function (data) {
			$scope.note = data.note;
			$scope.loading = false;
		});

		$scope.$on('renderComplete', function (ngRepeatFinishedEvent) {
			highlightCode();
		});
	});