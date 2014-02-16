angular.module('often.directives')
	.directive('tag', function() {
		return function(scope, elem, attr) {
			elem.on('click', function() {
				scope.$emit('filterTagChange', elem.text());
			});
		};
	});
