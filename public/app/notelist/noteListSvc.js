angular.module('oftenServices')
	.factory('noteListSvc', ['$http', function ($http) {
		return {
			getAllNotes: function (successCallBack) {
				if (successCallBack === undefined) {
					return;
				}
				$http.get('/api/note/get').
					success(function (data) {
						successCallBack(data.allNotes);
					});
			}};
	}]);