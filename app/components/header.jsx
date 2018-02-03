require("./header.css");
import React from 'react';
import {Link} from 'react-router';

module.exports = React.createClass({
	getInitialState: function () {
		return {
			imgUrls: [],
		};
	},
	render: function () {
		const {title} = this.props;
		return (
			<div id="header">
				<div className='tittle'>{title}</div>
				<div className='to_market'>
					<Link to='/market'>超市</Link>
				</div>
				<div className='go_home'>
					<Link to='/family'>回家</Link>
				</div>
			</div>
		);
	}
});


