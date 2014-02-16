/**
 * A hack to use absolute paths for require. This might break testing?
 */
GLOBAL.projRequire = function (path) {
    'use strict';

	return require(__dirname + path);
};

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var namespace = require('express-namespace');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);

app.use(
    require('less-middleware')({
        src: path.join(__dirname, 'public/stylesheets/less'),
        dest: path.join(__dirname, 'public/stylesheets'),
        prefix: '/stylesheets'
    })
);

app.use(express.static(path.join(__dirname, 'public')));

// check for crypt mode on command arguments

if (process.argv.length) {
    process.argv.forEach(function (val, index) {
        'use strict';

        if (val.toLowerCase() === 'crypt=sha1') {
            console.log('----------------------------------------');
            console.log('Crypt Mode: SHA1');
            console.log('----------------------------------------');
            // I don't know any other way to pass a flag to a module.
            GLOBAL.allow_sha1_passwords = true;
        }
    });
}

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

// load after error handling added
var routes = projRequire('/routes/index');
app.get('/', routes.Home.home);

app.namespace('/api', function () {
    'use strict';

    app.namespace('/note', function () {
        app.get('/get', routes.Note.getAll);
        app.get('/get/:username', routes.Note.getUserNotes);
        app.get('/get/:username/:slug', routes.Note.getNote);
        app.post('/post', routes.Note.saveNote);
        app.get('/search', routes.Note.getSearchedNotes);
		app.get('/filter', routes.Note.getFilteredNotes);
        app.get('/:noteId/star', routes.Note.star);
    });
});

app.namespace('/user', function () {
    'use strict';

    app.get('/checkAuth', routes.User.isAuthenticated);
    app.post('/authenticate', routes.User.authenticate);
    app.post('/logoff', routes.User.logoff);
    app.post('/register', routes.User.register);
});

// catch unhandled errors,  instead of exiting server.js.
process.on('uncaughtException', function(err) {
	'use strict';
	if(err.stack !== 'undefined')
	{
		console.log(err.stack);
		return;
	}
	console.log(err);
});

// record when the server exists
process.on('exit',function(code){
	'use strict';
	console.log('About to exit with code:', code);
});

http.createServer(app).listen(app.get('port'), function () {
    'use strict';

    console.log('Express server listening on port ' + app.get('port'));
});
