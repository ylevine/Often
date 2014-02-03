var User = require('../models/user');

exports.isAuthenticated = function (req, res) {
	if (req.session.user) {
		res.status(200);
		res.end();
	} else {
		res.status(401);
		res.end();
	}
}

exports.authenticate = function (req, res) {
	User.authenticate(req.body.name.toLowerCase(), req.body.password, function (err, user) {
		if (user) {
			req.session.regenerate(function () {
				req.session.user = user;
				res.json({
					isSuccessful: true
				})
			});
		} else {
			res.json({
				isSuccessful: false
			})
		}
	});
};

exports.logoff = function (req, res) {
	req.session.destroy(function () {
		res.status(200);
		res.end();
	});
}

exports.register = function(req, res) {
	var isValid = true;
	var result = {
		isSuccessful: false,
		message: "Registration failed"
	};

	// Server side validation

	if (req.body.password != req.body.confirm)
		res.redirect('/user/register');

	if (isValid) {
		var user = new User({
			username: req.body.username.toLowerCase(),
			password: req.body.password,
			email: req.body.email
		});

		user.register(function (err) {
			if (err) {
				result.isSuccessful = false;
				result.message = "Registration failed.";
			}

			User.authenticate(req.body.username.toLowerCase(), req.body.password, function (err, user) {
				if (user) {
					req.session.regenerate(function () {
						req.session.user = user;
						result.isSuccessful = true;

						res.json(result);
					});
				} else {
					result.isSuccessful = false;
					result.message = "Registration was successful, but login failed. Please retry.";

					res.json(result);
				}
			});
		});
	} else {
		result.isSuccessful = false;
		result.message = "Invalid Entry";

		res.json(result);
	}
}