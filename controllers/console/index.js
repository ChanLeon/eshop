'use strict';
let log4js = require('log4js');
let logger = log4js.getLogger();
let moment = require('moment');
let cipher = require('util-cipher');
let fs = require('fs');
let path = require('path');
let async = require('async');
let auth = require('../../lib/auth').auth;
let picInfo = require('../../models/scroll_pic');
let ladyPic = require('../../models/lady_pic');
let bagsPic = require('../../models/bags');
let shoesPic = require('../../models/shoes');

module.exports = function(router){
    router.get('/admin/upload', auth, function(req, res) {
        if(req.session.info) {
            var scrollArr = req.session.scrollArr;
            if(scrollArr.length == 0){
                res.locals.picOne = '';
                res.locals.picTwo = '';
                res.locals.picThree = '';
            }else {
                res.locals.picOne = scrollArr[0];
                res.locals.picTwo = scrollArr[1];
                res.locals.picThree = scrollArr[2];
            }            
            var picNumber = req.session.scrollPicNum;            
            res.locals.clothesArr = req.session.clothesArr;  //女装图片路径数组
            res.locals.clothResult = req.session.clothResult;  //女装图片数据数组
            console.log('picNumber', picNumber);
            res.render('console/index', {
                console: 'console',
                picNumber: picNumber
            });
        }else {
            res.render('contact/rs', {
                err: '请先登录',
                cb: '/account/login'
            });
            // res.render('console/index');
        }
    })

    router.post('/admin/upload', function(req, res) {

        var thePath = ['scroll', 'create'].indexOf(req.body.scrollPic) > -1 && '../../public/scroll' || ['clothAdd' , 'clothEdit' , 'clothDel'].indexOf(req.body.scrollPic) > -1 && '../../public/clothes' || ['bagsAdd','bagsEdit','bagsDel'].indexOf(req.body.scrollPic) > -1 && '../../public/bags' || '../../public/shoes'

        console.log('thePath', thePath);
        var picCond = req.body;
        console.log('pic cond=====', picCond);
        var picTime = moment().format('YYYY-MM-DD HH:mm:ss');
        if(req.files.file && req.files.file.name) {
            try {
                var temName = req.files.file.name;
                var temPath = req.files.file.path;
                var picPath = path.join(__dirname, thePath);
                console.log('picPath====1', picPath);
                if(!fs.existsSync(picPath)) {
                    fs.mkdirSync(picPath);
                }
                console.log('picPath====2', picPath);
                var targetPath = path.join(picPath, temName);
                var readStream = fs.createReadStream(temPath);
                var writeStream = fs.createWriteStream(targetPath);
                readStream.pipe(writeStream);
                readStream.on('end', function(){
                    fs.unlinkSync(temPath);
                    if(picCond.scrollPic == 'create' || picCond.scrollPic == 'scroll'){
                        var condition = {
                            picId: cipher.md5['+'](picCond.scrollPic + picTime),
                            picUrl: targetPath,
                            picFlat: parseInt(picCond.flag),
                            picTime: picTime
                        }
                    }else {
                        var cond = {
                            picId: cipher.md5['+'](picCond.scrollPic + picTime),
                            picUrl: targetPath,
                            picFlat: parseInt(picCond.flag),
                            picTime: picTime
                        }
                        if(picCond.picName == '' && picCond.picPrice != '') {
                            cond.picPrice = picCond.picPrice;
                        }else if(picCond.picName != '' && picCond.picPrice == '') {
                            cond.picName = picCond.picName;
                        }else if(picCond.picName != '' && picCond.picPrice != '') {
                            cond.picPrice = picCond.picPrice;
                            cond.picName = picCond.picName;
                        }
                        logger.info('cond====', cond);
                    }
                    if(picCond.scrollPic == 'create') {
                        picInfo.create(condition, function(err, result){
                            if(err){
                               logger.info('创建滚动图片数据库出错', err);
                                res.render('contact/rs', {
                                    err: '创建滚动图片数据库出错',
                                    cb: '/console/admin/upload'
                                }); 
                            }else {
                                logger.info('create result==', result);
                                picInfo.count(function(error, data) {
                                    if(error) {
                                        logg.info('查询picInfo集合中的文档数错误', error);
                                        res.render('contact/rs', {
                                            err: '查询picInfo集合中的文档数错误',
                                            cb: '/console/admin/upload'
                                        });
                                    }else {
                                        if(data < 3) {
                                            req.session.scrollPicNum = data;
                                            res.redirect('/console/admin/upload');
                                        }else {
                                            req.session.scrollPicNum = data;
                                            res.redirect('/home/index'); 
                                        }
                                    }
                                });                                                             
                            }                
                        })  
                    }else if(picCond.scrollPic == 'scroll') {
                        picInfo.findOneAndUpdate({picFlat: parseInt(picCond.flag)}, {
                            '$set':condition
                        },{
                            'upsert': true
                        }, function(err, result){
                            if(err){
                               logger.info('更换滚动图片出错', err);
                                res.render('contact/rs', {
                                    err: '更换滚动图片出错',
                                    cb: '/console/admin/upload'
                                }); 
                            }else {
                                logger.info('scroll result==', result);
                                res.redirect('/home/index')
                            }                
                        }) 
                    }else if(picCond.scrollPic == 'clothAdd' || picCond.scrollPic == 'bagsAdd' || picCond.scrollPic == 'shoesAdd') {
                        var addDb = picCond.scrollPic == 'clothAdd' ? ladyPic : picCond.scrollPic == 'bagsAdd' ? bagsPic : shoesPic;
                        var addLink = picCond.scrollPic == 'clothAdd' ? '/product/womenCloth' : picCond.scrollPic == 'bagsAdd' ? '/product/womenBag' : '/product/womenShoes';
                        var addSplit = picCond.scrollPic == 'clothAdd' ? '/eshop/public/clothes/' : picCond.scrollPic == 'bagsAdd' ? '/eshop/public/bags/' : '/eshop/public/shoes/';
                        async.auto({
                            'searchResult': function(cb) {
                                addDb.find(function(error, searchData) {
                                    if(error) {
                                        logger.info('在增加商品时，查询数据库出错', error);
                                        cb({
                                            err: '在增加商品时，查询数据库出错',
                                            cb: '/console/admin/upload'
                                        });
                                    }else {
                                        logger.info('在增加商品时，查询数据库成功');
                                        cb(null, searchData);
                                    }
                                })
                            },
                            'createResult': ['searchResult', function(callback, cbSearchResult) {
                                var searchArr = cbSearchResult.searchResult;
                                searchArr.forEach(function(goodsData, i) {
                                    var goodsName = goodsData.picUrl.split(addSplit)[1];
                                    var goodsFlag = goodsData.picFlat;
                                    if(goodsName == temName && goodsFlag == picCond.flag) {
                                        callback(null, {
                                            err: '图片名称重复与图片标识号重复',
                                            cb: '/console/admin/upload'
                                        });
                                    }else if(goodsName == temName && goodsFlag != picCond.flag) {
                                       callback(null, {
                                            err: '图片名称重复',
                                            cb: '/console/admin/upload'
                                        });
                                    }else if(goodsName != temName && goodsFlag == picCond.flag) {
                                       callback(null, {
                                            err: '图片标识重复',
                                            cb: '/console/admin/upload'
                                        });
                                    }else {
                                        addDb.create(cond, function(err_, clothResult){
                                            if(err_){
                                                logger.info('创建数据库出错', err_);
                                                callback({
                                                    err: '创建数据库出错',
                                                    cb: '/console/admin/upload'
                                                });
                                            }else {
                                                logger.info('创建数据库成功', clothResult);
                                                callback(null,  {
                                                    err: '成功增加商品',
                                                    cb: addLink
                                                });                                                             
                                            }                
                                        })
                                    }                                   
                                })
                            }]
                        }, function(err, clothAddResult) {
                            if(err) {
                                res.render('contact/rs', err); 
                            }else {
                                res.render('contact/rs', clothAddResult.createResult);
                            }
                        })
                    }else if(picCond.scrollPic == 'clothEdit') {
                        ladyPic.findOneAndUpdate({picFlat: parseInt(picCond.flag)}, {
                            '$set':cond
                        },{
                            'upsert': true
                        }, function(err, clothEditResult){
                            if(err){
                                logger.info('编辑商品出错', err);
                                res.render('contact/rs', {
                                    err: '编辑商品出错',
                                    cb: '/console/admin/upload'
                                }); 
                            }else {
                                logger.info('scroll result==', clothEditResult);
                                res.render('contact/rs', {
                                    err: '编辑商品完成',
                                    cb: '/product/womenCloth'
                                });
                            }                
                        }) 
                    }                  
                })
            }catch(e) {
                logger.trace('导入图片出现错误', e);
                return false;
            }
        }else {
            try {
                var cond = {
                    picId: cipher.md5['+'](picCond.scrollPic + picTime),
                    picFlat: parseInt(picCond.flag),
                    picTime: picTime
                }
                if(picCond.picName == '' && picCond.picPrice != '') {
                    cond.picPrice = picCond.picPrice;
                }else if(picCond.picName != '' && picCond.picPrice == ''){
                    cond.picName = picCond.picName;
                }else if(picCond.picName != '' && picCond.picPrice != '') {
                    cond.picPrice = picCond.picPrice;
                    cond.picName = picCond.picName;
                }
                logger.info('cond====', cond);

                if(picCond.scrollPic == 'clothEdit') {
                    ladyPic.findOneAndUpdate({picFlat: parseInt(picCond.flag)}, {
                        '$set':cond
                    },{
                        'upsert': true
                    }, function(err, result){
                        if(err){
                            logger.info('编辑商品出错', err);
                            res.render('contact/rs', {
                                err: '编辑商品出错',
                                cb: '/console/admin/upload'
                            }); 
                        }else {
                            res.render('contact/rs', {
                                err: '编辑商品完成',
                                cb: '/product/womenCloth'
                            });
                        }                
                    }) 
                }else if(picCond.scrollPic == 'clothDel') {
                    async.series({
                        'searchPic': function(cb) {
                            ladyPic.findOne({picFlat: parseInt(picCond.flag)}, function(err, searchPicInfo) {
                                if(err) {
                                    logger.info('查询被删除商品信息出错', err);
                                    cb({
                                        err: '查询被删除商品信息出错',
                                        cb: '/console/admin/upload' 
                                    })
                                }else {
                                    logger.info('查询被删除商品信息', searchPicInfo);
                                    cb(null,searchPicInfo.picUrl);
                                }
                            })
                        },
                        'removeInfo': function(callback) {
                            ladyPic.remove({picFlat: parseInt(picCond.flag)}, function(err) {
                                if(err){
                                    logger.info('删除女装商品出错', err);
                                    callback({
                                        err: '删除女装商品出错',
                                        cb: '/console/admin/upload'
                                    }); 
                                }else {
                                    logger.info('删除女装商品成功');
                                    callback(null, {
                                        err: '删除商品成功',
                                        cb: '/product/womenCloth'
                                    }); 
                                } 
                            })
                        }
                    }, function(err, clothDelInfo) {
                        if(err) {
                            res.render('contact/rs',err);
                        }else {
                            logger.info('查询被删除商品的存储url信息', clothDelInfo.searchPic);
                            var picUrlInfo = clothDelInfo.searchPic;
                            if(picUrlInfo) {
                                fs.unlinkSync(picUrlInfo);
                                res.render('contact/rs',clothDelInfo.removeInfo);
                            }else {
                                res.render('contact/rs',{
                                    err: '商品的路径不存在，删除失败',
                                    cb: '/product/womenCloth'
                                });
                            }
                        }
                    })
                }
            }catch(e) {
                logger.trace('编辑商品或者删除商品出错', e);
                return false;
            }
        }
    })
}