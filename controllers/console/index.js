'use strict';

module.exports = function(router){
    router.get('/login',auth, function(req, res){
        res.redirect('/console/admin/upload');
    })
    router.get('/admin/upload',function(req, res) {
        res.render('console/index', {
            console: 'console'
        });
    })
}