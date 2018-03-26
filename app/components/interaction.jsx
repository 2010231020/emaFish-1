require('./interaction.css');
import React from 'react';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			ungetResourceNum: 0
		}
	},
	componentDidMount() {
		this.getRes(0);
		this.getPraise(0);
	},
	getRes(type) {
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid,
			type: type
		};
		util.reqPost('/emaCat/currency/chargingSinkInfo', postData, data => {
			util.hideLoading();
			this.setState({
				ungetResourceNum: data.chargingSink.ungetResourceNum
			});
			console.log(data);
		});
	},
	getPraise(type) {
		let uid = util.getCookie('uid');
		let pondId = util.getCookie('pondId');
		const postData = {
			uid: uid,
			pondId: pondId,
			type: type
		};
		util.reqPost('/emaCat/travel/fabulousFishPond', postData, data => {
			util.hideLoading();
			console.log(data);
		});
	},
	render: function () {
		return (
			<div id='interaction'>
				<div className={'a1'} onClick={this.getPraise.bind(this, 1)}>
					<img src={require('../images/interaction1.png')}/>
					<span className={'num'}></span>
				</div>
				<div className={'a2'} onClick={this.getRes.bind(this, 1)}>
					<img src={require('../images/interaction2.png')}/>
					<span className={'num'}>{this.state.ungetResourceNum || ''}</span>
				</div>
			</div>
		);
	}
});
