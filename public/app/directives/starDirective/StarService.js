angular.module('often.directives')
    .factory('StarService', function($http) {
        return {
            toggleStar: function(note, successFn) {
                $http
                    .get('/api/note/' + note._id + '/star')
                    .success(function (result) {
                        successFn(result);
                    })
                    .error(function (err) {
                        // @todo
                        // here should be some notification systen call
                        // to inform user that he should be logged in first
                        throw new Error(err);
                    })
            }
        }
    });