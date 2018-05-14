import React from 'react';

let User = require('../util/User');

module.exports = React.createClass({
	render() {
		const {propId} = this.props;
		let name = '';
		if (User.getInstance().getProp(propId).propType == 1) {
			name = User.getInstance().getProp(propId).propName;
		} else {
			name = `LV${User.getInstance().getProp(propId).propLevel}`;
		}

		return (
			<div>
				<img src={require(`../images/d${propId}l.png`)}/>
				<span className={'name'}>{name}</span>
			</div>
		)
	}
});
