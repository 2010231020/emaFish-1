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
	setDecorate(type, id) {
		this.props.setDecorate(type, id);
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
				{name: '背景1', type: 1, id: 1}, {name: '背景3', type: 1, id: 3},
				{name: '石头1', type: 2, id: 1}, {name: '石头2', type: 2, id: 2},
				{name: '浮萍1', type: 3, id: 1}, {name: '浮萍3', type: 3, id: 3}
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
			<div id='item2'>
				<i className={'pre'}/>
				<ul className={'item1'}>
					{this.state.list.map((item, i) => <li onClick={this.props.setDecorate.bind(this, item.type, item.id)}>
						<img src={require(`../images/d${item.type}${item.id}l.png`)}/>
						<span className={'num'}>{item.name}</span>
					</li>)}
				</ul>
				<i className={'next'}/>
			</div>
		);
	}
});
