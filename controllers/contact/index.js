'use strict';
var log4js = require('log4js'),
	logger = log4js.getLogger();

module.exports = function(router) {
	router.get('/rs/success/:type', function(req, res) {
        res.render('contact/rs', {
            time: req.query.time,
            err: req.query.err,
            cb: req.query.cb
        });
    });
};