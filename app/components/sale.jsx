require('./sale.css');
import React from 'react';
import Res from './res';
import Shelve from './shelve';

let util = require('../util/util')

module.exports = React.createClass({
	getInitialState: function () {
		return {}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	sale() {
		const price = document.getElementById('s_price').value;
		let postData = {
			uid: util.getCookie('uid'),
			upDays: 1,
			fishId: util.getCookie('fishId'),
			price: price
		};
		util.reqPost('/emaCat/transcation/createFishOrder', postData, data => {
			util.hideLoading();
			console.log(data);
			const path = '/market';
			this.context.router.push(path);
		});
	},
	render: function () {
		const item = {
			fishId: util.getCookie('fishId'),
			rarity: util.getCookie('rarity')
		};
		return (
			<div id='sale'>
				<Res/>
				<div className='list-content'>
					<ul>
						<li>
							<Shelve from='sale' item={item}/>
						</li>
						<li className='price'>
							<div className={'d1'}>
								<span>初始价格</span>
								<input id='s_price' type='number' defaultValue='0'/>
							</div>
							<div>
								<span>流拍价格</span>
								<input type='number' defaultValue='0'/>
							</div>
							<div>
								<span>拍卖时间</span>
								<input className={'t'} type='number' defaultValue='0'/>
							</div>
						</li>
					</ul>
					<div className='btn' onClick={this.sale}>
						<img src={require('../images/sale2.png')}/>
					</div>
				</div>
			</div>
		);
	}
});
