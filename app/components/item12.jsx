require('./item12.css');
import React from 'react';
import util from '../util/util';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			actionType: 1,//1:显示;2:编辑,
			coinType: 1,
			sortType: 1,//1:price;2:rare,
			priceType: true,//true:up;false:down,
			rareType: true,//true:up;false:down,
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	getList() {
		const postData = {
			curPage: 1,
			pageSize: 100
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
	},
	changeCoinType(type) {
		this.setState({
			coinType: type
		});
	},
	componentDidMount() {
		this.getList();
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
			</div>
		);
	}
});
