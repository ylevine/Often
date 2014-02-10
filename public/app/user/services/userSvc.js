angular.module('oftenServices')
	.factory('userSvc', ['$http', function ($http) {
		return {
			registerUser: function (user, successCallBack) {
				$http.post('/user/register', user).success(function (data) {
					if (data.isSuccessful) {
						successCallBack();
					}
				});
			},
			logOff: function (successCallBack) {
				$http.post('/user/logoff').success(function (data) {
					successCallBack(data);
				})
			},
			login: function (user, successCallBack) {
				$http.post('/user/authenticate', user)
					.success(function (data) {
						successCallBack(data);
					})
			},
			checkAuth: function (successCallBack) {
				$http.get('/user/checkAuth')
					.success(function() {
						successCallBack();
					});
			}
		};
	}]);