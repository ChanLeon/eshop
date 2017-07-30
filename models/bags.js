/* 上传图片的信息*/
'use strict';

var mongoose = require('mongoose');

var bagModel = function(){
	var bagSchema = mongoose.Schema({
		picId: String, //图片ID
		picUrl: String, //图片url
		picName: String, //图片名字
		picPrice : String,//图片价格
		picTime: String //上传图片的时间
	});
	return mongoose.model('bag', bagSchema,'bag');
	
};

module.exports = new bagModel();
