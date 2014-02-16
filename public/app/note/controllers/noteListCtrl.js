angular.module('oftenControllers')
	.controller('noteListCtrl', ['$scope', '$rootScope', 'noteSvc', 
		function ($scope, $rootScope, noteSvc) {
			$scope.loading = true;
	        $scope.notes = [];
			$scope.filter = {
				resultCount: -1,
				language: "",
				tags: [],
				search: ""
			};

			noteSvc.getAllNotes(function (data) {
				$scope.notes = data;
				$scope.loading = false;
			});

			$rootScope.$on('filterTagChange', function(event, value) {
				$scope.filter.tags = [];
				$scope.filter.tags.push(value);
				$scope.$apply();
				refreshNoteList();
			});

			$rootScope.$on('filterSearchChange', function(event, value) {
				$scope.filter.search = value;
				refreshNoteList();
			});

			$rootScope.$on('filterLanguageChange', function(event, value) {
				$scope.filter.language = value;
				refreshNoteList();
			});

			function refreshNoteList() {
				noteSvc.filter($scope.filter, function(data) {
					$scope.notes = data;
					$scope.loading = false;
				});
			}
		}
	]);
