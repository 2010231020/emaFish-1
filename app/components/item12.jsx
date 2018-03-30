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
	getList(type) {
		const postData = {
			curPage: 1,
			pageSize: 100,
			sortType: type//1 根据 价格升序  2 根据稀有度 降序
		};
		util.reqPost('/emaCat/commodity/getFishDealList', postData, data => {
			util.hideLoading();
			this.setState({
				list: data.fishList
			});
			console.log('getFishDealList', data);
		});
	},
	changeSortType(type) {
		if (this.state.sortType === type) {
			if (type === 1) {
				this.setState({
					priceType: !this.state.priceType
				});
			} else {
				this.setState({
					rareType: !this.state.rareType
				});
			}
		} else {
			this.setState({
				sortType: type
			});
		}
		this.getList(type);
	},
	changeCoinType(type) {
		this.setState({
			coinType: type
		});
	},
	componentDidMount() {
		this.getList(1);
	},   //加载DOM之前运行的方法。默认运行一次
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
			this.props.popState();
		})
	},
	render: function () {
		return (
			<div className={'item12'}>
				<div className={'sort'}>
					<div className={`sort_btn ${this.state.sortType === 1 && 'on'}`}
							 onClick={this.changeSortType.bind(this, 1)}>
						<span>Price</span><i className={this.state.priceType ? 'up' : 'down'}/>
					</div>
					<div className={`sort_btn ${this.state.sortType === 2 && 'on'}`}
							 onClick={this.changeSortType.bind(this, 2)}>
						<span>Rare</span><i className={this.state.rareType ? 'up' : 'down'}/>
					</div>
				</div>
				<div className={'list-content'}>
					<ul>
						{this.state.list.map((item, i) => <li>
							<div className={'l'}>
								<Avatar item={item}/>
							</div>
							<div className={'price only1'}>
								{/*<div onClick={this.changeCoinType.bind(this, 1)}>*/}
								{/*<i className={this.state.coinType === 1 ? 'radio on' : 'radio'}/>*/}
								{/*<i className={'coin1'}/>*/}
								{/*<i className={'underline'}/>*/}
								{/*<Num number={item.price}/>*/}
								{/*</div>*/}
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
