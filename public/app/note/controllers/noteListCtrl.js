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

			getAllNotes();

			$rootScope.$on('filterTagChange', function(event, value) {
				$scope.filter.tags.push(value);
				$scope.$apply();
				getFilteredNoteList();
			});

			$rootScope.$on('filterSearchChange', function(event, value) {
				$scope.filter.search = value;
				getFilteredNoteList();
			});

			$rootScope.$on('filterReset', function(event, value) {
				$scope.filter = {
					resultCount: -1,
					language: "",
					tags: [],
					search: ""
				};
				
				getAllNotes();
			});

			function getFilteredNoteList() {
				noteSvc.filter($scope.filter, function(data) {
					$scope.filter.resultCount = data.length;
					$scope.notes = data;
					$scope.loading = false;
				});
			}

			function getAllNotes() {
				noteSvc.getAllNotes(function (data) {
					$scope.notes = data;
					$scope.loading = false;
				});
			}
		}
	]);
