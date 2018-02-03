require('./info.css');
import React from 'react';
import Avatar from './avatar';
import Sr from './sr';

module.exports = React.createClass({
	render() {
		const {item} = this.props;
		return (
			<div className='info'>
				<div className='l'>
					<Avatar catId={item.catId}/>
				</div>
				<div className='detail'>
					<p><span className='span1'>姓名</span><span className='span2'>小怂包</span></p>
					<p><span className='span1'>世代</span><span className='span2'>{item.gen}</span></p>
					<p><span className='span1'>生育速度</span><span className='span2'>100000</span></p>
				</div>
				<Sr ssr={item.rarity}/>
			</div>
		)
	}
});
