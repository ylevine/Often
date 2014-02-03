var oftenControllers = angular.module('oftenControllers', [
	'chieffancypants.loadingBar'
]);

oftenControllers.controller('noteListCtrl', function ($scope, $http) {
	$scope.loading = true;

	$http.get('/api/note/get').success(function (data) {
		$scope.notes = data.allNotes;
		$scope.loading = false;
	});
});

oftenControllers.controller('noteViewCtrl', function ($scope, $http, $routeParams) {
	$scope.loading = true;
	$http.get('/api/note/get/' + $routeParams.username + '/' + $routeParams.slug).success(function (data) {
		$scope.note = data.note;
		$scope.loading = false;
	});

	$scope.$on('renderComplete', function (ngRepeatFinishedEvent) {
		highlightCode();
	});
});

oftenControllers.controller('userNoteListCtrl', function ($scope, $http, $routeParams, $rootScope, $location, cfpLoadingBar) {
	$scope.loading = true;

	$http.get('/user/checkAuth').
		success(function (data) {
			$rootScope.logged = true;

			$http.get('/api/note/get/' + $routeParams.username).
				success(function (data) {
					$scope.notes = data.allNotes;
					$scope.loading = false;
				});
		});

	$rootScope.$on('event:auth-loginRequired', function () {
		$rootScope.logged = false;
		cfpLoadingBar.complete();
		$location.path('/login');
	});
});

oftenControllers.controller('createNoteCtrl', function ($http, $scope, $location) {
	$scope.note = {
		noteTitle: "",
		noteDesc: "",
		codeList: [],
		noteTags: []
	};

	$scope.codeSnippet = [];

	$scope.updateCode = function (code) {
		var isValid = true;
		removeInputFeedback($('#input-code-title'));
		removeInputFeedback($('#select-language'));
		removeInputFeedbackEditor($('#codesnippet-textarea'));

		if ($('#input-code-title').val() < 10) {
			styleFailedInput($('#input-code-title'));
			isValid = false;
		}

		if ($('#select-language').val() == "") {
			styleFailedInput($('#select-language'));
			isValid = false;
		}

		if ($scope.editor.getValue().length == 0) {
			styleFailedInputEditor($('#codesnippet-textarea'));
			isValid = false;
		}

		if (!isValid) return false;

		code.codeSnippet = $scope.editor.getValue();
		$scope.note.codeList.push(code);
		console.log($scope.note.codeList);
		$scope.editor.setValue("");
		$scope.editor.setOption('readOnly', true);
		$scope.code = {};

		$('#codeList tbody').sortable({
			// On order update, also update the codeList array
			update: function (e, ui) {
				// Get the order from the table
				var tableOrder = [];
				$('#codeList tbody tr').each(function (k, v) {
					tableOrder.push($(this).children().first().text());
				});
				for (var i = 0; i < $scope.note.codeList.length; i++) {
					for (var x = i; x < $scope.note.codeList.length; x++) {
						if (tableOrder[i] == $scope.note.codeList[x].codeTitle) {
							$scope.note.codeList.move(i, x);
							break
						}
					}
				}
			}
		});
	}

	$scope.updateNote = function (note) {
		var isValid = true;
		removeInputFeedback($('#input-note-title'));
		removeInputFeedbackTag($('#input-note-tags'));

		if ($('#input-note-title').val() < 10) {
			styleFailedInput($('#input-note-title'));
			isValid = false;
		}

		if ($scope.note.noteTags.length < 1) {
			styleFailedInput($('#input-note-tags'));
			isValid = false;
		}

		if (!isValid) return false;

		$http.post('/api/note/post', note).success(function (data) {
			$location.path('/');
		})
	}
});


oftenControllers.controller('loginCtrl', function ($scope, $http, cfpLoadingBar, $location, $rootScope) {
	$scope.loading = true;

	$scope.user = {};

	$scope.update = function (user) {
		var isValid = true;
		removeInputFeedback($('#username'));
		removeInputFeedback($('#password'));

		if ($('#username').val().length < 5) {
			styleFailedInput($('#username'));
			isValid = false;
		}

		if ($('#password').val().length < 5) {
			styleFailedInput($('#password'));
			isValid = false;
		}

		if (!isValid) return false;

		$scope.user = angular.copy(user);
		$http.post('/user/authenticate', user).
			success(function (data) {
				if (data.isSuccessful) {
					styleSuccessInput($('#username'));
					styleSuccessInput($('#password'));

					$rootScope.logged = true;
					$rootScope.currentUser = user.name;
					$location.path($rootScope.redirectTo == undefined ? '/' + user.name : $rootScope.redirectTo);
				} else {
					styleFailedInput($('#username'));
					styleFailedInput($('#password'));
				}
			});
	};

	$rootScope.$on('event:auth-loginRequired', function () {
		cfpLoadingBar.complete();
		$rootScope.logged = false;
		$rootScope.currentUser = "";
		$location.path('/login');
	});
});

oftenControllers.controller('logffCtrl', function ($scope, $http, $location, $rootScope) {
	$http.post('/user/logoff').
		success(function (data) {
			$rootScope.logged = false;
			$rootScope.currentUser = "";
			$location.path("/");
		});
});

oftenControllers.controller('registerCtrl', function ($scope, $http, $location) {
	$scope.register = function (user) {
		var isValid = true;
		removeInputFeedback($('#username'));
		removeInputFeedback($('#password'));
		removeInputFeedback($('#confirm'));
		removeInputFeedback($('#email'));

		if ($('#username').val() < 5) {
			styleFailedInput($('#username'));
			isValid = false;
		}

		if ($('#email').val() < 5) {
			styleFailedInput($('#email'));
			isValid = false;
		}

		if ($('#password').val() != $('#confirm').val()) {
			styleFailedInput($('#password'));
			styleFailedInput($('#confirm'));
			isValid = false;
		} else {
			if ($('#password').val() < 5) {
				styleFailedInput($('#password'));
				isValid = false;
			}

			if ($('#confirm').val() < 5) {
				styleFailedInput($('#confirm'));
				isValid = false;
			}
		}

		if (!isValid) return false;

		$http.post('/user/register', user).success(function(data) {
			$location.path('/');
		});
	}
});

oftenControllers.controller('searchCtrl', function ($scope, $http, $location) {

});