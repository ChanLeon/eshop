/* 上传图片的信息*/
'use strict';

var mongoose = require('mongoose');

var picInfoModel = function(){
	var picInfoSchema = mongoose.Schema({
		picUrl: String, //图片url
		picName: String, //图片名字
		picPrice : String ,//图片价格
		picTime: String, //上传图片的时间
	});
	return mongoose.model('pic_info', picInfoSchema,'pic_info');
	
};

module.exports = new picInfoModel();
