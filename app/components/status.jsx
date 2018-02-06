require('./status.css');
import React from 'react';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
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
	sale() {
		// const postData = {
		// 	uid: uid
		// };
		// util.reqPost('/emaCat/currency/getUserCatList', postData, data => {
		// 	console.log(data);
		// 	this.setState({
		// 		list: data.catList
		// 	});
		// });
		console.log(111);
		const path = '/sale';
		this.context.router.push(path);
	},
	componentDidMount() {
		this.getList();
	},
	render: function () {
		const {item} = this.props;
		const date = new Date(item.birthday);
		return (
			<div id='status'>
				<div className='status1'>
					<div className='content'>
						<span className='title'>评级</span>
						<span className='text'>{item.rarity}</span>
					</div>
				</div>
				<div className='status2'>
					<div className='content'>
						<span className='title'>生日</span>
						<span className='text'>{[date.getFullYear(), date.getMonth()+1, date.getDate()].join('-')}</span>
					</div>
				</div>
				<div className='status3'>
					<div className='content'>
						<span className='title'>GEN</span>
						<span className='text'>{item.gen}</span>
					</div>
				</div>
			</div>
		);
	}
});
