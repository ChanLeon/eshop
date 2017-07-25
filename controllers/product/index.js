module.exports = function(router) {
    router.get('/womenCloth', function(req, res) {
        res.render('product/womenCloth',{
            womenCloth: 'womenCloth'
        });
    })

    router.get('/womenBag', function(req, res) {
        res.render('product/womenBag',{
            womenBag: 'womenBag'
        });
    })

    router.get('/womenShoes', function(req, res) {
        res.render('product/womenShoes',{
            womenShoes: 'womenShoes'
        });
    })

    router.get('/childCloth', function(req, res) {
        res.render('product/childCloth',{
            childCloth: 'childCloth'
        });
    })
}