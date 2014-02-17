angular.module('often.directives')
    .directive('search', ['noteSvc',
        function (noteSvc) {
            return function (scope, element, attr) {
                var previousSearch = "";
                var typingTimer;
                var typingInterval = 500;

                element.on('keyup', function () {
                    if (element[0].value != previousSearch) {
                        previousSearch = element[0].value;

                        typingTimer = setTimeout(function () {
                            scope.$emit('filterSearchChange', element[0].value);
                        }, typingInterval);
                    }
                });

                element.on('keydown', function (e) {
                    if (isTagSeparator(e)) {
                        scope.$emit('filterTagChange', element[0].value);
                        element[0].value = "";
                        e.preventDefault();
                    }

                    clearInterval(typingTimer);
                });

                // Reset the search input box on all route changes
                scope.$on('$routeChangeSuccess', function (evt, cur, prev) {
                    element.val("");
                });

                scope.$on('filterReset', function () {
                    element.val("");
                });

                function isTagSeparator(e) {
                    var charCode = e.which || e.keyCOde;
                    return charCode == 186 || charCode == 188 || charCode == 59;
                }
            };
        }
    ]);
