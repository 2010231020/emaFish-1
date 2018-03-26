require('./gen.css');
import React from 'react';

module.exports = React.createClass({
	getInitialState() {
		return {}
	},
	render() {
		const {item} = this.props;
		return (
			<div className='gen'>
				<ul>
					<li><i className={'cattr cattr1'}/><i className={'r'}/><i className={'underline'}/></li>
					<li><i className={'cattr cattr2'}/><i className={'sr'}/><i className={'underline'}/></li>
					<li><i className={'cattr cattr3'}/><i className={'sr'}/><i className={'underline'}/></li>
					<li><i className={'cattr cattr4'}/><i className={'sr'}/><i className={'underline'}/></li>
					<li><i className={'cattr cattr5'}/><i className={'sr'}/><i className={'underline'}/></li>
					<li><i className={'cattr cattr6'}/><i className={'sr'}/><i className={'underline'}/></li>
				</ul>
			</div>
		)
	}
});
