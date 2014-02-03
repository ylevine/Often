var bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	SALT_WORK_FACTOR = 10;

var User = new Schema({
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	email: {type: String, required: true}
});

User.statics.authenticate = function (username, password, fn) {
	this.findOne({ username: username}, function (err, user) {
		if (err) throw err;
		if (user) {
			user.comparePassword(password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return fn(null, user);
				} else {
					console.log('invalid password');
					fn(new Error("Invalid Password!"));
				}
			});
		} else {
			console.log('user not found');
			fn(new Error("User Not Found"));
		}
	});
};

User.methods.register = function (fn) {
	this.save(function (err) {
		if (err) throw err;
		fn(null);
	});
}

User.pre('save', function (next) {
	var user = this;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

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
});

User.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

var db = mongoose.createConnection(process.env.CONSTRING || 'mongodb://localhost/oftenDb');
module.exports = db.model('Users', User);