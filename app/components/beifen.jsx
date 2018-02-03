require('./shelve.css');
import React from 'react';

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
	show(catId, orderId, uid) {
		util.setCookie('catId', catId);
		util.setCookie('orderId', orderId);
		util.setCookie('catUid', uid);
		const path = '/personal';
		this.context.router.push(path);
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
			util.delCookie('from');
		})
	},
	papa(type, catId, orderId) {
		console.log(catId);
		let mainCatId = util.getCookie('mainCat');
		if (mainCatId == catId) {
			alert('不要和自己交配');
		} else {
			let postData = {
				uid: util.getCookie('uid'),
				secondCatId: catId,
				mainCatId: util.getCookie('mainCat')
			};
			if (type === 0) {
				util.reqPost('/emaCat/breed/withSelfCat', postData, data => {
					util.delCookie('mainCat');
					util.delCookie('from');
					console.log(data);
					alert('繁殖成功!')
					setTimeout(() => {
						location.reload();
					}, 3000)
				})
			} else if (type === 1) {
				postData = {
					uid: util.getCookie('uid'),
					orderId: orderId,
					mainCatId: util.getCookie('mainCat')
				};
				util.reqPost('/emaCat/breed/withLeaseCat', postData, data => {
					console.log(data);
					util.delCookie('mainCat');
					util.delCookie('from');
					alert('繁殖成功!');
					const path = '/family';
					this.context.router.push(path);
				})
			}
		}

	},
	render: function () {
		const {item} = this.props;
		const {from} = this.props;
		let {isPapa} = false;
		if (util.getCookie('mainCat') && util.getCookie('from') === 'personal' && from !== 'market') {
			isPapa = true;
		}
		return (
			<li className='shelve'><img onClick={this.show} src={require('../images/cat.png')}/>
				<div onClick={this.show.bind(this, item.catId, item.orderId, item.uid)} className='content'>
					<div>id:{item.catId}</div>
					<div>稀有度:{item.rarity}</div>
					<div>gen:{item.gen}</div>
					<div>基因序列:{item.gene}</div>
				</div>
				{from === 'brothel' && <div>
					<div>价格：{item.price}</div>
					<div className='buy' onClick={this.papa.bind(this, 1, item.catId, item.orderId)}>交配</div>
				</div>}
				{from === 'market' && <div>
					<div>价格：{item.price}</div>
					<div className='buy' onClick={this.buy.bind(this, item.catId, item.orderId)}>购买</div>
				</div>}
				{isPapa && <div>
					<div className='buy' onClick={this.papa.bind(this, 0, item.catId)}>交配</div>
				</div>}
			</li>
		);
	}
});
