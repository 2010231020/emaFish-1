require('./personal.css');
import React from 'react';
import Header from './header';
import Show from './show';
import {Link} from 'react-router';

let util = require('../util/util');
module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},
	papa(type) {
		util.setCookie('mainCat', util.getCookie('catId'));
		if(type===0){
			util.setCookie('from', 'personal');
			const path = '/family';
			this.context.router.push(path);
		}else {
			const path = '/brothel';
			this.context.router.push(path);
		}
	},
	render: function () {
		const title = '个猫小窝';
		const isMyCat = util.getCookie('uid') === util.getCookie('catUid');
		return (
			<div id='personal'>
				<Header title={title}/>
				<Show/>
				{isMyCat && <div className='actions'>
					<Link to='/sale'>出售</Link>
					<Link to='/mai'>卖身</Link>
					<a onClick={this.papa.bind(this,1)}>去生娃</a>
					<a onClick={this.papa.bind(this,0)}>回家生娃</a>
				</div>
				}

			</div>
		);
	}
});
