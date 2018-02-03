require('./cattr.css');
import React from 'react';
import Info from './info';
import Gen from './gen';

module.exports = React.createClass({
	getInitialState() {
		return {}
	},
	close() {
		this.props.handleShow();
	},
	render() {
		const {item} = this.props;
		return (
			<div id='cattr'>
				<div className='content'>
					<Info item={item}/>
					<Gen/>
				</div>
				<i className='close' onClick={this.close}/>
			</div>
		)
	}
});
