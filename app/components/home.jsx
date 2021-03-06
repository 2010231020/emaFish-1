require('./home.css');
import React from 'react';
import Res from './res';
import Show from './show';
import Interaction from './interaction';
import Cattr from './cattr';
import Item2 from './item2';
import Item7 from './item7';
import Item10 from './item10';
import Item12 from './item12';
import Item13 from './item13';
import Popup from './popup';
import Item4 from './item4';
import Item5 from './item5';

let util = require('../util/util');
let User = require('../util/User');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			showFlag: false,
			fishList: [],
			showF: false,
			loadingFlag: true,
			visitorList: [],
			decorate1: 1,
			decorate2: 2,
			popFlag: false,//是否显示功能列表
			popArr: [],//访问历史
			type: 0,
			connectFlag: true,
			userInfo: {},
			userPondInfo: {},//鱼塘信息
			userData: {},//用户信息，不包括水草
			chargingSink: {},//水草信息
			userBagInfo: [],//背包信息
			isTraveller: false,//是否是来访者
			eggs: [],//鱼卵数目
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	getUserData() {
		let user = {
			uid: null,
			pondId: null
		};
		if (util.getUrlParams('uid') && util.getUrlParams('pondId')) {
			user.uid = util.getUrlParams('uid');
			user.pondId = util.getUrlParams('pondId');
		} else {
			user.uid = util.getCookie('uid');
			user.pondId = util.getCookie('pondId');
		}
		return user;
	},
	getList() {
		let userData = this.getUserData();
		const postData = {
			uid: userData.uid
		};
		if (!postData.uid) {
			const path = '/login';
			this.context.router.push(path);
		} else {
			util.reqPost('/emaCat/currency/getUserPondInfo', postData, data => {
				this.pondInit(data);
				if (data && data.length > 0 && data[0].id) {
					util.reqPost('/emaCat/currency/getUserHatchingFishList', {
						uid: postData.uid,
						destinationPoolId: data[0].id
					}, data => {
						console.log('鱼卵信息', data);
						this.setState({
							eggs: data.hatchingFishList
						})
					});
				}
			});

			//获取装饰商城
			util.reqPost('/emaCat/transcation/getCommodityList', {curPage: 1, pageSize: 100}, data => {
				this.setState({
					commodityList: data.commodityList
				})
			});

		}
	},
	getTravelerList() {
		let userData = this.getUserData();
		const postData = {
			uid: userData.uid
		};
		if (!postData.uid) {
			const path = '/login';
			this.context.router.push(path);
		} else {
			util.reqPost('/emaCat/currency/getUserPondInfo', postData, data => {
				this.pondInit(data);
			});
		}
	},
	pondInit(data) {
		let userData = this.getUserData();
		const postData = {
			uid: userData.uid
		};
		if (data && data.length > 0 && data[0].id) {
			this.setState({
				userPondInfo: data[0],
				decorate1: data[0].backgroundId,
				decorate2: data[0].stoneId
			});

			if (!this.state.isTraveller) {
				util.setCookie('pondId', data[0].id);
			}
			util.reqPost('/emaCat/currency/getUserFishList', {uid: postData.uid, destinationPoolId: data[0].id}, data => {
				console.log('鱼列表', data);
				this.setState({
					fishList: data.fishList,
					visitorList: data.fishTravelInfoList,
				});

				this.setState({
					showF: true
				});
			});
		}
	},
	getUserFishList() {
		let userData = this.getUserData();
		const postData = {
			uid: userData.uid,
			destinationPoolId: userData.pondId
		};
		util.reqPost('/emaCat/currency/getUserFishList', postData, data => {
			this.setState({
				fishList: data.fishList,
				visitorList: data.fishTravelInfoList,
			});
		});

		util.reqPost('/emaCat/currency/getUserHatchingFishList', postData, data => {
			console.log('鱼卵信息', data);
			this.setState({
				eggs: data.hatchingFishList
			})
		});
	},
	getUserInfoList() {//访问用户背包信息
		let userData = this.getUserData();
		const postData = {
			uid: userData.uid
		};
		util.reqPost('/emaCat/currency/getUserBagAndPond', postData, data => {
			this.setState({
				userInfo: data,
				userPondInfo: data.userPondInfoList[0],
				userData: data.userData,
				chargingSink: data.chargingSink,
				userBagInfo: data.userBagInfo.concat(data.userDecorateInfoList)
			});
			console.log('个人信息', data);
		});
	},
	getUserPondInfo() {//访问鱼塘信息
		let userData = this.getUserData();
		const postData = {
			uid: userData.uid,
		};
		util.reqPost('/emaCat/currency/getUserPondInfo', postData, data => {
			console.log('getUserPondInfo', data);
			this.setState({
				userPondInfo: data[0],
			});
		});
	},
	getShareFish(){//领取分享鱼
		const postData = {
			uid: util.getCookie('uid'),
			shareCode: util.getCookie('shareCode'),
		};
		util.reqPost('/emaCat/transcation/getShareFish',postData,data =>{
			console.log('getShareFish', data);
		})
	},
	refreshInfo(data) {//喂养方法
		let tmpObj = {
			exp: data.exp,
			level: data.level
		};
		this.setState({
			item: Object.assign(this.state.curItem, tmpObj)
		});
	},
	componentDidMount() {

		util.reqPost('/emaCat/dictionary/getGrowDictionaryInfo', data => {
			User.getInstance().setGrowDictionary(data.growupDictionaryInfos);
			User.getInstance().setPropDictionary(data.propDictionaryInfos);
			User.getInstance().setFishGene(data.fishGeneInfos);
			User.getInstance().setErrDictionary(data.errorDictionaryInfos);
			console.log('字典信息', data);
		});

		if (!this.getUserData().uid) {//未登录跳转至登录页
			const path = '/login';
			this.context.router.push(path);
		} else {

			if (util.getUrlParams('uid') && util.getUrlParams('pondId') && util.getUrlParams('uid') !== util.getCookie('uid')) {
				this.setState({
					isTraveller: true
				});
				//访客所请求的接口

				this.getTravelerList();
				// this.getUserInfoList();
			} else {
				//自己所请求的接口
				if(util.getCookie('shareCode')&&util.getCookie('shareCode')!='0'){
					//领取分享鱼
					setTimeout(()=>{
						this.getShareFish();
					});
				}
				this.getList();
				this.getUserInfoList();
			}

			//连接egret
			let connectFlag = setInterval(() => {
				this.sendMsg('connect', 'server connect');
			}, 1000);

			window.addEventListener("message", e => {
				if (e.origin === util.getEgretDomain()) {
					console.log(e.data);
					if (e.data.type === 'show') {
						this.changeCurItem(e.data.msg.type, e.data.msg.fishId);
					} else if (e.data.type === 'connect') {
						clearInterval(connectFlag);
						this.setState({
							loadingFlag: false
						});
						console.log('egret connected');
					}
				}
			});
		}
	},
	sendMsg(type, msg) {
		console.log('send msg');
		let domain = util.getEgretDomain();
		document.getElementById("iframe").contentWindow.postMessage({type: type, msg: msg}, domain);
	},
	setDecorate(propId, isPre) {//1-9
		let propItem = User.getInstance().getProp(propId);
		let type = propItem.propType + '';
		let postData = {};
		if (type === '1' && propId == 2 && !isPre) {
			this.changeType(7);
		} else {
			postData = {
				uid: this.getUserData().uid
			};
		}
		if (type === '2') {//背景123
			this.setState({
				decorate1: propId
			});
			postData.backgroundId = propId;
		} else if (type === '3') {//石头456
			this.setState({
				decorate2: propId
			});
			postData.stoneId = propId;
		} else if (type === '4') {//荷叶789
			this.sendMsg('setDec', propId);
			postData.duckweedId = propId;
		}

		if (!isPre && postData.uid) {
			util.reqPost('/emaCat/currency/updateUserPondInfo', postData, data => {
				util.hideLoading();
				console.log(data);
				this.getUserInfoList();
			});
		}
	},
	changeShowFlag() {
		this.setState({
			showFlag: !this.state.showFlag
		});
	},
	changeCurItem(type, fish) {//type:1自家鱼;2:访客鱼,3:商店鱼
		let item = {};
		let list = [];
		if (type == 1) {
			list = this.state.fishList;
		} else if (type == 2) {
			list = this.state.visitorList;
		} else if (type == 3) {
			item = fish;
		}

		for (let i = 0; i < list.length; i++) {
			if (fish == list[i].fishId) {
				item = list[i];
			}
		}

		this.setState({
			showFlag: !this.state.showFlag,
			showF: true,
			curItem: item
		});
		this.changeType(9);
	},
	popState() {
		this.state.popArr.pop();
		let type = this.state.popArr[this.state.popArr.length - 1];
		if (this.state.popArr.length > 0) {
			this.setState({
				type: type
			})
		} else {
			if (this.state.popFlag) {
				this.setState({
					type: 0
				})
			} else {
				this.state.popArr.push(0);
			}
			this.setState({
				popFlag: !this.state.popFlag
			})
		}
	},
	changeType(type) {
		this.state.popArr.push(type);
		console.log(this.state.popArr);
		this.setState({
			type: type,
			popFlag: true
		});
		if (type === 9) {//如果是鱼
			this.setState({
				popFlag: true
			})
		}
	},
	closeAll() {
		this.setState({
			popArr: [],
			popFlag: false,
			type: 0
		});
	},
	render() {
		return (
			<div id='home' className={`full bg${this.state.decorate1}`}>
				<div className={`bg-stone stone${this.state.decorate2}`}/>

				<div id='item'>
					{!this.state.isTraveller && <div className={'a1'} onClick={this.popState.bind(this)}>
						<i className={this.state.popFlag ? 'icon2' : 'icon1'}/>
					</div>}
					{!this.state.isTraveller && <div className={'a2'} onClick={this.changeType.bind(this, 12)}>
						<i className={'icon1'}/>
					</div>}
					{this.state.popFlag && <div className={`popup popup${this.state.type}`}>
						{{//功能列表popState
							0: <ul className={'item0'}>
								<li className={'l1'} onClick={this.changeType.bind(this, 1)}><i/></li>
								<li className={'l2'} onClick={this.changeType.bind(this, 3)}><i/></li>
								<li className={'l3'} onClick={this.changeType.bind(this, 12)}><i/></li>
								<li className={'l4'} onClick={this.changeType.bind(this, 4)}><i/></li>
								<li className={'l5'} onClick={this.popState.bind(this)}><i/></li>
								<li className={'l6'} onClick={this.changeType.bind(this, 2)}><i/></li>
								<li className={'l7'} onClick={this.changeType.bind(this, 5)}><i/></li>
								<li className={'l8'}><i/></li>
								<li className={'l9'}><i/></li>
							</ul>,
							//鱼列表
							1: <Item2 type={'fish'} list={this.state.fishList}
												changeCurItem={this.changeCurItem.bind(this)}/>,
							//装饰背包
							2: <Item2 popState={this.popState.bind(this)} type={'dec'} setDecorate={this.setDecorate.bind(this)}
												list={this.state.userBagInfo}/>,
							//装饰商店
							3: <Item2 popState={this.popState.bind(this)} getUserInfoList={this.getUserInfoList.bind(this)}
												type={'market'}
												setDecorate={this.setDecorate.bind(this)} list={this.state.commodityList}/>,
							//访客历史记录
							4: <Item4 popState={this.popState.bind(this)}/>,
							//好友列表
							5: <Item5 item={this.state.curItem} popState={this.popState.bind(this)}/>,
							//孵化
							7: <Item7 getUserFishList={this.getUserFishList.bind(this)} popState={this.popState.bind(this)}
												getUserInfoList={this.getUserInfoList.bind(this)}/>,
							//鱼属性页面
							9: <Cattr isTraveller={this.state.isTraveller} getUserFishList={this.getUserFishList.bind(this)}
												getUserInfoList={this.getUserInfoList.bind(this)} changeType={this.changeType.bind(this)}
												handleShow={this.changeShowFlag.bind(this)} refreshInfo={this.refreshInfo.bind(this)}
												item={this.state.curItem} popState={this.popState.bind(this)}/>,
							//寄语编辑页面
							10: <Item10 getUserFishList={this.getUserFishList.bind(this)} popState={this.popState.bind(this)}
													changeType={this.changeType.bind(this)}
													item={this.state.curItem}
													getUserInfoList={this.getUserInfoList.bind(this)}/>,
							//鱼市页面
							12: <Item12 changeCurItem={this.changeCurItem.bind(this)} popState={this.popState.bind(this)}/>,
							//寄语历史页面
							13: <Item13 item={this.state.curItem}/>
						}[this.state.type]}
					</div>
					}
				</div>
				{this.state.showF && <Show uid={this.getUserData().uid}/>}
				{this.state.popFlag && <div className={'mask'} onClick={this.closeAll.bind(this)}/>}
				{/*{this.state.loadingFlag && <div className={'loading'}/>}*/}
				{!this.state.isTraveller && <Res userData={this.state.userData} chargingSink={this.state.chargingSink}/>}
				{this.state.isTraveller && <a className={'go_back'} href={'/home'}/>}
				{this.state.eggs.map((item, i) =>
					<i className={`egg egg${i}`}/>
				)}
				<Interaction isTraveller={this.state.isTraveller} getUserInfoList={this.getUserInfoList.bind(this)}
										 userPondInfo={this.state.userPondInfo} getUserPondInfo={this.getUserPondInfo.bind(this)}
										 chargingSink={this.state.chargingSink}/>
				<Popup/>
			</div>

		);
	}
});
