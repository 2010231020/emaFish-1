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
		return (
			<div id='status'>
				<div className='status1'>
					<div className='content'>
						<img src={require('../images/status1.png')}/>
						<span className='text'>SSR</span>
					</div>
				</div>
				<div className='status2'>
					<div className='content'>
						<img src={require('../images/status2.png')}/>
						<span className='text'>13,000</span>
					</div>
				</div>
				<div className='status3'>
					<div className='content'>
						<img src={require('../images/status3.png')}/>
						<span className='text'>生育中</span>
					</div>
				</div>
				<div className='sale' onClick={this.sale}>
					<img src={require('../images/sale.png')}/>
				</div>
			</div>
		);
	}
});
