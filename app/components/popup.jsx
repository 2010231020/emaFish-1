require('./popup.css');
import React from 'react';

let util = require('../util/util');

class Popup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '我就是来测试的',
			show: false
		};
	}

	onCancel() {
		util.popAction('cancel');
	}

	onConfirm() {
		util.popAction('ok');
	}

	render() {
		const {str} = this.props;
		return (
			<div id='popup'>
				<div className={'pop-content'}>
					<div id='popup-text'>{str}</div>
					<div className={'pop-actions'}>
						<i id={'popup-yes'} className={'btn yes'} onClick={this.onConfirm.bind(this)}/>
						<i id={'popup-no'} className={'btn no'} onClick={this.onCancel.bind(this)}/>
					</div>
				</div>
			</div>
		)
	}
}

export default Popup

// module.exports = React.createClass({
// 	getInitialState: function () {
// 		return {
// 			close: this.close.bind(this),
// 			yes: this.yes.bind(this)
// 		}
// 	},
// 	close() {
// 		util.popHide();
// 	},
// 	yes() {
//
// 	},
// 	render() {
// 		const {str} = this.props;
// 		return (
// 			<div id='popup'>
// 				<div className={'pop-content'}>
// 					<div id='popup-text'>{str}</div>
// 					<div className={'btn'} onClick={this.close.bind(this)}>确定</div>
// 				</div>
// 			</div>
// 		)
// 	}
// });
