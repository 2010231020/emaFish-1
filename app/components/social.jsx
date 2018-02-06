require('./social.css');
import React from 'react';
import Back from './back';
import Res from './res';
import Show from './show';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			handleChange: false
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	buy() {
		let postData = {
			uid: util.getCookie('uid')
		};
		alert('捞鱼中……');
		util.reqPost('/emaCat/transcation/luckFish', postData, data => {
			console.log(data);
			this.setState({
				handleChange: !this.state.handleChange
			});
			if (data.resultCode === 200) {
				alert('捕捉成功!');
				// const path = '/family';
				// this.context.router.push(path);
			} else {
				alert(data.resultMsg);
			}
			// setTimeout(() => {
			// 	const path = '/family';
			// 	this.context.router.push(path);
			// }, 3000);
		})
	},
	render: function () {
		return (
			<div id='social'>
				<Back to='/home'/>
				<Res handleChange={this.state.handleChange}/>
				<Show uid={1}/>
				<footer>
					<div className={'tab'} onClick={this.buy}>
						<img src={require('../images/hunt.png')}/>
					</div>
					<div className={'tab'}>
						<img src={require('../images/free-bg.png')}/>
					</div>
				</footer>
			</div>
		);
	}
});
