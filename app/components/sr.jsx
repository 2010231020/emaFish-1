require('./sr.css');
import React from 'react';

module.exports = React.createClass({
	render() {
		const {ssr} = this.props;
		return (
			<div className='rarity'>
				{ssr==='UR'&&<img className={'rarity_ur'} src={require('../images/rare_ur_b.png')}/>}
				{ssr==='SR'&&<img className={'rarity_sr'} src={require('../images/rare_sr_b.png')}/>}
				{ssr==='R'&&<img className={'rarity_r'} src={require('../images/rare_r_b.png')}/>}
				{ssr==='N'&&<img className={'rarity_n'} src={require('../images/rare_n_b.png')}/>}
			</div>
		)
	}
});
