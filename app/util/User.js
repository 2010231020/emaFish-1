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

	getRarityFromGene(gene, group) {//传进来gene字符传以及对应的group
		let geneArr = gene.split(',');//把基因字符串转换成数组，共有7个基因，对应group 1-7
		let len = this.UserInfo.fishGene.length;
		let rarity = '';
		for (let i = 0; 0 < len; i++) {
			if (this.UserInfo.fishGene[i].group == group && this.UserInfo.fishGene[i].type == geneArr[group - 1]) {
				rarity = this.UserInfo.fishGene[i].rarity.toLowerCase();
				break;
			}
		}
		return rarity;
	}

	getGrassFromGrow(rarity, level) {//根据稀有度获得需要喂草量
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

	getProp(propId) {//根据装饰ID获得装饰品所有信息
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
