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
			util.popShow('Success!');
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
	sale(fishId) {
		let postData = {
			uid: util.getCookie('uid'),
			fishId: fishId,
			upDays: 3,
			price: this.state.inputValue,
		};
		//确认上架
		util.popShow('Sell？', () => {
			util.reqPost('/emaCat/transcation/createFishOrder', postData, data => {
				this.props.getUserFishList();
				//上架成功
				util.alert("Success！", () => {
					this.props.popState();
				});
			})
		});
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
		const {item,isTraveller} = this.props;
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
						{/*//已上架*/}
						{item.fishStatus === '1' && <div className={'status1'}/>}
						{/*//上架中*/}
						{item.fishStatus === '10001' && <div className={'status2'}/>}
						{/*//出游中*/}
						{item.fishStatus === '10002' && <div className={'status3'}/>}
						{/*判断orderId是否存在用的三段式*/}
						{item.orderId === undefined ? <div className={'r'} onClick={this.changeType.bind(this)}>
							{/*//还没有寄语*/}
								<p className={'msg'}>{item.fishNote || 'No best wishes'}</p></div> :
							<div className={'r'}><p className={'msg'}>{item.fishNote || 'No best wishes'}</p></div>}
					</div>

					< Gen item={item}/>
					<Action toSale={this.toSale.bind(this)} refreshInfo={this.refreshInfo.bind(this)} item={item} isTraveller={isTraveller}/>
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
							{/*<Num number={inputValue}/>*/}
							<input className={'price_input'} value={inputValue} onChange={this.handleInputChange} type='number'
										 defaultValue='0'/>
						</div>
					</div>
					<div className={'fee'}>
						{/*//手续费*/}
						<span>poundage：</span><span>3</span>
					</div>
					<div className={'ok'} onClick={this.sale.bind(this, item.fishId)}>
						<i/>
					</div>
				</div>}

				<span className={'fish_num'}>#{item.fishId}</span>
				{/*<i className='close' onClick={this.close}/>*/}
			</div>
		)
	}
});
