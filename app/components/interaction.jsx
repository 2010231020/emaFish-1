require('./interaction.css');
import React from 'react';


let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {}
	},
	componentDidMount() {
	},
	getRes(type) {   //查询水草与收水草
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
		// let pondId = util.getUrlParams('pondId') || util.getCookie('pondId');
		const postData = {
			uid: uid,
			// pondId: pondId,
			// type: type
		};
		util.reqPost('/emaCat/currency/getUserPondInfo', postData, data => {
			console.log(data);
			// this.props.getUserInfoList();
			// 点赞成功
			// 	util.alert('Success！', () => {
			// 		this.props.popState();
			// 	});
		});
	},
	follow() {
		let uid = util.getCookie('uid');
		let pondId = util.getCookie('pondId');
		let befolUid = util.getUrlParams('uid');
		let befolPondId = util.getUrlParams('pondId');
		const postData = {
			uid: uid,
			pondId: pondId,
			befolUid: befolUid,
			befolPondId: befolPondId,
		};
			util.reqPost('/emaCat/currency/followUserPond', postData, data => {
				//关注
				console.log('Focus on', data);
				type =data.type;
				// this.props.getUserInfoList();
				//关注成功!
				// 	util.alert('Success!', () => {
				// 		this.props.popState();
				// 	});
			});
	},
	render: function () {
		const {userPondInfo, chargingSink, isTraveller,} = this.props;
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
				{isTraveller && <div className={'a2'} onClick={this.follow.bind(this)}>
					{this.type === 0 && <img src={require('../images/interaction4.png')}/>}
					{this.type === 1 && <img src={require('../images/interaction3.png')}/>}
				</div>}
			</div>
		);
	}
});
