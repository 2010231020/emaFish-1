require('./item2.css');
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
	selectCat(ind, item) {
		const fr = util.getCookie('from');
		this.setState({
			isOn: ind
		});
		console.log(ind);
		util.setCookie('catIndex', ind);
		if (fr == 'f') {
			util.setCookie('fid', item.fishId);
			this.context.router.push('/hospital');
		} else if (fr == 'm') {
			util.setCookie('mid', item.fishId);
			this.context.router.push('/hospital');
		} else {
			util.setCookie('fishId', item.fishId);
			util.setCookie('rarity', item.rarity);
		}
		this.props.changeShow(item);
	},
	componentDidMount() {
		// this.setState({
		// 	isOn: util.getCookie('catIndex') || false
		// });
		this.getList();
		console.log(123213213)
	},
	getList() {
		this.setState({
			list: [
				{itemId: 'd11.jpg'}, {itemId: 'd13.jpg'},
				{itemId: 'd21.png'}, {itemId: 'd33.png'}
			]
		});
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid
		};
		util.reqPost('/emaCat/currency/getUserDecorateInfo', postData, data => {
			util.hideLoading();
			console.log(data);
		});
	},
	render() {
		// const {list} = this.props;
		// if (catList.length > 0) {
		// 	// document.getElementById('domUl').style.width = catList.length * 2.7 + 'rem';
		// }
		console.log(123213213);
		return (
			<ul id='item2'>
				{this.state.list.map((item, i) => <li onClick={this.selectCat.bind(this, i, item)}><img
					src={require(`../images/${item.itemId}`)}/></li>)}
			</ul>
		);
	}
});
