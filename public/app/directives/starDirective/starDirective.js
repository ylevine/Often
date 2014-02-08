angular.module('often.directives')
    .directive('oftenStar', function () {
        'use strict';

        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                state: '=ngModel',
                note: '='
            },
            controller: function ($scope, StarService) {
                $scope.starCount = 0;

                $scope.$watch(
                    function () {
                        return $scope.state;
                    },
                    function(newValue, oldValue) {
                        if (oldValue === undefined || newValue === oldValue) {
                            if ($scope.note && $scope.note.stars) {
                                $scope.starCount = $scope.note.stars.length;
                            }
                        } else if(newValue !== oldValue) {
                            if (newValue === true) {
                                $scope.starCount++;
                            } else {
                                $scope.starCount--;
                            }
                        }
                    }
                );

                $scope.toggleStar = function () {
                    StarService.toggleStar($scope.note, function () {
                        $scope.state = !$scope.state;
                    });
                };
            },
            templateUrl: 'app/directives/starDirective/star.html'
        }
    });
