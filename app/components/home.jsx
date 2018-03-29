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
			popFlag: false,
			itemFlag: false,
			type: 0,
			connectFlag: true,
			userInfo: {},
			userPondInfo: {},//鱼塘信息
			userData: {},//用户信息，不包括水草
			chargingSink: {},//水草信息
			userBagInfo: [],//背包信息
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	getList() {
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid
		};
		util.reqPost('/emaCat/currency/getUserPondInfo', postData, data => {
			util.hideLoading();
			console.log(data);

			if (data && data.length > 0 && data[0].id) {
				util.setCookie('pondId', data[0].id);
				util.reqPost('/emaCat/currency/getUserFishList', {uid: uid, destinationPoolId: data[0].id}, data => {
					util.hideLoading();
					console.log(data);
					this.setState({
						fishList: data.fishList,
						visitorList: data.fishTravelInfoList,
					});

					this.setState({
						showF: true
					});
				});
				util.reqPost('/emaCat/dictionary/getGrowDictionaryInfo', data => {
					util.hideLoading();
					console.log(data);
					User.getInstance().setGrowDictionary(data.growupDictionaryInfos);
					User.getInstance().setPropDictionary(data.propDictionaryInfos);
				});
			}

		});

		//获取装饰商城
		util.reqPost('/emaCat/transcation/getCommodityList', {curPage: 1, pageSize: 100}, data => {
			util.hideLoading();
			console.log(data);
			this.setState({
				commodityList: data.commodityList
			})
		});
	},
	getUserInfoList() {
		let uid = util.getCookie('uid');
		util.reqPost('/emaCat/currency/getUserBagAndPond', {uid: uid}, data => {
			util.hideLoading();
			this.setState({
				userInfo: data,
				userPondInfo: data.userPondInfoList[0],
				userData: data.userData,
				chargingSink: data.chargingSink,
				decorate1: data.userPondInfoList[0].backgroundId,
				decorate2: data.userPondInfoList[0].stoneId,
				userBagInfo: data.userBagInfo
			});
			console.log('个人信息', data);
		});
	},
	componentDidMount() {
		this.getList();
		this.getUserInfoList();
		util.delCookie('from');

		// 连接egret
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
	},
	sendMsg(type, msg) {
		console.log('send msg');
		let domain = util.getEgretDomain();
		document.getElementById("iframe").contentWindow.postMessage({type: type, msg: msg}, domain);
	},
	setDecorate(propId) {//1-9
		let propItem = User.getInstance().getProp(propId);
		let type = propItem.propType + '';
		if (type === '1' && propId === 2) {
			this.changeType(7);
		}
		if (type === '2') {//背景123
			this.setState({
				decorate1: propId
			});
		} else if (type === '3') {//石头456
			this.setState({
				decorate2: propId
			});
		} else if (type === '4') {//荷叶789
			this.sendMsg('setDec', propId);
		}
	},
	changeShowFlag() {
		this.setState({
			showFlag: !this.state.showFlag
		});
	},
	changeCurItem(type, fishId) {//type:1自家鱼;2:访客鱼
		let item = {};
		let list = [];
		if (type == 1) {
			list = this.state.fishList;
		} else {
			list = this.state.visitorList;
		}

		for (let i = 0; i < list.length; i++) {
			if (fishId == list[i].fishId) {
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
		if (this.state.popFlag) {
			this.setState({
				type: 0
			})
		}
		this.setState({
			popFlag: !this.state.popFlag,
			itemFlag: !this.state.itemFlag
		})
	},
	changeType(type) {
		this.setState({
			type: type,
			popFlag: true
		});
		if (type === 9) {
			this.setState({
				popFlag: true
			})
		}
	},
	render() {
		return (
			<div id='home' className={`full bg${this.state.decorate1}`}>
				<div className={`bg-stone stone${this.state.decorate2}`}/>

				<div id='item'>
					<div className={'a1'} onClick={this.popState.bind(this)}>
						<i className={this.state.popFlag ? 'icon2' : 'icon1'}/>
					</div>
					<div className={'a2'} onClick={this.changeType.bind(this, 12)}>
						<i className={'icon1'}/>
					</div>
					{this.state.popFlag && <div className={`popup popup${this.state.type}`}>
						{{//功能列表
							0: <ul className={'item0'}>
								<li className={'l1'} onClick={this.changeType.bind(this, 1)}><i/></li>
								<li className={'l2'} onClick={this.changeType.bind(this, 3)}><i/></li>
								<li className={'l3'} onClick={this.changeType.bind(this, 12)}><i/></li>
								<li className={'l4'}><i/></li>
								<li className={'l5'} onClick={this.popState.bind(this)}><i/></li>
								<li className={'l6'} onClick={this.changeType.bind(this, 2)}><i/></li>
								<li className={'l7'}><i/></li>
								<li className={'l8'}><i/></li>
								<li className={'l9'}><i/></li>
							</ul>,
							//鱼列表
							1: <Item2 type={'fish'} list={this.state.fishList}
												changeCurItem={this.changeCurItem.bind(this)}/>,
							//装饰背包
							2: <Item2 type={'dec'} setDecorate={this.setDecorate.bind(this)} list={this.state.userBagInfo}/>,
							//装饰商店
							3: <Item2 getUserInfoList={this.getUserInfoList.bind(this)} type={'market'}
												setDecorate={this.setDecorate.bind(this)} list={this.state.commodityList}/>,
							//孵化
							7: <Item7 getUserInfoList={this.getUserInfoList.bind(this)}/>,
							//鱼属性页面
							9: <Cattr getUserInfoList={this.getUserInfoList.bind(this)} changeType={this.changeType.bind(this)}
												handleShow={this.changeShowFlag.bind(this)}
												item={this.state.curItem}/>,
							//寄语编辑页面
							10: <Item10 changeType={this.changeType.bind(this)} item={this.state.curItem}
													getUserInfoList={this.getUserInfoList.bind(this)}/>,
							//鱼市页面
							12: <Item12/>,
							//寄语历史页面
							13: <Item13 item={this.state.curItem}/>
						}[this.state.type]}
					</div>
					}
				</div>
				{this.state.showF && <Show/>}
				{this.state.loadingFlag && <div className={'loading'}/>}
				<Res userData={this.state.userData} chargingSink={this.state.chargingSink}/>
				<Interaction getUserInfoList={this.getUserInfoList.bind(this)} userPondInfo={this.state.userPondInfo}
										 chargingSink={this.state.chargingSink}/>
				<Popup/>
			</div>

		);
	}
});
