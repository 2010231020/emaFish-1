require('./shelve.css');
import React from 'react';
import Avatar from './avatar';

let util = require('../util/util');


module.exports = React.createClass({
	getInitialState: function () {
		return {
			item: [],
		};
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	show(catId, orderId, uid) {
		util.setCookie('catId', catId);
		util.setCookie('orderId', orderId);
		util.setCookie('catUid', uid);
		const path = '/personal';
		this.context.router.push(path);
	},
	render: function () {
		const {from} = this.props || 'normal';
		const {item} = this.props;
		return (
			<div className={from === 'cattr' ? 'shelve' : 'shelve bg'}>
				<div className='l'>
					<div className='content'>
						<Avatar fid={item.catId} ssr={item.rarity}/>
					</div>
				</div>
				<div className={from === 'market' ? 'detail from-market' : 'detail'}>
					<div className='content content1'>小小小丑鱼</div>
					<div className='content'><span className='span1'>生育速度</span><span className='span2'>100000</span></div>
					<div className='content'><span className='span1'>小鱼编号</span><span className='span2'>#{item.catId}</span></div>
					{from === 'market' && <div className='content content4'><span className='text'>{item.price}</span></div>}
				</div>
			</div>
		);
	}
});
