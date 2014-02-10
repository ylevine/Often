angular.module('often.directives')
	.directive('searchreset', ['noteSvc',
		function (noteSvc) {
			return function (scope, element, attr) {
				element.on('click', function () {
					scope.$broadcast('searchResetEvent');

					var ctrlScope = scope.$$childTail;
					ctrlScope.loading = true;
					ctrlScope.notes = [];

					noteSvc.getAllNotes(function (data) {
						ctrlScope.notes = data;
						ctrlScope.loading = false;
					});
				});
			};
		}]);