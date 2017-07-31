'use strict';
let auth = require('../../lib/auth').auth;
let log4js = require('log4js');
let logger = log4js.getLogger();
let ladyPic = require('../../models/lady_pic');
let bagsPic = require('../../models/bags');
let shoesPic = require('../../models/shoes');

module.exports = function(router) {
    router.get('/womenCloth', auth, function(req, res) {
        var clothesArr = [];
    	ladyPic.find({}, null, null, function(err, clothResult) {
    		if(err){
    			logger.info('查询女装数据出错', err);
                res.render('contact/rs', {
                    err: '查询女装数据出错',
                    cb: '/home/index'
                });
    		}else {
    			logger.info('clothResult', clothResult);
    			clothResult.forEach(function(pic) {
    				clothesArr.push(pic.picUrl.split('/eshop/public')[1]);
    			})
                req.session.clothesArr = clothesArr;
                res.locals.clothesArr = clothesArr;
				logger.info('clothesArr====', clothesArr);
		        res.render('product/womenCloth',{
                    womenCloth: 'womenCloth'
		        });
    		}
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