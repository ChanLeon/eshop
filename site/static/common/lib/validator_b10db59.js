(function($) {
	$.extend({
		validator: {
			notEmpty: function(str) {
				return !str.match(/^[\s\t\r\n]*$/)
			},
			isEmail: function(str) {
				return str.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)
			},
			isMobile: function(str) {
				return str.match(/^1(4[0-9]|3[0-9]|5[0-35-9]|7[06-8]|8[0-9])\d{8}$/)
			},
			is: function(str, regx) {
				return new RegExp(regx).test(str);
			},
			value_eq: function(str, domId) {
				return $('#' + domId).val() == str;
			},
			notEqual: function(str, src) {
				return str != src;
			},
			gte: function(str, src, isDom) {
				return str >= (isDom ? $('#' + src).val() : src);
			}
		}
	});
	$.fn.validator = function(options, changeClass, callback) {
		var $this = $(this);
		var _validator = function(i) {
			var name = $(i).attr('name');
			var v = options[name];
			if (v) {
				var fn = $.validator[v[0]];
				if (fn) {
					var args = [$(i).val()];
					for (var j = 2; j < v.length; j++)
						args.push(v[j]);
					if (!fn.apply(fn, args)) {
						$(i).focus();
						if (changeClass)
							$(i).closest('div.form-group').addClass('has-error').find('span.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove')
						if (callback)
							callback(v[1]);
						return false;
					} else {
						if (changeClass)
							$(i).closest('div.form-group').removeClass('has-error').find('span.glyphicon').removeClass('glyphicon-remove').addClass('glyphicon-ok')
						if (callback)
							callback('');
					}
				}
			}
			return true;
		}
		var all_success = true;
		$this.each(function(index, t) {
			if (t.nodeName == 'FORM') {
				var success = true;
				$(t).find('input,textarea,select').each(function(index, i) {
					if (!_validator(i)) {
						success = false;
						all_success = false;
						return false;
					}
				})
				return true;
			} else {
				if (!_validator(t)) {
					all_success = false;
					return false;
				}
			}
		})
		return all_success;
	};
})(jQuery);