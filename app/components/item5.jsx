require('./item5.css');
import React from 'react';
import Avatar from './avatar';
import util from '../util/util';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			list: [],
			sortType: 1,//1:price;2:rare,
		}
	},
	contextTypes: {
		router: React.PropTypes.object
	},
	getList() {
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid,
			pondId: util.getCookie('pondId'),
		};
		util.reqPost('/emaCat/currency/getUserFollowList', postData, data => {
			util.hideLoading();
			this.setState({
				list: data.userPondFollowInfos
			});
			console.log('getUserFollowList', data);
		});
	},
	changeSortType(type) {
		if (type === 1) {
			this.setState({
				sortType: type
			});
		} else {
			this.setState({
				sortType: type
			});
		}
		this.getList(type);
	},
	componentDidMount() {
		this.getList();
	},   //加载DOM之前运行的方法。默认运行一次
	render: function () {
		return (
			<div className={'item5'}>
				<div className={'fds'}>
					<span className={`fds_btn btn_l ${this.state.sortType === 1 && 'fds_btn1'}`}
								onClick={this.changeSortType.bind(this, 1)}>
						<span>Friend</span>
					</span>
					<span className={`fds_btn btn_r ${this.state.sortType === 2 && 'fds_btn1'}`}
								onClick={this.changeSortType.bind(this, 2)}>
						<span>Grobal ranking</span>
					</span>
				</div>
				<div className={'fds_list'}>
					<ul>
						{this.state.list.map((item, i) => <li>
							<p>Uid:<span>ID：{item.befolUid}</span></p>
							<div className={'fish'}>
								<i className={`icon icon${i}`}>{i+1}</i>
							</div>
							<p>PondId:<span>ID：{item.befolPondId}</span></p>
							<a className={'fds_go'} href={`/home?uid=${item.befolUid}&pondId=${item.befolPondId}`}/>
						</li>)}
					</ul>
				</div>
			</div>
		);
	}
});
