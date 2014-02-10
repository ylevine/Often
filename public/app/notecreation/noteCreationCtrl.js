angular.module('oftenControllers')
	.controller('noteCreationCtrl', ['$scope', '$location', 'noteCreationSvc', function ($scope, $location, noteCreationSvc) {
		$scope.note = {
			noteTitle: "",
			noteDesc: "",
			codeList: [],
			noteTags: []
		};

		$scope.codeSnippet = [];

		$scope.updateCode = function (code) {
			var isValid = true;
			var $inputCodeTitle = $('#input-code-title');
			var $selectLanguage = $('#select-language');
			var $codeSnippetTextarea = $('#codesnippet-textarea');
			removeInputFeedback($inputCodeTitle);
			removeInputFeedback($selectLanguage);
			removeInputFeedbackEditor($codeSnippetTextarea);

			if ($inputCodeTitle.val() < 10) {
				styleFailedInput($inputCodeTitle);
				isValid = false;
			}

			if ($selectLanguage.val() === "") {
				styleFailedInput($selectLanguage);
				isValid = false;
			}

			if ($scope.editor.getValue().length === 0) {
				styleFailedInputEditor($codeSnippetTextarea);
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

			$('#codeList').find('tbody').sortable({
				// On order update, also update the codeList array
				update: function (e, ui) {
					// Get the order from the table
					var tableOrder = [];
					$('#codeList').find('tbody tr').each(function (k, v) {
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

			return true;
		};

		$scope.updateNote = function (note) {
			var isValid = true;

			var $inputCodeTitle = $('#input-code-title');
			var $inputNoteTags = $('#input-note-tags');

			removeInputFeedback($inputCodeTitle);
			removeInputFeedbackTag($inputNoteTags);

			if ($inputCodeTitle.val() < 10) {
				styleFailedInput($inputCodeTitle);
				isValid = false;
			}

			if ($scope.note.noteTags.length < 1) {
				styleFailedInput($inputNoteTags);
				isValid = false;
			}

			if (!isValid) {
				return false;
			}

			noteCreationSvc.createNote(note, function () {
				$location.path('/');
			});

			return true;
		};
	}]);