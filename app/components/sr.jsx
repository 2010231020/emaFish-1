require('./sr.css');
import React from 'react';

module.exports = React.createClass({
	render() {
		const {ssr} = this.props;
		return (
			<div className='sr'>
				<img className='image' src={require('../images/ssr.png')}/>
			</div>
		)
	}
});
