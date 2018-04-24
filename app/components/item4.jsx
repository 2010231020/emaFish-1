require('./item4.css');
import React from 'react';
import util from '../util/util';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			// coinType: 1,
			list: [],
			sortType: 1
		}
	},
	contextTypes: {
		router: React.PropTypes.object
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
		return (
			<div className={'item4'}>
				<div className={'vist_chose'}>
					<span className={`vist_btn btn_l ${this.state.sortType === 1 && 'fds_btn1'}`}
								onClick={this.changeSortType.bind(this, 1)}>
						{/*//访问我的*/}
						<span className={this.state.sortType === 1 ? 'on' : ''}>Visitors</span>
					</span>
					<span className={`vist_btn btn_r ${this.state.sortType === 2 && 'fds_btn1'}`}
								onClick={this.changeSortType.bind(this, 2)}>
						{/*//我访问的*/}
						<span className={this.state.sortType === 2 ? 'on' : ''} >Visited</span>
							</span>
							</div>
							<div className={'vist_hist'}>
							<ul>
							{this.state.list.map((item, i) => <li>
								<div className={'fish_p'}/>
								{this.state.sortType === 1 && <p><span>ID：{item.uid}</span> visitors me fish pond</p>}
								{this.state.sortType === 2 && <p>I visited <span>ID：{item.uid}</span> fish pond</p>}
								{this.state.sortType === 1 && <a className={'vist_go'} href={`/home?uid=${item.uid}&pondId=${item.travelPondId}`}/>}
								{this.state.sortType === 2 && <a className={'vist_go'} href={`/home?uid=${item.uid}&pondId=${item.destinationPoolId}`}/>}
							</li>)}
							</ul>
								<div className={'hbuon'}/>
							</div>
							</div>
							);
							}
						});
