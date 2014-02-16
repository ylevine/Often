angular.module('often.directives')
	.directive('languagefilter', function() {
		return function(scope, elem, attr) {
			elem.on('change', function() {
				scope.$emit('filterLanguageChange', elem[0].value);
			});
		};
	});
