describe('Note View Service', function () {
	var httpBackend, noteViewService;
	var mockedAllNotes = [
		{
			noteTitle: "Test Note Title 1"
		}
	];

	beforeEach(function () {
		module('oftenServices');

		inject(function ($httpBackend, noteViewSvc) {
			httpBackend = $httpBackend;
			noteViewService = noteViewSvc;
		});
	});

	afterEach(function () {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('Should return a note', function () {
		httpBackend.expectGET('/api/note/get/username/note-slug').respond({
			note: {
				noteTitle: 'test note title'
			}
		});

		var actual;
		noteViewService.getNote('username', 'note-slug', function (data) {
			actual = data;
		});

		httpBackend.flush();
		expect(actual.noteTitle).toEqual('test note title');
	});

	it('Should validate username and note slug', function () {
		var actual = noteViewService.getNote('umm', 'no', null);
		expect(actual).toBeNull();
		actual = noteViewService.getNote('', '', null);
		expect(actual).toBeNull();
		actual = noteViewService.getNote('123123', 'asdfsdf', null);
		expect(actual).toBeNull();
		actual = noteViewService.getNote('asdfasdf', 123123123, null);
		expect(actual).toBeNull();

		//TODO: SPECIAL CHARACTER VALIDATIONS?
	});

});
