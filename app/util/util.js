function common(url, options, callback) {
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
		if (json.resultCode && json.resultCode === 200) {  // 判断请求是否正确
			if(json.data){
				return json.data
			}else {
				callback(json);
			}
		} else {
			console.error(json);
		}
	}).then(data => {
		if(data)callback(data);
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
	}
};
