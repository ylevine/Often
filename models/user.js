//var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var	SALT_WORK_FACTOR = 10;

/**
 * User Model
 *
 * @param {Mongoose.Connection} db The database connection.
 */
module.exports = function(db) {

	var schema = new Schema({
						   username: { type: String, required: true, index: { unique: true } },
						   password: { type: String, required: true },
						   email: {type: String, required: true}
					   });

	schema.pre('save', function (next) {
		// only hash the password if it has been modified (or is new)
		if (!this.isModified('password')) return next();

		return next();
		/*

		 // generate a salt
		 bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		 if (err) return next(err);

		 // hash the password using our new salt
		 bcrypt.hash(user.password, salt, function (err, hash) {
		 if (err) return next(err);

		 // override the cleartext password with the hashed one
		 user.password = hash;
		 next();
		 });
		 });
		 */
	});

	/**
	 * @type {Mongoose.Model}
	 */
	var model = db.model('Users', schema);

	/**
	 * Private functions.
	 */
	function _comparePassword(candidatePassword, cb) {
		cb(null, true);
		/*
		 bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		 if (err) return cb(err);
		 cb(null, isMatch);
		 });
		 */
	};

	/**
	 * Creates a new user module.
	 *
	 * @constructs
	 */
	return {
		authenticate: function (username, password, fn) {
			model.findOne({ username: username}, function (err, user) {
				if (err) throw err;
				if (user) {
					_comparePassword(password, function (err, isMatch) {
						if (err) throw err;
						if (isMatch) {
							return fn(null, user);
						}
						console.log('invalid password');
						return fn(new Error("Invalid Password!"));
					});
				} else {
					console.log('user not found');
					fn(new Error("User Not Found"));
				}
			});
		},
		register: function (fn) {
			model.save(function (err) {
				if (err) throw err;
				fn(null);
			});
		}
	};
};