angular.module('oftenServices')
	.factory('noteViewSvc', ['$http', function ($http) {
		return {
			getNote: function (username, noteSlug, successCallBack) {
				if (!username || !noteSlug || !successCallBack) {
					return null;
				} else {

					$http.get('/api/note/get/' + username + '/' + noteSlug).
						success(function (data) {
							successCallBack(data.note);
						});
				}
			}
		};
	}]);