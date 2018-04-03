require('./item13.css');
import React from 'react';
import util from '../util/util';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			coinType: 1,
			list: [],
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
		this.getList(this.props.item.fishId);
	},//加载DOM之前运行的方法。默认运行一次
	getList(fishId) {
		const postData = {
			fishId: fishId
		};
		util.reqPost('/emaCat/currency/getFishnoteList', postData, data => {//请求和传递的方式post
			util.hideLoading();
			this.setState({
				list: data.userFishnoteHistoryInfos
			});
			console.log('getFishnoteList', data);
		});
	},
	render: function () {
	const {item} = this.props;
	// const item = this.props.item;
	return (
		<div className={'item13'}>
			<span className={'fish_num'}>#{item.fishId}</span>
			<div className={'list-hist'}>
				<ul>
					{this.state.list.map((item, i) => <li>
							<p>{item.fishnote}</p>
					</li>)}
				</ul>
			</div>
			{/*<div className={'buttom'}></div>*/}
		</div>
	);
}
});
