angular.module('often.directives', []);

var often = angular.module('often', [
	'ngRoute',
    'hljs',
	'wu.masonry',
	'chieffancypants.loadingBar',
	'angularMoment',
	'oftenControllers',
    'often.directives',
	'http-auth-interceptor'
]);

often.config(['$routeProvider', function ($routeProvider, oftenControllers) {
	$routeProvider.
		when('/', {
			templateUrl: '/app/notelist/noteList.html',
			controller: 'noteListCtrl'
		}).
		when('/:username/:slug', {
			templateUrl: '/app/noteview/noteView.html',
			controller: 'noteViewCtrl'
		}).
		when('/search', {
			templateUrl: '/app/notelist/noteList.html',
			controller: 'searchCtrl'
		}).
		when('/register', {
			templateUrl: '/app/userregistration/userRegistration.html',
			controller: 'userRegistrationCtrl'
		}).
		when('/create', {
			templateUrl: '/app/notecreation/noteCreation.html',
			controller: 'noteCreationCtrl'
		}).
		when('/login', {
			templateUrl: '/app/userlogin/userLogin.html',
			controller: 'userLoginCtrl'
		}).
		when('/:username', {
			templateUrl: '/app/usernotelist/userNoteList.html',
			controller: 'userNoteListCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
}
]);

often.directive('onFinishRender', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit(attr.onFinishRender);
				});
			}
		}
	};
});

often.directive('memberonly', function ($rootScope, $location, $http, cfpLoadingBar) {
	return function (scope, element, attr) {
		element.on('click', function () {
			$rootScope.redirectTo = attr.memberonly;
			$http.get('/user/checkAuth').
				success(function (data) {
					$rootScope.logged = true;
					$location.path(attr.memberonly);
				});
		});

		$rootScope.$on('event:auth-loginRequired', function () {
			$rootScope.logged = false;
			cfpLoadingBar.complete();
			$location.path('/login');
		});
	};
});

often.directive('logoff', function ($rootScope, $location, $http) {
	return function (scope, element, attr) {
		element.on('click', function () {
			$http.post('/user/logoff').success(function () {
				$rootScope.logged = false;
				$rootScope.currentUser = "";
				$location.path("/");
			});
		});
	};
});

often.directive('jadedit', function () {
	return function (scope, element, attr) {
		$.when(
				$.getScript('//cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/mode/xml/xml.min.js'),
				$.getScript('//cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/mode/css/css.min.js'),
				$.getScript('//cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/mode/jade/jade.min.js'),
				$.getScript('//cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/mode/htmlmixed/htmlmixed.min.js'),
				$.Deferred(function (deferred) {
					$(deferred.resolve);
				})
			).then(function () {
				var editor = CodeMirror.fromTextArea(element[0], {
					lineNumbers: 'true',
					theme: 'ambiance',
					readOnly: true
				});

				scope.editor = editor;
			});
	};
});

often.directive('lang', function () {
	return function (scope, element, attr) {
		element.on('change', function () {
			console.log(scope.editor);
			scope.editor.setOption('readOnly', false);
			setMode(scope.editor, element.val());
		});
	};
});

often.directive('taginput', function () {
	return function (scope, element, attr) {
		element.on('keypress', function (e) {
			if (String.fromCharCode(e.keyCode).match(/,|;/)) {
				//$('#tag-container').append('<button class="btn btn-warning btn-tag">' + element[0].value + '</button>')
				scope.note.noteTags.push({ tagName: element[0].value });
				element[0].value = "";
				e.preventDefault();
				scope.$apply();
			}
		});
	};
});

often.directive('searchinput', function ($location, $http) {
	return function (scope, element, attr) {
		var typingTimer;
		var typingInterval = 500;

		element.on('keyup', function (e) {
			if (element[0].value.length > 2) {
				typingTimer = setTimeout(search, typingInterval);
			}
		});

		element.on('blur', function (e) {
			element[0].value = "";
		});

		element.on('keydown', function () {
			clearInterval(typingTimer);
		});

		function search() {
			scope.notes = [];
			scope.loading = true;

			if ($location.$$url.indexOf('search') === -1) {
				$location.path('/search');
				scope.$apply();
			}

			scope.search = $http.get('/api/note/search', {
				params: {searchToken: element[0].value}
			}).success(function (data) {
					scope.notes = data.allNotes;
					scope.loading = false;
				});
		}
	};
});

angular.module('oftenControllers', ['oftenServices', 'chieffancypants.loadingBar']);