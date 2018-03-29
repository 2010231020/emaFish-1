require('./cattr.css');
import React from 'react';
import Gen from './gen';
import Action from './action';
import Avatar from './avatar';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState() {
		return {
			item: {},
			exp: 0
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
	refreshInfo(data) {
		let tmpObj = {
			exp: data.exp,
			level: data.level
		};
		this.setState({
			item: Object.assign(this.state.item, tmpObj)
		});
		this.props.getUserInfoList();
	},
	changeType() {
		this.props.changeType(10);
	},
	componentDidMount() {
		this.setState({
			item: this.props.item
		})
	},
	render() {
		return (
			<div id='cattr'>
				<div className='content'>
					<div className={'shelve'}>
						<div className='l'>
							<div className='content'>
								<Avatar item={this.state.item}/>
							</div>
						</div>
						<div className={'r'} onClick={this.changeType.bind(this)}>
							<p className={'msg'}>{this.state.item.fishNote || '还没有寄语'}</p>
						</div>
					</div>

					<Gen item={item}/>
					<Action refreshInfo={this.refreshInfo.bind(this)} item={this.state.item}/>
				</div>
				<span className={'fish_num'}>#{this.state.item.fishId}</span>
				{/*<i className='close' onClick={this.close}/>*/}
			</div>
		)
	}
});
