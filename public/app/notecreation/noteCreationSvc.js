angular.module('oftenServices')
	.factory('noteCreationSvc', function ($http) {
		return {
			createNote: function (note, successCallBack) {
				$http.post('/api/note/post', note)
					.success(function() {
						successCallBack();
					})
			}}
	});