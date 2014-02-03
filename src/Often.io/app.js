
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var note = require('./routes/note');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

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
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/api/note/get', note.getAll);
app.get('/api/note/get/:username', note.getUserNotes);
app.get('/api/note/get/:username/:slug', note.getNote);
app.post('/api/note/post', note.saveNote);
app.get('/api/note/search', note.getSearchedNotes);

app.get('/user/checkAuth', user.isAuthenticated);
app.post('/user/authenticate', user.authenticate);
app.post('/user/logoff', user.logoff);
app.post('/user/register', user.register);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
