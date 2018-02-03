require('./sale.css');
import React from 'react';
import Header from './header';
import Show from './show';
let util = require('../util/util')

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},
	show: function (event) {
		const price = event.target.elements[0].value;
		let postData = {
			uid: util.getCookie('uid'),
			upDays: 1,
			catId: util.getCookie('catId'),
			price: price
		};
		util.reqPost('/emaCat/transcation/leaseCatOrder', postData, data => {
			console.log(data);
			const path = '/brothel';
			this.context.router.push(path);
		});
	},
	render: function () {
		const title = '估价';
		return (
			<div id='sale'>
				<Header title={title}/>
				<Show/>
				<form onSubmit={this.show}>
					<p>每次收钱：<input type='text'/></p>
					<button type='submit'>上架</button>
				</form>
			</div>
		);
	}
});
