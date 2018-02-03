require("./footer.css");
import React from 'react';
import {Link} from 'react-router';

module.exports = React.createClass({
	getInitialState: function () {
		return {
			imgUrls: [],
		};
	},
	render: function () {
		return (
			<div id="footer">
				<Link to='/family' className='tab-bar'><i className='icon icon1'/></Link>
				<Link to='/market' className='tab-bar'><i className='icon icon2'/></Link>
				<Link to='/birth' className='tab-bar'><i className='icon icon3'/></Link>
				<Link to='/market' className='tab-bar'><i className='icon icon4'/></Link>
			</div>
		);
	}
});



