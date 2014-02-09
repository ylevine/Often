angular.module('oftenServices')
	.factory('userNoteListSvc', ['$http', function ($http) {
		return {
			getUserNoteList: function(username, successCallBack) {
				$http.get('/api/note/get/' + username).
					success(function (data) {
						successCallBack(data.allNotes);
					});
			}
		};
	}]);