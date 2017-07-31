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
        console.log('pic cond', picCond);
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
                            picId: cipher.md5['+'](picCond.picUrl + picTime),
                            picUrl: targetPath,
                            picFlat: parseInt(picCond.flag),
                            picTime: picTime
                        }
                    }else {
                        var cond = {
                            picId: cipher.md5['+'](picCond.picUrl + picTime),
                            picUrl: targetPath,
                            picName: picCond.picName, 
                            picPrice : picCond.picPrice,
                            picFlat: parseInt(picCond.flag),
                            picTime: picTime
                        }
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
                    }else if(picCond.scrollPic == 'clothAdd') {
                        ladyPic.create(cond, function(err, clothResult){
                            if(err){
                               logger.info('创建女装数据库出错', err);
                                res.render('contact/rs', {
                                    err: '创建女装数据库出错',
                                    cb: '/console/admin/upload'
                                }); 
                            }else {
                                logger.info('create clothResult==', clothResult);
                                res.redirect('/product/womenCloth');                                                             
                            }                
                        })
                    }                    
                })
            }catch(e) {
                logger.trace('导入图片出现错误', e);
                return false;
            }
        }else {
            var cond = {
                picId: cipher.md5['+'](picCond.picUrl + picTime),
                picName: picCond.picName, 
                picPrice: picCond.picPrice,
                picFlat: parseInt(picCond.flag),
                picTime: picTime
            }
            if(picCond.scrollPic == 'clothEdit') {
                ladyPic.findOneAndUpdate({picFlat: parseInt(picCond.flag)}, {
                    '$set':cond
                },{
                    'upsert': true
                }, function(err, result){
                    if(err){
                       logger.info('编辑女装商品出错', err);
                        res.render('contact/rs', {
                            err: '编辑女装商品出错',
                            cb: '/console/admin/upload'
                        }); 
                    }else {
                        logger.info('scroll result==', result);
                        res.redirect('/product/womenCloth');
                    }                
                }) 
            }
        }
    })
}