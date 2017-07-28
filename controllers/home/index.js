'use strict';
let auth = require('../../lib/auth').auth;

module.exports = function(router) {
    router.get('/index', auth, function(req, res) {
        res.render('home/index', {
            index: 'index'
        });
    })
}