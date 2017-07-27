let auth = require('../../lib/auth').auth;

module.exports = function(router) {
    router.get('/womenCloth', auth, function(req, res) {
        res.render('product/womenCloth',{
            womenCloth: 'womenCloth'
        });
    })

    router.get('/womenBag', auth, function(req, res) {
        res.render('product/womenBag',{
            womenBag: 'womenBag'
        });
    })

    router.get('/womenShoes', auth, function(req, res) {
        res.render('product/womenShoes',{
            womenShoes: 'womenShoes'
        });
    })

    router.get('/childCloth', auth, function(req, res) {
        res.render('product/childCloth',{
            childCloth: 'childCloth'
        });
    })
}