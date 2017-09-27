import Vue from 'vue';
Vue.prototype.getBrandList = function(callback){//获取品牌列表
	let self = this;
	let requestData = {token: window.localStorage.getItem('token')};
	self.$http.post('/ui/brandList',self.qs.stringify(requestData)).then(function (response) {
	    let data = response.data;
	    console.log('brandList',response)
		if(data.code == 10000){
			return callback(data.data);
		}
    }).catch(function (error) {
    	console.log(error);
    });
}
Vue.prototype.getTagList = function(callback){//获取品牌列表
	let self = this;
	let requestData = {token: window.localStorage.getItem('token')};
	self.$http.post('/ui/tagList',self.qs.stringify(requestData)).then(function (response) {
	    let data = response.data;
	    console.log('tagList',response)
		if(data.code == 10000){
			callback(data.data);
		}
    }).catch(function (error) {
    	console.log(error);
    });
}
Vue.prototype.getAddressList = function(callback){//获取地址列表
	let self = this;
	let requestData = {token: window.localStorage.getItem('token')};
	self.$http.post('/ui/addressList',self.qs.stringify(requestData)).then(function (response) {
	    let data = response.data;
	    console.log('brandList',response)
		if(data.code == 10000){
			callback(data.data);
			
		}
    }).catch(function (error) {
    	console.log(error);
    });
}