angular.module('oftenServices')
	.factory('noteListSvc', ['$http', function ($http) {
		return {
			getAllNotes: function (successCallBack) {
				if (!successCallBack) {
					return null;
				} else {

					$http.get('/api/note/get').
						success(function (data) {
							if (successCallBack === undefined) {
								return null;
							}

							successCallBack(data.allNotes);
						});
				}
			}};
	}]);