var models = projRequire('/models/index');

function isNoteStarred(note, req) {
    'use strict';

    for (var starIndex = 0; starIndex < note.stars.length; starIndex++) {
        var star = note.stars[starIndex];
        console.log(star);
        if (star.starredBy === req.session.user.username) {
            return true;
        }
    }

    return false;
}

exports.getAll = function (req, res) {
    'use strict';

	models.Note.getAll(function (notes) {
        if (req.session.user) {
            for (var noteIndex = 0; noteIndex < notes.length; noteIndex++) {
                notes[noteIndex].starredByLoggedIn = isNoteStarred(notes[noteIndex], req);
            }
        }

		res.json({
			allNotes: notes
		});
	});
};

exports.getFilteredNotes = function (req, res) {
    'user stringi';

	// Checks tagToSearch is contained in tagList
	function isTagMatch(tagToSearch, tagList) {
		var isMatch = false;

		for (var tag in tagList) {
			if (tagList[tag].tagName != undefined && tagToSearch === tagList[tag].tagName.toLowerCase()) {
				isMatch = true;
				break;
			}
		}

		return isMatch;
	}

	function filterNotesByTags(notes, tags) {
		var result = [];
		
		for (var i = 0; i < notes.length; i++) {
			var isMatch = false;

			// Single Tag
			if (typeof tags === 'string') {
				isMatch = isTagMatch(tags, notes[i].noteTags);
			} else {
				for (var t in tags) {
					var tagToSearch = undefined;

					if (!tags[t]) {
						continue;
					} else {
						tagToSearch = tags[t].toLowerCase();
					}

					isMatch = isTagMatch(tagToSearch, notes[i].noteTags);
					if (!isMatch) {
						break;
					}
				}
			}

			if (isMatch) {
				result.push(notes[i]);
			}
		}

		return result;
	};

	function filterNotesByLanguage(notes, lang) {
		var result = [];

		for (var i = 0; i <notes.length; i++) {
			var isMatch = false;
			for (var z = 0; z < notes[i].codeList.length; z++) {
				var currentCodeLanguage = notes[i].codeList[z].codeParser;
				if (currentCodeLanguage && currentCodeLanguage.toLowerCase() === lang.toLowerCase()) {
					isMatch = true;
					break;
				};
			}

			if (isMatch) {
				result.push(notes[i]);
			}
		}

		return result;
	};

	// TODO:IMPROVE SEARCH	
	function searchNote(notes, searchToken) {
		var resultData = [];

		for (var i = 0; i < notes.length; i++) {
			var isMatch = false;

			if (notes[i].noteTitle.toLowerCase().indexOf(searchToken) !== -1) {
				isMatch = true;
			}

			if (!isMatch && notes[i].noteDesc !== undefined &&
                notes[i].noteDesc.toLowerCase().indexOf(searchToken) !== -1) {
				isMatch = true;
			}

			if (!isMatch) {
				for (var tagIndex = 0; tagIndex < notes[i].noteTags.length; tagIndex++) {
                    var tag = notes[i].noteTags[tagIndex];

					if (!isMatch && tag.tagName !== undefined &&
                        tag.tagName.toLowerCase().indexOf(searchToken) !== -1) {
						isMatch = true;
						break;
					}
				}
			}

			if (!isMatch) {
				for (var codeIndex = 0; codeIndex < notes[i].codeList++; codeIndex++) {
                    var code = notes[i].codeList[codeIndex];

					if (!isMatch && code.codeTitle !== undefined && code.codeTitle.toLowerCase().indexOf(searchToken) !== -1) {
						isMatch = true;

						break;
					}

					if (!isMatch && code.codeDesc !== undefined && code.codeDesc.toLowerCase().indexOf(searchToken) !== -1) {
						isMatch = true;

						break;
					}
				}
			}

			if (isMatch) {
				resultData.push(notes[i]);
			}
		}

		return resultData;
	};

	models.Note.getAll(function (notes) {
		var lang = req.query.language;
		if (lang) {
			notes = filterNotesByLanguage(notes, lang);
		}

		var tags = req.query.tags;
		if (tags) {
			notes = filterNotesByTags(notes, tags);
		}

		var search = req.query.search.toLowerCase();
		if (search) {
			notes = searchNote(notes, search);
		}

		res.json({
			filteredNotes: notes
		});
	});
};

exports.getUserNotes = function (req, res) {
    'use strict';

	models.Note.findUserNotes(req.params.username, function (notes) {
        if (req.session.user) {
            for (var noteIndex = 0; noteIndex < notes.length; noteIndex++) {
                notes[noteIndex].starredByLoggedIn = isNoteStarred(notes[noteIndex], req);
            }
        }

		res.json({
			allNotes: notes
		});
	});
};

exports.saveNote = function (req, res) {
    'use strict';

	if (req.session.user === undefined) {
		res.status(401);
		res.end();
	}

	var newNote = {};
	newNote.noteTitle = req.body.noteTitle;
	newNote.noteSlug = newNote.noteTitle.trim().replace(/ +/g, '-').toLowerCase();
	newNote.noteDate = new Date();
	newNote.noteOwner = req.session.user.username;
	newNote.codeList = req.body.codeList;
	newNote.noteTags = req.body.noteTags;

	models.Note.saveNote(newNote, function (id) {
		res.json({
			isSuccessful: true,
			newNoteId: id
		});
	});
};

exports.getComments = function (req, res) {
    'use strict';

	models.Note.findComments(req.params.noteId, function (comments) {
		res.json({
			comments: comments
		});
	});
};

exports.postComment = function (req, res) {
    'use strict';

	models.Note.postComment(req.body.noteId, req.body.noteContents, req.session.user.username, function (result) {
		res.json({
			result: result
		});
	});
};

exports.star = function (req, res) {
    'use strict';

    if (!req.session.user) {
        res.status(403);
        res.end();
        return false;
    }

	models.Note.star(req.params.noteId, req.session.user.username, function (starred) {
		res.json({
			star: starred
		});

        return true;
	});

    return false;
};

exports.getNote = function (req, res) {
    'use strict';

	models.Note.findNote(req.params.username.toLowerCase(), req.params.slug.toLowerCase(), function (note) {
        if (req.session.user) {
            note.starredByLoggedIn = isNoteStarred(note, req);
        }

		res.json({
			note: note
		});
	});
};
