'use strict';
let instance;
module.exports = {
	getInstance: () => {
		if (!instance) {
			instance = new User();
		}
		return instance;
	}
};

class User {
	constructor() {
		this.UserInfo = {
			uid: 0
		};
	}

	setUid(uid) {
		this.UserInfo.uid = uid;
	}
}
