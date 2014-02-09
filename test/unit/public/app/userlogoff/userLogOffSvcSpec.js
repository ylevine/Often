'use strict';

describe('User Log Off Service', function () {
	var httpBackend, userLogOffService;

	beforeEach(function () {
		module('oftenServices');

		inject(function ($httpBackend, userLogOffSvc) {
			httpBackend = $httpBackend;
			userLogOffService = userLogOffSvc;
		});
	});

	afterEach(function () {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('Should exist', function () {
		expect(userLogOffService).toBeDefined();
		expect(userLogOffService.logOff).toBeDefined();
	});

	it('Should call log off method on server', function () {
		httpBackend.expectPOST('/user/logoff').respond(true);

		var actual;
		userLogOffService.logOff(function (data) {
			actual = data;
		});

		httpBackend.flush();
		expect(actual).toEqual(true);
	});
});