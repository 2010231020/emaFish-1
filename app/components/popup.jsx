require('./popup.css');
import React from 'react';

let util = require('../util/util');
module.exports = React.createClass({
	close() {
		util.popHide();
		location.reload();
	},
	render() {
		const {str} = this.props;
		return (
			<div id='popup'>
				<div className={'pop-content'}>
					<div id='popup-text'>{str}</div>
					<div className={'btn'} onClick={this.close.bind(this)}>确定</div>
				</div>
			</div>
		)
	}
});
