require('./show.css');
import React from 'react';

let util = require('../util/util');

module.exports = React.createClass({
	render: function () {
		const uid = this.props.uid || util.getCookie('uid');
		return (
			<div className='show'>
				{/*<iframe src={`http://emfstatic.lemonade-game.com?uid=${uid}`}/>*/}
				<iframe id={'iframe'} src={`http://cober1.com:5239/index.html?uid=${uid}`}/>
			</div>
		);
	}
});
