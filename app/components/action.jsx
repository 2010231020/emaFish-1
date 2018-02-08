require('./action.css');
import React from 'react';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	sale() {
		const path = '/sale';
		this.context.router.push(path);
	},
	free() {
		let uid = util.getCookie('uid');
		let catId = util.getCookie('catId');
		const postData = {
			uid: uid,
			catId: catId
		};
		util.reqPost('/emaCat/transcation/releaseFish', postData, data => {
			alert('放生成功，您获得5次捕鱼机会！');
			util.hideLoading();
			const path = '/social';
			this.context.router.push(path);
		});
	},
	buy() {
		this.props.buy();
	},
	choice(){
		this.props.choice();
	},
	social(){
		this.props.social();
	},
	render: function () {
		const {from} = this.props;
		return (
			<div className='sale'>
				{from === 'me' && <img onClick={this.sale} src={require('../images/sale3.png')}/>}
				{from === 'me' && <img onClick={this.free} src={require('../images/free.png')}/>}
				{from === 'market' && <img onClick={this.buy} src={require('../images/buy.png')}/>}
				{from === 'hos' && <img onClick={this.choice} src={require('../images/yes.png')}/>}
				{from === 'social' && <img onClick={this.social} src={require('../images/free.png')}/>}
			</div>
		);
	}
});
