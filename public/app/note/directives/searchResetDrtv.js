angular.module('often.directives')
	.directive('searchreset', ['noteSvc',
		function (noteSvc) {
			return function (scope, element, attr) {
				element.on('click', function () {
					scope.$emit('filterReset');
				});
			};
		}]);
