require('./list.css');
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
		const postData = {
			uid: uid
		};
		util.reqPost('/emaCat/currency/getUserCatList', postData, data => {
			console.log(data);
			this.setState({
				list: data.catList
			});
		});
		console.log(uid);
	},
	selectCat(ind, item) {
		const fr = util.getCookie('from');
		this.setState({
			isOn: ind
		});
		console.log(ind);
		util.setCookie('catIndex', ind);
		if (fr == 'f') {
			util.setCookie('fid', item.catId);
			this.context.router.push('/hospital');
		} else if (fr == 'm') {
			util.setCookie('mid', item.catId);
			this.context.router.push('/hospital');
		} else {
			util.setCookie('catId', item.catId);
			util.setCookie('rarity', item.rarity);
		}
		this.props.changeShow(item);
	},
	componentDidMount() {
		// this.setState({
		// 	isOn: util.getCookie('catIndex') || false
		// });
		// this.getList();
	},
	render() {
		const {catList} = this.props;
		return (
			<div id='list'>
				<ul>
					{catList.map((item, i) => <li className={this.state.isOn == i ? 'on' : ''}
																				onClick={this.selectCat.bind(this, i, item)}><img
						src={`${util.getImgHost()}/fish/${item.catId}/small_icon_${item.catId}.png`}/></li>)}
				</ul>
			</div>
		);
	}
});
