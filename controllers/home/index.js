'use strict';
let auth = require('../../lib/auth').auth;
let picInfo = require('../../models/scroll_pic');
let ladyPic = require('../../models/lady_pic');
let bagsPic = require('../../models/bags');
let shoesPic = require('../../models/shoes');
let log4js = require('log4js');
let logger = log4js.getLogger();
let async = require('async');

module.exports = function(router) {
    router.get('/index', auth, function(req, res) {
        async.parallel({
            'indexSearch': function(cb) {
                var scrollArr = [];
                picInfo.find({}, null, null, function(err, result) {
                    if(err){
                        logger.info('查询页面数据出错', err);
                        cb({
                            err: '查询数据出错',
                            cb: '/home/index'
                        });
                    }else {
                        if(result.length == 0) {
                            req.session.scrollArr = [];
                            req.session.scrollPicNum = 0;
                            cb(null, {
                                index: 'index',
                                picOne: '',
                                picTwo: '',
                                picThree: ''
                            });
                        }else {
                            result.forEach(function(pic) {
                                scrollArr.push(pic.picUrl.split('/eshop/public')[1]);
                            })
                            req.session.scrollArr = scrollArr;
                            req.session.scrollPicNum = scrollArr.length;
                            cb(null, {
                                index: 'index',
                                picOne: scrollArr[0],
                                picTwo: scrollArr[1],
                                picThree: scrollArr[2]
                            })
                        }
                    }
                });
            },
            'ladyClothes': function(cb) {
                var clothesArr = [];
                ladyPic.find(function(err, clothResult) {
                    if(err){
                        logger.info('查询女装数据出错', err);
                        cb({
                            err: '查询女装数据出错',
                            cb: '/home/index'
                        })
                    }else {
                        clothResult.forEach(function(pic) {
                            clothesArr.push(pic.picUrl.split('/eshop/public')[1]);
                        })
                        req.session.clothesArr = clothesArr;  //路径数组
                        req.session.clothResult = clothResult; //数据库所有数据数组
                        cb();            
                    }
                });
            },
            'ladyBags': function(cb) {
                var bagsArr = [];
                bagsPic.find(function(err, bagResult) {
                    if(err){
                        logger.info('查询女包数据出错', err);
                        cb({
                            err: '查询女包数据出错',
                            cb: '/home/index'
                        })
                    }else {
                        bagResult.forEach(function(pic) {
                            bagsArr.push(pic.picUrl.split('/eshop/public')[1]);
                        })
                        req.session.bagsArr = bagsArr;  //路径数组
                        req.session.bagResult = bagResult; //数据库所有数据数组
                        cb();           
                    }
                }); 
            },
            'ladyShoes': function(cb) {
                var shoesArr = [];
                shoesPic.find(function(err, shoesResult) {
                    if(err){
                        logger.info('查询女鞋数据出错', err);
                        cb({
                            err: '查询女鞋数据出错',
                            cb: '/home/index'
                        })
                    }else {
                        shoesResult.forEach(function(pic) {
                            shoesArr.push(pic.picUrl.split('/eshop/public')[1]);
                        })
                        req.session.shoesArr = shoesArr;  //路径数组
                        req.session.shoesResult = shoesResult; //数据库所有数据数组
                        cb();        
                    }
                });
            }
        }, function(err, allResult) {
            if(err) {
                res.render('contact/rs', err);
            }else {
                res.render('home/index',allResult.indexSearch);
            }
        })
    	
    })
}