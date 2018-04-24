require('./login.css');
import React from 'react';

let util = require('../util/util');
let User = require('../util/User');

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},
	login: function (event) {
		const applicationToken = document.getElementById('userName').value;
		util.reqPost('/emaCat/user/userLogin', {
			loginType: 1,
			applicationType: 'ema',
			applicationToken: applicationToken
		}, data => {
			data && data.uid && util.setCookie('uid', data.uid, {path: '/'});
			data && data.token && util.setCookie('token', data.token , {path: '/'});
			const path = '/home';
			this.context.router.push(path);
		});
	},
	render: function () {
		return (
			<div id="login">
				{/*//用户名*/}
				<p>UserName：<input id='userName' type='text'/></p>
				<button onClick={this.login} className='btn'/>
			</div>
		);
	}
});
