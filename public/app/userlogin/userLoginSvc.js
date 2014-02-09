angular.module('oftenServices')
	.factory('userLoginSvc', function ($http) {
		return {
			login: function (user, successCallBack) {
				$http.post('/user/authenticate', user)
					.success(function(data) {
						successCallBack(data);
					})
			}
		}
	});