angular.module('oftenControllers')
	.controller('noteViewCtrl', ['$scope', '$routeParams', 'noteSvc',
		function ($scope, $routeParams, noteSvc) {
			$scope.loading = true;

			noteSvc.getNote($routeParams.username, $routeParams.slug, function (data) {
				$scope.note = data;
				$scope.loading = false;
			})
		}]
	);