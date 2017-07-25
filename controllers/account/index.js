module.exports = function(router) {
    router.get('/login', function(req, res) {
        res.render('account/login', {
            login: 'login'
        });
    })

    router.get('/register', function(req, res) {
        res.render('account/register', {
            reg: 'reg'
        });
    })
}