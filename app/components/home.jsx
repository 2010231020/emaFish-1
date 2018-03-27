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
import List from './list';

let util = require('../util/util');
let User = require('../util/User');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			showFlag: false,
			fishList: [],
			showF: false,
			visitorList: [],
			decorate1: 1,
			decorate2: 2,
			popFlag: false,
			itemFlag: false,
			type: 0,
			connectFlag: true
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
						decList: [
							{name: '背景1', type: 1, id: 1}, {name: '背景3', type: 1, id: 3},
							{name: '石头1', type: 2, id: 1}, {name: '石头2', type: 2, id: 2},
							{name: '浮萍1', type: 3, id: 1}, {name: '浮萍3', type: 3, id: 3}
						]
					});
					console.log(data);
					if (data.fishList.length > 0 || data.fishTravelInfoList.length > 0) {
						this.setState({
							showF: true
						});
					}

				});

				util.reqPost('/emaCat/currency/getUserBagAndPond', {uid: uid}, data => {
					util.hideLoading();
					console.log(data);
				});
				util.reqPost('/emaCat/dictionary/getGrowDictionaryInfo', data => {
					util.hideLoading();
					console.log(data);
				});
				//获取装饰商城
				util.reqPost('/emaCat/transcation/getCommodityList', {curPage: 1, pageSize: 100}, data => {
					util.hideLoading();
					console.log(data);
				});
			}

		});
	},
	componentDidMount() {
		this.getList();
		util.delCookie('from');


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
	setDecorate(type, index) {
		if (type === 1) {//背景
			this.setState({
				decorate1: index
			});
		} else if (type === 2) {//石头
			this.setState({
				decorate2: index
			});
		} else if (type === 3) {//荷叶
			this.sendMsg('setDec', index);
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
		if (type === 7) {
			// let uid = util.getCookie('uid');
			// const postData = {
			// 	uid: uid
			// };
			// util.reqPost('/emaCat/currency/hatchFish', postData, data => {
			// 	util.hideLoading();
			// 	console.log(data);
			// });
		}
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
								<li className={'l2'} onClick={this.changeType.bind(this, 2)}><i/></li>
								<li className={'l3'} onClick={this.changeType.bind(this, 3)}><i/></li>
								<li className={'l4'}><i/></li>
								<li className={'l5'}><i/></li>
								<li className={'l6'}><i/></li>
								<li className={'l7'} onClick={this.changeType.bind(this, 7)}><i/></li>
								<li className={'l8'}><i/></li>
								<li className={'l9'}><i/></li>
							</ul>,
							//鱼列表
							1: <Item2 type={'fish'} list={this.state.fishList}
												changeCurItem={this.changeCurItem.bind(this)}/>,
							//装饰背包
							2: <Item2 type={'dec'} setDecorate={this.setDecorate.bind(this)} list={this.state.decList}/>,
							//装饰商店
							3: <Item2 type={'market'} setDecorate={this.setDecorate.bind(this)} list={this.state.decList}/>,
							//孵化
							7: <Item7/>,
							//鱼属性页面
							9: <Cattr changeType={this.changeType.bind(this)} handleShow={this.changeShowFlag.bind(this)}
												item={this.state.curItem}/>,
							//寄语编辑页面
							10: <Item10 item={this.state.curItem}/>,
							//鱼市页面
							12: <Item12/>,
							//寄语历史页面
							13: <Item13/>
						}[this.state.type]}
					</div>
					}
				</div>
				{this.state.showF && <Show/>}
				<Res/>
				<Interaction/>
			</div>

		);
	}
});
