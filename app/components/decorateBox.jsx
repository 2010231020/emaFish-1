import React from 'react';

let User = require('../util/User');

module.exports = React.createClass({
	render() {
		const {propId} = this.props;
		return (
			<div>
				<img src={require(`../images/d${propId}l.png`)}/>
				<span className={'name'}>{User.getInstance().getProp(propId).propName}</span>
			</div>
		)
	}
});
