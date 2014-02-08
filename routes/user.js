var models = projRequire('/models/index');

exports.isAuthenticated = function (req, res) {
	console.log(req.session.user);
	if (req.session.user) {
		res.status(200);
		res.end();
	} else {
		res.status(401);
		res.end();
	}
};

exports.authenticate = function (req, res) {
	models.User.authenticate(req.body.name.toLowerCase(), req.body.password, function (err, user) {
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
};

exports.register = function (req, res) {
	var isValid = true;
	var result = {
		isSuccessful: false,
		message: "Registration failed"
	};

	// Server side validation

	if (req.body.password != req.body.confirm)
		res.redirect('/user/register');

	if (isValid) {
		models.User.register(
			req.body.username.toLowerCase(),
			req.body.password,
			req.body.email,
			function (err) {
				if (err) {
					result.isSuccessful = false;
					result.message = "Registration failed.";
				}

				models.User.authenticate(req.body.username.toLowerCase(), req.body.password, function (err, user) {
					if (user) {
						req.session.regenerate(function () {
							req.session.user = user;
							result.isSuccessful = true;
							result.message = "Registration was successful."

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
};
