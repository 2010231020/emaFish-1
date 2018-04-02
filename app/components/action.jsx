require('./action.css');
import React from 'react';

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
		if (item.fishStatus === '1') {
			util.alert('已上架了');
		} else {
			this.props.toSale();
		}
	},
	feed(fishId) {
		//暂无喂养接口
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid,
			fishId: fishId
		};
		util.reqPost('/emaCat/currency/fishEatFood', postData, data => {
			util.hideLoading();
			console.log(data);
			this.refreshInfo(data.fishBaseInfo);
		});
	},
	buy() {
		this.props.buy();
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
		const {item} = this.props;
		const flag = item.travelUid ? 2 : 1;//1:自家鱼；2:访客鱼
		return (
			<div className='action'>
				{flag === 1 && <div>
					<div className={'action1'} onClick={this.toSale.bind(this, item)}/>
				</div>}
				{flag === 1 && <div>
					<div className={'action2'} onClick={this.feed.bind(this, item.fishId)}>
						<span className={'num'}>{User.getInstance().getGrassFromGrow(item.rarity, item.level) || ''}</span>
					</div>
				</div>}
				{flag === 2 && <div>
					<div className={'action3'}>
						<span className={'num'}>88</span>
					</div>
				</div>}
				{flag === 2 && <div>
					<div className={'action4'} onClick={this.getRes.bind(this, item.fishId)}>
						<span className={'num'}>88</span>
					</div>
				</div>}

			</div>
		);
	}
});
