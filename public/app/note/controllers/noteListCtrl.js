angular.module('oftenControllers')
	.controller('noteListCtrl', ['$scope', 'noteSvc', function ($scope, noteSvc) {
		$scope.loading = true;
        $scope.notes = [];

		noteSvc.getAllNotes(function (data) {
			$scope.notes = data;
			$scope.loading = false;
		});
	}]);
