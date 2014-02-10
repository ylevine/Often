angular.module('often.directives')
	.directive('search', ['noteSvc',
		function (noteSvc) {
			return function (scope, element, attr) {
				var typingTimer;
				var typingInterval = 500;

				element.on('keyup', function () {
					var ctrlScope = scope.$$childTail;
					ctrlScope.loading = true;
					ctrlScope.notes = [];

					// Search when typing stopes.
					if (element[0].value.length > 2) {
						typingTimer = setTimeout(function () {
							noteSvc.search(element[0].value, function (data) {
								ctrlScope.notes = data;
								ctrlScope.loading = false;
							});
						}, typingInterval);
					}
				});

				element.on('keydown', function () {
					clearInterval(typingTimer);
				});

				// Reset the search input box on all route changes
				scope.$on('$routeChangeSuccess', function(evt, cur, prev) {
					element.val("");
				});

				scope.$on('searchResetEvent', function() {
					element.val("");
				})
			};
		}]);