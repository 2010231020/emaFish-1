require('./action.css');
import React from 'react';
import Num from './num';

let util = require('../util/util');
let User = require('../util/User');

module.exports = React.createClass({
	getInitialState: function () {
		return {}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	toSale(item) {
		if (item.fishStatus === '1' || item.fishStatus === '10001') {
			util.alert('Has been sold');
		} else {
			this.props.toSale();
		}
	},
	feed(fishId) {
		//暂无喂养接口
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid,
			fishId: fishId,
		};
		util.reqPost('/emaCat/currency/fishEatFood', postData, data => {
			util.hideLoading();
			console.log(data);
			this.refreshInfo(data.fishBaseInfo);
		});
	},
	buy(fishId, orderId, e) { //购买鱼
		//阻止事件冒泡
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		console.log(fishId, orderId);
		let postData = {
			uid: util.getCookie('uid'),
			fishId: fishId,
			orderId: orderId
		};
		//确认购买
		util.popShow(`Buy this fish (#ID${fishId})？`, () => {
			util.reqPost('/emaCat/transcation/buyFish', postData, data => {
				console.log(data);
				//购买成功
					util.alert('Success！')
			})
		});
	},
	shutdownFish(fishId){ //下架鱼
		const postData = {
			uid: util.getCookie('uid'),
			fishId: fishId,
		};
		util.popShow(`Undo this fish (#ID${fishId})？`, () => {
			util.reqPost('/emaCat/transcation/shutdownFish', postData, data => {
				console.log(data);
				//下架成功
				util.alert('Success！')
			})
		});
	},
	choice() {
		this.props.choice();
	},
	getRes(fishId) {
		console.log(fishId);
		//收祝福接口
	},
	refreshInfo(data) {
		this.props.refreshInfo(data);
	},
	render: function () {
		const {item, isTraveller} = this.props;
		let flag = item.travelUid ? 2 : 1;//1:自家鱼；2:访客鱼
		if (item.orderId) {
			flag = 3;
		}
		if (isTraveller) {
			flag = 4;
		}
		if(item.fishStatus === '1'){
			flag = 5;
		}
		return (
			<div className='action'>
				{flag === 1 && <div className={'div_all'}>
					<div className={'action1'} onClick={this.toSale.bind(this, item)}/>
				</div>}
				{flag === 1 && <div className={'div_all'}>
					<div className={'action2'} onClick={this.feed.bind(this, item.fishId)}>
						<span className={'num'}>{User.getInstance().getGrassFromGrow(item.rarity, item.level) || ''}</span>
					</div>
				</div>}
				{flag === 2 &&
				<a className={'action7'} href={`/home?uid=${item.uid}&pondId=${item.poolId}`}/>}
				{flag === 4 &&
				<a className={'action7'} href={`/home?uid=${item.uid}&pondId=${item.poolId}`}/>}
				{flag === 5 && <div className={'action8'} onClick={this.shutdownFish.bind(this, item.fishId)}/>}
				{/*{flag === 2 && <div className={'div_all'}>*/}
					{/*<div className={'action4'} onClick={this.getRes.bind(this, item.fishId)}>*/}
					{/*</div>*/}
				{/*</div>}*/}
				{flag === 3 && <div className={'div_a3'}>
					<div className={'price_only1'}>
					<i className={'coin2'}/>
					<i className={'underline'}/>
					<Num number={item.price}/>
				</div>
					<div className={'action5'} onClick={this.buy.bind(this, item.fishId, item.orderId)}/>
				</div>}
				{flag === 3 && <a className={'action6'} href={`/home?uid=${item.uid}&pondId=${item.poolId}`}/>}
			</div>
		);
	}
});
