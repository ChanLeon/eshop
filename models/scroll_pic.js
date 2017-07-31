/* 上传图片的信息*/
'use strict';

var mongoose = require('mongoose');

var picInfoModel = function(){
	var picInfoSchema = mongoose.Schema({
		picId: String, //图片ID
		picUrl: String, //图片url
		picFlat: Number,  //上传的图片标识
		picTime: String //上传图片的时间
	});
	return mongoose.model('scroll_pic', picInfoSchema,'scroll_pic');
	
};

module.exports = new picInfoModel();
