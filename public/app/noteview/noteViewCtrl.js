angular.module('oftenControllers')
	.controller('noteViewCtrl', ['$scope', '$routeParams', 'noteViewSvc', function ($scope, $routeParams, noteViewSvc) {
		$scope.loading = true;

		noteViewSvc.getNote($routeParams.username,  $routeParams.slug, function(data) {
			$scope.note = data.note;
			$scope.loading = false;
		})
	}]);