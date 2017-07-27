'use strict';
let log4js = require('log4js');
let logger = log4js.getLogger();
let moment = require('moment');
let auth = require('../../lib/auth').auth;
let picInfo = require('../../models/upload');

module.exports = function(router){
    router.get('/admin/upload', auth, function(req, res) {
        res.render('console/index', {
            console: 'console'
        });
    })

    router.post('/admin/upload', function(req, res) {
    	var picTime = moment().format('YYYY-MM-DD HH:mm:ss');
    	var picCond = req.body;
    	logger.info('picCond', picCond);
    	return false;
    })
}