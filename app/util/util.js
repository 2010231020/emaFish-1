let config = require("json!../../process.json");
let User = require('../util/User');
let geneDictionary = {
	"1": "FP",
	"2": "FG",
	"3": "FB",
	"4": "FW",
	"5": "FY",
	"6": "FR"
};

let popup = {
	message: '',
	action: '',
	int: null
};

module.exports = {
	common(url, options, callback) {
		document.getElementById('loading').style.display = 'block';

		fetch(url, options).then(res => {
				document.getElementById('loading').style.display = 'none';
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
				if (json.resultCode === 200) {
					if (json.data) {
						return json.data
					} else {
						callback(json);
					}
				} else if (json.resultCode === 300) {
					if (json.resultMsg == 40049) {
						this.loginOut();
						this.alert('Login expired!', () => {
							window.location.href = '/';
						});
					}else if (json.resultMsg.replace('java.lang.Exception: ', '') == 40054||json.resultMsg.replace('java.lang.Exception: ', '') == 40055) {
						this.delCookie('shareCode');
						this.alert('invalid share code!');
					} else {
						this.alert(User.getInstance().getErrStr(json.resultMsg.replace('java.lang.Exception: ', '')));
					}
				} else {
					console.error(json);
				}
			} else {
				this.loginOut();
				this.alert('Login expired!', () => {
					window.location.href = '/';
				});
				console.error(json);
			}
		}).then(data => {
			if (data) callback(data);
		})
	},
	getPostStr(obj) {
		let postArr = [];
		let postStr = '';
		for (let i in obj) {
			let tmpStr = i + '=' + obj[i];
			postArr.push(tmpStr);
		}
		postStr = postArr.join('&');
		return postStr;
	},
	reqGet(url, postData, callback) {
		let options = {
			method: 'get',
			body: JSON.stringify(postData)
		};
		common(url, options, callback);
	},
	reqPost(url, postData, callback) {
		let bodyData = {};
		if (typeof postData === "function") {
			callback = postData;
		} else {
			bodyData = postData;
		}
		bodyData.token = encodeURIComponent(encodeURIComponent(this.getCookie('token')));
		let options = {
			method: 'post',
			body: this.getPostStr(bodyData),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
			}
		};
		this.common(url, options, callback);
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
		document.cookie = `${name}=${encodeURIComponent(value)};expires=${date};path=${path}`;
	},
	loginOut() {
		this.delCookie('uid');
		this.delCookie('token');
		this.delCookie('pondId');
	},
	delCookie(name) {
		document.cookie = `${name}=0;expires=-1`;
	},
	getUrlParams(name) {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		let r = decodeURI(window.location.search).substr(1).match(reg);
		return r != null ? r[2] : null;
	},
	getImg(gene) {
		//缩略图图片服务器
		let returnStr = require('../images/birth_1.png');
		if (gene) {
			let geneArray = gene.split(',');
			returnStr = `${config[config.env].imgHost}/${geneDictionary[geneArray[0]]}-ba_${geneArray[2]}-bo_${geneArray[1]}-e_1-s_${geneArray[4]}-t_${geneArray[5]}-w_${geneArray[3]}.png`;
		}
		return returnStr;
	},
	hideLoading() {
		document.getElementById('loading').style.display = 'none';
	},
	popShow(str = '这样可以吗？', callback) {
		document.getElementById('popup').style.display = 'block';
		document.getElementById('popup-text').innerHTML = str;
		document.getElementById('popup-no').style.display = 'inline-block';
		popup.int = setInterval(() => {
			if (popup.action === 'ok') {
				this.popHide();
				callback && callback();
			} else if (popup.action === 'cancel') {
				this.popHide();
			}
		}, 100);
	},
	popHide() {
		clearInterval(popup.int);
		popup.action = '';
		document.getElementById('popup').style.display = 'none';
	},
	popAction(action) {
		popup.action = action;
	},
	alert(str = '这样可以吗？', callback) {
		document.getElementById('popup').style.display = 'block';
		document.getElementById('popup-text').innerHTML = str;
		document.getElementById('popup-no').style.display = 'none';
		popup.int = setInterval(() => {
			if (popup.action === 'ok') {
				this.popHide();
				callback && callback();
			}
		}, 100);
	},
	getEgretDomain() {
		//egret服务器
		return config[config.env].EgretDomain;
	}
};

