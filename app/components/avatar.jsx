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
		const {fid} = this.props;
		const {ssr} = this.props;
		return (
			<div className='avatar'>
				<div className='head'>
					<img className='image' src={`${util.getImgHost()}/fish/${fid}/small_icon_${fid}.png`}/>
					<div className={'exp'}><span className={'lv'}>Lv1</span><i className={'exp-bar'}/></div>
					<Sr ssr={ssr}/>
				</div>
			</div>
		)
	}
});
