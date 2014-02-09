angular.module('oftenServices')
	.factory('noteCreationSvc', ['$http', function ($http) {
		return {
			createNote: function (note, successCallBack) {
				$http.post('/api/note/post', note)
					.success(function() {
						successCallBack();
					})
			}}
	}]);