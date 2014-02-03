var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = ObjectId = mongoose.Types.ObjectId;

var Note = Schema({
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

Note.statics.findUserNotes = function getUserNotes(username, fn) {
	this.find({noteOwner: username}).exec(function (err, notes) {
		if (err) throw err;


		fn(notes);
	});
};

Note.statics.findNote = function getNote(username, slug, fn) {
	this.findOne({noteOwner: username, noteSlug: slug}).exec(function (err, note) {
		if (err) throw err;


		fn(note);
	});
};

Note.statics.saveNote = function saveFunc(newNote, fn) {
	newNote.save(function (err) {
		if (err)
			throw err;


		fn(newNote._id);
	});
};

Note.statics.getAll = function getAll(fn) {
	this.find({}).exec(function (err, notes) {
		if (err) throw err;


		fn(notes);
	});
};

Note.statics.findComments = function (noteId, fn) {
	this.findOne({_id: ObjectId(noteId)}).exec(function (err, note) {
		if (err) throw err;

		if (note != null && note.comments != null) {

			fn(note.comments);
		} else {

			fn(null);
		}
	});
}

Note.statics.postComment = function (noteId, contents, username, fn) {
	this.findOne({_id: ObjectId(noteId)}).exec(function (err, note) {
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
}

Note.statics.star = function (noteId, userName, fn) {


	this.findOne({_id: ObjectId(noteId)}).exec(function (err, note) {
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
};

var db = mongoose.createConnection(process.env.CONSTRING || 'mongodb://localhost/oftenDb');
module.exports = db.model('Notes', Note);