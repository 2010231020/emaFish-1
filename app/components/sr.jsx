require('./sr.css');
import React from 'react';

module.exports = React.createClass({
	render() {
		const {ssr} = this.props;
		return (
			<div className='sr'>
				{ssr==='SSR'&&<img src={require('../images/ssr.png')}/>}
				{ssr==='SR'&&<img src={require('../images/sr.png')}/>}
				{ssr==='R'&&<img src={require('../images/r.png')}/>}
				{ssr==='N'&&<img src={require('../images/n.png')}/>}

			</div>
		)
	}
});
