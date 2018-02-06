require('./market.css');
import React from 'react';
import Back from './back';
import Shelve from './shelve';
import Res from './res';
import Cattr from './cattr';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			list: [],
			showFlag: false,
			curItem: {},
			changeHandle: false
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	changeShowFlag(item) {
		if (item) {
			this.setState({
				showFlag: !this.state.showFlag,
				curItem: item
			});
		} else {
			this.setState({
				showFlag: !this.state.showFlag,
			});
		}
	},
	componentDidMount() {
		const postData = {
			curPage: 1,
			pageSize: 100
		};
		util.reqPost('/emaCat/commodity/getCatDealList', postData, data => {
			this.setState({
				list: data.catList
			});
		});
	},
	render: function () {
		return (
			<div id='market'>
				<Back/>
				<Res changeHandle={this.state.changeHandle}/>
				<div className='list-content'>
					<select className='sort'>
						<option>按生育速度排列</option>
					</select>
					<ul>
						{this.state.list.map(item => <li onClick={this.changeShowFlag.bind(this, item)}><Shelve
							item={item}
							from='market'/>
						</li>)}
					</ul>
				</div>
				{this.state.showFlag &&
				<Cattr from={'market'} item={this.state.curItem} handleShow={this.changeShowFlag.bind(this)}/>}
			</div>
		);
	}
});
