require('./home.css');
import React from 'react';
import Res from './res';
import Footer from './footer';
import Show from './show';
import Leaf from './leaf';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			list: [],
			showF: false
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	getList() {
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid
		};
		util.reqPost('/emaCat/currency/getUserCatList', postData, data => {
			util.hideLoading();
			console.log(data);
			if (data.catList.length > 0) {
				this.setState({
					showF: true
				});
			}
		});
	},
	componentDidMount() {
		this.getList();
		util.delCookie('from');
	},
	render() {
		return (
			<div id='home' className='full'>
				<Res/>
				{this.state.showF && <Show/>}
				<Footer/>
				<Leaf/>
			</div>
		);
	}
});
