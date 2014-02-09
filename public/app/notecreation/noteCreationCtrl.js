angular.module('oftenControllers')
	.controller('noteCreationCtrl', function ($http, $scope, $location, noteCreationSvc) {
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

			if ($('#select-language').val() === "") {
				styleFailedInput($('#select-language'));
				isValid = false;
			}

			if ($scope.editor.getValue().length === 0) {
				styleFailedInputEditor($('#codesnippet-textarea'));
				isValid = false;
			}

			if (!isValid) {
				return false;
			}

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
							if (tableOrder[i] === $scope.note.codeList[x].codeTitle) {
								$scope.note.codeList.move(i, x);
								break;
							}
						}
					}
				}
			});
		};

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

			if (!isValid) {
				return false;
			}

			noteCreationSvc.createNote(note, function() {
				$location.path('/');
			});
		};
	});