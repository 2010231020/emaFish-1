require('./login.css');
import React from 'react';

let util = require('../util/util');

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},
	login: function (event) {
		// event.preventDefault();
		console.log(123);
		// const path = '/family';
		// this.context.router.push(path);
		const applicationToken = document.getElementById('userName').value;
		util.reqPost('/emaCat/user/userLogin', {
			loginType: 1,
			applicationType: 'ema',
			applicationToken: applicationToken
		}, data => {
			console.log(data);
			data && data.uid && util.setCookie('uid', data.uid, {path: '/'});
			util.delCookie('from');
			const path = '/home';
			this.context.router.push(path);
		});
	},
	render: function () {
		return (
			<div>
				<div id="login">
					<p>用户名：<input id='userName' type='text'/></p>
					<button onClick={this.login} className='btn'>登录</button>
				</div>
			</div>
		);
	}
});
