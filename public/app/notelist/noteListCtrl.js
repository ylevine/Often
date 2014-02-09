angular.module('oftenControllers')
	.controller('noteListCtrl', ['$scope', 'noteListSvc', function ($scope, noteListSvc) {
		$scope.loading = true;
        $scope.notes = [];

		noteListSvc.getAllNotes(function (data) {
			$scope.notes = data;
			$scope.loading = false;
		});
	}]);
