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
			uid: 0,
			growDictionary: [],//等级对应经验值的字典
			propDictionary: [],//背包物品id对应字典
			fishGene: []//基因字典
		};
	}

	setUid(uid) {
		this.UserInfo.uid = uid;
	}

	setGrowDictionary(obj) {
		this.UserInfo.growDictionary = obj;
	}

	getGrowDictionary() {
		return this.UserInfo.growDictionary;
	}

	setPropDictionary(obj) {
		this.UserInfo.propDictionary = obj;
	}

	getPropDictionary() {
		return this.UserInfo.propDictionary;
	}

	setFishGene(obj) {
		this.UserInfo.fishGene = obj;
	}

	getGrassFromGrow(rarity, level) {
		let grass = '';
		if (rarity && level) {
			for (let i = 0; i < this.UserInfo.growDictionary.length; i++) {
				if (this.UserInfo.growDictionary[i].rarity == rarity && this.UserInfo.growDictionary[i].weight == level) {
					grass = this.UserInfo.growDictionary[i].grass;
					break;
				}
			}
		}
		return grass;
	}

	getProp(propId) {
		let obj = {};
		if (propId) {
			for (let i = 0; i < this.UserInfo.propDictionary.length; i++) {
				if (this.UserInfo.propDictionary[i].id == propId) {
					obj = this.UserInfo.propDictionary[i];
					break;
				}
			}
		}
		return obj;
	}
}
