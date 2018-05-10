require('./item12.css');
import React from 'react';
import Avatar from './avatar';
import Num from './num';
import util from '../util/util';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			actionType: 1,//1:显示;2:编辑,
			coinType: 2,
			list: [],
			sortType: 1,//1:price;2:rare,
			priceType: true,//true:up;false:down,
			rareType: true,//true:up;false:down,
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	getList(type, flag) {
		let postType = 1;
		if (type === 1) {
			postType = flag ? 1 : 3;
		} else {
			postType = flag ? 2 : 4;
		}
		const postData = {
			curPage: 1,
			pageSize: 100,
			sortType: postType// 1、价格升序 2、rarity升序 3、价格降序 4、rarity降序
		};
		util.reqPost('/emaCat/commodity/getFishDealList', postData, data => {
			this.setState({
				list: data.fishList
			});
			console.log('getFishDealList', data);
		});
	},
	changeSortType(type) {
		if (this.state.sortType === type) {
			if (type === 1) {
				this.getList(type, !this.state.priceType);
				this.setState({
					priceType: !this.state.priceType
				});
			}
			else {
				this.getList(type, !this.state.rareType);
				this.setState({
					rareType: !this.state.rareType
				});
			}
		} else {
			this.setState({
				sortType: type
			});
			if (type === 1) {
				this.getList(type, this.state.priceType);
			}
			else {
				this.getList(type, this.state.rareType);
			}
		}
	},
	changeCoinType(type) {
		this.setState({
			coinType: type
		});
	},
	componentDidMount() {
		this.getList(1, this.state.priceType);
	},   //加载DOM之前运行的方法。默认运行一次
	buy(fishId, orderId, e) {
		//阻止事件冒泡
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		console.log(fishId, orderId);
		let postData = {
			uid: util.getCookie('uid'),
			fishId: fishId,
			orderId: orderId,
			poolId:util.getCookie('poolId')
		};
		//确认购买
		util.popShow(`Buy the ID fish ${fishId}？`, () => {
			util.reqPost('/emaCat/transcation/buyFish', postData, data => {
				console.log(data);
				//购买成功
					util.alert('succeed！', () => {
						this.props.popState();
					});
			})
		});
	},
	render: function () {
		return (
			<div className={'item12'}>
				<div className={'sort'}>
					<div className={`sort_btn ${this.state.sortType === 1 && 'on'}`} onClick={this.changeSortType.bind(this, 1)}>
						<span>Price</span><i className={this.state.priceType ? 'up' : 'down'}/>
					</div>
					<div className={`sort_btn ${this.state.sortType === 2 && 'on'}`} onClick={this.changeSortType.bind(this, 2)}>
						<span>Rare</span><i className={this.state.rareType ? 'up' : 'down'}/>
					</div>
				</div>
				<div className={'list-content'}>
					<ul>
						{this.state.list.map((item, i) => <li onClick={this.props.changeCurItem.bind(this, 3, item)}>
							<div className={'l'}>
								<Avatar item={item}/>
							</div>
							<div className={'price only1'}>
								<div onClick={this.changeCoinType.bind(this, 2)}>
									<i className={this.state.coinType === 2 ? 'radio on' : 'radio'}/>
									<i className={'coin2'}/>
									<i className={'underline'}/>
									<Num number={item.price}/>
								</div>
							</div>
							<div className={'pay'} onClick={this.buy.bind(this, item.fishId, item.orderId)}>
								<i className={`coin${this.state.coinType}`}/>
							</div>
							<span className={'fish_num'}>#{item.fishId}</span>
						</li>)}
					</ul>
				</div>
			</div>
		);
	}
});
