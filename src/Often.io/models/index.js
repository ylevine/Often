var ConnectModule = projRequire('/models/connect');
var UserModule = projRequire('/models/user');
var NoteModule = projRequire('/models/note');

exports.User = new UserModule(ConnectModule.connection);
exports.Note = new NoteModule(ConnectModule.connection);
