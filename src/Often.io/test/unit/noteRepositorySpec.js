'use strict';

/* JASMINE SPECS FOR NOTE SERVICE */

describe('noteRepository', function () {
	var httpBackend, noteRepo;
	var mockedAllNotes = [
		{
			noteTitle: "Test Note Title 1"
		}
	];

	beforeEach(function () {
		module('oftenRepositoryModule');

		inject(function ($httpBackend, noteRepository) {
			httpBackend = $httpBackend;
			noteRepo = noteRepository;
		});
	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('Should have note repository.', function () {
		expect(noteRepo).toBeDefined();
		expect(noteRepo.getAllNotes).toBeDefined();
	});

	it('Should return all notes', function() {
		httpBackend.expectGET('/api/note/get').respond({
			allNotes: mockedAllNotes
		});

		var actual;
		noteRepo.getAllNotes(function(data) {
			actual = data;
		});

		httpBackend.flush();
		expect(actual).toEqual(mockedAllNotes);
	});
});