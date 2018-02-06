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
					<img className='avatar1' src={require('../images/avatar1.png')}/>
					<Sr ssr={ssr}/>
				</div>
			</div>
		)
	}
});
