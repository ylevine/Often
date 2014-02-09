angular.module('oftenServices')
	.factory('checkAuthSvc', ['$http', function ($http) {
		return {
			checkAuth: function (successCallBack) {
				$http.get('/user/checkAuth')
					.success(function() {
						successCallBack();
					});
			}
		}
	}]);