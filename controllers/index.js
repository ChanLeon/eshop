module.exports = function(router) {
	router.get('/',  function(req, res) {
		res.redirect("/home/index");
	});
	
}