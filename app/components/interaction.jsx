require('./interaction.css');
import React from 'react';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {}
	},
	componentDidMount() {
	},
	getRes(type) {
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid,
			type: type
		};
		util.reqPost('/emaCat/currency/chargingSinkInfo', postData, data => {
			util.hideLoading();
			console.log('chargingSinkInfo', data);
			this.props.getUserInfoList();
		});
	},
	getPraise(type) {//鱼塘点赞
		let uid = util.getCookie('uid');
		let pondId = util.getUrlParams('pondId') || util.getCookie('pondId');
		const postData = {
			uid: uid,
			pondId: pondId,
			type: type
		};
		util.reqPost('/emaCat/travel/fabulousFishPond', postData, data => {
			util.hideLoading();
			console.log(data);
			this.props.getUserInfoList();
		});
	},
	render: function () {
		const {userPondInfo, chargingSink, isTraveller} = this.props;
		return (
			<div id='interaction'>
				{<div className={'a1'} onClick={this.getPraise.bind(this, 0)}>
					<img src={require('../images/interaction1.png')}/>
					<span className={'num'}>{userPondInfo.attractiveness || ''}</span>
				</div>}
				{!isTraveller && <div className={'a2'} onClick={this.getRes.bind(this, 1)}>
					<img src={require('../images/interaction2.png')}/>
					<span className={'num'}>{chargingSink.ungetResourceNum || ''}</span>
				</div>}
			</div>
		);
	}
});
