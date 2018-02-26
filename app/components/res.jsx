require('./res.css');
import React from 'react';

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
		let uid = util.getCookie('uid');
		util.reqPost('/emaCat/user/getUserData', {
			uid: uid
		}, data => {
			util.hideLoading();
			data && data.luckNum && util.setCookie('luckNum', data.luckNum, {path: '/'});
			data && data.qouta && util.setCookie('qouta', data.qouta, {path: '/'});
			this.setState({
				luckNum: data.luckNum,
				qouta: data.qouta
			});
		});
	},
	componentDidMount() {
		this.setState({
			luckNum: util.getCookie('luckNum') || 0,
			qouta: util.getCookie('qouta') || 0
		});
		this.getList();
	},
	render() {
		const {handleChange} = this.props;
		if (handleChange !== this.state.handleChange) {
			this.setState({
				handleChange: handleChange
			});
			this.getList();
		}
		return (
			<div id='res'>
				{/*<div className='tab1 res1'><span className='text'>{this.state.luckNum}</span><i className='icon icon1'/></div>*/}
				{/*<div className='tab1 res2'><span className='text'>{this.state.qouta}</span><i className='icon icon2'/></div>*/}
			</div>
		);
	}
});
