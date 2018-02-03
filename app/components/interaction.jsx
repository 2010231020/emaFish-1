require('./interaction.css');
import React from 'react';

module.exports = React.createClass({
	getInitialState: function () {
		return {
		}
	},
	render: function () {
		return (
			<div id='interaction'>
				<img src={require('../images/inter-tab.png')}/>
			</div>
		);
	}
});
