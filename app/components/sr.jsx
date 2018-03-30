require('./sr.css');
import React from 'react';

module.exports = React.createClass({
	render() {
		const {ssr} = this.props;
		return (
			<div className='rarity'>
				{ssr==='UR'&&<img className={'ur'} src={require('../images/rare_ur_b.png')}/>}
				{ssr==='SR'&&<img className={'sr'} src={require('../images/rare_sr_b.png')}/>}
				{ssr==='R'&&<img className={'r'} src={require('../images/rare_r_b.png')}/>}
				{ssr==='N'&&<img className={'n'} src={require('../images/rare_n_b.png')}/>}
			</div>
		)
	}
});
