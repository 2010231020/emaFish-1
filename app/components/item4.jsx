require('./item4.css');
import React from 'react';
import util from '../util/util';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			// coinType: 1,
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
		this.getList(1);
	},//加载DOM之前运行的方法。默认运行一次
	getList(type) {
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid,
			pondId: util.getCookie('pondId'),
			type: type//1 查询来访 2 查询出游
		};
		util.reqPost('/emaCat/currency/findPondTravelHistory', postData, data => {//请求和传递的方式post
			this.setState({
				list: data.fishTravelHistoryInfos
			});
			console.log('findPondTravelHistory', data);
		});
	},
	changeSortType(type) {
		if (type === 1) {
			this.setState({
				sortType: type
			});
		}
		else {
			this.setState({
				sortType: type
			});
		}
		this.getList(type);
	},
	render: function () {
		// const {item} = this.popState();
		// const item = this.props.item;
		return (
			<div className={'item4'}>
				<div className={'vist_hist'}>
					<ul>
						{this.state.list.map((item, i) => <li>
							<div className={'fish_p'}/>
							<p>访问了<span>ID：{item.travelPondId}</span>的鱼塘</p>
							<div className={'vist_go'}/>
						</li>)}
					</ul>
				</div>
			</div>
		);
	}
});
