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
		alert('购买中……');
		util.reqPost('/emaCat/transcation/buyCat', postData, data => {
			console.log(data);
			alert('购买成功!');
			setTimeout(() => {
				const path = '/family';
				this.context.router.push(path);
			}, 3000);
		})
	},
	render() {
		const {item} = this.props;
		const from = this.props.from || 'market';
		return (
			<div id='cattr'>
				<div className='content'>
					<Shelve from={'cattr'} item={item}/>
					<Gen from={from} item={item}/>
					<Action from={from} buy={this.buy.bind(this,item.catId,item.orderId)}/>
				</div>
				<i className='close' onClick={this.close}/>
			</div>
		)
	}
});
