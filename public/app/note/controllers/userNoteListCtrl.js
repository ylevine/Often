angular.module('oftenControllers')
	.controller('userNoteListCtrl', [ '$scope', '$routeParams', '$rootScope', '$location', 'cfpLoadingBar', 'noteSvc' , 'userSvc',
		function ($scope, $routeParams, $rootScope, $location, cfpLoadingBar, noteSvc, userSvc) {
			$scope.loading = true;

			userSvc.checkAuth(function () {
				$rootScope.logged = true;

				noteSvc.getUserNoteList($routeParams.username, function (allNotes) {
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