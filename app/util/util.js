let {env} = require("json!../../process.json");

function common(url, options, callback) {
	document.getElementById('loading').style.display = 'block';
	fetch(url, options).then(res => {
			if (res.ok) {
				return res.json()
			} else {
				{
					console.error(res);
				}
			}
		}
	).then(json => {
		if (json.resultCode && (json.resultCode === 200 || json.resultCode === 300)) {  // 判断请求是否正确
			if (json.data) {
				return json.data
			} else {
				callback(json);
			}
		} else {
			console.error(json);
		}
	}).then(data => {
		if (data) callback(data);
	})
}

const Dictionary = {
	"0": {
		propName: '背景1'
	},
	"1": {
		propName: '背景2'
	},
	"2": {
		propName: '背景3'
	},
	"3": {
		propName: '石头1'
	},
	"4": {
		propName: '石头2'
	},
	"5": {
		propName: '石头3'
	},
	"6": {
		propName: '浮萍1'
	},
	"7": {
		propName: '浮萍2'
	},
	"8": {
		propName: '浮萍3'
	},
};

module.exports = {
	reqGet(url, postData, callback) {
		let options = {
			method: 'get',
			body: JSON.stringify(postData)
		};
		common(url, options, callback);
	},
	reqPost(url, postData, callback) {
		if (typeof postData === "function") callback = postData;
		let options = {
			method: 'post',
			body: postData && JSON.stringify(postData)
		};
		common(url, options, callback);
	},
	getCookie(name) {
		let arr = document.cookie.replace(/\s/g, '').split(';');

		for (let i = 0; i < arr.length; i++) {
			let tmpArr = arr[i].split('=');
			if (tmpArr[0] === name)
				return decodeURIComponent(tmpArr[1]);
		}
	},
	setCookie(name, value, options) {
		let days = options !== undefined && options.days !== undefined ? options.days : 7;
		let path = options !== undefined && options.path !== undefined ? options.path : '/';
		let date = new Date();
		date.setDate(date.getDate() + days);
		document.cookie = `${name}=${value};expires=${date};path=${path}`;
	},
	delCookie(name) {
		document.cookie = `${name}='';expires=-1`;
	},
	getImgHost() {
		//缩略图图片服务器
		let imgHost = '';
		if (env === 'dev') {
			// imgHost = 'http://192.168.11.2:8099/emaCat';
			imgHost = 'http://114.55.250.173:8080/emaCat';
		} else if (env === 'test') {

		} else if (env === 'production') {

		}
		return imgHost;
	},
	hideLoading() {
		document.getElementById('loading').style.display = 'none';
	},
	popShow(str) {
		document.getElementById('popup').style.display = 'block';
		document.getElementById('popup-text').innerHTML = str;
	},
	popHide() {
		document.getElementById('popup').style.display = 'none';
	},
	getEgretDomain() {
		//egret服务器
		let url = '';
		if (env === 'dev') {
			url = 'http://cober1.com:5239';
		} else if (env === 'test') {
			url = 'http://test-emfstatic.lemonade-game.com';
		} else if (env === 'production') {
			url = 'emfstatic.lemonade-game.com';
		}
		return url;
	},
	getDecorateObj(propId) {
		return Dictionary[propId];
	}
};

