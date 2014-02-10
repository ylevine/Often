angular.module('oftenServices')
	.factory('noteSvc', ['$http', function ($http) {
		return {
			createNote: function (note, successCallBack) {
				$http.post('/api/note/post', note)
					.success(function () {
						successCallBack();
					})
			},
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
			},
			getNote: function (username, noteSlug, successCallBack) {
				if (!username || !noteSlug || !successCallBack) {
					return null;
				} else {
					$http.get('/api/note/get/' + username + '/' + noteSlug).
						success(function (data) {
							successCallBack(data.note);
						});
				}
			},
			search: function (searchToken, successCallBack) {
				$http.get('/api/note/search', {
					params: {searchToken: searchToken }
				}).success(function (data) {
						successCallBack(data.allNotes);
					});
			},
			getUserNoteList: function (username, successCallBack) {
				$http.get('/api/note/get/' + username).
					success(function (data) {
						successCallBack(data.allNotes);
					});
			},
			toggleStar: function (note, successFn) {
				$http
					.get('/api/note/' + note._id + '/star')
					.success(function (result) {
						successFn(result);
					})
					.error(function (err) {
						// @todo
						// here should be some notification systen call
						// to inform user that he should be logged in first
						throw new Error(err);
					})
			}
		}
	}]);