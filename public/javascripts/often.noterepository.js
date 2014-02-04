// Repository service for Note object
// ==================================

oftenRepository.factory('noteRepository', function ($http) {
	return {
		getAllNotes: function (successCallBack) {
			$http.get('/api/note/get').
				success(function (data) {
					if (successCallBack == undefined) return null;

					successCallBack(data.allNotes);
				});
		},
		getNote: function (username, noteSlug, successCallBack) {
			if (username == null && username == undefined && username.length < 4) return null;

			$http.get('/api/note/get/' + username + '/' + noteSlug).
				success(function (data) {
					if (successCallBack == undefined) return null;

					successCallBack(data.note);
				});
		}
	}
});