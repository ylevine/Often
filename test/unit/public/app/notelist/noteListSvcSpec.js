'use strict';

describe('Note List Service', function () {
	var httpBackend, noteListService;
	var mockedAllNotes = [
		{
			noteTitle: "Test Note Title 1"
		}
	];

	beforeEach(function () {
		module('oftenServices');

		inject(function ($httpBackend, noteListSvc) {
			httpBackend = $httpBackend;
			noteListService = noteListSvc;
		});
	});

	afterEach(function () {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('Should exist', function () {
		expect(noteListService).toBeDefined();
		expect(noteListService.getAllNotes).toBeDefined();
	});

	it('Should return all notes', function () {
		httpBackend.expectGET('/api/note/get').respond({
			allNotes: mockedAllNotes
		});

		var actual;
		noteListService.getAllNotes(function (data) {
			actual = data;
		});

		httpBackend.flush();
		expect(actual).toEqual(mockedAllNotes);
	});
});