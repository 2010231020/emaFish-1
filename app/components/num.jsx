require('./num.css');
import React from 'react';

module.exports = React.createClass({
	render() {
		const {number} = this.props;
		const numArr = (number + '').split('');
		return (
			<div className='special_num'>{number}
				{/*{numArr.map(item => <i className={`num${item}`}/>)}*/}
			</div>
		)
	}
});
