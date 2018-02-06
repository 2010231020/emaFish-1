require('./family.css');
import React from 'react';
import Back from './back';
import Show from './show';
import Res from './res';
import Interaction from './interaction';
import Status from './status';
import List from './list';
import Cattr from './cattr';
import Action from './action';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			showFlag: false,
			catList: [],
			showF: false,
			curItem: {},
			fishShow: false
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
				catList: data.catList
			});
			if (data.catList.length > 0) {
				this.setState({
					fishShow: true
				});
			}
		});
	},
	componentDidMount() {
		this.getList();
	},
	changeShowFlag() {
		this.setState({
			showFlag: !this.state.showFlag
		});
	},
	changeCurItem(item) {
		this.setState({
			showFlag: !this.state.showFlag,
			showF: true,
			curItem: item
		});
	},
	render() {
		const showFlag = this.state.showFlag;
		return (
			<div id='family'>
				<Back/>
				<Res from='1'/>

				{this.state.fishShow && <Show/>}

				<List changeShow={this.changeCurItem.bind(this)} catList={this.state.catList}/>
				{showFlag &&
				<Cattr from={'me'} handleShow={this.changeShowFlag.bind(this)} item={this.state.catList[util.getCookie('catIndex') || 0]}/>}
			</div>
		);
	}
});
