angular.module('oftenControllers')
	.controller('userNoteListCtrl', function ($scope, $http, $routeParams, $rootScope, $location, cfpLoadingBar) {
		$scope.loading = true;

		$http.get('/user/checkAuth').
			success(function (data) {
				$rootScope.logged = true;

				$http.get('/api/note/get/' + $routeParams.username).
					success(function (data) {
						$scope.notes = data.allNotes;
						$scope.loading = false;
					});
			});

		$rootScope.$on('event:auth-loginRequired', function () {
			$rootScope.logged = false;
			cfpLoadingBar.complete();
			$location.path('/login');
		});
	});