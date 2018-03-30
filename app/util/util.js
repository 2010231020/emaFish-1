let config = require("json!../../process.json");

let geneDictionary = {
	"1": "FP",
	"2": "FG",
	"3": "FB",
	"4": "FW",
	"5": "FY",
	"6": "FR"
};

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
	popShow(str) {
		document.getElementById('popup').style.display = 'block';
		document.getElementById('popup-text').innerHTML = str;
	},
	popHide() {
		document.getElementById('popup').style.display = 'none';
	},
	getEgretDomain() {
		//egret服务器
		return config[config.env].EgretDomain;
	}
};

