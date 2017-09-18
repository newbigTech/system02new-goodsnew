import Vue from 'vue';
Vue.prototype.shallowCopy = function(obj){//将对象中的数据迭代出来
	let newObj = {};
	for(let o in obj){
		typeof(obj[o]) === 'object'? newObj[o] = JSON.stringify(obj[o]) : newObj[o] = obj[o];
		if(obj[o] instanceof Date){
			newObj[o] = obj[o].pattern('yyyy-MM-dd HH:mm:ss');
		}
	}
	return newObj;
}
Vue.prototype.getUserInfo = function(){//获取用户信息
	let self = this;
	let requestData = {params:{token: window.localStorage.getItem('token')}};
	self.$http.get('/ui/user/getMyInfo',requestData).then(function (response) {
	    let data = response.data;
		if(data.code == 10000){
			window.localStorage.setItem('userinfo',JSON.stringify(data.data));
		}
    }).catch(function (error) {
    	console.log(error);
    });
}
Vue.prototype.randomString = function(len) {
  　　 len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
  }
Vue.prototype.getKey = function(){//获取上传key
	return {key:(new Date()).valueOf() + this.randomString(8)};
}
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}    