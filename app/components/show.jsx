require('./show.css');
import React from 'react';

let util = require('../util/util');

module.exports = React.createClass({
	render: function () {
		const uid = this.props.uid || util.getCookie('uid');
		const token = this.props.token || util.getCookie('token');
		return (
			<div className='show'>
				{/*<iframe src={`http://emfstatic.lemonade-game.com?uid=${uid}`}/>*/}
				<iframe id={'iframe'} src={`${util.getEgretDomain()}?uid=${uid}&token=${encodeURIComponent(token)}`}/>
			</div>
		);
	}
});
