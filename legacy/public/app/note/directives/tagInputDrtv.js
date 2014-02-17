angular.module('often.directives')
	.directive('taginput', function () {
		'use strict';

		return function (scope, element, attr) {
			element.on('keypress', function (e) {
				if (String.fromCharCode(e.keyCode).match(/,|;/)) {
					addTagButton(element[0].value);
					e.preventDefault();
				}
			});
			function addTagButton(tagName) {
				scope.note.noteTags.push({ tagName: tagName });
				element[0].value = "";
				scope.$apply();
			}
		}	
	});
