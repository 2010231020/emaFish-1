require('./item13.css');
import React from 'react';
import util from '../util/util';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			coinType: 1,
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	changeCoinType(type) {
		this.setState({
			coinType: type
		});
	},
	componentDidMount() {
	},
	render: function () {
		const {item} = this.props;
		// const item = this.props.item;

		return (
			<div className={'item13'}>
				<span className={'fish_num'}>#{item.fishId}</span>
				{/*/!*<div className={button} onClick={}></div>*!/*/}
				<div className={'msg1'}>
					<textarea placeholder={'在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了。'}></textarea>
			  </div>
				<div className={'msg2'}>
					<textarea placeholder={'在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了。'}></textarea>
				</div>
				<div className={'msg3'}>
					<textarea placeholder={'在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了。'}></textarea>
				</div>
				<div className={'buttom'}></div>
			</div>
		);
	}
});
