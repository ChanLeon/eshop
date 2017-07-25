var moment = require('moment');

function circle(d1, d2) {
	return parseInt(moment(d2).diff(moment(d1), 'days'));
}

function qiniu(key, bucket, style) {
	return "https://dn-" + bucket + ".qbox.me/" + key + (style ? '/' + style : '');
}

function currency(num, dot) { //格式化货币 000,000,000方式显示
	if (dot === 0) {
		num = Number(num).toFixed(0);
	} else {
		dot = dot || 2;
		num=''+num;
		if(num.indexOf(".")>0 && num.length>num.indexOf(".")+dot){
			num=num.substring(0,num.indexOf(".")+dot+1);
		}else{
			num = Number(num).toFixed(dot);
		}
	}
	var n = '' + num;
	var r = n.replace(/(^|-|\s)\d+(?=\.?\d*($|\s))/g, function(m) {
		return m.replace(/(?=(?!\b)(\d{3})+$)/g, ',');
	});
	if (dot === 0) {
		return r;
	} else {
		var i = r.indexOf('.');
		if (i >= 0) return r.substring(0, i + 1 + dot);
		else {
			r += '.';
			for (var i = dot; i > 0; dot--) {
				r += '0';
			};
			return r;
		}
	}
}

function split_accountId(str, size, whitespace){
	if(str.length == 0){
		return str;
	}
	size = size || 4;
	whitespace = whitespace || ' ';

	var sa = '',
		cur = 0,
		count = str.length;

	for(;cur < count;){
		sa += (str.slice(cur, cur + size) + whitespace);
		cur = cur + size;
	}
	sa = sa.replace(/\s*$/g, '');
	return sa;
}

module.exports = {
	"circle": circle,
	"qiniu": qiniu,
	"currency":currency,
	"sa": split_accountId
};