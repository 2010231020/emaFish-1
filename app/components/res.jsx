require('./res.css');
import React from 'react';

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
	getList() {
		let uid = util.getCookie('uid');
		// const postData = {
		// 	uid: uid
		// };
		// util.reqPost('/emaCat/currency/getUserCatList', postData, data => {
		// 	console.log(data);
		// 	this.setState({
		// 		list: data.catList
		// 	});
		// });
		console.log(uid);
	},
	componentDidMount() {
		this.getList();
	},
	render() {
		const {from} = this.props;
		return (
			<div id='res'>
				{from==='1' &&<div className='tab1 res1'><span className='text'>20/100</span><i className='icon icon1'/></div>}
				<div className='tab1 res2'><span className='text'>3,000</span><i className='icon icon2'/></div>
				<div className='tab1 res3'><span className='text'>3,000</span><i className='icon icon3'/></div>
			</div>
		);
	}
});
