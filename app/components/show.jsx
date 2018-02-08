require('./show.css');
import React from 'react';

let util = require('../util/util');

module.exports = React.createClass({
	render: function () {
		const uid = this.props.uid || util.getCookie('uid');
		return (
			<div className='show'>
				{/*<iframe src={`http://emfstatic.lemonade-game.com?uid=${uid}`}/>*/}
				<iframe src={`http://192.168.120.27:5239/index.html?uid=${uid}`}/>
			</div>
		);
	}
});
