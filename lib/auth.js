'use strict';
var auth = function () {
     res.locals.userInfo = req.session.info;
     next();
}
module.exports = {
    auth: 'auth'
}