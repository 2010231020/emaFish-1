require('./action.css');
import React from 'react';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	sale() {
		//出售 暂无出售页面
		// const path = '/sale';
		// this.context.router.push(path);
	},
	feed() {
		//暂无喂养接口
	},
	buy() {
		this.props.buy();

	},
	choice() {
		this.props.choice();
	},
	getRes(fishId) {
		console.log(fishId);
		//收祝福接口
	},
	render: function () {
		const {item} = this.props;

		const flag = item.travelUid ? 2 : 1;//1:自家鱼；2:访客鱼
		return (
			<div className='action'>
				{flag === 1 && <div>
					<div className={'action1'} onClick={this.sale.bind(this, item)}/>
				</div>}
				{flag === 1 && <div>
					<div className={'action2'} onClick={this.feed.bind(this)}/>
				</div>}
				{flag === 2 && <div>
					<div className={'action3'}>
						<span className={'num'}>88</span>
					</div>
				</div>}
				{flag === 2 && <div>
					<div className={'action4'} onClick={this.getRes.bind(this, item.fishId)}>
						<span className={'num'}>88</span>
					</div>
				</div>}

			</div>
		);
	}
});
