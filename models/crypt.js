var SALT_WORK_FACTOR = 10;

module.exports = function () {
    'use strict';

	var bcrypt = true,
        crypt = null;

	if(GLOBAL.allow_sha1_passwords === true) {
		try {
			require.resolve('bcrypt');
			// will not reach here if module is not installed
			crypt = require('bcrypt');
		} catch (e) {
			// bcrypt is not installed
			console.error(e.stack);
			console.error('Warning: Using regular crypto module and SHA1');

			bcrypt = false;
			crypt = require('crypto');
		}
	} else {
		crypt = require('bcrypt');
	}

	return {
		hash: function (password, done) {
			if (bcrypt) {
				// generate a salt
				crypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
					if (err) {
						throw new Error(err);
					}
					// hash the password using our new salt
					crypt.hash(password, salt, function (err, hash) {
						if (err) {
							throw new Error(err);
						}
						done(hash);
					});
				});
			} else {
				var sha = crypt.createHash('sha1');
				sha.update('L2erRNp1YtPisfPHE3paBIeRodroHnFlOQjZFfFt'); // extra random saltiness
				sha.update(SALT_WORK_FACTOR);
				sha.update(password);
				done(sha.digest('hex'));
			}
		},

		compare: function (candidatePassword, userPassword, done) {
			if(bcrypt) {
				crypt.compare(candidatePassword, userPassword, function (err, isMatch) {
					if (err) {
						return done(err);
					}
					return done(null, isMatch);
				});
			} else {
				return done(null, candidatePassword === userPassword);
			}
		}
	};
};