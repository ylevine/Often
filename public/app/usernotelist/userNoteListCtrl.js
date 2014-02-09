angular.module('oftenControllers')
	.controller('userNoteListCtrl', [ '$scope', '$routeParams', '$rootScope', '$location', 'cfpLoadingBar', 'checkAuthSvc', 'userNoteListSvc',
		function ($scope, $routeParams, $rootScope, $location, cfpLoadingBar, checkAuthSvc, userNoteListSvc) {
			$scope.loading = true;

			checkAuthSvc.checkAuth(function () {
				$rootScope.logged = true;

				userNoteListSvc.getUserNoteList($routeParams.username, function (allNotes) {
					$scope.notes = allNotes;
					$scope.loading = false;
				});
			});

			$rootScope.$on('event:auth-loginRequired', function () {
				$rootScope.logged = false;
				cfpLoadingBar.complete();
				$location.path('/login');
			});
		}]);