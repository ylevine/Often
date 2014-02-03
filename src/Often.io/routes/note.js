var Note = require('../models/note');

exports.getAll = function (req, res) {
	Note.getAll(function (notes) {
		res.json({
			allNotes: notes
		});
	});
};

exports.getSearchedNotes = function (req, res) {
	Note.getAll(function (notes) {
		var searchToken = req.query.searchToken.toLowerCase();

		var resultData = [];

		for (var i = 0; i < notes.length; i++) {
			var isMatch = false;

			if (notes[i].noteTitle.toLowerCase().indexOf(searchToken) != -1) {
				isMatch = true;
			}

			if (!isMatch && notes[i].noteDesc != undefined && notes[i].noteDesc.toLowerCase().indexOf(searchToken) != -1) {
				isMatch = true;
			}

			if (!isMatch) {
				for (var tag in notes[i].noteTags) {
					if (!isMatch && tag.tagName != undefined && tag.tagName.toLowerCase().indexOf(searchToken) != -1) {
						isMatch = true;
						break;
					}
				}
			}

			if (!isMatch) {
				for (var code in notes[i].codeList) {
					if (!isMatch && code.codeTitle != undefined && code.codeTitle.toLowerCase().indexOf(searchToken) != -1) {
						isMatch = true;
						break;
					}

					if (!isMatch && code.codeDesc != undefined && code.codeDesc.toLowerCase().indexOf(searchToken) != -1) {
						isMatch = true;
						break;
					}
				}
			}

			if (isMatch) {
				resultData.push(notes[i]);
			}
		}

		res.json({
			allNotes: resultData
		});
	});
};

exports.getUserNotes = function (req, res) {
	Note.findUserNotes(req.params.username, function (notes) {
		res.json({
			allNotes: notes
		})
	});
};

exports.saveNote = function (req, res) {
	if (req.session.user == undefined) {
		res.status(401);
		res.end();
	}

	var newNote = new Note();
	newNote.noteTitle = req.body.noteTitle;
	newNote.noteSlug = newNote.noteTitle.trim().replace(/ +/g, '-').toLowerCase();
	newNote.noteDate = new Date();
	newNote.noteOwner = req.session.user.username;
	newNote.codeList = req.body.codeList;
	newNote.noteTags = req.body.noteTags;

	Note.saveNote(newNote, function (id) {
		res.json({
			isSuccessful: true,
			newNoteId: id
		});
	});
};

exports.getComments = function (req, res) {
	Note.findComments(req.params.noteId, function (comments) {
		res.json({
			comments: comments
		});
	});
}

exports.postComment = function (req, res) {
	Note.postComment(req.body.noteId, req.body.noteContents, req.session.user.username, function (result) {
		res.json({
			result: result
		});
	});
}

exports.star = function (req, res) {
	Note.star(req.params.noteId, req.session.user.username, function (starred) {
		res.json({
			star: starred
		});
	});
}

exports.getNote = function (req, res) {
	Note.findNote(req.params.username.toLowerCase(), req.params.slug.toLowerCase(), function (note) {
		res.json({
			note: note
		});
	});
};