var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = ObjectId = mongoose.Types.ObjectId;

/**
 * @param {Mongoose.Connection} db The database connection.
 */
module.exports = function (db) {

	var schema = new Schema({
		noteTitle: String,
		noteSlug: String,
		noteDesc: String,
		noteDate: Date,
		noteOwner: String,
		noteTags: [
			{
				tagName: String
			}
		],
		codeList: [
			{
				codeTitle: String,
				codeDesc: String,
				codeLang: String,
				codeSnippet: String,
				codeParser: String
			}
		],
		Stars: [
			{
				starOwner: String
			}
		]
	});

	/**
	 * @type {Mongoose.Model}
	 */
	var model = db.model('Notes', schema);

	return {
		findUserNotes: function getUserNotes(username, fn) {
			model.find({noteOwner: username}).exec(function (err, notes) {
				if (err) throw err;
				fn(notes);
			});
		},
		findNote: function getNote(username, slug, fn) {
			model.findOne({noteOwner: username, noteSlug: slug}).exec(function (err, note) {
				if (err) throw err;
				fn(note);
			});
		},
		saveNote: function saveFunc(newNote, fn) {
			var note = new model();
			note.noteTitle = newNote.noteTitle;
			note.noteSlug = newNote.noteSlug;
			note.noteDate = new Date();
			note.noteOwner = newNote.noteOwner;
			note.codeList = newNote.codeList;
			note.noteTags = newNote.noteTags;

			note.save(function (err) {
				if (err)
					throw err;
				fn(note._id);
			});
		},
		getAll: function getAll(fn) {
			model.find({}).exec(function (err, notes) {
				if (err) throw err;
				fn(notes);
			});
		},
		findComments: function (noteId, fn) {
			model.findOne({_id: ObjectId(noteId)}).exec(function (err, note) {
				if (err) throw err;

				if (note != null && note.comments != null) {

					fn(note.comments);
				} else {

					fn(null);
				}
			});
		},
		postComment: function (noteId, contents, username, fn) {
			model.findOne({_id: ObjectId(noteId)}).exec(function (err, note) {
				if (err) throw err;

				if (note != null && note.comments != null) {
					note.comments.push({
						comment: contents,
						commentDate: new Date(),
						commentOwner: username
					});

					note.save(function (err) {
						if (err) throw err;


						fn(true);
					});
				}
			});
		},
		star: function (noteId, userName, fn) {
			model.findOne({_id: ObjectId(noteId)}).exec(function (err, note) {
				if (err) throw err;

				if (note != null && note.Stars != null) {
					var starred = false;
					var index = -1;
					for (var star in note.Stars) {
						if (note.Stars[star].starOwner == userName) {
							index = star;
							break;
						}
					}

					if (index == -1) {
						note.Stars.push({starOwner: userName});
						starred = true;
					} else {
						note.Stars.splice(index);
					}

					note.save(function (err) {
						if (err) throw err;


						fn(starred);
					})
				} else {
					fn(null);
				}
			});
		}
	};
};