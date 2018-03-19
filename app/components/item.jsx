require('./item.css');
import React from 'react';
import Item2 from './item2';
import List from './list';
import {Link} from 'react-router';

let util = require('../util/util');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			popFlag: false,
			itemFlag: false,
			type: 0
		}
	},
	popState() {
		if (this.state.popFlag) {
			this.setState({
				type: 0
			})
		}
		this.setState({
			popFlag: !this.state.popFlag,
			itemFlag: !this.state.itemFlag
		})
	},
	changeType(type) {
		this.setState({
			type: type
		});
		if (type === 7) {
			let uid = util.getCookie('uid');
			const postData = {
				uid: uid
			};
			util.reqPost('/emaCat/currency/hatchFish', postData, data => {
				util.hideLoading();
				console.log(data);
			});
		}
	},
	selectCat(ind, item) {
		const fr = util.getCookie('from');
		this.setState({
			isOn: ind
		});
		console.log(ind);
		util.setCookie('catIndex', ind);
		if (fr == 'f') {
			util.setCookie('fid', item.fishId);
			this.context.router.push('/hospital');
		} else if (fr == 'm') {
			util.setCookie('mid', item.fishId);
			this.context.router.push('/hospital');
		} else {
			util.setCookie('fishId', item.fishId);
			util.setCookie('rarity', item.rarity);
		}
		this.props.changeShow(item);
	},
	componentDidMount() {

	},
	render: function () {
		const {list} = this.props;
		const {visitorList} = this.props;
		return (
			<div id='item'>
				<div className={'a1'} onClick={this.popState.bind(this)}>
					<i className={this.state.popFlag ? 'icon2' : 'icon1'}/>
				</div>
				<Link to='/market' className={'a2'}>
					<i className={'icon1'}/>
				</Link>
				{this.state.popFlag && <div className={'popup'}>
					{{
						0: <ul className={'item0'}>
							<li className={'l1'} onClick={this.changeType.bind(this, 1)}><i/></li>
							<li className={'l2'} onClick={this.changeType.bind(this, 2)}><i/></li>
							<li className={'l3'}><i/></li>
							<li className={'l4'}><i/></li>
							<li className={'l5'}><i/></li>
							<li className={'l6'}><i/></li>
							<li className={'l7'} onClick={this.changeType.bind(this, 7)}><i/></li>
							<li className={'l8'}><i/></li>
							<li className={'l9'}><i/></li>
						</ul>,
						1: <ul className={'item1'}>
							{list.map((item, i) => <li onClick={this.selectCat.bind(this, i, item)}><img
								src={`${util.getImgHost()}/fish/${item.fishId}/small_icon_${item.fishId}.png`}/></li>)}

							{visitorList.map((item, i) => <li onClick={this.selectCat.bind(this, i, item)}><img
								src={`${util.getImgHost()}/fish/${item.fishId}/small_icon_${item.fishId}.png`}/>我是访客标记</li>)}

						</ul>,
						2: <Item2 list={this.state.item2list}/>,
						7: <div className={'item7'}>孵化界面……</div>
					}[this.state.type]}
				</div>
				}
			</div>
		);
	}
});
