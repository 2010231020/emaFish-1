require('./sr.css');
import React from 'react';

module.exports = React.createClass({
	render() {
		const {ssr} = this.props;
		return (
			<div className='sr'>
				{ssr==='UR'&&<img src={require('../images/rare_ur_b.png')}/>}
				{ssr==='SR'&&<img src={require('../images/rare_sr_b.png')}/>}
				{ssr==='R'&&<img src={require('../images/rare_r_b.png')}/>}
				{ssr==='N'&&<img src={require('../images/rare_n_b.png')}/>}
			</div>
		)
	}
});
