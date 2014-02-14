var often = angular.module('often', [
	'ngRoute',
	'hljs',
	'wu.masonry',
	'chieffancypants.loadingBar',
	'angularMoment',
	'oftenControllers',
	'oftenServices',
	'often.directives',
	'http-auth-interceptor'
]);

often.config(['$routeProvider', function ($routeProvider, oftenControllers) {
	$routeProvider.
		when('/', {
			templateUrl: '/app/note/views/noteList.html',
			controller: 'noteListCtrl'
		}).
		when('/:username/:slug', {
			templateUrl: '/app/note/views/noteView.html',
			controller: 'noteViewCtrl'
		}).
		when('/register', {
			templateUrl: '/app/user/views/userRegistration.html',
			controller: 'userRegistrationCtrl'
		}).
		when('/create', {
			templateUrl: '/app/note/views/noteCreation.html',
			controller: 'noteCreationCtrl'
		}).
		when('/login', {
			templateUrl: '/app/user/views/userLogin.html',
			controller: 'userLoginCtrl'
		}).
		when('/:username', {
			templateUrl: '/app/user/views/userNoteList.html',
			controller: 'userNoteListCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);

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
				scope.editor = CodeMirror.fromTextArea(element[0], {
					lineNumbers: 'true',
					theme: 'ambiance',
					readOnly: true
				});
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

angular.module('oftenControllers', ['oftenServices', 'chieffancypants.loadingBar']);
angular.module('oftenServices', []);
angular.module('often.directives', ['oftenServices']);