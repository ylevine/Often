angular.module('oftenControllers')
	.controller('noteListCtrl', ['$scope', '$http', 'noteListSvc', function ($scope, $http, noteListSvc) {
		$scope.loading = true;

		noteListSvc.getAllNotes(function (data) {
			$scope.notes = data;
			$scope.loading = false;
		});
	}]);
