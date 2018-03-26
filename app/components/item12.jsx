require('./item12.css');
import React from 'react';
import util from '../util/util';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			actionType: 1,//1:显示;2:编辑,
			coinType: 1,
			sortType: 1,//1:price;2:rare,
			queryType: true,//true:up;false:down,
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	changeSortType(type) {
		if (this.state.sortType === type) {
			this.setState({
				queryType: !this.state.queryType
			});
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
	},
	render: function () {
		return (
			<div className={'item12'}>
				<div className={'sort'}>
					<div className={`sort_btn ${this.state.sortType === 1 && 'on'}`}
							 onClick={this.changeSortType.bind(this, 1)}>
						<span>Price</span><i className={this.state.queryType ? 'up' : 'down'}/>
					</div>
					<div className={`sort_btn ${this.state.sortType === 2 && 'on'}`}
							 onClick={this.changeSortType.bind(this, 2)}>
						<span>Rare</span><i className={this.state.queryType ? 'up' : 'down'}/>
					</div>
				</div>
			</div>
		);
	}
});
