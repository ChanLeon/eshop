'use strict';
var nodeexcel = require('excel-export');

module.exports = function(router) {
	router.get('/index', function(req, res) {
		res.render("nodeExcel/index");
	})

	router.get('/export', function(req, res) {
		var conf = {};
		conf.cols = [{
			caption: '姓名',
			type: 'string'
		}, {
			caption: '性别',
			type: 'string'
		}, {
			caption: '身高',
			type: 'number'
		}, {
			caption: '出生年月',
			type: 'string'
		}, {
			caption: '体重',
			type: 'number'
		}];
		conf.rows = [
			['leon', '男', parseInt('187', 10), "1993-5-1", parseInt('170', 10)],
			["Lily", '女', parseInt('162', 10), "1996-3-20", parseInt('100', 10)]
		];

		var result = nodeexcel.execute(conf);
		res.setHeader('Content-Type', 'application/vnd.openxmlformats');
		res.setHeader("Content-Disposition", "attachment; filename=" + "stat.xls");
		res.end(result, 'binary');
	})

	router.get('/nodeExport',function(req,res){
		var result = req.query.data;
		var tt = result.split(',');

		var conf = {};
		conf.cols = [];
		for(var i = 0; i < 5; i++){
			var it = {caption:tt[i],type:"string",beforeCellWrite:function(){
	            var originDate = new Date(Date.UTC(1899,11,30));
	            return function(row, cellData, eOpt){
	            	console.log('celldata',cellData,eOpt)
	              if (cellData === undefined){
	                return null;
	              }else return cellData; 
	            } 
       	 	}(),width:50};
       	 	conf.cols.push(it);
		}
		conf.rows = [];
		var ww = [];
		for(var ii = 0; ii < 3; ii++){
			for(var i = 0; i < 5; i++){
				ww.push(tt[i]);
			}
			conf.rows.push(ww);
		}
		var result = nodeexcel.execute(conf);
		res.setHeader('Content-Type', 'application/vnd.openxmlformats');
		res.setHeader("Content-Disposition", "attachment; filename=" + "stat.xlsx");
		res.end(result, 'binary');
		
	})
}