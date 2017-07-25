module.exports = function(router) {
    router.get('/index', function(req, res) {
        res.render('contact/index', {
            contact: 'contact'
        });
    })
}