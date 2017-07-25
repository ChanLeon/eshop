module.exports = function(router) {
    router.get('/index', function(req, res) {
        res.render('home/index', {
            index: 'index'
        });
    })
}