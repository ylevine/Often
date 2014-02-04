var mongoose = require('mongoose');

exports.connection = mongoose.createConnection(process.env.CONSTRING || 'mongodb://localhost/oftenDb');
