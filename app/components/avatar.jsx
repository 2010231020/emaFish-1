require('./avatar.css');
import React from 'react';
import Sr from './sr';
import util from '../util/util'

module.exports = React.createClass({
	getInitialState: function () {
		return {}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	render() {
		const {item} = this.props;
		return (
			<div className='avatar'>
				<div className='head'>
					<img className='image' src={util.getImg(item.gene)}/>
					<div className={'exp'}><span className={'lv'}>Lv{item.level}</span><i style={{width: `${item.exp}%`}}
																																								className={'exp-bar'}/></div>
					<Sr ssr={item.rarity}/>
					{item.fishStatus === '1' && <span className={'status'}>已上架</span>}
					{item.fishStatus === '10001' && <span className={'status'}>上架中</span>}
					{item.fishStatus === '10002' && <span className={'status'}>出游中</span>}
				</div>
			</div>
		)
	}
});
