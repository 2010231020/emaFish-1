require('./market.css');
import React from 'react';
import Back from './back';
import Shelve from './shelve';
import Res from './res';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			list: []
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	componentDidMount() {
		util.reqPost('/emaCat/commodity/getCatDealList', data => {
			this.setState({
				list: data.catList
			});
		});
	},
	render: function () {
		return (
			<div id='market'>
				<Back/>
				<Res/>
				<div className='list-content'>
					<select className='sort'>
						<option>按生育速度排列</option>
					</select>
					<ul>
						{this.state.list.map(item => <Shelve item={item} from='market'/>)}
					</ul>
				</div>
			</div>
		);
	}
});
