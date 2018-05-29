require('./login.css');
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import ShareBtn from './share';

let util = require('../util/util');
let User = require('../util/User');

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},
	login: function (token) {
		// const applicationToken = document.getElementById('userName').value || 123;
		//loginType 1:用户名 2:fb
		util.reqPost('/emaCat/user/userLogin', {
			loginType: 1,
			applicationType: 'ema',
			applicationToken: 'xl001'
		}, data => {
			data && data.uid && util.setCookie('uid', data.uid, {path: '/'});
			data && data.token && util.setCookie('token', data.token, {path: '/'});
			let path = '/home';
			if(util.getUrlParams('shareCode')){
				util.setCookie('shareCode', util.getUrlParams('shareCode'), {path: '/'});
			}
			this.context.router.push(path);
		});
	},
	responseFacebook(response) {
		this.login(response.accessToken);
		console.log(response)
	},
	render: function () {
		return (
			<div id="login">
				{/*//用户名*/}
				{/*<p>UserName：<input id='userName' type='text'/></p>*/}
				<div className={'fb_login'}>
					<FacebookLogin
						appId="988695651338907"
						autoLoad={true}
						fields="name,email,picture"
						scope="public_profile,email"
						callback={this.responseFacebook}
						cssClass="fb_btn"
						icon="fa-facebook"
					/>
				</div>
				<ShareBtn
					url={'http://cober2.com:1234/login?shareCode="?"'}

					text={'你的鱼儿到了，快来这领取吧！'}
					className='ib'
					displayText='Share'
				/>
				{/*<button onClick={this.login} className='btn'/>*/}
			</div>
		);
	}
});
