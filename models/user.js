var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (db, crypt) {
    'use strict';

	var schema = new Schema({
		username: { type: String, required: true, index: { unique: true } },
		password: { type: String, required: true },
		email: {type: String, required: true}
	});

	schema.pre('save', function (next) {
		var user = this;

		// only hash the password if it has been modified (or is new)
		if (!user.isModified('password')) {
            return next();
        }

		crypt.hash(user.password,function(hash){
			user.password = hash;
			next();
		});

        return true;
	});

	var Model = db.model('Users', schema);

	return {
		authenticate: function (username, password, fn) {
			Model.findOne({ username: username}, function (err, user) {
				if (err) {
                    throw err;
                }

				if (!user) {
					fn(new Error('User Not Found'));
					return;
				}

				crypt.compare(password, user.password, function (err, isMatch) {
					if (err) {
						throw err;
					}
					if (isMatch) {
						fn(null, user);
					} else {
						fn(new Error('Invalid Password!'));
					}
				});
			});
		},

		register: function (username, password, email, fn) {
			var user = new Model();
			user.username = username;
			user.password = password;
			user.email = email;

			user.save(function (err) {
				if (err) {
                    throw err;
                }

				fn(null);
			});
		}
	};
};