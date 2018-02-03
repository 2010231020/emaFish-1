require('./shelve.css');
import React from 'react';
import Avatar from './avatar';
import Sr from './sr';

let util = require('../util/util')

module.exports = React.createClass({
	getInitialState: function () {
		return {
			item: [],
		};
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
			const path = '/family';
			this.context.router.push(path);
		})
	},
	show(catId, orderId, uid) {
		util.setCookie('catId', catId);
		util.setCookie('orderId', orderId);
		util.setCookie('catUid', uid);
		const path = '/personal';
		this.context.router.push(path);
	},
	render: function () {
		const {from} = this.props;
		const {item} = this.props;
		return (
			<li className='shelve' onClick={this.buy.bind(this, item.catId, item.orderId)}>
				<div className='l'>
					<div className='content'>
						<Avatar catId={item.catId}/>
					</div>
				</div>
				<div className='detail'>
					<div className='content'><span className='span1'>姓名</span><span className='span2'>小怂包</span></div>
					<div className='content'><span className='span1'>世代</span><span className='span2'>{item.gen}</span></div>
					<div className='content'><span className='span1'>生育速度</span><span className='span2'>100000</span></div>
					{from !== 'sale' &&
					<div className='content' ><span
						className='text'>{item.price}</span><i className='icon icon3'/></div>}
				</div>
				<Sr/>
			</li>
		);
	}
});
