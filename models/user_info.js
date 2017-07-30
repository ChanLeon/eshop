/* 系统用户名信息*/
'use strict';

var mongoose = require('mongoose');

var eUserInfoModel = function(){
	var eUserInfoSchema = mongoose.Schema({
		user_id: String, //平台生成用户id
		username: String, //用户姓名
		passwd : String ,//密码
		gender: String, //性别
		phone: String ,// 联系电话
		qq: String,
        regtime: String ,//注册时间
        login_time: String //登录时间
	});
	return mongoose.model('user_info', eUserInfoSchema,'user_info');
	
};

module.exports = new eUserInfoModel();
