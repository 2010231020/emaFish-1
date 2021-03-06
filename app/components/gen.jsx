require('./gen.css');
import React from 'react';


let User = require('../util/User');

module.exports = React.createClass({
	getInitialState() {
		return {}
	},
	render() {
		const {item} = this.props;
		return (
			<div className='gen'>
				<ul>
					<li><i className={'cattr cattr1'}/><i className={User.getInstance().getRarityFromGene(item.gene, 3)}/></li>
					<li><i className={'cattr cattr2'}/><i className={User.getInstance().getRarityFromGene(item.gene, 4)}/></li>
					<li><i className={'cattr cattr3'}/><i className={User.getInstance().getRarityFromGene(item.gene, 5)}/></li>
					<li><i className={'cattr cattr4'}/><i className={User.getInstance().getRarityFromGene(item.gene, 6)}/></li>
					<li><i className={'cattr cattr5'}/><i className={User.getInstance().getRarityFromGene(item.gene, 2)}/></li>
					<li><i className={'cattr cattr6'}/><i className={User.getInstance().getRarityFromGene(item.gene, 1)}/></li>
				</ul>
			</div>
		)
	}
});
