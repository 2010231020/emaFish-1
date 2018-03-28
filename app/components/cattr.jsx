require('./cattr.css');
import React from 'react';
import Gen from './gen';
import Action from './action';
import Avatar from './avatar';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState() {
		return {}
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
	changeType() {
		this.props.changeType(10);
	},
	render() {
		const {item} = this.props;
		return (
			<div id='cattr'>
				<div className='content'>
					<div className={'shelve'}>
						<div className='l'>
							<div className='content'>
								<Avatar item={item}/>
							</div>
						</div>
						<div className={'r'} onClick={this.changeType.bind(this)}>
							<p className={'msg'}>在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了。</p>
						</div>
					</div>

					<Gen item={item}/>
					<Action item={item}/>
				</div>
				<span className={'fish_num'}>#{item.fishId}</span>
				{/*<i className='close' onClick={this.close}/>*/}
			</div>
		)
	}
});
