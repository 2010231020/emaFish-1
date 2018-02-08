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
	buy(catId, orderId) {
		console.log(catId, orderId);
		let postData = {
			uid: util.getCookie('uid'),
			catId: catId,
			orderId: orderId
		};
		util.reqPost('/emaCat/transcation/buyCat', postData, data => {
			console.log(data);
			util.hideLoading();
			util.popShow('购买成功');
			this.props.handleShow();
			this.props.buyCallback();
		})
	},
	choice(catId) {
		this.props.handleShow();
		this.props.handlePop(catId);
	},
	social(catId) {
		this.props.handleShow();
		this.props.handlePop(catId);
	},
	render() {
		const {item} = this.props;
		const from = this.props.from || 'market';
		return (
			<div id='cattr'>
				<div className='content'>
					<Shelve from={'cattr'} item={item}/>
					<Gen from={from} item={item}/>
					<Action from={from} buy={this.buy.bind(this, item.catId, item.orderId)}
									choice={this.choice.bind(this, item.catId)}
									social={this.social.bind(this, item.catId)}/>
				</div>
				<i className='close' onClick={this.close}/>
			</div>
		)
	}
});
