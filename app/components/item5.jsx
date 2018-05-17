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
	getList(type) {
		let uid = util.getCookie('uid');
		const postData = {
			uid: uid,
			pondId: util.getCookie('pondId'),
			type: type
		};
		util.reqPost('/emaCat/currency/fishPondRank', postData, data => {
			util.hideLoading();
			this.setState({
				list: data.rankList
			});
			console.log('fishPondRank', data);
		});
	},
	changeSortType(type) {
		this.setState({
			sortType: type
		});
		this.getList(type);
	},
	componentDidMount() {
		this.getList(1);
	},   //加载DOM之前运行的方法。默认运行一次
	render: function () {
		return (
			<div className={'item5'}>
				<div className={'fds'}>
					<span className={`fds_btn btn_l ${this.state.sortType === 1 && 'fds_btn1'}`}
								onClick={this.changeSortType.bind(this, 1)}>
						<span>Friends</span>
					</span>
					<span className={`fds_btn btn_r ${this.state.sortType === 0 && 'fds_btn1'}`}
								onClick={this.changeSortType.bind(this, 0)}>
						<span>Grobal ranking</span>
					</span>
				</div>
				<div className={'fds_list'}>
					<ul>
						{this.state.list.length === 0 && <div className={'nof'}><p>no friends</p></div>}
						{this.state.list.map((item, i) => <li>
							<p>NickName:<span>{item.nickname}</span></p>
							<div className={'fish'}>
								<i className={`icon icon${i}`}>{i + 1}</i>
							</div>
							<p>Attractiveness: <i>{item.attractiveness}</i></p>
							<a className={'fds_go'} href={`/home?uid=${item.uid}&pondId=${item.pondId}`}/>
						</li>)}
					</ul>
				</div>
			</div>
		);
	}
});
