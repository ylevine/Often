exports.home = function (req, res){
    'use strict';

	res.render('index', { title: 'Express' });
};
