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
                clothResult.forEach(function(pic) {
                    clothesArr.push(pic.picUrl.split('/eshop/public')[1]);
                })
                req.session.clothesArr = clothesArr;  //女装图片路径数组
                req.session.clothResult = clothResult;  //女装图片数据数组
                res.locals.clothResult = clothResult;
                res.locals.clothesArr = clothesArr;
                res.render('product/womenCloth',{
                    womenCloth: 'womenCloth'
                });    			
    		}
    	});
    })

    router.get('/womenBag', auth, function(req, res) {
        var bagsArr = [];
    	bagsPic.find(function(err, bagResult) {
    		if(err){
    			logger.info('查询女包数据出错', err);
                res.render('contact/rs', {
                    err: '查询女包数据出错',
                    cb: '/home/index'
                });
    		}else {
                bagResult.forEach(function(pic) {
                    bagsArr.push(pic.picUrl.split('/eshop/public')[1]);
                })
                req.session.bagsArr = bagsArr;  //女包图片路径数组
                req.session.bagResult = bagResult;  //女包图片数据数组
                res.locals.bagResult = bagResult;
                res.locals.bagsArr = bagsArr;
                res.render('product/womenBag',{
                    womenBag: 'womenBag'
                });   			
    		}
    	});        
    })

    router.get('/womenShoes', auth, function(req, res) {
        var shoesArr = [];
        shoesPic.find(function(err, shoesResult) {
            if(err){
                logger.info('查询女鞋数据出错', err);
                res.render('contact/rs', {
                    err: '查询女鞋数据出错',
                    cb: '/home/index'
                });
            }else {
                shoesResult.forEach(function(pic) {
                    shoesArr.push(pic.picUrl.split('/eshop/public')[1]);
                })
                res.locals.shoesResult = shoesResult;
                res.locals.shoesArr = shoesArr;
                req.session.shoesArr = shoesArr;  //女鞋图片路径数组
                req.session.shoesResult = shoesResult;  //女鞋图片数据数组
                res.render('product/womenShoes',{
                    womenShoes: 'womenShoes'
                });            
            }
        });
    })
}