angular.module('oftenServices')
	.factory('userRegistrationSvc', ['$http', function ($http) {
		return {
			registerUser: function (user, successCallBack) {
				$http.post('/user/register', user).success(function (data) {
					if (data.isSuccessful) {
						successCallBack();
					}
				});
			}
		};
	}]);