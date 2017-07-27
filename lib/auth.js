'use strict';
var auth = function(req, res, next) {
	var passInfo = req.session.info;
	if(passInfo){
		res.locals.userInfo = passInfo;     	
	}
	next();	  
}
module.exports = {
    'auth': auth
}