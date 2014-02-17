var ConnectModule = projRequire('/models/connect');
var UserModule = projRequire('/models/user');
var NoteModule = projRequire('/models/note');
var CryptModule = projRequire('/models/crypt');

var crypt = new CryptModule();
exports.User = new UserModule(ConnectModule.connection, crypt);
exports.Note = new NoteModule(ConnectModule.connection);
