require('./cattr.css');
import React from 'react';
import Shelve from './shelve';
import Gen from './gen';
import Action from './action';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState() {
		return {
		}
	},
	close() {
		this.props.handleShow();
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	buy(fishId, orderId) {
		console.log(fishId, orderId);
		let postData = {
			uid: util.getCookie('uid'),
			fishId: fishId,
			orderId: orderId
		};
		util.reqPost('/emaCat/transcation/buyFish', postData, data => {
			console.log(data);
			util.hideLoading();
			util.popShow('购买成功');
			this.props.handleShow();
			this.props.buyCallback();
		})
	},
	choice(fishId) {
		this.props.handleShow();
		this.props.handlePop(fishId);
	},
	social(fishId) {
		this.props.handleShow();
		this.props.handlePop(fishId);
	},
	render() {
		const {item} = this.props;
		const from = this.props.from || 'market';
		return (
			<div id='cattr'>
				<div className='content'>
					<Shelve from={'cattr'} item={item}/>
					<Gen from={from} item={item}/>
					<Action from={from} buy={this.buy.bind(this, item.fishId, item.orderId)}
									choice={this.choice.bind(this, item.fishId)}
									social={this.social.bind(this, item.fishId)}/>
				</div>
				<i className='close' onClick={this.close}/>
			</div>
		)
	}
});
