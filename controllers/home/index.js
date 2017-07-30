'use strict';
let auth = require('../../lib/auth').auth;
let picInfo = require('../../models/scroll_pic');
let log4js = require('log4js');
let logger = log4js.getLogger();

module.exports = function(router) {
    router.get('/index', auth, function(req, res) {
    	var scrollArr = [];
    	picInfo.find({}, null, null, function(err, result) {
    		if(err){
    			logger.info('查询页面数据出错', err);
                res.render('contact/rs', {
                    err: '查询数据出错',
                    cb: '/home/index'
                });
    		}else {
    			logger.info('result', result);
    			result.forEach(function(pic) {
    				scrollArr.push(pic.picUrl.split('/eshop')[1]);
    			})
    			req.session.scrollArr = scrollArr;
		        res.render('home/index', {
		            index: 'index',
		            picOne: scrollArr[0],
		            picTwo: scrollArr[1],
		            picThree: scrollArr[2]
		        });
    		}
    	});
    })
}