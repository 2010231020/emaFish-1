require('./leaf.css');
import React from 'react';



module.exports = React.createClass({
	render: function () {
		return (
			<img className={'leaf'} src={require('../images/heye.png')}/>
		);
	}
});
