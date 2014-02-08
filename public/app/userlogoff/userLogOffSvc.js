angular.module('oftenServices')
	.factory('userLogOffSvc', function ($http) {
		return {
			logOff: function (successCallBack) {
				$http.post('/user/logoff').success(function(data) {
					successCallBack(data);
				})
			}};
	});