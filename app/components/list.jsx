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
	selectCat(ind,catId) {
		const fr = util.getCookie('from');

		this.setState({
			isOn: ind
		});
		console.log(ind);
		util.setCookie('catIndex', ind);
		if (fr == 'f') {
			util.setCookie('fid', catId);
			this.context.router.push('/birth');
		}else if (fr == 'm') {
			util.setCookie('mid', catId);
			this.context.router.push('/birth');
		}else{
			util.setCookie('catId', catId);
		}
	},
	componentDidMount() {
		this.setState({
			isOn: util.getCookie('catIndex') || 0
		});
		// this.getList();
	},
	render() {
		const {catList} = this.props;
		return (
			<div id='list'>
				<ul>
					{catList.map((item, i) => <li className={this.state.isOn == i ? 'on' : ''}
																				onClick={this.selectCat.bind(this, i, item.catId)}><img
						src={require('../images/catty2.png')}/></li>)}
				</ul>
			</div>
		);
	}
});
