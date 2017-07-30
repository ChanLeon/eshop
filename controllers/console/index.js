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

module.exports = function(router){
    router.get('/admin/upload', auth, function(req, res) {
        if(req.session.info) {
            var scrollArr = req.session.scrollArr;
            res.locals.picOne = scrollArr[0];
            res.locals.picTwo = scrollArr[1];
            res.locals.picThree = scrollArr[2];
            var picNumber = req.session.scrollPicNum;
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
        }
    })

    router.post('/admin/upload', function(req, res) {
        var thePath = req.body.scrollPic == 'scroll' || 'create' ? '../../upload/scroll' : '';        
        console.log('pic cond', thePath);
        var picCond = req.body;
    	var picTime = moment().format('YYYY-MM-DD HH:mm:ss');
        if(req.files.file && req.files.file.name) {
            try {
                var temName = req.files.file.name;
                var temPath = req.files.file.path;
                var picPath = path.join(__dirname, thePath);
                if(!fs.existsSync(picPath)) {
                    fs.mkdirSync(picPath);
                }
                var targetPath = path.join(picPath, temName);
                var readStream = fs.createReadStream(temPath);
                var writeStream = fs.createWriteStream(targetPath);
                readStream.pipe(writeStream);
                readStream.on('end', function(){
                    fs.unlinkSync(temPath);
                    var condition = {
                        picId: cipher.md5['+'](picCond.picUrl + picTime),
                        picUrl: targetPath,
                        picFlat: parseInt(picCond.flag),
                        picTime: picTime
                    }
                    if(picCond.scrollPic == 'create') {
                        picInfo.create(condition, function(err, result){
                            if(err){
                               logger.info('创建数据库出错', err);
                                res.render('contact/rs', {
                                    err: '创建数据库出错',
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
                        picInfo.findOneAndUpdate({picFlat: picCond.flag}, {
                            '$set':condition
                        },{
                            'upsert': true
                        }, function(err, result){
                            if(err){
                               logger.info('创建数据库出错', err);
                                res.render('contact/rs', {
                                    err: '创建数据库出错',
                                    cb: '/console/admin/upload'
                                }); 
                            }else {
                                logger.info('scroll result==', result);
                                res.redirect('/home/index')
                            }                
                        }) 
                    }
                    
                })
            }catch(e) {
                logger.trace('导入图片出现错误', e);
                return false;
            }
        }
    })
}