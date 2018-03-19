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
				<div className={'a1'}>
					<img src={require('../images/interaction1.png')}/>
				</div>
				<div className={'a2'}>
					<img src={require('../images/interaction2.png')}/>
				</div>
			</div>
		);
	}
});
