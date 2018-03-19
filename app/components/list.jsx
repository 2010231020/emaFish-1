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
		// this.getList();
	},
	render() {
		const {list} = this.props;
		if (list.length > 0) {
			// document.getElementById('domUl').style.width = catList.length * 2.7 + 'rem';
		}
		return (
			<div id='list'>
				<ul id='domUl'>
					{list.map((item, i) => <li className={this.state.isOn == i ? 'on' : ''}
																				onClick={this.selectCat.bind(this, i, item)}><img
						src={`${util.getImgHost()}/fish/${item.fishId}/small_icon_${item.fishId}.png`}/></li>)}
				</ul>
			</div>
		);
	}
});
