'use strict';

describe('Note List Controller', function () {
	var controller,
		noteListCtrl,
		scope,
		noteListSvcSpy,
		mockedData = {
			data: 'name'
		}

	beforeEach(function () {
		noteListSvcSpy = jasmine.createSpyObj('noteListSvc', ['getAllNotes']);
		noteListSvcSpy.getAllNotes.andCallFake(function (callBack) {
			callBack(mockedData);
		});

		module('oftenControllers');
	});

	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		controller = $controller;
	}));

	it('Should call noteListSvc\'s getAllNotes method', function () {
		controller('noteListCtrl', { $scope: scope, noteListSvc: noteListSvcSpy });
		expect(noteListSvcSpy.getAllNotes).toHaveBeenCalled();
	});

	it('Should save note list from noteListSvc to scope', function () {
		controller('noteListCtrl', { $scope: scope, noteListSvc: noteListSvcSpy });
		expect(scope.notes).toEqual(mockedData);
	});

	it('Should change scope.loading to false when note list is loaded', function () {
		controller('noteListCtrl', { $scope: scope, noteListSvc: noteListSvcSpy });
		expect(scope.loading).toBe(false);
	});
});