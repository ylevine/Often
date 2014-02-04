/**
 * A hack to use absolute paths for require. This might break testing?
 */
var projectDir = __dirname;
GLOBAL.projRequire = function( path ) {
	return require(__dirname + path);
};

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var routes = projRequire('/routes/index');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
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
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.Home.home);
app.get('/api/note/get', routes.Note.getAll);
app.get('/api/note/get/:username', routes.Note.getUserNotes);
app.get('/api/note/get/:username/:slug', routes.Note.getNote);
app.post('/api/note/post', routes.Note.saveNote);
app.get('/api/note/search', routes.Note.getSearchedNotes);

app.get('/user/checkAuth', routes.User.isAuthenticated);
app.post('/user/authenticate', routes.User.authenticate);
app.post('/user/logoff', routes.User.logoff);
app.post('/user/register', routes.User.register);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
