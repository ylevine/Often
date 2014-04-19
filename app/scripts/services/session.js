'use strict';

angular.module('oftenApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
