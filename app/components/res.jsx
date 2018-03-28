require('./res.css');
import React from 'react';
import Num from './num';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			list: [],
			luckNum: 0,
			qouta: 0,
			handleChange: false
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	getList() {
	},
	componentDidMount() {
	},
	render() {
		const {userData, chargingSink} = this.props;
		return (
			<div id='res'>
				<div className='tab1 res1'><Num number={chargingSink.resourceNum || 0}/></div>
				<div className='tab1 res2'><Num number={userData.qouta || 0}/></div>
			</div>
		);
	}
});
