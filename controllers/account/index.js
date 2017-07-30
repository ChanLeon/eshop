'use strict';
let log4js = require('log4js');
let logger = log4js.getLogger();
let moment = require('moment');
let cipher = require('util-cipher');
let async = require('async');
let userInfo = require('../../models/user_info');
let auth = require('../../lib/auth').auth;

module.exports = function(router) {
    router.get('/auto_login', function(req, res, next){
		logger.info('router in auto login --->');
		res.render('account/autoLogin', {
			username: req.session.regUserName,
			passwd: req.session.regPasswd
		})
    })
    
    router.get('/login', auth, function(req, res) {
        res.render('account/login', {
            login: 'login'
        });
    })

    //登录
    router.post('/login', function(req, res) {
        var loginTime = moment().format('YYYY-MM-DD HH:mm:ss');
        if(req.body.username == 'zhihaoadmin' && req.body.passwd == 'admin@#$7352313'){
            userInfo.findOneAndUpdate({username: 'zhihaoadmin'},{
                '$set':{
                    'login_time':loginTime
                }
            },function(err, data){
                if(err){
                    logger.info('登录时查询数据出错', err);
                    res.render('contact/rs', {
                        err: '查询数据出错',
                        cb: '/account/login'
                    });
                }else {
                    req.session.info = data;
                    res.locals.userInfo = req.session.info;
                    res.redirect('/home/index');
                }
            })
        }else {
            var condition = {
                username: req.body.username,
                passwd: cipher.md5['+'](req.body.passwd)
            }

            userInfo.findOneAndUpdate(condition,{
                '$set': {
                    'login_time':loginTime
                }
            },function(err,result){
                if(err){
                    logger.info('登录时查询数据出错', err);
                    res.render('contact/rs', {
                        err: '查询数据出错',
                        cb: '/account/login'
                    });
                }else {
                    logger.info('result是什么', result);
                    if(result == null || result == '' || result == undefined){
                        res.render('contact/rs', {
                            err: '用户名或密码错误',
                            cb: '/account/login'
                        });  
                    }else{
                        req.session.info = result;
                        res.locals.userInfo = req.session.info;
                        res.redirect('/home/index');
                    }                
                }            
            })
        }
    })

    //退出登录
    router.get('/logout', function(req,res) {
        req.session.destroy();
		res.redirect('/');
    })

    router.get('/register', auth, function(req, res) {
        res.render('account/register', {
            reg: 'reg'
        });
    })

    //注册
    router.post('/register', function(req, res) {
        
        var regtime = moment().format('YYYY-MM-DD HH:mm:ss');
        let cond = req.body;

        async.auto({
            'findInfo':function(callback){
                userInfo.find({'username': cond.username}, function(err,result){
                    if(err) {
                        logger.info('注册数据入库前查找用户名信息失败', err);
                        callback(err);
                    }else {
                        logger.info('查找用户名信息', result);
                        callback(null, result.length);
                    }
                })
            },
            'createInfo': ['findInfo', function(cb, findResult){
                if(findResult.findInfo == 0){
                   let params = {
                        user_id: cipher.md5['+'](cond.username+regtime),
                        username:cond.username,
                        passwd:cipher.md5['+'](cond.passwd),
                        gender: cond.gender,
                        phone: cond.phone,
                        qq: cond.qq,
                        email: cond.email,
                        regtime: regtime,
                        login_time: ''
                    }
                    userInfo.create(params, function(err, result){
                        if(err) {
                            logger.info('注册数据入库出现错误', err);
                            cb(err);
                        }else {
                            cb(null, result);
                        }
                    }) 
                }else {
                    logger.info('该用户已存在');
                    cb(null, {
                        code: -1,
                        detail: '用户已存在，请重新注册'
                    })
                }                
            }]
        },function(error, data){
            if(error){
                logger.info('查询并创建数据表出错', error);
                res.render('contact/rs', {
                    err: error,
                    cb: '/account/register'
                });
            }else {
                logger.info('data===', data);
                if(data.findInfo != 0){
                    res.render('contact/rs', {
						err: data.createInfo.detail,
						cb: '/account/register'
					});
                }else {
                    req.session.regUserName = req.body.username;
                    req.session.regPasswd = req.body.passwd;
                    res.redirect('/contact/rs/success/register?err=' + encodeURIComponent('注册成功') + '&cb=' + encodeURIComponent('/account/auto_login'));
                }
            }
        })   
    })
}