require('./show.css');
import React from 'react';

module.exports = React.createClass({
	render: function () {
		return (
			<div className='show'>
				<iframe src={'http://192.168.10.210:5239/index.html'}/>
			</div>
		);
	}
});
