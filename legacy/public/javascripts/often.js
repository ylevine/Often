var codeMirrorScripts = {
	javascript: '//cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/mode/javascript/javascript.min.js',
	css: '//cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/mode/css/css.min.js',
	clike: '//cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/mode/clike/clike.min.js',
	htmlembedded: '//cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/mode/htmlembedded/htmlembedded.min.js',
	htmlmixed: '//cdnjs.cloudflare.com/ajax/libs/codemirror/3.21.0/mode/htmlmixed/htmlmixed.min.js'
};

var codeList = [];

var highlightCode = function () {
	$('.masonry-container .code-snippet').each(function (i, v) {
		var editor = CodeMirror.fromTextArea($(this)[0], {
			readOnly: true,
			lineNumbers: false,
			theme: "ambiance"
		});

		setMode(editor, $(this).attr('data-parser'));
	});

	$('.note .code-snippet').each(function () {
		var editor = CodeMirror.fromTextArea($(this)[0], {
			readOnly: true,
			lineNumbers: false,
			theme: "ambiance"
		});

		setMode(editor, $(this).attr('data-parser'));
	});
};

function setMode(editor, parser) {
	$.ajaxSetup({cache: true});
	$.getScript(codeMirrorScripts[parser], function () {
		editor.setOption('mode', parser);
	});
	$.ajaxSetup({cache: false});
}

Array.prototype.move = function (old_index, new_index) {
	if (new_index >= this.length) {
		var k = new_index - this.length;
		while ((k--) + 1) {
			this.push(undefined);
		}
	}
	this.splice(new_index, 0, this.splice(old_index, 1)[0]);
	return this; // for testing purposes
};

/* VALIDATION RELATED */
/* ================== */

function styleFailedInput(inputField) {
	inputField.parent().parent().addClass('has-error');
	inputField.parent().parent().addClass('has-feedback');
	inputField.after('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
}

function styleSuccessInput(inputField) {
	inputField.parent().parent().addClass('has-success');
	inputField.parent().parent().addClass('has-feedback');
	inputField.after('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
}

function removeInputFeedbackTag(inputField) {
	inputField.parent().parent().removeClass('has-error');
	inputField.parent().parent().removeClass('has-feedback');
	if (inputField.next('span').length > 0) {
		inputField.next('span').remove();
	}
}

function removeInputFeedback(inputField) {
	inputField.parent().parent().removeClass('has-error');
	inputField.parent().parent().removeClass('has-feedback');
	if (inputField.next().length > 0) {
		inputField.next().remove();
	}
}

function styleFailedInputEditor(inputField) {
	inputField.parent().parent().addClass('has-error');
	inputField.parent().parent().addClass('has-feedback');
}

function styleSuccessInputEditor(inputField) {
	inputField.parent().parent().addClass('has-success');
	inputField.parent().parent().addClass('has-feedback');
}

function removeInputFeedbackEditor(inputField) {
	inputField.parent().parent().removeClass('has-error');
	inputField.parent().parent().removeClass('has-feedback');
}