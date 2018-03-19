require('./home.css');
import React from 'react';
import Res from './res';
import Show from './show';
import Leaf from './leaf';
import Interaction from './interaction';
import Item from './item';
import Cattr from './cattr';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			showFlag: false,
			fishList: [],
			showF: false,
			visitorList: []
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
		util.reqPost('/emaCat/currency/getUserPondInfo', postData, data => {
			util.hideLoading();
			console.log(data);

			if (data && data.length > 0 && data[0].id) {
				util.reqPost('/emaCat/currency/getUserFishList', {uid: uid, destinationPoolId: data[0].id}, data => {
					util.hideLoading();
					console.log(data);
					this.setState({
						fishList: data.fishList,
						visitorList: data.fishTravelInfoList
					});
					console.log(data);
					if (data.fishList.length > 0) {
						this.setState({
							showF: true
						});
					}
				});
			}

		});
	},
	componentDidMount() {
		this.getList();
		util.delCookie('from');
		window.addEventListener("message", e => {
			if (e.origin === 'http://cober1.com:5239') {
				console.log(e.data.obj);
			}
		});
	},
	sendMsg() {
		console.log('send msg');
		var domain = 'http://cober1.com:5239';
		document.getElementById("iframe").contentWindow.postMessage({obj: 'I am from react'}, domain)
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
		return (
			<div id='home' className='full'>
				<Item changeShow={this.changeCurItem.bind(this)} list={this.state.fishList} visitorList={this.state.visitorList}/>
				{this.state.showF && <Show/>}
				{/*<button onClick={this.sendMsg.bind(this)}>click me</button>*/}
				<Res/>
				<Interaction/>
				<Leaf/>
				{this.state.showFlag &&
				<Cattr from={'me'} handleShow={this.changeShowFlag.bind(this)} item={this.state.curItem}/>}
			</div>

		);
	}
});
