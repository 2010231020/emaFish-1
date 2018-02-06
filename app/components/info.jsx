require('./info.css');
import React from 'react';
import Avatar from './avatar';

module.exports = React.createClass({
	render() {
		return (
			<div className='info'>
				<div className='l'>
					<Avatar/>
				</div>
				<div className='detail'>
					<p><span className='span1'>姓名</span><span className='span2'>小怂包</span></p>
					<p><span className='span1'>生育速度</span><span className='span2'>100000</span></p>
				</div>
			</div>
		)
	}
});
