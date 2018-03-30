require('./cattr.css');
import React from 'react';
import Gen from './gen';
import Action from './action';
import Avatar from './avatar';
import Num from './num';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState() {
		return {
			item: {},
			exp: 0,
			saleFlag: false,
			inputValue: 0
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
		this.props.refreshInfo(data);
		this.props.getUserInfoList();
	},
	changeType() {
		this.props.changeType(10);
	},
	toSale() {
		this.setState({
			saleFlag: true
		});
	},
	sale() {
		let postData = {
			uid: util.getCookie('uid'),
			fishId: this.state.item.fishId,
			upDays: 3,
			price: this.state.inputValue
		};
		util.reqPost('/emaCat/transcation/createFishOrder', postData, data => {
			console.log(data);
			util.hideLoading();
			util.popShow('上架成功');
			setTimeout(() => {
				location.reload();
			}, 2000);
		})
	},
	componentDidMount() {
	},
	handleInputChange(e) {
		console.log(e.target.value);
		this.setState({
			inputValue: e.target.value
		})
	},
	render() {
		const {saleFlag, inputValue} = this.state;
		const {item} = this.props;
		console.log(9, item);
		return (
			<div id='cattr'>
				{!saleFlag && <div className='fish_content'>
					<div className={'shelve'}>
						<div className='l'>
							<div className='content'>
								<Avatar item={item}/>
							</div>
						</div>
						<div className={'r'} onClick={this.changeType.bind(this)}>
							<p className={'msg'}>{item.fishNote || '还没有寄语'}</p>
						</div>
					</div>

					<Gen item={item}/>
					<Action toSale={this.toSale.bind(this)} refreshInfo={this.refreshInfo.bind(this)} item={item}/>
				</div>}
				{saleFlag && <div className={'sale_content'}>
					<div className={'avatar_content'}>
						<Avatar item={item}/>
					</div>
					<div className={'sale_info'}>
						<div className={'l'}>
							<i className={'time'}/>
							<i className={'hour'}/>
							<i className={'underline'}/>
						</div>
						<div className={'r'}>
							<i className={'price'}/>
							<i className={'underline'}/>
							<Num number={inputValue}/>
							<input className={'price_input'} value={inputValue} onChange={this.handleInputChange} type='number'
										 defaultValue='0'/>
						</div>
					</div>
					<div className={'fee'}>
						<span>手续费：</span><span>3</span>
					</div>
					<div className={'ok'} onClick={this.sale.bind(this)}>
						<i/>
					</div>
				</div>}

				<span className={'fish_num'}>#{item.fishId}</span>
				{/*<i className='close' onClick={this.close}/>*/}
			</div>
		)
	}
});
